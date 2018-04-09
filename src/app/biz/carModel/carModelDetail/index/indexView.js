/**
 * Created by zhang.hanjun 
 */
import React, { PropTypes, Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { inject, observer } from 'mobx-react';
import { Toast } from 'antd-mobile';
import Util from 'util';
import './IndexLess.less';
import Baseinfo from 'biz/carModel/carModelDetail/baseInfo/BaseInfoView';
import Comment from 'biz/carModel/carModelDetail/comment/CommentView';
import ProductConfig from 'biz/carModel/carModelDetail/productConfig/ProductConfigView';
import ActivityList from 'biz/carModel/carModelDetail/activityList/ActivityListView';
import CarTestList from 'biz/carModel/carModelDetail/activityList/CarTestListView';



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
		// this.stores.itemId = this.props.location.query.itemId ; 
	}
	handleScroll(e) {
		let scrollTop = Util.getScrollTop()
		let pdi_top = this.refs.pdi_box.offsetTop
		let pdConfig_top = this.refs.productConfig.offsetTop
		let pdt_top = this.refs.test.offsetTop - 1000
		if (scrollTop < pdi_top) {
			// document.documentElement.clientHeight 
			if (scrollTop > document.body.clientHeight||scrollTop>pdi_top) {
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
		let skusId = this.props.location.query.skusId
		if(skusId){
			this.stores.setSkusId(skusId)
		}
		// window.addEventListener('scroll', this.handleScroll.bind(this));
		this.regScroll(this.handleScroll.bind(this));
	}
	componentDidMount() {
		this.stores.setItemId(this.props.location.query.itemId)
		this.getDate()
	}
	getDate = ()=>{
		let { itemId } = this.stores.state
		// 基本信息
		this.stores.getBaseInfo({
			itemId: itemId
		})

		// 活动
		this.stores.getActivityList({
			pageNum: 1,
			pageSize: 3
		})

		// 附近经销商
		this.stores.getNearbyInfo({
			areaCode: "1",
			itemId: itemId,
			areaType: 2
		})

		// 评论
		this.stores.getCommentData({
			itemCode: itemId,
			pageNum: 1,
			pageSize: 3
		})

		// 参数(详细信息)
		this.stores.getCarConfig({
			itemId: itemId
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
		const { baseInfo, imgDetail, switchSpec, skusId, itemId } = this.stores.state
		return (
			<div>
				<ul className='pdSelectBox box_shadow'>
					<li className='pdSelectBox_item' onClick={this.toUrl.bind(this, '/carModelList')}>
						<div>已选车型：</div>
						<div className='pdSelectBox_item2'>
							<span>{baseInfo.name}</span>
						</div>
						<div className='iconfont icon-right'></div>
					</li>
					<li className='pdSelectBox_item' onClick={this.toUrl.bind(this, '/switchSpec?skusId='+skusId+'&itemId='+itemId)}>
						<div>已选颜色：</div>
						<div className='pdSelectBox_item2'>
							<div className='pdSelectBox_color'>
								<span className='pdSelectCircle'></span>
								{
									imgDetail.data.props&&imgDetail.data.props.map((item, index)=>{
										if(index == 0){
											return <span key={index}>{item.value}</span>
										}else{
											return (
												<span key={index}> + {item.value}</span>
											)

										}
									})
								}
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
				<div className='nearbyInfo2' onClick={() => this.toUrl('/dealerQuotation?itemId='+this.stores.state.itemId)}>
					<div>经销商报价： <span className='color_orange'>￥{data.itemFloorPrice&&Util.changeMoney(data.itemFloorPrice)}万</span> 起</div>
					<div className='color_gray'>前往查看 <span className='iconfont icon-right'></span></div>
				</div>

			</div>
		)
	}
	renderCarIntroduce = (data) => {
		return (
			<div className='productDetailIntroduce box_shadow' ref='pdi_box'>
			{
					//此处是车型的详情介绍
					data.introduces&&data.introduces.map((val,i)=>{

						return(
							<div key={`introduce${i}`} dangerouslySetInnerHTML={{__html:val}}></div>
						)
					})
				}
				{/* <div>
					<img src="assets/images/carModel/pd_detail1.png" style={{ width: '100%' }} />
					<p>富s文本区域</p>
					<img src="assets/images/carModel/pd_detail2.png" style={{ width: '100%' }} />
				</div> */}
			</div>
		)
	}
	noOpen(){
		Toast.info('此功能暂未开放')
	}

	render() {
		const { nearbyInfo, navTab, itemId, carConfig } = this.stores.state
		return (
			<div className="productDetail">
				<div className={this.stores.state.navTab == 0 ? 'hidden' : 'pd_nav'}>
					{
						this.state.navTab.map((item, index)=>{
							return (
								<div className={this.stores.state.navTab == item.tabIndex ? 'active' : ''} onClick={this.changeNavTab.bind(this, item.tabIndex)} key={index}>{item.title}</div>
							)
						})
					}
				</div>
				<Baseinfo />
				{this.renderSelectBox()}
				{this.renderNearbyInfo(nearbyInfo)}

				{/* 2期 */}
				{/* <div className='component_pdc'>
					<div className='component_pdc_title'>评论</div>
					<Comment />
				</div> */}
				{this.renderCarIntroduce(carConfig)}
				<div className='component_pdConfig' ref='productConfig'>
					<div className='component_pdConfig_title'>参数配置</div>
					<ProductConfig />
				</div>

				{/* 2期 */}
				{/* <div className='component_test box_shadow'>
					<div className='component_test_title'>
						<span className='iconfont icon-chexingceping'></span>
						<span>车型测评</span>
					</div>
					<CarTestList />
				</div> */}

				<div className='component_test box_shadow' ref='test'>
					<div className='component_test_title'>
						<span className='iconfont icon-cuxiaohuodong'></span>
						<span>促销活动</span>
					</div>
					<ActivityList />
				</div>

				<div className='pd_footer'>
					<div className='pd_footerItem1' onClick={this.noOpen.bind(this)}>
						<img src="assets/images/productDetail/icon_jisuanqi.png" />
						<p>立即<br />下单</p>
					</div>
					<div className='pd_footerItem1' onClick={this.noOpen.bind(this)}>
						<img src="assets/images/productDetail/icon_kefu.png" />
						<p>在线<br />咨询</p>
					</div>
					<div className='pd_footerItem3' onClick={this.toUrl.bind(this, '/askprice?itemId='+itemId)}>询底价</div>
					<div className='pd_footerItem4' onClick={this.toUrl.bind(this, '/testdrive?itemId='+itemId)}>预约试驾</div>
				</div>


			</div>
		);
	}
}

module.exports = ProductDetailIndex;
