import React, { PropTypes, Component } from 'react'
import { observable, action, runInAction, useStrict, autorun } from 'mobx'

import Config from 'config/Config'
import Serv from './StaffsServ'
import { get, cloneDeep, isArray } from 'lodash'
import Util  from 'util'
import moment from 'moment'
// 本地化
moment.locale('zh-cn')
// 模拟消息列表
import MockMsgList from './MockMsgList'
// 滚动条滚动到底部
import { resetScroll } from './ChatSetting'

/**
 * mod层-业务逻辑，数据逻辑应该存储于此
 */

//定义为严格模式
useStrict(true)

// 本地消息队列 - 用于重发
let ackQueue = {}

// 模型对象
class StaffsMod {
  // 将数据设为被观察者，这意味着数据将成为公共数据
  @observable state = {
    list: [],
    // 客服信息
    staffInfo: {
      // 客服ID
      _id: '',
      // 客服类型
      staffType: '',
      // 客服昵称
      nickname: '',
    },

    // 用户信息
    userInfo: {
      // 用户ID
      user_id: ''
    },

    // 消息输入框的值
    msgContent: '',
    // 消息列表
    msgList: [],
    // socket连接对象
    socket: null
  }

  // 获取用户信息
  @action
  async getUserInfo(){
    // 4位随机数
    let random = Math.ceil(Math.random() * 10000)
    // 用户信息
    let user_id = 'c_shaowin_' + random

    // 非开发环境，则获取用户的信息
    if('loc' !== '' + ENV){
      let res = await Serv.getUserInfo({})
      user_id = res.id
    }
    return user_id
  }

  // 获取空闲的客服ID - 平台客服
  @action
  async getStaffId(dealerId){
    // 用户ID
    let user_id = await this.getUserInfo()
    // 默认的初始客服信息
    let defStaffInfo = cloneDeep(this.state.staffInfo)
    // 返回的客服信息
    let staffRes  =  {}

    // 无经销商ID，则获取平台客服
    if(!dealerId){
      staffRes = await Serv.getStaffId(user_id)

    // 有经销商ID，则获取经销商客服
    }else{
      staffRes = await Serv.getStaffId(user_id, dealerId)
    }
    // 取出客服ID
    let staffId = staffRes.payload.staffId

    // 判空
    if(!staffId) return false
    // 根据客服id获取客服信息
    let tmpStaffInfo = await Serv.getStaffInfoById(staffId)
    // 合并属性
    tmpStaffInfo = Object.assign(defStaffInfo, tmpStaffInfo.payload)
    // 客服类型
    tmpStaffInfo.staffType = dealerId? '经销商客服': '平台客服'

    // 欢迎语
    let welcome = this.getWelcomeMsg(tmpStaffInfo)

    // 设置到状态机
    runInAction(() => {
      // 客服信息
      this.state.staffInfo = tmpStaffInfo
      // 用户信息
      this.state.userInfo = { user_id }
      // 设置欢迎语
      this.state.msgList.push(welcome)

      // 初始化socket
      this.initSocket()
    })
  }

  // 设置欢迎语
  getWelcomeMsg(staffInfo){
    return {
      userId: staffInfo._id,
      type: 'receive',
      createAt: moment().format('MMM Do YY, h:mm'),
      avatar: staffInfo.photo || 'assets/images/staffs/girl.png',
      readStatus: 'readed',
      content: `我是客服【${staffInfo.nickname}】，请问有什么可以帮到您？`
    }
  }

  // 获取常见问题内容
  getQuestionContent(data){
    // 从结果集取出常见问题列表
    let questions = data.payload.docs || get(data, 'payload.docs', [])

    // 空值判断
    if(0 === questions.length) return ''

    // 拼接内容
    let contentArr = []
    contentArr.push('<div>常见问题：</div>')
    contentArr.push(`<div class='msg-link'>`)
    contentArr.push('<ul>')
    // 遍历问题列表
    questions.map((que, i) => {
      contentArr.push(`<li><a href='about:blank;'>${que.topic}</a></li>`)
    })
    contentArr.push('</ul>')
    contentArr.push('</div>')

    return contentArr.join('')
  }

  // 获取常见问题消息
  @action
  async getCommonQuestions(){
    // 常见问题查询结果
    let data = await Serv.getCommonQuestions()
    // 拼接常见问题内容
    let content = this.getQuestionContent(data)
 
    // 返回常见问题
    return {
      userId: this.state.staffInfo._id,
      type: 'receive',
      createAt: moment().format('MMM Do YY, h:mm'),
      avatar: this.state.staffInfo.photo || 'assets/images/staffs/girl.png',
      readStatus: 'readed',
      content
    }
  }

