/**
 * Created by zhang.hanjun 
 */
import React, { PropTypes, Component } from 'react'
import { inject, observer } from 'mobx-react';
import Util from 'util';
import './MyCouponLess.less';
import { Tabs } from 'antd-mobile';
import CouponList from './CouponList';

@inject("myCoupon")
@observer
class MyCoupon extends Component {
	constructor(props, context) {
		super(props, context)
		this.stores = this.props.myCoupon;
		this.tabs = [
			{ title: <div className='changAnt_tabs'>待使用</div> },
			{ title: <div className='changAnt_tabs'>已使用</div> },
			{ title: <div className='changAnt_tabs'>已过期</div> },
		];
	}
	componentDidMount() {
		this.stores.setStyle({
      height: Util.getScrollHeight(['am-tabs-tab-bar-wrap', 'mc_footer']),
		})
	}

	//tab切换
	onTabChange = (tab, index) => {
		// this.stores.changeTab(index);
		console.log(tab, index)
	}
  

	render() {
		
		return (
			<div className="myCoupon_page">
        <Tabs tabs={this.tabs}
							initialPage={0}
							onChange={this.onTabChange}
							animated={false}
						>
							<div>
								<ul className='itemBox'>
                  
                  
								<CouponList fetchData={this.stores.getCouponList}
									style={this.stores.state.style}
									status={1} />

								</ul>
							</div>

              <div>
								<ul className=''>
								<CouponList fetchData={this.stores.getCouponList}
									style={this.stores.state.style}
									status={3} />

								</ul>
							</div>

              <div>
								<ul className=''>
								<CouponList fetchData={this.stores.getCouponList}
									style={this.stores.state.style}
									status={4} />

								</ul>
							</div>
							
						</Tabs>

        <div className='mc_footer' onClick={()=>{window.app.routerGoTo('/activity')}}>查看更多活动>></div>



			</div>
		);
	}
}

module.exports = MyCoupon;
