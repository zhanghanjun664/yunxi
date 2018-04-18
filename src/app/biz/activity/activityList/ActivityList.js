/**
 * Created by zhang.hanjun 
 */
import React, { PropTypes, Component } from 'react';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import { RefreshListView } from 'widget';
import './ActivityListLess.less';
import Util from 'util';

class ActivityList extends Component {
	constructor(props, context) {
		super(props, context)
		this.dealerId = Util.getQueryString('dealerId')
	}
	componentDidMount() {
		this.refs.list.start();
	}
	toUrl(url) {
		window.app.routerGoTo(url)
	}

	fetchData = async (pageNum, success, error) => {

		const location = window.app.router.location;
		let { postCode } = Util.getCityID()

		let params = {
			pageNum: pageNum,
			pageSize: 5,
			activityLabel: this.props.activityLabel,
		};
		// 云店进入的查经销商id
		if(this.dealerId){
			params.storeId = this.dealerId
		}else{
			// 首页进入的查城市
			params.areaCode = postCode
		}

		let { data } = await this.props.fetchData(params);
		success(data.list, data.pageNum, data.pages);

	}
	renderRow = (rowData, sectionID, rowID) => {
		return (
					<li className='pdt_item' onClick={this.toUrl.bind(this, '/activityDetails?from=activity&activityId='+rowData.id)}>
						<div className='pdt_cover'>
							<img src={rowData.image1} />
						</div>

						<div className='pdt_infoBox'>
							<div className='pdt_info1 ellipsis-two'>{rowData.name}</div>

							<div className='pdt_info2'>
								<div className='pdt_info_see'>
									<span className='iconfont icon-yuedu'></span>
									<span>{rowData.readTotal}</span>
								</div>
								<div className='pdt_info_comment'>
									<span className='iconfont icon-pinglun'></span>
									<span>{rowData.commentTotal}</span>
								</div>
								<div>
									<span className='iconfont icon-shijian'></span>
									<span>{rowData.publishTime?Util.formatDate(rowData.publishTime):'-'}</span>
								</div>
							</div>

						</div>

					</li>


		)
	}

	render() {
		let style = this.props.style || {}
		return (
			<div className="productDetailTest">
				<ul>
					<RefreshListView
						fetchData={this.fetchData}
						renderRow={this.renderRow}
						ref="list"
						first={false}
						useBodyScroll={false}
						style={style}
						pullToRefresh={true}
					/>


				</ul>

			</div>

		);
	}
}
module.exports = ActivityList;