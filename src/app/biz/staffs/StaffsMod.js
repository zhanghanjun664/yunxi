import React, { PropTypes, Component } from 'react'
import { observable, action, runInAction, useStrict, autorun } from 'mobx'

import Config from 'config/Config'
import Serv from './StaffsServ'

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
    staffsType: '平台客服',
    staffsNickName: '小福',
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
  }

  // 发送消息到后台
  @action
  send2Server(cbf){
    let self = this
    // 发送的消息
    let sendMsg = this.state.msgContent
    // 空值判断
    if(!sendMsg){
      return false
    }

    // 设置到状态机
    runInAction(() => {
      // 添加到已发送消息列表
      self.state.msgList.push({
        type: 'send',
        createAt: '18:30',
        avatar: 'assets/images/staffs/boy.png',
        readStatus: 'reading',
        content: sendMsg
      })
      // 情况输入框的值
      self.state.msgContent = ''
      cbf()
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