import React, { PropTypes, Component } from 'react'
import { Link, IndexLink } from 'react-router'
import { inject, observer } from 'mobx-react';
import Config from 'config/Config';
import Util from 'util';
import './myOrderLess.less';
// import OrderList from 'pubBiz/orderList/orderListView';
import { Tabs } from 'antd-mobile';
import OrderList from './orderList';
/**
 * 视图层，功能逻辑，html代码将存放于此
 */
//inject从props中获取相应的数据
@inject("myOrder")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class MyOrder extends Component {
	constructor(props, context) {
		super(props, context)
		this.stores = this.props.myOrder;
		this.tabs = [
			{ title: '所有订单', statusCode: "" },
			{ title: '待支付', statusCode: 0 },
			{ title: '待到店', statusCode: 1 },
			{ title: '已完成', statusCode: 2 },
			{ title: '已取消', statusCode: 3 },
		];
	}
	componentDidMount() {

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
	renderTabs = tab => (
		<div>
			<div className='changAnt_tabs'>{tab.title}</div>
		</div>
	)
	handleFetchData(type, fn){
		console.log(type, fn)
		
		return this.stores.getOrderList
	}

	render() {
		return (
			<div className="myOrder">
				<div className='mo_searchBox'>
					<div className='mo_searchBox'>
						<input placeholder='商品名称/预约号' />
						<span className='iconfont icon-sousuo'></span>
					</div>
				</div>
				<div className='mo_orderBox'>
					<div>
						<Tabs tabs={this.tabs}
							initialPage={0}
							renderTab={this.renderTabs}
							onChange={this.onTabChange}
						>
							<ul className='mo_listBox'>
								<OrderList fetchData={this.stores.getOrderList}
									status={""} />

							</ul>

							<div>
								<ul className='mo_listBox'>
								<OrderList fetchData={this.stores.getOrderList}
									status={0} />

								</ul>
							</div>
							<div>
								<ul className='mo_listBox'>
								<OrderList fetchData={this.stores.getOrderList}
									status={1} />

								</ul>
							</div>
							<div>
								<ul className='mo_listBox'>
								<OrderList fetchData={this.stores.getOrderList}
									status={2} />

								</ul>
							</div>
							<div>
								<ul className='mo_listBox'>
								<OrderList fetchData={this.stores.getOrderList}
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
