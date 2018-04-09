/**
 * Created by zhang.hanjun 
 */
import React, { PropTypes, Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Flex, Toast, Carousel, } from 'antd-mobile';
import './AccountManageLess.less';

@inject('personalCenter')
@observer
class AccountManage extends Component {
  constructor(props, context) {
    super(props, context);
    this.stores = this.props.personalCenter
    this.state = {
      avatarSrc: 'assets/images/activity/header.png'
    }
  }
  componentDidMount(){
    this.stores.getMemberInfo()
  }
  toUrl(url){
    window.app.routerGoTo(url)
  }
  noOpen(){
    Toast.info('此功能暂未开放')
  }
  hidetelNum(num){
    if(num){
      let num = String(num)
      return num.slice(0,3) + "****" + num.slice(-4,0)
    }
    
  }

  chooseImg(e) {
    e.preventDefault();
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        that.setState({
          avatarSrc: localIds[0]
        })
      }
      });
  }

  render() {
    const info = this.stores.state.info
    return (
      <div className="accountManage-page">
        <div>
          <ul className='am_box'>
            <li className='am_item'>
              <div className='am_item_key'>头像</div>
              <div className='am_item_value'><img src={info.imgUrl} /></div>
              <div className='iconfont icon-right'></div>
            </li>

            <li className='am_item'>
              <div className='am_item_key'>微信昵称</div>
              <div className='am_item_value'>{info.nickName}</div>
              <div className='iconfont icon-right'></div>
            </li>
            <li className='am_item'>
              <div className='am_item_key'>账号密码</div>
              {
                info.password?
                <div className='am_item_value'>已设置</div>
                :
                <div className='am_item_value' onClick={this.toUrl.bind(this, '/myComplate')}>未设置</div>
              }
              <div className='iconfont icon-right'></div>
            </li>
            <li className='am_item'>
              <div className='am_item_key'>手机号</div>
              <div className='am_item_value'>{info.mobile?this.hidetelNum(info.mobile):'-'}</div>
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