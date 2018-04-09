/**
 * Created by zhang.hanjun 
 */
import React, { PropTypes, Component } from 'react'
import { Link, IndexLink } from 'react-router'
import { inject, observer } from 'mobx-react';
import Config from 'config/Config';
import Util from 'util';
import './ActivityListLess.less';


@inject("productDetailIndex")
@observer
class ActivityList extends Component {
	constructor(props, context) {
		super(props, context)
		this.stores = this.props.productDetailIndex;
	}
	toUrl(url){
		window.app.routerGoTo(url)
	}

	render() {
		const activityList = this.stores.state.activityList
		console.log(activityList)
		return (
			<div className="productDetailTest">
				<ul>
					{
						activityList && activityList.map((item, index) => {
							return (
								<li className='pdt_item' key={index} onClick={this.toUrl.bind(this, `/activityDetails?id=${item.id}`)}>
									<div className='pdt_cover'>
										<img src={item.image} />
									</div>

									<div className='pdt_infoBox'>
										<div className='pdt_info1'>{item.name}</div>

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
												<span>{item.publishTime&&Util.formatDate(item.publishTime)}</span>
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

module.exports = ActivityList;
