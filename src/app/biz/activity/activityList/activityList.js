import React, { PropTypes, Component } from 'react';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import { PullToRefreshListView } from 'widget';
import './activityListLess.less';
import Util from 'util';

class ActivityList extends Component {
	constructor(props, context) {
		super(props, context)
	}
	componentDidMount() {
		this.refs.list.start();
	}
	toUrl(url) {
		window.app.routerGoTo(url)
	}
	fetchData = async (pageNum, success, error) => {
		let params = {
			pageNum: pageNum,
			pageSize: 10,
			activityLabel: this.props.activityLabel
		};

		let { data } = await this.props.fetchData(params);
		success(data.list, data.pageNum, data.total);

	}
	renderRow = (rowData, sectionID, rowID) => {
		console.log(rowData)
		return (
					<li className='pdt_item' onClick={this.toUrl.bind(this, '/activityDetails?id=111')}>
						<div className='pdt_cover'>
							<img src="assets/images/productDetail/baseInfo.png" />
						</div>

						<div className='pdt_infoBox'>
							<div className='pdt_info1 ellipsis-two'>{rowData.title}</div>

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
									<span>{Util.formatDate(rowData.publishTime)}</span>
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
					<PullToRefreshListView
						fetchData={this.fetchData}
						renderRow={this.renderRow}
						ref="list"
						first={false}
						useBodyScroll={false}
						style={style}
					/>


				</ul>

			</div>

		);
	}
}
module.exports = ActivityList;