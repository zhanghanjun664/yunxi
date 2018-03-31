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
@inject("productDetailIndex")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class ProductDetailIndex extends Component {
	constructor(props, context) {
		super(props, context)
		this.stores = this.props.productDetailIndex;
	}
	componentDidMount() {
		this.stores.getCarConfig({
			itemCode: "车型编码"
		})
	}
	goAllconfig() {
		window.app.routerGoTo('/allConfig');
	}
	render() {
		const data = this.stores.state.carConfig
		console.log(data.props)
		return (
			<div className="pdConfig">
				<ul>
					{
						data.props ?
							data.props.filter((item) => {
								return item.groupName == '基本参数'
							}).map((item, index) => {
								return (
									<li className='pdConfig_item' key={index}>
										<div>{item.name}</div>
										<div>{item.value}</div>
									</li>
								)
							})
							// data.props.map((item, index)=>{
							// 	return (
							// 		item.props.map((item2, index2)=>{
							// 			return (
							// 				<li className='pdConfig_item' key={index+index2}>
							// 					<div>{item2.name}</div>
							// 					<div>{item2.value}</div>
							// 				</li>
							// 			)

							// 		})
							// 	)
							// })
							: ""
					}


				</ul>
				<div className='pdConfig_footer'>
					<div className='btn_moreConfig' onClick={this.goAllconfig}>全部参数</div>
				</div>

			</div>
		);
	}
}

module.exports = ProductDetailIndex;
