import React, { PropTypes, Component } from 'react'
import { Link, IndexLink } from 'react-router'
import { inject, observer } from 'mobx-react';
import Config from 'config/Config';
import Util from 'util';
import './testLess.less';
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

	render() {
		const data = this.props.data
		return (
			<div className="productDetailTest">
				<ul>
					{
						data ?
						data.map((item, index) => {
							return (
								<li className='pdt_item' key={index}>
									<div className='pdt_cover'>
										<img src={item.image} />
									</div>

									<div className='pdt_infoBox'>
										<div className='pdt_info1'>{item.title}</div>

										<div className='pdt_info2'>
											<div className='pdt_info_see'>
												<span className='iconfont icon-yuedu'></span>
												<span>{item.readTotal}</span>
											</div>
											<div className='pdt_info_comment'>
												<span className='iconfont icon-pinglun'></span>
												<span>{item.commentTotal}</span>
											</div>
											<div>
												<span className='iconfont icon-shijian'></span>
												<span>{Util.formatDate(item.publishTime)}</span>
											</div>
										</div>

									</div>

								</li>
							)
						})
						:""
					}

				</ul>

			</div>
		);
	}
}

module.exports = ProductDetailIndex;
