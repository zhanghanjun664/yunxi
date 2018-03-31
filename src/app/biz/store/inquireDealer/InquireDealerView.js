/**
 * Created by zhang.weihua on 2018/3/23.
 */
import React, { PropTypes, Component } from 'react';
import { Flex, Button, Icon, } from 'antd-mobile';
import { StarRange, AddressPicker, Tabs, RefreshListView, } from 'widget';
import './InquireDealerLess.less';
import { inject, observer } from 'mobx-react';

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


    selectAddr = () => {
        this.refs.addrModal.openModal();
    }

    fetchData = (pageNum, success, error) => {
        let params = {   //在这里添加剩余的参数就好了
            type: this.type
        }
        this.stores.getDealerList(params).then((result) => {
            let { data, resultCode, resultMsg } = result;

            if(resultCode !== 0) {
                return;
            }
            success(data.list, data.pageNum, data.pages);
        }, (error) => {

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
                    <div className="company-name ellipsis">
                        万江汽车投资有限公司两江分公司数据分类是否是
                    </div>

                    <StarRange number={2.3} />
                </Flex>
                <Flex className="address" justify="between">
                    <div className="ellipsis">
                        <span className="iconfont icon-dizhi"></span>
                        <span className="text">重庆市萝岗区科丰路31号华慧士大夫是否书法家是否</span>
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
                    <Button className="inquiry-btn">致电</Button>
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

            </div>


        )
    }
}

module.exports = InquireDealerView;

// <Tabs tabs={this.tabs} initialPage={0} tabBarTextStyle={{fontSize: '0.28rem', height: '0.8rem'}}
//       tabBarActiveTextColor="#FD5C0E"
//       tabBarInactiveTextColor="#666"
//       swipeable={false}
//       tabBarUnderlineStyle={{border: 'none',}}
//       onTabClick={(item, index) => {
//           console.log(index);
//       }}
// >
//     <div className="inquiry-list">
//         { this.renderDealerItem() }
//         { this.renderDealerItem() }
//         { this.renderDealerItem() }
//         { this.renderPriceTips() }
//
//     </div>
//     <div className="inquiry-list">
//         { this.renderDealerItem() }
//         { this.renderDealerItem() }
//         { this.renderDealerItem() }
//         { this.renderPriceTips() }
//     </div>
// </Tabs>