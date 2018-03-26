import React, { PropTypes, Component } from 'react'
import { Link, IndexLink } from 'react-router'
import { inject, observer } from 'mobx-react';
import Config from 'config/Config';
import Util from 'util';
import { StarRange } from 'widget';
import './commentLess.less';
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
		this.state = {
			showNum: 5,
			showList: [],
			allData: []
		}
	}
	componentDidMount(){
		this.stores.getCommentData({
			itemCode: "车型编码",
			pageNum: "当前页吗数",
			pageSize: "每页记录数"
		})
	}
	render() {
		const data = this.stores.state.commentParams.showList
		console.log(data)
		return (
			<div className="productDetailComment box_shadow">
				<ul>
					{
						
						data.map((item, index)=>{
							return (
								<li className='pdc_item' key={index}>
									<div className='pdc_headImg'><img src={item.headImgUrl}/></div>
									<div className='pdc_infoBox'>
										<div className='pdc_item1Box'>
											<div className='pdc_iB_1'>{item.nickName}</div>
											<div className='pdc_iB_2'>
												<StarRange number={item.score}/>

											</div>
											<div className='pdc_iB_3'>{Util.formatDate(item.date)}</div>
										</div>

										<div className='pdc_type'>{item.itemSpecification}</div>
										
										
										<div className='pdc_comment'>{item.content}</div>
									</div>
								</li>

							)

						})
						
					}
					

				</ul>
				<div className='pdc_footer'>
					<div className='btn_MoreComment'>查看全部评论</div>
				</div>

			</div>
		);
	}
}

module.exports = ProductDetailIndex;
