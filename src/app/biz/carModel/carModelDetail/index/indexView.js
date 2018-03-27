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

import { List } from 'antd-mobile';

import Serv from './indexServ';

/**
 * 视图层，功能逻辑，html代码将存放于此
 */
//inject从props中获取相应的数据


class SelectBox extends Component {
	render() {
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
}

@inject("productDetailIndex")
@observer
class NearbyInfo extends Component {
	constructor(props) {
		super(props)
		this.stores = this.props.productDetailIndex
	}
	componentDidMount() {
		this.stores.getNearbyInfo({
			areaCode: "城市编码",
			itemCode: "车型编号"
		})
		
	}
	toUrl(url){
		window.app.routerGoTo(url)
	}
	render() {
		const data = this.stores.state.nearbyInfo;
		return (
			<div className='nearbyInfo box_shadow'>
				<div className='nearbyInfo1'>附近共有 <span className='color_orange'>{data.dealerNum}</span> 家特约经销商</div>
				<div className='nearbyInfo2' onClick={()=>this.toUrl('/dealerQuotation')}>
					<div>经销商报价： <span className='color_orange'>￥{data.itemFloorPrice}万</span> 起</div>
					<div className='color_gray'>前往查看 <span className='iconfont icon-right'></span></div>
				</div>

			</div>
		)
	}
}


class CarIntroduce extends Component {
	render() {
		return (
			<div className='productDetailIntroduce box_shadow' ref='pdi_box'>
				<div className='pdi_1'>
					<p>狂野的心</p>
					<p>动不动就大发雷霆</p>
				</div>

				<div className='pdi_2'>
					<img src="assets/images/productDetail/baseInfo.png" />
				</div>

				<div className='pdi_3'>整个车内律动着立体创造性的动感线条，运动感十足的三幅方向盘与个性四射的操控台相呼应，明快的银色装饰条增添了强烈的摇滚金属感。</div>

				<div className='pdi_4'>
					<img src="assets/images/productDetail/baseInfo.png" />
					<div className='pdi_4box'>
						<div className='pdi_space'></div>
						<div className='pdi_4item1'>
							<p className='pdi_4item_top'>200mm</p>
							<p className='pdi_4item_bottom'>超高离地间隙</p>
						</div>
						<div className='pdi_space2'></div>
						<div className='pdi_4item2'>
							<p>550mm</p>
							<p>超大涉水深度</p>
						</div>
						<div className='pdi_space2'></div>
						<div className='pdi_4item3'>
							<p>双层开启</p>
							<p>电动天窗</p>
						</div>
						<div className='pdi_space'></div>

					</div>

				</div>

				<div className='pdi_5'>凌厉电眼，狂放的大尺寸镀铬进气格栅，趣野必备的外挂式备胎，特别设计的侧开门后备厢也干净利落，无不表露出硬派作风和不驯天性，它同样挑剔一位有趣冒险精神的车主拍档。</div>

			</div>
		)
	}
}




@inject("productDetailIndex")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class ProductDetailIndex extends Component {
	constructor(props, context) {
		super(props, context)
		this.stores = this.props.productDetailIndex;
	}
	handleScroll(e) {
		let scrollTop = Util.getScrollTop()
		let pdi_top = this.refs.productDetailIntroduce.refs.pdi_box.offsetTop
		let pdConfig_top = this.refs.productConfig.offsetTop
		let pdt_top = this.refs.test.offsetTop - 1000
		if (scrollTop < pdi_top) {
			if (scrollTop > window.outerHeight) {
				this.stores.handleScroll(1)
			} else {
				this.stores.handleScroll(0)
			}
		} else if (scrollTop > pdt_top) {
			this.stores.handleScroll(3)
		} else {
			this.stores.handleScroll(2)
		}


		// console.log(scrollTop, pdi_top, pdConfig_top, pdt_top)
	}
	
	changeNavTab(type) {
		let pdi_top = this.refs.productDetailIntroduce.refs.pdi_box.offsetTop - 83
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
	toUrl(url){
		window.app.routerGoTo(url)
	}

	render() {
		const  { activityList }  =  this.stores.state 
		return (
			<div className="productDetail">
				<div className='pd_nav' className={this.stores.state.navTab == 0 ? 'hidden' : 'pd_nav'}>
					<div className={this.stores.state.navTab == 1 ? 'active' : ''} onClick={this.changeNavTab.bind(this, 1)}>商品介绍</div>
					<div className={this.stores.state.navTab == 2 ? 'active' : ''} onClick={this.changeNavTab.bind(this, 2)}>详细配置</div>
					<div className={this.stores.state.navTab == 3 ? 'active' : ''} onClick={this.changeNavTab.bind(this, 3)}>活动信息</div>
				</div>
				<Baseinfo />
				<SelectBox />
				<NearbyInfo />
				<div className='component_pdc'>
					<div className='component_pdc_title'>评论</div>
					<Comment />
				</div>
				<CarIntroduce ref='productDetailIntroduce' />
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
