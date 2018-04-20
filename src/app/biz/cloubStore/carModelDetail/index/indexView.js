import React, { PropTypes, Component } from 'react' ;
import { Link, IndexLink } from 'react-router' ;
import { inject, observer } from 'mobx-react';
import Config from 'config/Config';
import Util from 'util';
import './indexLess.less';
import Baseinfo from '../baseInfo/baseInfoView';
import Comment from '../comment/commentView';
import ProductConfig from '../productConfig/productConfigView';
import Test from '../test/testView';

import {Stars,StarsList} from '../../index/global/stars/StarsView' ;

import { List , Toast } from 'antd-mobile';


/**
 * 视图层，功能逻辑，html代码将存放于此
 */
//inject从props中获取相应的数据
/**@inject("cloubStoreCarModelDetail")
@observer */
class SelectBox extends Component{

	constructor(props){
		super(props);

	}

	onSwitchSpecClick = (e) => {
		window.app.routerGoTo(`/cloubStore/cloubSwitchSpec?itemId=`+this.props.itemId+'&dealerId='+this.props.dealerId) ; 
	}

	drawLine(carDetailBaseInfo){

		let skus = carDetailBaseInfo.skus||[] ; 

		
		if(skus.length>0){
			let props = skus[0].props ; 
			if(props.length===0)return "";
			//如果有多种标签则显示已选规格，如果只有一个标签则显示标签名称
			let labelName = (props.length>1) ? '已选规格':`已选${props[0].name}`  ;
			
			return(
				<li className='pdSelectBox_item' onClick={this.onSwitchSpecClick}>
						<div>{labelName}：</div>
						<div className='pdSelectBox_item2'>
							<span className='hidden'>未选择</span>
							<div className='pdSelectBox_color'>
								<span className='pdSelectCircle'></span>
								{
									(carDetailBaseInfo.skus!=null)?
									carDetailBaseInfo.skus[0].props.map((val,i)=>{
										return <span key={`sexboxlable${i}`}>
											{val.value}
											{
												(i+1)===carDetailBaseInfo.skus[0].props.length?
												'':'+'
											}
											</span>
									})
									:''
								}
							</div>
							
						</div>
						<div className='iconfont icon-right'></div>
					</li>
			) ;
		}

		return '' ;
	}

	onCarModelListClick = (e) => {
		window.app.routerGoTo(`/carModelList?itemId=`+this.props.itemId+'&dealerId='+this.props.dealerId+'&tabBarType=1') ; 
	}

	render(){
		let {carDetailBaseInfo} = this.props ; 
		
		return (
			<div>
				<ul className='pdSelectBox'>
					<li className='pdSelectBox_item' onClick={this.onCarModelListClick}>
						<div>已选车型：</div>
						<div className='pdSelectBox_item2' >
							<span className='hidden'>未选择</span>
							{/* <span>1.8T/紧凑型/自动变速箱</span> */}
							<span>{carDetailBaseInfo.name}</span>
						</div>
						<div className='iconfont icon-right'></div>
					</li>
					{
						this.drawLine(carDetailBaseInfo)
					}
					{/* <li className='pdSelectBox_item'>
						<div>已选颜色：</div>
						<div className='pdSelectBox_item2'>
							<span className='hidden'>未选择</span>
							<div className='pdSelectBox_color'>
								<span className='pdSelectCircle'></span>
								{/* <span>峡谷棕</span> }
								{
									(carDetailBaseInfo.skus!=null)?
									carDetailBaseInfo.skus[0].props.map((val,i)=>{
										return <span key={`sexboxlable${i}`}>
											{val.value}
											{
												(i+1)===carDetailBaseInfo.skus[0].props.length?
												'':'+'
											}
											</span>
									})
									:''
								}
							</div>
							
						</div>
						<div className='iconfont icon-right'></div>
					</li> */}

				</ul>
			</div>
		)
	}
}

class NearbyInfo extends Component{
	render(){
		return (
			<div className='nearbyInfo'>
				<div className='nearbyInfo1'>附近共有 <span className='color_orange'>18</span> 家特约经销商</div>
				<div className='nearbyInfo2'>
					<div>经销商报价： <span className='color_orange'>￥18.88万</span> 起</div>
					<div className='color_gray'>前往查看 <span className='iconfont icon-right'></span></div>
				</div>

			</div>
		)
	}
}
/**
 * 经销商信息
 */
