/**
 * Created by zhang.hanjun 
 */
import React, { PropTypes, Component } from 'react'
import { Link, IndexLink } from 'react-router'
import { inject, observer } from 'mobx-react';
import Config from 'config/Config';
import Util from 'util';
import './ProductConfigLess.less';

@inject("productDetailIndex")
@observer
class ProductDetailIndex extends Component {
	constructor(props, context) {
		super(props, context)
		this.stores = this.props.productDetailIndex;
		this.itemId = window.app.router.location.query.itemId
	}
	componentDidMount() {
	}
	goAllconfig() {
		window.app.routerGoTo('/allConfig?itemId='+this.itemId);
	}
	render() {
		const data = this.stores.state.carConfig
		console.log(data)
		return (
			<div className="pdConfig">
				<ul>
					{
						data.props && data.props.filter((item) => {
								return item.groupName == data.props[0].groupName
							}).map((item, index) => {
								return (
									<li className='pdConfig_item' key={index}>
										<div>{item.name}</div>
										<div>{item.value}</div>
									</li>
								)
							})
					}


				</ul>
				<div className='pdConfig_footer'>
					<div className='btn_moreConfig' onClick={this.goAllconfig.bind(this)}>全部参数</div>
				</div>

			</div>
		);
	}
}

module.exports = ProductDetailIndex;
