import React, {PropTypes, Component} from 'react'
import {inject, observer} from 'mobx-react';
import Style from './MySubscribeCancelLess.less';
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
class MySubscribeCancel extends Component {
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
        let pageClass = 'mysubscribe-cancel';

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
                            <span className="label">意向车型：</span>
                            <span className="value">福特福克斯 三厢 EcoBoost 1.5T 自动旗舰型  </span>
                        </Flex>
                        <Flex className={'item'} justify="left">
                            <span className="label">预约信息：</span>
                            <span className="value">张先生    13300000000  </span>
                        </Flex>
                        <Flex className={'item'} justify="left">
                            <span className="label">预约时间：</span>
                            <span className="value">2018.01.10 </span>
                        </Flex>
                        <Flex className={'item'} justify="left">
                            <span className="label">到店时间：</span>
                            <span className="value">2018.01.10 </span>
                        </Flex>
                        <Flex className={'item'} justify="left">
                            <span className="label">经销商家：</span>
                            <span className="value">广州恒福福特</span>
                        </Flex>
                        <Flex className={'item'} justify="left">
                            <div className="label taj">
                                <span>备&nbsp;&nbsp;注</span>：
                            </div>
                            <span className="value">上门试驾</span>
                        </Flex>
                    </div>
                </div>

                <div className={pageClass + "-module " + pageClass + "-reason"}>
                    <div className="form-item">
                        <Picker extra="请选择"
                                data={seasons}
                                title="取消原因"
                                cascade={false}
                                onOk={e => console.log('ok', e)}
                                onDismiss={e => console.log('dismiss', e)}
                        >
                            <List.Item arrow="horizontal">取消原因</List.Item>
                        </Picker>
                    </div>
                </div>

                <div className={pageClass + "-btnoptions"}>
                    <Button className="btn btn_refund" type="ghost">提&nbsp;&nbsp;交</Button>
                </div>

            </div>
        );
    }
}

module.exports = MySubscribeCancel;
