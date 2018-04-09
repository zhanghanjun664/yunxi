/**
 * Created by zhang.weihua on 2018/3/23.
 */
import React, { PropTypes, Component } from 'react';
import { Flex, Button, Icon, } from 'antd-mobile';
import { StarRange, AddressPicker, Tabs, RefreshListView, } from 'widget';
import './InquireDealerLess.less';
import { inject, observer } from 'mobx-react';
import TabBar from 'pubBiz/tabBar/TabBarView'

@inject('inquireDealer')
@observer
class InquireDealerView extends Component {

    constructor(props, context) {
        super(props, context);

        this.tabs = ['离我最近', '价格最低'];
        this.type = 1;   //1-距离最近， 2-评分最高
        this.stores = this.props.inquireDealer;
    }

    componentDidMount() {
        this.refs.list.start();
    }

    callMe(item) {
        location.href = 'tel:' + item.salePhone;
    }

    gotoShop(item) {
        window.app.routerGoTo('/cloubStore/index?tabBarType=1&dealerId=' + item.id)
    }
    
    selectAddr = () => {
        this.refs.addrModal.openModal();
    }

    fetchData = (pageNum, success, error) => {
        let params = {   //在这里添加剩余的参数就好了
            pageSize:20,
            pageNum:1,
            cityId:'440000000000',
            longitude:40,
            latitude:120,
            type:this.type

        }
        this.stores.getDealerList(params).then((result) => {
            let { data, resultCode, resultMsg } = result;

            if(resultCode !== 0) {
                return;
            }
            success(data.list, data.pageNum, data.pages);
        }, (e) => {
            console.log(e)
            error(e)
        })

    }

    onTabClick = (index) => {
        this.type = index + 1;
        this.refs.list.onRefresh();
    }

    renderRow = (rowData, sectionID, rowID) => {
        return (
            <div className="inquiry-item">
                <Flex className="inquiry-header" justify="between">
                    <div className="company-name ellipsis" onClick={e => this.gotoShop(rowData)}>{rowData.dealerName}</div>
                    <StarRange number={rowData.score} />
                </Flex>
                <Flex className="address" justify="between">
                    <div className="ellipsis">
                        <span className="iconfont icon-dizhi"></span>
                        <span className="text">{rowData.shops[0].address}</span>
                    </div>
                    <div className="to-here color_orange">
                        <span className="iconfont icon-ditu"></span>
                        <span>到这里</span>
                    </div>
                </Flex>
                <div className="color_gray ml-34 fz_24">&lt;10m</div>
                <div className="lottery-text">
                    <div className="icon-yundian"></div>
                    到店享好礼，下订单抽大奖
                </div>
                <Flex justify="between" className="btn-list">
                    <Button className="inquiry-btn" onClick={e=> this.callMe(rowData)}>致电</Button>
                    <Button className="inquiry-btn">在线客服</Button>
                    <Button className="inquiry-btn btn-orange">查询底价</Button>
                </Flex>
            </div>
        )
    }


    render() {
        return (
            <div className="inquire-dealer-page">
                <Tabs
                    className="dealer-tabs"
                    tabs={this.tabs}
                    onTabClick={this.onTabClick}
                    exact={
                        <Flex className="position-wrap" justify="center" onClick={this.selectAddr}>
                            <div className="line"></div>
                            <span className="iconfont icon-dingwei"></span>
                            <span className="ellipsis">重庆市</span>
                        </Flex>
                    }
                ></Tabs>

                <RefreshListView
                    fetchData={this.fetchData}
                    renderRow={this.renderRow}
                    ref="list"
                    className="inquiry-list"
                    pullToRefresh={true}
                />

                <div className="price-tips">
                    <span className="iconfont icon-xinxi"></span>
                    <span>所有报价均来自经销商，实际价格以店内报价为准</span>
                </div>

                <AddressPicker ref="addrModal" ok={(item) => {

                }} />
                <TabBar selectedTab='searchTab' />                
            </div>
        )
    }
}

module.exports = InquireDealerView;