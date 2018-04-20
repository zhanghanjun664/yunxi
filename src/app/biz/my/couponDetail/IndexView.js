/*
 * 微信分享
 * @author zhang.hanjun
 * @time 2018-4-19
 * */
import React, { PropTypes, Component } from 'react'
import { inject, observer } from 'mobx-react';
import Util from 'util';
import './IndexLess.less';
import { Tabs, Toast } from 'antd-mobile';


@inject("myCoupon")
@observer
class CouponDetail extends Component {
	constructor(props, context) {
		super(props, context)
		this.stores = this.props.myCoupon;
	}
	componentDidMount() {
	}

	render() {
		
		return (
			<div className="couponDetail_page">
        <div>
          <div className='item couponType_1'>
            <div className='itemBox box_shadow'>
              <div className='item_money'>
                <p>{123}元</p>
                <p>满{123}元使用优惠券</p>
              </div>

              <div className='item_info'>
                <div></div>
                <p>使用范围：{1213}</p>
                <p>过期时间:{1212&&Util.formatDate('2018-12-12 12:12:11')}</p>
              </div>

            </div>
          </div>

        </div>

        <div className='detailInfo'>
          <div className='title'>
            <div>优惠券信息</div>
            <div className='statusBox'>
              <div className='noUse'>状态：待使用</div>
              <div className='expired hide'>状态：已过期</div>
            </div>

          </div>

          <div className='desc'>
            <div>
              <div>类<span className='fl_right'>型：</span></div>
              <div>平台券</div>
            </div>

            <div>
              <div>试用商品：</div>
              <div>福克斯</div>
            </div>

            <div>
              <div>适用区域：</div>
              <div>华南区</div>
            </div>

          </div>

          <div className='qrCodeBox'>
            <img src="assets/images/activity/header.png" />
            <p>到店后请出示此二维码进行验证</p>
          </div>

        </div>

			</div>
		);
	}
}

module.exports = CouponDetail;
