import React, { PropTypes, Component } from 'react'
import { inject, observer } from 'mobx-react';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import './mySubscribeLess.less';
import SubscribeList from './SubscribeList';


/**
 * 视图层，功能逻辑，html代码将存放于此
 */
//inject从props中获取相应的数据
@inject("mySubsribe")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class MySubsribe extends Component {
	constructor(props, context) {
		super(props, context)
		this.stores = this.props.mySubsribe;



		this.tabs = [
			{ title: '所有预约' },
			{ title: '待到店' },
			{ title: '已完成' },
			{ title: '已取消' },
		];
	}

	componentDidMount() {

	}

	//tab切换
	onTabChange = (tab, index) => {
		this.stores.changeTab(index);
	}


	//搜索
	_onSubmit = (event) => {
		event.preventDefault();
		this.refs['list'+ this.stores.state.tabIndex].refreshList();
	}

	render() {


		return (
			<div className="subscribe-list-page">
				<div className='mo_searchWrap'>
					<form className='mo_searchBox' action="#" onSubmit={this._onSubmit}>
						<input placeholder='商品名称/预约号' type="search" value={this.stores.state.key} onChange={this.stores.changeKey}  />
						<span className='iconfont icon-sousuo'></span>
					</form>
				</div>
				<div className='mo_orderBox'>
					<div>
						<Tabs tabs={this.tabs}
							  initialPage={0}
							  onChange={this.onTabChange}
							  onTabClick={(tab, index) => {}}
							  swipeable={false}
						>
							<ul className='mo_listBox'>
								<SubscribeList ref="list0"
											   fetchData={this.stores.getAppointment}
											   status={null}
								/>
							</ul>
							<ul className='mo_listBox'>
								<SubscribeList ref="list1"
											   fetchData={this.stores.getAppointment}
											   status={0}
								/>
							</ul>
							<ul className='mo_listBox'>
								<SubscribeList ref="list2"
											   fetchData={this.stores.getAppointment}
											   status={1}
								/>
							</ul>
							<ul className='mo_listBox'>
								<SubscribeList ref="list3"
											   fetchData={this.stores.getAppointment}
											   status={2}
								/>
							</ul>

						</Tabs>
					</div>
				</div>

			</div>
		);
	}
}

module.exports = MySubsribe;
