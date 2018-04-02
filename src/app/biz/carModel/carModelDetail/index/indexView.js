import React, { PropTypes, Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { inject, observer } from 'mobx-react';
import Config from 'config/Config';
import Util from 'util';
import './indexLess.less';
import Baseinfo from 'biz/carModel/carModelDetail/baseInfo/baseInfoView';
import Comment from 'biz/carModel/carModelDetail/comment/commentView';
import ProductConfig from 'biz/carModel/carModelDetail/productConfig/productConfigView';
import Test from 'biz/carModel/carModelDetail/test/testView';
import cx from 'classnames';

import { List } from 'antd-mobile';

import Serv from './indexServ';

@inject("productDetailIndex")
@observer
class ProductDetailIndex extends Component {
	constructor(props, context) {
		super(props, context)
		this.stores = this.props.productDetailIndex;
		this.state = {
			navTab: [
				{title: '商品介绍', tabIndex: 1},
				{title: '详细配置', tabIndex: 2},
				{title: '活动信息', tabIndex: 3},
			]
		}
	}
	handleScroll(e) {
		let scrollTop = Util.getScrollTop()
		let pdi_top = this.refs.pdi_box.offsetTop
		let pdConfig_top = this.refs.productConfig.offsetTop
		let pdt_top = this.refs.test.offsetTop - 1000
		if (scrollTop < pdi_top) {
			// document.documentElement.clientHeight 
			if (scrollTop > document.body.clientHeight) {
				this.stores.handleScroll(1)
			} else {
				this.stores.handleScroll(0)
			}
		} else if (scrollTop > pdt_top) {
			this.stores.handleScroll(3)
		} else {
			this.stores.handleScroll(2)
		}

	}

	changeNavTab(type) {
		let pdi_top = this.refs.pdi_box.offsetTop - 83
		let pdConfig_top = this.refs.productConfig.offsetTop - 83
		let pdt_top = this.refs.test.offsetTop - 83
		let arr = [pdi_top, pdConfig_top, pdt_top]
		window.scrollTo(0, arr[type - 1]);
	}
	componentWillMount() {
		// window.addEventListener('scroll', this.handleScroll.bind(this));
		this.regScroll(this.handleScroll.bind(this));
	}
	componentDidMount() {
		// let { getBaseInfo, getActivityList } = this.stores
		this.stores.getBaseInfo({ itemCode: 'test' })
		this.stores.getActivityList({
			pageNum: "当前页面",
			pageSize: "每页记录数"
		})
		this.stores.getNearbyInfo({
			areaCode: "城市编码",
			itemCode: "车型编号"
		})
	}
	componentWillUnmount() {
		window.onscroll = '';
	}
	regScroll(myHandler) {
		if (window.onscroll === null) {
			window.onscroll = myHandler
		} else if (typeof window.onscroll === 'function') {
			var oldHandler = window.onscroll;
			window.onscroll = function () {
				myHandler();
				oldHandler();
			}
		}
	}
	toUrl(url) {
		window.app.routerGoTo(url)
	}
	renderSelectBox = () => {
		return (
			<div>
				<ul className='pdSelectBox box_shadow'>
					<li className='pdSelectBox_item'>
						<div>已选车型：</div>
						<div className='pdSelectBox_item2'>
							<span className='hidden'>未选择</span>
							<span>1.8T/紧凑型/自动变速箱</span>
						</div>
						<div className='iconfont icon-right'></div>
					</li>
					<li className='pdSelectBox_item'>
						<div>已选颜色：</div>
						<div className='pdSelectBox_item2'>
							<span className='hidden'>未选择</span>
							<div className='pdSelectBox_color'>
								<span className='pdSelectCircle'></span>
								<span>峡谷棕</span>
							</div>

						</div>
						<div className='iconfont icon-right'></div>
					</li>

				</ul>
			</div>
		)
	}
	renderNearbyInfo = (data) => {
		return (
			<div className='nearbyInfo box_shadow' ref='productDetailIntroduce' >
				<div className='nearbyInfo1'>附近共有 <span className='color_orange'>{data.dealerNum}</span> 家特约经销商</div>
				<div className='nearbyInfo2' onClick={() => this.toUrl('/dealerQuotation')}>
					<div>经销商报价： <span className='color_orange'>￥{data.itemFloorPrice}万</span> 起</div>
					<div className='color_gray'>前往查看 <span className='iconfont icon-right'></span></div>
				</div>

			</div>
		)
	}
	renderCarIntroduce = (data) => {
		return (
			<div className='productDetailIntroduce box_shadow' ref='pdi_box'>
				<div>
					<img src="assets/images/carModel/pd_detail1.png" style={{ width: '100%' }} />
					<p>富s文本区域</p>
					<img src="assets/images/carModel/pd_detail2.png" style={{ width: '100%' }} />
				</div>
			</div>
		)
	}

	render() {
		const { activityList, nearbyInfo, navTab } = this.stores.state
		return (
			<div className="productDetail">
				<div className={this.stores.state.navTab == 0 ? 'hidden' : 'pd_nav'}>
					{
						this.state.navTab.map((item, index)=>{
							return (
								<div className={this.stores.state.navTab == item.tabIndex ? 'active' : ''} onClick={this.changeNavTab.bind(this, item.tabIndex)}>{item.title}</div>
							)
						})
					}
				</div>
				<Baseinfo />
				{this.renderSelectBox()}
				{this.renderNearbyInfo(nearbyInfo)}
				<div className='component_pdc'>
					<div className='component_pdc_title'>评论</div>
					<Comment />
				</div>
				{this.renderCarIntroduce()}
				<div className='component_pdConfig' ref='productConfig'>
					<div className='component_pdConfig_title'>参数配置</div>
					<ProductConfig />
				</div>

				<div className='component_test box_shadow'>
					<div className='component_test_title'>
						<span className='iconfont icon-chexingceping'></span>
						<span>车型测评</span>
					</div>
					<Test data={activityList} />
				</div>

				<div className='component_test box_shadow' ref='test'>
					<div className='component_test_title'>
						<span className='iconfont icon-cuxiaohuodong'></span>
						<span>促销活动</span>
					</div>
					<Test data={activityList} />
				</div>

				<div className='pd_footer'>
					<div className='pd_footerItem1'>
						<img src="assets/images/productDetail/icon_jisuanqi.png" />
						<p>立即<br />下单</p>
					</div>
					<div className='pd_footerItem1'>
						<img src="assets/images/productDetail/icon_kefu.png" />
						<p>在线<br />咨询</p>
					</div>
					<div className='pd_footerItem3' onClick={this.toUrl.bind(this, '/askprice')}>询底价</div>
					<div className='pd_footerItem4' onClick={this.toUrl.bind(this, '/testdrive')}>预约试驾</div>
				</div>


			</div>
		);
	}
}

module.exports = ProductDetailIndex;
