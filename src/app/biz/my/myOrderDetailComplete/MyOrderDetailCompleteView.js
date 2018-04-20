import React, {PropTypes, Component} from 'react'
import {inject, observer} from 'mobx-react';
import Style from './MyOrderDetailCompleteLess.less';
import {InputItem, Flex, Button} from 'antd-mobile';

@inject("confirmOrder")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class MyOrderDetailComplete extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.confirmOrder;
    }

    state = {
        formData: {
            budgetRange: '',
            purchaseTime: '',
            dealer: '',
            dealerName: '',
            mobile: '',
            name: '',
            checkCode: '',
        }
    };

    componentDidMount() {
        // this.stores.getList(this.state.queryParam);
        //
        // let location = window.app.router.location;
        //
        // if('dealerId' in location.query) {
        //     this.setState({'dealerId': location.query.dealerId})
        // }
    }

    onChange(value, key) {
        this.setState({value});
    };

    render() {
        let {formData} = this.state;
        let pageClass = 'myorder-detail-complete';

        return (
            <div className={pageClass + "-page btnoptions-fixed"}>

                <div className={pageClass + "-module " + pageClass + "-orderinfo"}>
                    <Flex className={pageClass + "-module-head f-borderb"} justify="between">
                        <div>
                            <span>预约编号:</span>
                            <span>1801228767</span>
                        </div>
                        <div className="text-complete">
                            状态：待支付
                        </div>
                    </Flex>
                    <div className="orderinfo-list">
                        <Flex className={'item'} justify="left">
                            <span className="label">订单商品：</span>
                            <span className="value">福特福克斯 三厢 EcoBoost 1.5T 自动旗舰型  </span>
                        </Flex>
                        <Flex className={'item'} justify="left">
                            <span className="label">装备：</span>
                            <span className="value">全景倒车影像 +5000 </span>
                        </Flex>
                        <Flex className={'item'} justify="left">
                            <span className="label">用户信息：</span>
                            <span className="value">张先生    13300000000  </span>
                        </Flex>
                        <Flex className={'item'} justify="left">
                            <span className="label">下单时间：</span>
                            <span className="value">2018.01.10 </span>
                        </Flex>
                        <Flex className={'item'} justify="left">
                            <span className="label">经销商家：</span>
                            <Flex.Item className="value">
                                <Flex justify="between">
                                    <div className="value">广州恒福福特</div>
                                    <div>
                                        <span className='iconfont icon-dianhua'></span>
                                        <span className="value text-grey">021-12345678</span>
                                    </div>
                                </Flex>
                                <Flex className="mt20">
                                    <span className='iconfont icon-dizhi'></span>
                                    <span className="value text-light-grey">重庆市萝岗区科丰路31号华慧…</span>
                                </Flex>
                            </Flex.Item>
                        </Flex>
                        <Flex className={'item'} justify="left">
                            地图
                        </Flex>
                        <Flex className={'item'} justify="left">
                            <span className="label">备注：</span>
                            <span className="value">无</span>
                        </Flex>
                    </div>
                </div>

                <div className={pageClass + "-module " + pageClass + "-payment"}>
                    <Flex className="item" justify="between" align="end">
                        <Flex.Item>
                            <span className="price">订单金额：</span>
                        </Flex.Item>
                        <div className="price_number">￥5000.00</div>
                    </Flex>
                    <Flex className="item" justify="between" align="end">
                        <Flex.Item>
                            <span className="amount">实付金额：</span>
                        </Flex.Item>
                        <div className="amount_number">￥5000.00</div>
                    </Flex>
                </div>

                <div className={pageClass + "-module " + pageClass + "-btnoptions"}>
                    <Flex justify="end">
                        <Button className="btn btn_refund" type="ghost" inline size="small">去评价</Button>
                    </Flex>
                </div>

            </div>
        );
    }
}

module.exports = MyOrderDetailComplete;