class DistributorInfo extends Component{

	constructor(props,context){
		super(props,context) ;

	}

	converKm(val){
		val = Number(val) ; 
		if(val<1000){
		  return val.toFixed(2)+'m' ;
		}else{
		  return (val/1000).toFixed(2)+'km' ;
		}
	  }
	render(){
		let {dealerInfo} = this.props ; 
		if(dealerInfo==null||dealerInfo.dealerName==null) return <div></div> ;
				
		return(
			<div className='disInfo'>
				<div className='disInfo1'>
					<div className='disInfo1-name'>
						<span className='ellipsis-two'>{dealerInfo.dealerName}</span>
					</div>
					<StarsList score={dealerInfo.score} className='disInfo1-stars' />
				</div>
				<div className='disInfo2'>
					<i className='iconfont icon-dianhua'></i>
					<span>{dealerInfo.salePhone}</span>
				</div>
				
				{
					dealerInfo.shops.map((val,i) => {
						return(
							<div key={`dekey-${i}`} className='disInfo3'>
								<div className='disInfo3-1 ellipsis'>
									<i className='iconfont icon-dizhi'></i>
									<span>{val.address}</span>
								</div>
								<div className='disInfo3-2'>
									<span>{'距您<'+this.converKm(val.distance)}</span>
								</div>
							</div>
						)
					})
				}
			</div>
		)
	}
}

/**
 * 车型详情的介绍
 */
class CarIntroduce extends Component{
	render(){

		let introduces = this.props.carDetailInfo.introduces ; 
		
		return (
			<div className='productDetailIntroduce' ref='pdi_box'>
				{
					//此处是车型的详情介绍
					introduces!=null?introduces.map((val,i)=>{

						return(
							<div key={`introduce${i}`} dangerouslySetInnerHTML={{__html:val}}></div>
						)
					}):''
				}
				{/* <div className='pdi_1'>
					<p>狂野的心</p>
					<p>动不动就大发雷霆</p>
				</div>
				<div className='pdi_2'>
					<img src="assets/images/carModel/pd_detail1.png"/>
				</div>
				
				<div className='pdi_3'>整个车内律动着立体创造性的动感线条，运动感十足的三幅方向盘与个性四射的操控台相呼应，明快的银色装饰条增添了强烈的摇滚金属感。</div>

				<div className='pdi_4'>
					<img src="assets/images/carModel/pd_detail2.png"/>
				</div>
				
				<div className='pdi_5'>凌厉电眼，狂放的大尺寸镀铬进气格栅，趣野必备的外挂式备胎，特别设计的侧开门后备厢也干净利落，无不表露出硬派作风和不驯天性，它同样挑剔一位有趣冒险精神的车主拍档。</div>
				 */}
			</div>
		)
	}
}


/**
 * 促销活动
 */
class ShopActivity extends Component{
	
	handleCLick = (e) =>{

		let id = e.currentTarget.getAttribute('actid') ; 
		let dealerId = window.app.router.location.query.dealerId
		 
		window.app.routerGoTo('/activityDetails?from=cloubStore/carModelDetail&activityId='+id+'&dealerId='+dealerId) ;
		//Toast.info(`活动ID${id}`)
		
	}
	
	render(){
		
		let activityList = this.props.activityList ; 
		
		return (
			<div className="productDetailTest">
				<ul>
					{
						activityList.map((val,i) => {

							return(
								<li className='pdt_item' onClick={this.handleCLick} actid={val.id} key={`actkey${i}`}>
									<div className='pdt_cover'>
										<img src={val.image} />
									</div>

									<div className='pdt_infoBox'>
										<div className='pdt_info1'>{val.name}</div>

										<div className='pdt_info2'>
											<div className='pdt_info_see'>
												<span className='iconfont icon-yuedu'></span>
												<span>{val.readTotal}</span>
											</div>
											<div className='pdt_info_comment'>
												<span className='iconfont icon-pinglun'></span>
												<span>{val.commentTotal}</span>
											</div>
											<div>
												<span className='iconfont icon-shijian'></span>
												<span className='ellipsis'>{Util.formatDate(val.publishTime||'2018-4-2',1)}</span>
											</div>
										</div>

									</div>

								</li>
							)
						})
					}

				</ul>

			</div>
		);
	}

}

