/**
 * Created by zhang.weihua on 2018/3/23.
 */
import React, { PropTypes, Component } from 'react';
import { Flex, Button, Icon, Tabs, } from 'antd-mobile';
import { StarRange, AddressPicker } from 'widget';
import './InquireDealerLess.less';

class InquireDealerView extends Component {

    constructor(props, context) {
        super(props, context);

        this.tabs = [
            {title: <div className="my-tab-bar">离我最近</div>},
            {title: <div className="my-tab-bar">价格最低</div>}
        ];

    }


    selectAddr = () => {
        this.refs.addrModal.openModal();
    }


    renderDealerItem = () => {
        return (
            <div className="inquiry-item">
                <Flex className="inquiry-header" justify="between">
                    <div className="company-name ellipsis">
                        万江汽车投资有限公司两江分公司
                    </div>

                    <StarRange number={2.3} />
                </Flex>
                <Flex className="address" justify="between">
                    <div>
                        <span className="iconfont icon-dizhi"></span>
                        <span className="ellipsis">重庆市萝岗区科丰路31号华慧士大夫是否是</span>
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

    renderPriceTips = () => {
        return (
            <div className="price-tips">
                <span className="iconfont icon-xinxi"></span>
                <span>所有报价均来自经销商，实际价格以店内报价为准</span>
            </div>
        )
    }


    render() {
        return (

            <div className="inquire-dealer-page">
                <Flex className="position-wrap" justify="center" onClick={this.selectAddr}>
                    <div className="line"></div>
                    <span className="iconfont icon-dingwei"></span>
                    <span>重庆市</span>
                </Flex>
                <Tabs tabs={this.tabs} initialPage={0} tabBarTextStyle={{fontSize: '0.28rem', height: '0.8rem'}}
                      tabBarActiveTextColor="#FD5C0E"
                      tabBarInactiveTextColor="#666"
                      swipeable={false}
                      tabBarUnderlineStyle={{border: 'none',}}
                      onTabClick={(item, index) => {
                          console.log(index);
                      }}
                >
                    <div className="inquiry-list">
                        { this.renderDealerItem() }
                        { this.renderDealerItem() }
                        { this.renderDealerItem() }
                        { this.renderPriceTips() }

                    </div>
                    <div className="inquiry-list">
                        { this.renderDealerItem() }
                        { this.renderDealerItem() }
                        { this.renderDealerItem() }
                        { this.renderPriceTips() }
                    </div>
                </Tabs>

                <AddressPicker ref="addrModal" ok={(item) => {

                }} />

            </div>


        )
    }
}

module.exports = InquireDealerView;