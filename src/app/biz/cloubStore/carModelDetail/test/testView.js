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
@inject("cloubStoreCarModelDetail")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class ProductDetailIndex extends Component {
	constructor(props, context) {
		super(props, context)
		this.stores = this.props.productDetailIndex;
	}

	data() {
		this.stores.text();
	}

	data2() {
		this.stores.mockText();
	}

	render() {
		return (
			<div className="productDetailTest">
				<ul>
					<li className='pdt_item'>
						<div className='pdt_cover'>
							<img src="assets/images/cloubStoreIndex/a1.png" />
						</div>

						<div className='pdt_infoBox'>
							<div className='pdt_info1'>[广州]新福克斯两厢降价促销优惠2.2万元 现车充足</div>

							<div className='pdt_info2'>
								<div className='pdt_info_see'>
									<span className='iconfont icon-yuedu'></span>
									<span>1769</span>
								</div>
								<div className='pdt_info_comment'>
									<span className='iconfont icon-pinglun'></span>
									<span>596</span>
								</div>
								<div>
									<span className='iconfont icon-shijian'></span>
									<span>2017.12.09</span>
								</div>
							</div>

						</div>

					</li>
					<li className='pdt_item'>
						<div className='pdt_cover'>
							<img src="assets/images/cloubStoreIndex/a2.png" />
						</div>

						<div className='pdt_infoBox'>
							<div className='pdt_info1'>[广州]新福克斯两厢降价促销优惠2.2万元 现车充足</div>

							<div className='pdt_info2'>
								<div className='pdt_info_see'>
									<span className='iconfont icon-yuedu'></span>
									<span>1769</span>
								</div>
								<div className='pdt_info_comment'>
									<span className='iconfont icon-pinglun'></span>
									<span>596</span>
								</div>
								<div>
									<span className='iconfont icon-shijian'></span>
									<span>2017.12.09</span>
								</div>
							</div>

						</div>

					</li>

				</ul>

			</div>
		);
	}
}

module.exports = ProductDetailIndex;
