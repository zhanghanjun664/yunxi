import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router';
import {inject, observer} from 'mobx-react';
import Style from './PaymentSuccessLess.less';
import {InputItem, Flex, Button} from 'antd-mobile';
import TabBar from 'pubBiz/tabBar/TabBarView'

@inject("paymentSuccess")
@observer
class PaymentSuccess extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.paymentSuccess;
    }

    state = {
    };

    componentDidMount() {
    }

    onChange(value) {
        this.setState({value});
    };

    render() {
        let {} = this.state;

        return (
            <div className="payment-success-page btnoptions-fixed">

                <div className="payment-success-module payment-success-status__success">
                    <Flex className="status-images" justify="center">
                        <img src="assets/images/carModel/pm_success.png"/>
                    </Flex>
                    <Flex className="status-descr">
                        <p className="descr">恭喜您支付成功，经销商将在12小时内确认您的订单，感谢您的支持！</p>
                    </Flex>
                </div>

                <div className="payment-success-module payment-success-order-data">
                    <Flex className="payment-success-module-head f-borderb" justify="left">
                        <span>订单信息</span>
                    </Flex>
                    <div className="order-data-list">
                        <Flex className="car-config-head f-borderb">
                            <div className="leftImg">
                                <img src="assets/images/carModel/cfo_car1.jpg"/>
                            </div>
                            <Flex.Item className="right">
                                <p className="title">福特福克斯 1.5T 三厢 EcoBoost 自动旗舰型 活力橙</p>
                            </Flex.Item>
                        </Flex>
                        <Flex className="car-config-dealer f-borderb" justify="between" align="start">
                            <div className="left">
                                经销商：
                            </div>
                            <Flex.Item>
                                <Flex justify="between">
                                    <div className="store">广州恒福福特</div>
                                    <div className="phone">
                                        <span className="iconfont icon-dianhua"></span>
                                        <span>021-12345678</span>
                                    </div>
                                </Flex>
                                <p className="addressinfo">
                                    <span className="iconfont icon-dizhi"></span>
                                    <span>重庆市萝岗区科丰路31号华慧…</span>
                                </p>
                            </Flex.Item>
                        </Flex>
                        <ul className="info-list">
                            <li className="item">
                                <span className="label">订单号码：</span>
                                <span className="value">20180101123456</span>
                            </li>
                            <li className="item">
                                <span className="label">购车人姓名：</span>
                                <span className="value">张先生</span>
                            </li>
                            <li className="item">
                                <span className="label">手机号码：</span>
                                <span className="value">13800138000</span>
                            </li>
                            <li className="item">
                                <span className="label">支付金额：</span>
                                <span className="value">￥5000</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="payment-success-btnoptions">
                    <Flex justify="end">
                        <Button className="btn_detail" type="ghost" size="small">查看订单详情</Button>
                        <Button className="btn_shop" type="ghost" size="small">继续购物</Button>
                        <Button className="btn_home" type="ghost" size="small">返回首页</Button>
                    </Flex>
                </div>

            </div>
        );
    }
}

module.exports = PaymentSuccess;
