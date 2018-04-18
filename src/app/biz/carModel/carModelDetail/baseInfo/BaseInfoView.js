/**
 * Created by zhang.hanjun 
 */
import React, { PropTypes, Component } from 'react'
import { Link, IndexLink } from 'react-router'
import { inject, observer } from 'mobx-react';
import { Toast } from 'antd-mobile';
import Config from 'config/Config';
import Util from 'util';
import './BaseInfoLess.less';

@inject("productDetailIndex")
@observer
class ProductDetailBaseInfo extends Component {
	constructor(props, context) {
		super(props, context)
		this.stores = this.props.productDetailIndex;
		this.itemId = window.app.router.location.query.itemId
		this.skusId = window.app.router.location.query.skusId
		
	}
	componentDidMount(){
		// this.stores.getBaseInfo({itemId: this.stores.currentItemCode})
	}
	toUrl(url){
		window.app.routerGoTo(url);
	}
	noOpen(){
		Toast.info('此功能暂未开放')
	}

	render() {
		const { baseInfo, carConfig, imgDetail, skusId, nearbyInfo } = this.stores.state
		let sellPrice = null
		console.log(imgDetail, nearbyInfo, skusId)
		
		if(skusId&&nearbyInfo.lowestPriceItemSkus&&nearbyInfo.lowestPriceItemSkus[skusId]){
			sellPrice = nearbyInfo.lowestPriceItemSkus[skusId].sellPrice
		}
		return (
			<div className="productDetailBaseInfo box_shadow">
				<div className='pdb1'>
					<img src={carConfig.cmpMedias && carConfig.cmpMedias[0] &&carConfig.cmpMedias[0].fileUrl } />
					<div className='pdb1_tags'>
						{/* <div onClick={()=>this.toUrl('/carImages?ci_type=video&itemId='+itemId)}>
							<span className='iconfont icon-Triangle'></span>
							<span>视频</span>
						</div> */}
						<div onClick={this.noOpen.bind(this)}>
							<span className='iconfont icon-Triangle'></span>
							<span>视频</span>
						</div>
						<div onClick={()=>this.toUrl('/carImages?itemId='+this.itemId+'&skusId='+skusId+'&sellPrice='+sellPrice)}>图片</div>
					</div>
				</div>
				<div className='pdb2'>
					<div className='pdb2_1'>{baseInfo.name}</div>

					<div className='pdb2_2'>{baseInfo.tags}</div>

				</div>
				<div className='pdb3'>
					<div className='pdb3_1'>官方指导价：￥<span className='pdb3_price'>{imgDetail.data?Util.changeMoney(imgDetail.data.officialSellPrice):""}万</span> </div>
					<div className='pdb3_2' onClick={this.noOpen.bind(this)}>
						<div className='icon icon_follow'></div>
						<div>关注</div>
					</div>
					<div className='pdb3_3' onClick={this.noOpen.bind(this)}>
						<div className='icon icon_pk'></div>
						<div>加入对比</div>
					</div>
				</div>
			</div>
		);
	}
}

module.exports = ProductDetailBaseInfo;
