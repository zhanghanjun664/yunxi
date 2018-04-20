import React, {PropTypes, Component} from 'react'
import {inject, observer} from 'mobx-react';
import Style from './MyOrderRefundLess.less';
import {List, Picker, InputItem, TextareaItem, Flex, Button} from 'antd-mobile';

const seasons = [
    [
        {
            label: '2013',
            value: '2013',
        },
        {
            label: '2014',
            value: '2014',
        },
    ],
];

@inject("confirmOrder")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class MyOrderRefund extends Component {
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
        let pageClass = 'myorder-refund';

        return (
            <div className={pageClass + "-page btnoptions-fixed"}>

                <div className={pageClass + "-module no-padding-top " + pageClass + "-orderinfo"}>
                    <Flex className={pageClass + "-module-head padding_030 f-borderb"} justify="between">
                        <div>
                            <span>预约编号:</span>
                            <span>1801228767</span>
                        </div>
                        <div className="text-ready">
                            状态：待到店
                        </div>
                    </Flex>
                    <div className="orderinfo-list">
                        <Flex className={'item'} justify="left">
                            <span className="label">订单商品：</span>
                            <span className="value">福特福克斯 三厢 EcoBoost 1.5T 自动旗舰型  </span>
                        </Flex>
                        <Flex className={'item'} justify="left">
                            <div className="label taj">
                                <span>装&nbsp;&nbsp;备</span>：
                            </div>
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
                                <Flex className="mt_20">
                                    <span className='iconfont icon-dizhi'></span>
                                    <span className="value text-light-grey">重庆市萝岗区科丰路31号华慧…</span>
                                </Flex>
                            </Flex.Item>
                        </Flex>
                    </div>
                </div>

                <div className={pageClass + "-module " + pageClass + "-reason"}>
                    <div className="form-item">
                        <Picker extra="请选择"
                                data={seasons}
                                title="退款原因"
                                cascade={false}
                                onOk={e => console.log('ok', e)}
                                onDismiss={e => console.log('dismiss', e)}
                        >
                            <List.Item arrow="horizontal">退款原因</List.Item>
                        </Picker>
                    </div>
                    <div className="form-item">
                        {/*<InputItem onFocus={this.toggle} onBlur={this.toggle}>*/}
                            {/*<span>退款说明</span>*/}
                        {/*</InputItem>*/}
                        <TextareaItem
                            title="退款说明"
                            placeholder=""
                            data-seed="logId"
                            ref={el => this.autoFocusInst = el}
                            autoHeight
                        />
                    </div>
                    <div className="text-item">
                        <span className="text-dark-grey">退款金额：</span>
                        <span className="text-orange">￥5000.00</span>
                    </div>
                </div>

                <div className={pageClass + "-btnoptions"}>
                    <Button className="btn btn_refund" type="ghost">提交</Button>
                </div>

            </div>
        );
    }
}

module.exports = MyOrderRefund;