  // 获取发送的消息内容
  @action
  getSendMsgContent(sendMsg){
    // 消息协议,通讯格式
    let r = Math.ceil(Math.random() * 100000)
    let uuid = this.state.userInfo.user_id + Date.now() + r

    let message = {
      uuid: uuid, // uuid
      type: 'txt',
      data: sendMsg,
      targetUid: this.state.staffInfo._id
    }
    //本地存储ackQueue
    let msg = Object.assign({}, message)
    // 重发计数器
    msg["count"] = 0
    // 放入队列
    ackQueue[msg.uuid] = msg

    // 返回消息
    return msg
  }

  // 消息重发定时器 扫描ackQueue, 到达重发时间则进行重发
  @action
  scanToReSend(){
    let t1 = window.setInterval(()=> {
      for (let key in ackQueue) {
        let msg = ackQueue[key]
        console.log('msg.uuid:', msg.uuid, 'msg.count:', msg.count)
        // 只重发3次
        if (msg.count >= 3) {
          delete(ackQueue[key])
          continue
        }

        //开始重发
        console.log(`重发消息[uuid=${msg.uuid},count=${msg.count}]:`)
        let msgBuffer = msgpack5().encode(msg)

        this.state.socket.emit('chat', msgBuffer, (msgUuid)=> {
          msgUuid = msgpack5().decode(msgUuid)
          delete(ackQueue[msgUuid])
        })
        msg.count ++
      }
    }, 30000)
  }

  // 发送消息到后台
  @action
  send2Server(cbf){
    // 发送的消息
    let sendMsg = this.state.msgContent
    // 空值判断
    if(!sendMsg){
      return false
    }

    // 待发送的消息格式
    let message = this.getSendMsgContent(sendMsg)
    // 压缩内容
    let buffer = msgpack5().encode(message);

    // 设置到状态机
    runInAction(() => {
      // 添加到已发送消息列表
      this.state.msgList.push({
        type: 'send',
        createAt: moment().format('MMM Do YY, h:mm'),
        avatar: 'assets/images/staffs/boy.png',
        readStatus: 'reading',
        content: sendMsg
      })
      // 清空输入框的值
      this.state.msgContent = ''
      // 触发服务器端chat聊天事件，把buffer内容传过去
      this.state.socket.emit('chat', buffer, (msgUuid)=> {
        msgUuid = msgpack5().decode(msgUuid)
        // 收到ack后从队列中删除
        delete(ackQueue[msgUuid])
        console.log(`收到服务器ack:${msgUuid}`)
      })
      // 回调函数
      if(cbf){
        cbf()
      }
    })
  }

  // 处理收到图片时的展示
  getReceiveContent(message){
    let msg = message.data, content = ''
    // 无内容判断
    if(!msg) return ''
    // 若内容含图片，则拼接img标签
    if(/^.*[^a][^b][^c]\.(?:png|jpg|bmp|gif|jpeg)$/g.test(msg)){
      content = `<img src='${msg}'/>`
    // 普通文本，则直接返回
    }else{
      content = msg
    }

    return {
      userId: message.senderUid,
      type: 'receive',
      createAt: moment().format('MMM Do YY, h:mm'),
      avatar: 'assets/images/staffs/girl.png',
      readStatus: 'reading',
      content
    }
  }

  // 处理返回消息
  handlerReceiveMsg(message){
    // 处理返回内容
    let recContent = this.getReceiveContent(message)
    // 设置到状态机
    runInAction(() => {
      // 添加到消息列表
      this.state.msgList.push(recContent)
      // 滚动到底部
      resetScroll()
    })
    return false
  }

  // 启动socket
  @action
  async initSocket(){
    let self = this
    // 初始化socketId
    let socket = io(`${Config.imSocketHost}`, {
    path: '/squadIM',
      query: {
        user_id: this.state.userInfo.user_id
      },
      transports: ['websocket', 'polling']
    })

    //监听事件
    socket.on('disconnect', () => {
      console.log('失去连接')
    })

    // 建立连接之后，给用户显示常见问题
    socket.on('connect', async function(data) {
      console.log('连接上服务器')
      // 常见问题
      let ques = await self.getCommonQuestions()
      // 设置到状态机
      runInAction(() => {
        self.state.msgList.push(ques)
        // 滚动到底部
        resetScroll()
        // 启动定时重发定时器
        self.scanToReSend()
      })
    })

    // 重连钩子
    socket.on('reconnecting', function (data) {
      console.log('....重连....')
    })

    // 接收服务端传来数据
    socket.on('res', function (message) {
      console.log('接收到服务器发来的消息')
      // 解压内容
      message = msgpack5().decode(message)
      // 处理返回消息
      self.handlerReceiveMsg(message)
      //ack回应服务器 - 发送消息uuid 作为ack内容
      socket.emit('ack', msgpack5().encode(message.uuid))
    })

    // 放到状态机
    runInAction(() => {
      this.state.socket = socket
    })
  }

  // 改变输入框的值
  setInputValue(val){
    // 设置到状态机
    runInAction(() => {
      this.state.msgContent = val
    })
  }

}

// 将组件实例化，这意味着组件将不能从别处实例化
const staffsMod = new StaffsMod()
// 向外暴露组件
export default staffsMod