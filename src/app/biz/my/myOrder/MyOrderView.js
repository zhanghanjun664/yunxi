/**
 * Created by zhang.hanjun 
 */
import React, { PropTypes, Component } from 'react'
import { inject, observer } from 'mobx-react';
import Util from 'util';
import './MyOrderLess.less';
import { Tabs, Toast } from 'antd-mobile';
import OrderList from './OrderList';
@inject("myOrder")
@observer
class MyOrder extends Component {
	constructor(props, context) {
		super(props, context)
		this.stores = this.props.myOrder;
		this.tabs = [
			{ title: <div className='changAnt_tabs'>所有订单</div>, statusCode: "" },
			{ title: <div className='changAnt_tabs'>待支付</div>, statusCode: 0 },
			{ title: <div className='changAnt_tabs'>待到店</div>, statusCode: 1 },
			{ title: <div className='changAnt_tabs'>已完成</div>, statusCode: 2 },
			{ title: <div className='changAnt_tabs'>已取消</div>, statusCode: 3 },
		];
	}
	componentDidMount() {
		this.stores.setStyle({
			height: Util.getScrollHeight(['mo_searchBox', 'am-tabs-tab-bar-wrap'])
		})
	}

	//tab切换
	onTabChange = (tab, index) => {
		this.stores.changeTab(index);
		console.log(tab, index)
	}


	//搜索
	_onSubmit = (event) => {
		event.preventDefault();
		this.refs['list' + this.stores.state.tabIndex].refreshList();
	}
	handleFetchData(type, fn){
		console.log(type, fn)
		
		return this.stores.getOrderList
	}
	noOpen(){
		Toast.info('此功能暂未开放')
	}

	render() {
		
		return (
			<div className="myOrder">
				<div className='mo_searchBox'>
					<div className='mo_searchBox' onClick={this.noOpen.bind(this)}>
						<input placeholder='商品名称/预约号' />
						<span className='iconfont icon-sousuo'></span>
					</div>
				</div>
				<div className='mo_orderBox'>
					<div>
						<Tabs tabs={this.tabs}
							initialPage={0}
							onChange={this.onTabChange}
							animated={false}
						>
							<ul className='mo_listBox'>
								<OrderList fetchData={this.stores.getOrderList}
									style={this.stores.state.style}
									status={""} />

							</ul>

							<div>
								<ul className='mo_listBox'>
								<OrderList fetchData={this.stores.getOrderList}
									style={this.stores.state.style}
									status={0} />

								</ul>
							</div>
							<div>
								<ul className='mo_listBox'>
								<OrderList fetchData={this.stores.getOrderList}
									style={this.stores.state.style}
									status={1} />

								</ul>
							</div>
							<div>
								<ul className='mo_listBox'>
								<OrderList fetchData={this.stores.getOrderList}
									style={this.stores.state.style}
									status={2} />

								</ul>
							</div>
							<div>
								<ul className='mo_listBox'>
								<OrderList fetchData={this.stores.getOrderList}
									style={this.stores.state.style}
									status={3} />

								</ul>
							</div>
						</Tabs>
					</div>
				</div>
			</div>
		);
	}
}

module.exports = MyOrder;
