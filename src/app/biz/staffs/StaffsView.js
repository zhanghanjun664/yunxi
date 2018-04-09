import React, { PropTypes, Component } from 'react'
import { Link, IndexLink } from 'react-router'
import { inject, observer } from 'mobx-react'
import { Flex, WingBlank, WhiteSpace, InputItem, Button } from 'antd-mobile'
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

  data() {
    this.stores.text()
  }

  data2() {
    this.stores.mockText()
  }

  // 获取tabBar样式
  getTabBarStyle(){
    let style = { position: 'fixed', width: '100%', bottom: '0' }
    if(Util.isIphoneX()) {
        style.bottom = 0;
        style.height = '2rem'
    }
    return style
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
            <div className='title-label'>平台客服：</div>
            <div className='title-name'>小福</div>
          </Flex>
        </div>

        {/* 消息块1 */}
        <div>
          {/* 时间显示区 */}
          <div className='chat-time-item'>
            <a className='chat-time-wrap'>
              <span className='chat-time'>3月29日 20:00</span>
            </a>
          </div>

          {/* 消息内容 */}
          <div className='mgt60 mgr80'>
            <Flex justify="between">
              <div className='avatar'><img src='assets/images/staffs/girl.png'/></div>
              <Flex.Item className='mgl0'>
                <div className='msg-box'>
                  <div className='msg-cont'>我是客服【小福】，请问有什么可以帮到您？</div>
                </div>
              </Flex.Item>
            </Flex>
          </div>
        {/* 已读、未读 */}
        <div className='readed txt-right'>已读</div>
        </div>

        {/* 消息块2 */}
        <div>
          {/* 时间显示区 */}
          <div className='chat-time-item'>
            <a className='chat-time-wrap'>
              <span className='chat-time'>昨天</span>
            </a>
          </div>

          {/* 消息内容 */}
          <div className='mgt60 mgr80'>
            <Flex justify="between">
              <div className='avatar'><img src='assets/images/staffs/girl.png'/></div>
              <Flex.Item className='mgl0'>
                <div className='msg-box'>
                  <div className='msg-cont'>
                    <div>常见问题：</div>
                    <div className='msg-link'>
                      <ul>
                        <li><a href='about:blank;'>如何支付定金？</a></li>
                        <li><a href='about:blank;'>如何完成尾款支付？</a></li>
                        <li><a href='about:blank;'>预约试驾需要</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Flex.Item>
            </Flex>
          </div>
          {/* 已读、未读 */}
          <div className='readed txt-right'>已读</div>
        </div>

        {/* 消息块3 */}
        <div>
          {/* 时间显示区 */}
          <div className='chat-time-item'>
            <a className='chat-time-wrap'>
              <span className='chat-time'>18:30</span>
            </a>
          </div>

          {/* 消息内容 */}
          <div className='mgt60 mgl80'>
            <Flex justify="between">
              <Flex.Item className='blue-bg wid510'>
                <div className='msg-cont'>
                  请问经销商报价真实吗？到店是否有现车？
                </div>
              </Flex.Item>
              <div className='mgl0'>
                <div className='avatar'><img src='assets/images/staffs/boy.png'/></div>
              </div>
            </Flex>
          </div>

          {/* 已读、未读 */}
          <div className='reading txt-left'>未读</div>
        </div>

        {/* 发送按钮区 */}
        <div className='send-bar' style={this.getTabBarStyle()}>
          <Flex justify="between">
            <Flex.Item className='send-input-wid'>
              <InputItem type='text' className='send-input' placeholder="请输入您的问题" clear moneyKeyboardAlign="left"></InputItem>
            </Flex.Item>
            <div className='mgl20'>
              <div className='send-btn-wrap'>
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