/**
 * Created by zhang.weihua on 2018/3/26.
 */
import React, {PropTypes, Component} from 'react';
import {inject,observer} from 'mobx-react';
import { Flex, Toast, Carousel, } from 'antd-mobile';
import TabBar from 'pubBiz/tabBar/TabBarView';
import './PersonalCenterLess.less';

@inject('personalCenter')
@observer
class PersonalCenterView extends Component {

    constructor(props, context) {
        super(props, context);

        this.stores = props.personalCenter;
    }

    componentDidMount() {
        this.stores.getMemberInfo();
    }
    noOpen(){
        Toast.info('此功能暂未开放')
    }

    render() {
        let { info } = this.stores.state;

        return (
            <div className="personal-center-page">
                <Flex className="user-info-wrap">
                    <img className="header-img" src={info.imgUrl} />
                    <div className="account-info">
                        <div className="user-name">{info.name}</div>
                        <div className="account" onClick={()=>window.app.routerGoTo('/accountManage')}>账号管理></div>
                    </div>
                </Flex>
                <Flex className="message-wrap hide">
                    <div>
                        <span className="text1">福特</span>
                        <span className="text2">消息</span>
                    </div>
                    <Flex.Item>
                        { info.messages && (
                            <Carousel
                                vertical
                                dots={false}
                                dragging={false}
                                swiping={false}
                                autoplay
                                infinite
                            >
                                { info.messages.map((item, index) => {
                                    return (
                                        <div className="news-item ellipsis" key={index}>
                                            <span className="tag">{item.sender}</span>{item.content}
                                        </div>
                                    )
                                })}
                            </Carousel>
                        )}

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
                    <div className="nav-item" onClick={this.noOpen.bind(this)}>
                        <img src="assets/images/my/wodeguanzhu.png" />
                        <div className="nav-text ellipsis">我的关注</div>
                    </div>
                    <div className="nav-item" onClick={() => window.app.routerGoTo('myCoupon')}>
                        <img src="assets/images/my/wodeyouhuiquan.png" />
                        <div className="nav-text ellipsis">我的优惠券</div>
                    </div>
                    <div className="nav-item" onClick={this.noOpen.bind(this)}>
                        <img src="assets/images/my/xiaoshouguwen.png" />
                        <div className="nav-text ellipsis">销售顾问</div>
                    </div>
                    <div className="nav-item" onClick={this.noOpen.bind(this)}>
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