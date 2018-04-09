import React, { PropTypes, Component } from 'react'
import { Link, IndexLink } from 'react-router'
import { inject, observer } from 'mobx-react';
import Config from 'config/Config';
import Util from 'util';
import { Toast } from 'antd-mobile';
import './baseInfoLess.less';
/**
 * 视图层，功能逻辑，html代码将存放于此
 */
//inject从props中获取相应的数据
//@inject("cloubStoreCarModelDetail")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
//@observer
class ProductDetailBaseInfo extends Component {
	constructor(props, context) {
		super(props, context)
		//this.stores = this.props.cloubStoreCarModelDetail;
		this.state = {
			followFlag:'0' ,
			sku:{
				officialSellPrice:0,
				sellerSellPrice:0
			}
		}
	}

	componentWillReceiveProps(newProps){
		let carDetailBaseInfo  = newProps.carDetailBaseInfo ;
		if (carDetailBaseInfo.skus!=null){
			this.setState({sku:carDetailBaseInfo.skus[0]}) ;
		}
	}
	drawCloubAct=()=>{
		//let carDetailBaseInfo  = this.props.carDetailBaseInfo
		//console.log(carDetailBaseInfo);
		return(
			<div className='pdbc'>
				<span>
					{this.state.sku.adWord}
				</span> 
			</div>
		) ;
		
	}
	/**
	 * 绘制关注按钮
	 */
	drawFollowStatus = () =>{
		let followFlag = this.state.followFlag||this.props.followFlag ;
		let iconName = "icon_follow" ; 
		
		//followFlag = parseInt(Math.random()*1.99)+"" ;
		//等于1为已关注		
		if(followFlag==="1"){
			iconName = "icon_cancelFollow" ; 
		}

		return(
			<div className='pdb3_2' onClick={this.handleClickFollow}>
				<img src={`assets/images/productDetail/${iconName}.png`} />
				<div>
				{
					followFlag==="1"?"已关注":"关注"
				}
				</div>
			</div>
		)
	}

	/**
	 * 点击关注按钮
	 */
	handleClickFollow = () =>{
		let followFlag = this.state.followFlag||this.props.followFlag ;

		if(followFlag==="1"){
			Toast.success('取消关注') ;
			this.setState({followFlag:'0'}) ;
		}else{
			Toast.success('关注') ;
			this.setState({followFlag:'1'}) ;
		}
	}
	toUrl(url){
		window.app.routerGoTo(url);
	}

//<div className='pdb2_1'>福特福克斯 1.5T <span className='pdb2_Type'>EcoBoost</span> 自动旗舰型</div>
	render() {
		let {carDetailBaseInfo,followFlag,carDetailInfo}  = this.props ;	
			

		return (
			<div className="productDetailBaseInfo">
				<div className='pdb1'>
					{/* <img src={carDetailBaseInfo.skus ? carDetailBaseInfo.skus[0].cmpMedias[0].fileUrl : ""} /> */}
					<img src={(carDetailInfo.cmpMedias!=null&&carDetailInfo.cmpMedias.length>0) ? carDetailInfo.cmpMedias[0].fileUrl:''} />
					{/* <img src="assets/images/productDetail/baseInfo.png" /> */}
					<div className='pdb1_tags'>
						<div onClick={()=>this.toUrl('/carImages?ci_type=video')}>
							<span className='iconfont icon-Triangle'></span>
							<span>视频</span>
						</div>
						<div onClick={()=>this.toUrl('/carImages')}>图片</div>
					</div>
				</div>
				
				<div className='pdb2'>
					<div className='pdb2_1'>{carDetailBaseInfo.name}</div>
					{
						this.drawCloubAct() 
					}
					<div className='pdb2_3'>{carDetailBaseInfo.tags}</div>
					<div className='pdb2_2'>{carDetailBaseInfo.labels}</div>
					

				</div>
				
				<div className='pdb3'>
					<div className='pdb3_1'>
						<div className='pdb3_1_0'>
							官方指导价：￥<span className='pdb3_price'>{this.state.sku.officialSellPrice/10000}万</span> 							
						</div>
						<div className='pdb3_1_1'>
							经销商报价：￥<span className='pdb3_price'>{this.state.sku.sellerSellPrice/10000}万</span> 
						</div>
					</div>
					{
						this.drawFollowStatus()
					}
					<div className='pdb3_3'>
						<img src="assets/images/productDetail/icon_pk.png"/>
						<div>加入对比</div>
					</div>
				</div>
			</div>
		);
	}
}

module.exports = ProductDetailBaseInfo;
