import React, { PropTypes, Component } from 'react'
import { observable, action, runInAction, useStrict, autorun } from 'mobx'

import Config from 'config/Config'
import Serv from './StaffsServ'
import { get, cloneDeep } from 'lodash'
import Util  from 'util'

/**
 * mod层-业务逻辑，数据逻辑应该存储于此
 */

//定义为严格模式
useStrict(true)

// 模型对象
class StaffsMod {
  // 将数据设为被观察者，这意味着数据将成为公共数据
  @observable state = {
    list: [],
    // 客服信息
    staffInfo: {
      // 客服ID
      staffId: '',
      // 客服类型
      staffType: '平台客服',
      // 客服昵称
      staffName: '小福',
    },

    // 用户信息
    userInfo: {
      // 用户ID
      user_id: ''
    },

    // 消息输入框的值
    msgContent: '',
    // 消息列表
    msgList: [
      {
        type: 'receive',
        createAt: '3月29日 20:00',
        avatar: 'assets/images/staffs/girl.png',
        readStatus: 'readed',
        content: '我是客服【小福】，请问有什么可以帮到您？'
      },
      {
        type: 'receive',
        createAt: '昨天',
        avatar: 'assets/images/staffs/girl.png',
        readStatus: 'readed',
        content: `
          <div>常见问题：</div>
          <div class='msg-link'>
            <ul>
              <li><a href='about:blank;'>如何支付定金？</a></li>
              <li><a href='about:blank;'>如何完成尾款支付？</a></li>
              <li><a href='about:blank;'>预约试驾需要</a></li>
            </ul>
          </div>
        `
      },
      {
        type: 'send',
        createAt: '18:30',
        avatar: 'assets/images/staffs/boy.png',
        readStatus: 'reading',
        content: '请问经销商报价真实吗？到店是否有现车？'
      }
    ],
    // socket连接对象
    socket: null,
  }

  // 获取空闲的客服ID - 平台客服
  @action
  async getStaffId(){
    let random = Math.ceil(Math.random() * 10000)
    // 用户信息
    let user_id = 'c_shaowin_' + random

    // 默认的初始客服信息
    let defStaffInfo = cloneDeep(this.state.staffInfo)
    // 返回的客服信息
    let staffRes  =  await Serv.getStaffId(user_id)

    // 设置到状态机
    runInAction(() => {
      this.state.staffInfo = Object.assign(defStaffInfo, staffRes.payload)
      this.state.userInfo = { user_id }
      // 初始化socket
      this.initSocket()
    })
  }

  // 获取发送的消息内容
  @action
  getSendMsgContent(sendMsg){
    // 消息协议,通讯格式
    let r = Math.ceil(Math.random() * 100000)
    let message = {
      uuid: this.state.userInfo.user_id + Date.now() + r, //uuid
      type: 'txt',
      data: sendMsg,
      targetUid: this.state.staffInfo.staffId
    }
    return message
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
        createAt: '18:30',
        avatar: 'assets/images/staffs/boy.png',
        readStatus: 'reading',
        content: sendMsg
      })
      // 情况输入框的值
      this.state.msgContent = ''
      // 发送事件
      this.state.socket.emit('chat', buffer, (msgUuid)=> {
        msgUuid = msgpack5().decode(msgUuid);
        console.log(`收到服务器ack:${msgUuid}`)
      })
      cbf()
    })
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

    socket.on('connect', function (data) {
      console.log('连接成功11111')
    })

    socket.on('reconnecting', function (data) {
      console.log('....重连....')
    })

    // 接收服务端传来数据
    socket.on('res', function (message) {
      console.log('接收到服务器发来的消息')
      message = msgpack5().decode(message); // 解压内容
      console.log('message:', message)

      runInAction(() => {
        // 添加到消息列表
        self.state.msgList.push({
          userId: message.senderUid,
          type: 'receive',
          createAt: Date.now(),
          avatar: 'assets/images/staffs/girl.png',
          readStatus: 'reading',
          content: message.data
        })
        // 需等待虚拟dom innerHTML完成之后
        setTimeout(() => {
          let lct = document.getElementById('msgListItem')
          lct.scrollTop  = lct.scrollHeight + 10000
        }, 50)
      })
      //ack回应服务器
      socket.emit('ack', msgpack5().encode(message.uuid)) // 发送消息uuid 作为ack内容
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