import React, { PropTypes, Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Flex, Toast, Carousel, } from 'antd-mobile';
import './accountManageLess.less';

class AccountManage extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="accountManage-page">
        <div>
          <ul className='am_box'>
            <li className='am_item'>
              <div className='am_item_key'>头像</div>
              <div className='am_item_value'><img src="assets/images/activity/header.png" /></div>
              <div className='iconfont icon-right'></div>
            </li>

            <li className='am_item'>
              <div className='am_item_key'>微信昵称</div>
              <div className='am_item_value'>德玛西亚</div>
              <div className='iconfont icon-right'></div>
            </li>
            <li className='am_item'>
              <div className='am_item_key'>账号密码</div>
              <div className='am_item_value'>未设置</div>
              <div className='iconfont icon-right'></div>
            </li>
            <li className='am_item'>
              <div className='am_item_key'>手机号</div>
              <div className='am_item_value'>136****4521</div>
              <div className='iconfont icon-right'></div>
            </li>

          </ul>

        </div>

        <div className='am_logout'>退出当前账号</div>

      </div>
    )
  }
}

module.exports = AccountManage;