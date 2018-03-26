import React, { PropTypes, Component } from 'react'
import { Link, IndexLink } from 'react-router'
import { inject, observer } from 'mobx-react';
import Config from 'config/Config';
import Util from 'util';
import './commentLess.less';
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

	/**
	 * 绘制评论列表
	 */
	drawCommentList = () =>{
		let {commentList} = this.props ; 

		return(
			commentList.map((val,i)=>{
				return(
					<li className='pdc_item' key={`commentList-${i}`}>
						<div className='pdc_headImg'><img src={val.headImgUrl}/></div>
						<div className='pdc_infoBox'>
							<div className='pdc_item1Box'>
								<div className='pdc_iB_1'>{val.nickName}</div>
								{
									this.drawCommenStars(val.score)
								}
								<div className='pdc_iB_3'>{val.date}</div>
							</div>

							<div className='pdc_type'>{val.itemSpecification}</div>
							
							
							<div className='pdc_comment'>{val.content}</div>
						</div>
					</li>
				)
			})
		)
	}

	/**
	 * 根据评分绘制星星
	 */
	drawCommenStars = (score) =>{
		
		if(score==null)return ;
		let [n,f] = (score+'').split('.') ; 
		//绘制各种星的数量
		let [fnum,mnum,nnum] = [0,0,0] ;
		
		if(n>=5){
			fnum = 5 ; 
		}else{
			fnum = n ;
			if(f!=0){
				mnum = 1;
			}
			nnum = 5-fnum-mnum ; 
		}
		fnum = parseInt(fnum) ;
		
		return(
			<div className='pdc_iB_2'>
				
				{
					Array.apply(null,new Array(fnum)).map((_,i)=>{
						
						return(
							<img key={'commentListFnum-'+i} src="assets/images/productDetail/icon_fullStar.png"/>
						)
					})
				}
				{
					Array.apply(null,new Array(mnum)).map((_,i)=>{
						
						return(
							<img key={'commentListMnum-'+i} src="assets/images/productDetail/icon_midStar.png"/>
						)
					})
				}
				{
					Array.apply(null,new Array(nnum)).map((_,i)=>{
						
						return(
							<img key={'commentListMnum-'+i} src="assets/images/productDetail/icon_noStar.png"/>
						)
					})
				}
			</div>
		)
	}

	render() {

		return (
			<div className="productDetailComment">
				<ul>
					{
						this.drawCommentList()
					}
				</ul>
				<div className='pdc_footer'>
					<div className='btn_MoreComment'>查看全部评论</div>
				</div>

			</div>
		) 
	}
}

module.exports = ProductDetailIndex;
