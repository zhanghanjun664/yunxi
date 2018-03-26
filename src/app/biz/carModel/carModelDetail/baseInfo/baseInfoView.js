import React, { PropTypes, Component } from 'react'
import { Link, IndexLink } from 'react-router'
import { inject, observer } from 'mobx-react';
import {autorun} from 'mobx';	
import Config from 'config/Config';
import Util from 'util';
import './baseInfoLess.less';
/**
 * 视图层，功能逻辑，html代码将存放于此
 */
//inject从props中获取相应的数据
@inject("productDetailIndex")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class ProductDetailBaseInfo extends Component {
	constructor(props, context) {
		super(props, context)
		this.stores = this.props.productDetailIndex;
		
	}
	componentDidMount(){
		this.stores.getBaseInfo({itemCode: 'test'})
	}
	toUrl(url){
		window.app.routerGoTo(url);
	}

	render() {
		const data = this.stores.state.baseInfo
		console.log(data)
		return (
			<div className="productDetailBaseInfo box_shadow">
				<div className='pdb1'>
					<img src={data.panoramaImgUrls ? data.panoramaImgUrls[0] : ""} />
					<div className='pdb1_tags'>
						<div onClick={()=>this.toUrl('/carImages?ci_type=video')}>
							<span className='iconfont icon-Triangle'></span>
							<span>视频</span>
						</div>
						<div onClick={()=>this.toUrl('/carImages')}>图片</div>
					</div>
				</div>
				<div className='pdb2'>
					<div className='pdb2_1'>{data.name}</div>

					<div className='pdb2_2'>{data.labels}</div>

				</div>
				<div className='pdb3'>
					<div className='pdb3_1'>官方指导价：￥<span className='pdb3_price'>{data.officialPrice}万</span> </div>
					<div className='pdb3_2'>
						<img src="assets/images/productDetail/icon_cancelFollow.png" />
						<div>关注</div>
					</div>
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
