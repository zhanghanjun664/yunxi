import React, { PropTypes, Component } from 'react';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
// import { RefreshListView } from 'widget';
// import Serv from './SubscribeListServ';
import './activityListLess.less';

class ActivityList extends Component {
	constructor(props, context) {
		super(props, context)
	}
	toUrl(url){
		window.app.routerGoTo(url)
	}
	render() {
		return (
			<div className="productDetailTest">
				<ul onClick={this.toUrl.bind(this, '/activityDetails')}>
					<li className='pdt_item'>
						<div className='pdt_cover'>
							<img src="assets/images/productDetail/baseInfo.png" />
						</div>

						<div className='pdt_infoBox'>
							<div className='pdt_info1 ellipsis-two'>[广州]新福克新福克斯两厢降价促销优惠2斯两厢降价促销优惠2.2万元 现车充足</div>

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
							<img src="assets/images/productDetail/baseInfo.png" />
						</div>

						<div className='pdt_infoBox'>
							<div className='pdt_info1 ellipsis-two'>[广州]新福克新福克斯两厢降价促销优惠2斯两厢降价促销优惠2.2万元 现车充足</div>

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
module.exports = ActivityList;