import React, { PropTypes, Component } from 'react'
import { Link, IndexLink } from 'react-router'
import { inject, observer } from 'mobx-react'
import { Flex, List, WingBlank, WhiteSpace, InputItem, Button } from 'antd-mobile'
import { createForm } from 'rc-form'

import Util from 'util'
import Config from 'config/Config'
import Style from './StaffsLess.less'
// 滚动条滚动到底部
import { resetScroll } from './ChatSetting'


/**
 * 视图层，功能逻辑，html代码将存放于此
 */
// inject从props中获取相应的数据
@inject("staffs")
// 将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class StaffsView extends Component {
  constructor(props, context) {
    super(props, context)
    this.stores = this.props.staffs
  }

  // 获取tabBar样式
  getTabBarStyle(){
    let style = { position: 'fixed', width: '100%', bottom: '0' }
    // if(Util.isIphoneX()) {
    //     style.bottom = 0;
    //     style.height = '2rem'
    // }
    return style
  }

  // 发送消息
  sendMsg(e){
    let self = this
    // 发送消息完成，消息列表滚动到底部
    self.stores.send2Server(() => {
      // 需等待虚拟dom innerHTML完成之后
      resetScroll()
    })
  }

  // 改变输入框的值
  setInputValue(val){
    this.stores.setInputValue(val)
  }

  // 组件载入完成
  componentDidMount(){
    // 地址栏传的经销商ID
    let dealerId = window.app.router.location.query.dealerId

    // 地址栏没有传经销商ID，则获取平台客服
    if(!dealerId){
      // 获取空闲客服ID - 平台
      this.stores.getStaffId()

    // 若传了经销商ID，则获取经销商客服
    }else{
      // 获取经销商客服ID - 经销商
      this.stores.getStaffId(dealerId)
    }

    // 监听键盘Enter键输入 - 触发发送
    this.onKeyBoardListener()
  }

  // 键盘监听
  onKeyBoardListener(){
    let self  = this
    // 监听键盘释放事件
    $(document).on({
      keyup: function(event){
        switch(event.keyCode) { 
          case 13:
            self.sendMsg(1)
          return
        } 
      }
    })
  }

  // 组件将被卸载 - 解除绑定的键盘事件 
  componentWillUnmount(){
    $(document).off('keyup')
  }

  render() {
    let staffInfo = this.stores.state.staffInfo
    return (
      <div className='staffs-wrap'>
        {/* 标题区 */}
        <div className='title-bar'>
          <Flex justify="start">
            <div className='staffs-head'>
              <img src='assets/images/staffs/staffs.png'/>
            </div>
            <div className='title-label'>{staffInfo.staffType}：</div>
            <div className='title-name'>{staffInfo.nickname}</div>
          </Flex>
        </div>

        <div id='msgListItem'>
          {
            this.stores.state.msgList && this.stores.state.msgList.map((msg, i) => {
              return <div key={`msg_${i}`}>
              {
                'receive' === '' + msg.type && (
                  <div>
                    {/* 时间显示区 */}
                    <div className='chat-time-item'>
                      <a className='chat-time-wrap'>
                        <span className='chat-time'>{msg.createAt}</span>
                      </a>
                    </div>

                    {/* 消息内容 */}
                    <div className='mgt60 mgr80'>
                      <Flex justify="between">
                        <div className='avatar'><img src={msg.avatar}/></div>
                        <Flex.Item className='mgl0'>
                          <div className='msg-box'>
                            <div className='msg-cont' dangerouslySetInnerHTML={{__html: msg.content}}></div>
                          </div>
                        </Flex.Item>
                      </Flex>
                    </div>
                    {/* 已读、未读 */}
                    <div className={`${msg.readStatus} txt-right`}>{'readed' === '' + msg.readStatus? '已读': '未读'}</div>
                  </div>
                )
              }
              {
                'send' === '' + msg.type && (
                  <div>
                    {/* 时间显示区 */}
                    <div className='chat-time-item'>
                      <a className='chat-time-wrap'>
                        <span className='chat-time'>{msg.createAt}</span>
                      </a>
                    </div>

                    {/* 消息内容 */}
                    <div className='mgt60 mgl80'>
                      <Flex justify="between">
                        <Flex.Item className='blue-bg wid510'>
                          <div className='msg-cont' dangerouslySetInnerHTML={{__html: msg.content}}></div>
                        </Flex.Item>
                        <div className='mgl0'>
                          <div className='avatar'><img src={msg.avatar}/></div>
                        </div>
                      </Flex>
                    </div>

                    {/* 已读、未读 */}
                    <div className={`${msg.readStatus} txt-left`}>{'readed' === '' + msg.readStatus? '已读': '未读'}</div>
                  </div>
                )
              }
              </div>
            })
          }
        </div>

        {/* 发送按钮区 */}
        <div className='send-bar' style={this.getTabBarStyle()}>
          <Flex justify="between">
            <Flex.Item className='send-input-wid'>
              <List>
                <InputItem type='text' value={this.stores.state.msgContent} onChange={this.setInputValue.bind(this) } className='send-input' placeholder="请输入您的问题" clear moneyKeyboardAlign="left"></InputItem>
              </List>
            </Flex.Item>
            <div className='mgl20'>
              <div className='send-btn-wrap' onClick={ e => this.sendMsg(e) }>
                <div className='send-btn'>发送</div>
              </div>
            </div>
          </Flex>
        </div>

      </div>
    )
  }
}

module.exports = StaffsView