@inject("cloubStoreCarModelDetail","cloubStoreIndex")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class ProductDetailIndex extends Component {
	constructor(props, context) {
		super(props, context)
		this.stores = this.props.cloubStoreCarModelDetail;

		//需要获取云店编码
		this.storesCloubIndex = this.props.cloubStoreIndex ; 
		
		//this.stores.itemId = this.props.location.state.itemId ; 
		//TODO 后期修改成从URL获取
		this.stores.itemId = this.props.location.query.itemId ; 
		this.stores.state.dealerId = this.props.location.query.dealerId ; 
		//this.stores.itemId = '1171675815723683840'//this.props.location.query.itemId ; 
		this.itemId = this.props.location.query.itemId
		this.dealerId = this.props.location.query.dealerId
	}
	componentDidMount(){
		//获取车型基础信息
		this.getData() ;
		
		
	}

	getData = () =>{
				

		let [_itemCode,_account,_itemId] = ['00001','11111',this.stores.state.itemId] ; 
		let {dealerId} = this.stores.state ;
		console.log(dealerId);
		
		let params = {
			//itemCode:_itemCode,
			//storeCode:this.storesCloubIndex.state.storeCode ,
			itemId:_itemId ,
			"dealerId":dealerId ,
		}
		
		this.getCarDetailBaseInfo(params) ;

		this.getFollowFlag({
			//itemCode:_itemCode,
			account:_account,
			itemId:_itemId 
		}) ;

		this.getCommentList({
			//itemCode:_itemCode,
			pageSize:3 ,
			itemId:_itemId 
		}) ;

		let res = localStorage.getItem('myPosition') ;
		if(res == null){
			//29.6213983210,106.4917498827
			//res = {latitude:23.103679,longitude:113.436542}
			//重庆互联网产业园
			res = {latitude:29.6213983210,longitude:106.4917498827}
		}else{
			res = JSON.parse(res) ; 
		}
		let {latitude,longitude} = res ; 

		// TODO 经纬度获取还未完成
		this.getDistributorInfo({
			itemId:_itemId ,
			'longtitude':longitude ,
			'latitude':latitude ,
			dealerId
		});

		this.getActivityList({
			storeId:dealerId,
			pageNum:1,
			pageSize:3,
			dealerId
			//type:'',
			//areaCode:''
		})

		this.getCarDetailInfo({
			//itemCode:_itemCode,
			itemId:_itemId 
		})
	}

	/**
	 * 获取车型基础信息
	 * @param {*} params 
	 */
	getCarDetailBaseInfo = (params) => {
		this.stores.getCarDetailBaseInfo(params) ;
	}

	/**
	 * 查询用户是否已经关注该车型
	 */
	getFollowFlag = (params) => {
		//TODO 迭代一不做
		//this.stores.getFollowFlag(params) ;
	}

	/**
	 * 查询评论
	 */
	getCommentList = (params) => {
		this.stores.getCommentList(params) ;
	}

	/**
	 * 获取经销商信息
	 */
	getDistributorInfo = (params) =>{
		this.storesCloubIndex.getdealerInfo(params) ; 
	}

	/**
	 * 获取促销列表
	 */
	getActivityList = (params) => {
		this.stores.getCloubActivity(params)
	}
	/**
	 * 获取车型详细参数和简介
	 */
	getCarDetailInfo = (params) =>{
		this.stores.getCarDetailInfo(params) ; 
	}

	/**
	 * 滑鼠滚动事件
	 * 
	 * @param {*} e 
	 */
	handleScroll(e){

		let scrollTop = Util.getScrollTop() ;
		let pdi_top = this.refs.productDetailIntroduce.refs.pdi_box.offsetTop
		let pdConfig_top = this.refs.productConfig.offsetTop
		let pdt_top = this.refs.test.offsetTop - 1000

		
		if (scrollTop < pdi_top) {
			if (scrollTop > window.innerHeight) {
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
	changeNavTab(type){
		let pdi_top = this.refs.productDetailIntroduce.refs.pdi_box.offsetTop - 83
		let pdConfig_top = this.refs.productConfig.offsetTop - 83
		let pdt_top = this.refs.test.offsetTop
		let arr = [pdi_top, pdConfig_top, pdt_top]

		let y = arr[type - 1] ; 

		let lastY = 0 ,count=0;
		let arg = (y-Util.getScrollTop())/10 ;
		console.log(arg);
		
		let timer = setInterval(()=>{
			let thisy = Util.getScrollTop() ;
			count++;
			//最终距离小于平均值 或者已经到底部则清掉定时器
			if(Math.abs(thisy-y)<Math.abs(arg) || thisy===lastY){				
				window.scrollTo(0,y) ;
				clearInterval(timer) ;

				//alert(`总共${count}次，arg${arg}`) 
			}else{
				
				window.scrollTo(0,thisy+arg) ;
				lastY = thisy ; 
			}
			
		},30)
		//window.scrollTo(0, arr[type - 1]);
	}
	/**
	 * 点击跳转到询底价页面
	 */
	hadnleClickAsk = (e) => {

		window.app.routerGoTo() ;
	}

	componentWillMount(){
		
		this.regScroll(this.handleScroll.bind(this));
	}
	componentWillUnmount(){
		
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
		let {navTab,carDetailBaseInfo,followFlag,commentList,activityList,carDetailInfo} = this.stores.state ; 
		let {dealerInfo} = this.storesCloubIndex.state ;
		
		return (
			<div className="productDetail">
				<div className={'pd_top '+(navTab===0?'pd_hide':'pd_nav')}>
					<div className={navTab===1?'active':''} onClick={() => this.changeNavTab(1)}>商品介绍</div>
					<div className={navTab===2?'active':''} onClick={() => this.changeNavTab(2)}>详细配置</div>
					<div className={navTab===3?'active':''} onClick={() => this.changeNavTab(3)}>活动信息</div>
				</div>
				<Baseinfo dealerId={this.dealerId} carDetailBaseInfo={carDetailBaseInfo} followFlag={followFlag} carDetailInfo={carDetailInfo} />
				<SelectBox carDetailBaseInfo={carDetailBaseInfo}  itemId={this.itemId} dealerId={this.dealerId} />
				<DistributorInfo dealerInfo={dealerInfo} />
				<div className='component_pdc'>
					<div className='component_pdc_title'>评论</div>
					<Comment commentList={commentList}  />
				</div>
				<CarIntroduce ref='productDetailIntroduce' carDetailInfo={carDetailInfo}  />
				<div className='component_pdConfig' ref='productConfig'>
					<div className='component_pdConfig_title'>参数配置</div>
					<ProductConfig carDetailInfo={carDetailInfo} itemId={this.stores.state.itemId} />
				</div>

				<div className='component_test'>
					<div className='component_test_title'>
						<span className='iconfont icon-chexingceping'></span>
						<span>车型测评</span>
					</div>
					<Test />
				</div>

				<div className='component_test' ref='test'>
					<div className='component_test_title'>
						<span className='iconfont icon-cuxiaohuodong'></span>
						<span>促销活动</span>
					</div>
					<ShopActivity activityList={activityList}  />
				</div>

				<div className='pd_footer'>
					<div className='pd_footerItem1' >
						<img src="assets/images/productDetail/icon_jisuanqi.png" />
						<p>购车<br/>计算器</p>
					</div>
					<div className='pd_footerItem1 last-item'>
						<img src="assets/images/productDetail/icon_kefu.png" />
						<p>在线<br/>咨询</p>
					</div>
					<div className='pd_footerItem3' onClick={this.toUrl.bind(this, '/askprice?from=cloubStore/carModelDetail&dealerId='+this.dealerId+'&itemId='+this.itemId)}>询底价</div>
					<div className='pd_footerItem4' onClick={this.toUrl.bind(this, '/testdrive?from=cloubStore/carModelDetail&itemId='+this.itemId+'&dealerId='+this.dealerId)}>预约试驾</div>
				</div>
				

			</div>
		);
	}
}

module.exports = ProductDetailIndex;
