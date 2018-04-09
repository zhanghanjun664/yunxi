/**
 * Created by zhang.hanjun 
 */
import React, { PropTypes, Component } from 'react'
import { Link, IndexLink } from 'react-router'
import { inject, observer } from 'mobx-react';
import Config from 'config/Config';
import Util from 'util';
import { StarRange } from 'widget';
import './CommentLess.less';


@inject("productDetailIndex")
@observer
class ProductDetailIndex extends Component {
	constructor(props, context) {
		super(props, context)
		this.stores = this.props.productDetailIndex;
	}
	componentDidMount(){
		
	}
	render() {
		const data = this.stores.state.commentData
		// console.log(data)
		return (
			<div className="productDetailComment">
				<ul>
					{
						
						data && data.list && data.list.map((item, index)=>{
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
