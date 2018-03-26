import React, { PropTypes, Component } from 'react'
import { Link, IndexLink } from 'react-router'
import { inject, observer } from 'mobx-react';
import Config from 'config/Config';
import Util from 'util';
import './productConfigLess.less';
/**
 * 视图层，功能逻辑，html代码将存放于此
 */
//inject从props中获取相应的数据
//@inject("cloubStoreCarModelDetail")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
//@observer
class ProductDetailIndex extends Component {
	constructor(props, context) {
		super(props, context)
		//this.stores = this.props.cloubStoreCarModelDetail;
	}


	//点击查看全部参数按钮，跳转详情参数页面
	handleClick = (e) => {
		window.app.routerGoTo('/allConfig') ; 
	}

	render() {

		let carDetailInfo = this.props.carDetailInfo ; 
		let propGroups = carDetailInfo.propGroups ; 
		

		return (
			<div className="pdConfig">
				<ul>
					
					{
						propGroups==null?'':propGroups[0].props.map((val,i) => {
							
							return(
								<li className='pdConfig_item' key={`itemkey${i}`} >
									<div>{val.name}</div>
									<div>{val.value}</div>
								</li>
							)
						})
					}
				</ul>
				<div className='pdConfig_footer'>
					<div className='btn_moreConfig' onClick={this.handleClick}>全部参数</div>
				</div>

			</div>
		);
	}
}

module.exports = ProductDetailIndex;
