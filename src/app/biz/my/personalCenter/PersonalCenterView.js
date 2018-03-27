/**
 * Created by zhang.weihua on 2018/3/26.
 */
import React, {PropTypes, Component} from 'react';
import {inject,observer} from 'mobx-react';
import { Flex, Toast, Carousel, } from 'antd-mobile';
import TabBar from 'pubBiz/tabBar/tabBarView';
import './PersonalCenterLess.less';

class PersonalCenterView extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="personal-center-page">
                <Flex className="user-info-wrap">
                    <img className="header-img" src="assets/images/activity/header.png" />
                    <div className="account-info">
                        <div className="user-name">年轻活剥的大鱼</div>
                        <div className="account" onClick={()=>window.app.routerGoTo('/accountManage')}>账号管理></div>
                    </div>
                </Flex>
                <Flex className="message-wrap">
                    <div>
                        <span className="text1">福特</span>
                        <span className="text2">消息</span>
                    </div>
                    <Flex.Item>
                        <Carousel
                            vertical
                            dots={false}
                            dragging={false}
                            swiping={false}
                            autoplay
                            infinite
                        >
                            <div className="news-item ellipsis">
                                <span className="tag">围观</span>xxxxxxxxxxxxsfd
                            </div>
                            <div className="news-item ellipsis">
                                <span className="tag">围观</span>xxxxxxxxxxxxsfd
                            </div>
                        </Carousel>
                    </Flex.Item>
                    <div className="more-news">更多</div>
                </Flex>

                <Flex className="nav-list" wrap="wrap">
                    <div className="nav-item" onClick={() => window.app.routerGoTo('mySubscribe')}>
                        <img src="assets/images/my/wodeyuyue.png" />
                        <div className="nav-text ellipsis">我的预约</div>
                    </div>
                    <div className="nav-item" onClick={() => window.app.routerGoTo('myOrder')}>
                        <img src="assets/images/my/wodedingdan.png" />
                        <div className="nav-text ellipsis">我的订单</div>
                    </div>
                    <div className="nav-item">
                        <img src="assets/images/my/wodeguanzhu.png" />
                        <div className="nav-text ellipsis">我的关注</div>
                    </div>
                    <div className="nav-item">
                        <img src="assets/images/my/wodeyouhuiquan.png" />
                        <div className="nav-text ellipsis">我的优惠券</div>
                    </div>
                    <div className="nav-item">
                        <img src="assets/images/my/xiaoshouguwen.png" />
                        <div className="nav-text ellipsis">销售顾问</div>
                    </div>
                    <div className="nav-item">
                        <img src="assets/images/my/wodexiaoxi.png" />
                        <div className="nav-text ellipsis">我的消息</div>
                    </div>

                </Flex>
                <TabBar selectedTab = 'mineTab'/>
            </div>
        )
    }
}

module.exports = PersonalCenterView;