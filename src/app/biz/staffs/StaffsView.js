import React, { PropTypes, Component } from 'react'
import { Link, IndexLink } from 'react-router'
import { inject, observer } from 'mobx-react'
import { Flex, List, WingBlank, WhiteSpace, InputItem, Button } from 'antd-mobile'
import { createForm } from 'rc-form'

import Util from 'util'
import Config from 'config/Config'
import Style from './StaffsLess.less'

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
    self.stores.send2Server(() => {
      // 需等待虚拟dom innerHTML完成之后
      setTimeout(() => {
        let lct = document.getElementById('msgListItem')
        lct.scrollTop  = lct.scrollHeight + 10000
      }, 50)
    })
  }

  // 改变输入框的值
  setInputValue(val){
    this.stores.setInputValue(val)
  }

  render() {
    return (
      <div className='staffs-wrap'>
        {/* 标题区 */}
        <div className='title-bar'>
          <Flex justify="start">
            <div className='staffs-head'>
              <img src='assets/images/staffs/staffs.png'/>
            </div>
            <div className='title-label'>{this.stores.state.staffsType}：</div>
            <div className='title-name'>{this.stores.state.staffsNickName}</div>
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
              <div className='send-btn-wrap'>
                <div className='send-btn' onClick={ e => this.sendMsg(e) }>发送</div>
              </div>
            </div>
          </Flex>
        </div>

      </div>
    )
  }
}

module.exports = StaffsView