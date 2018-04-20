import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router';
import { inject ,observer} from 'mobx-react';
import Style from './ConfirmOrderLess.less';
import { InputItem, Flex, Button, TextareaItem, Toast } from 'antd-mobile';
import { StarRange} from 'widget';
import Util from 'util';
import Verify from 'util/Verify.js';

@inject("confirmOrder")
@observer
class ConfirmOrder extends Component {
    constructor(props, context) {
        super(props, context)
				this.stores = this.props.confirmOrder;
				this.carId = this.props.location.query.carId
				this.dealerId = this.props.location.query.dealerId
				this.state = {
						inputIndex: 0,
						formData: {
								mobile: '',
								name: '',
								remark: ''
						}
				}
    }


    componentDidMount() {
        let { dealerId } = this.props.location.query
        let { longitude, latitude } = Util.getCoordinate()
        this.stores.getDealerInfo({
            dealerId: dealerId,
            longtitude: longitude,
            latitude: latitude,
            areaCode: Util.getCityID().postCode
        })
    }

    onChange (value, key) {
        let { formData } = this.state
        formData[key] = value

        if(key == 'phone'){
            formData[key] = value.replace(/\s/g, '');
        }
        console.log(value, key)
        this.setState({ formData });
    };

    onFocus(value) {
        this.setState({inputIndex:value});
		}
		postPayInfo(money){
			console.log(money)
			let { formData } = this.state
			if (!formData.name) {
				Toast.info('请输入姓名')
				return
			}
			if (!Verify.isCNorEng(formData.name)) {
				Toast.info('请输入正确的姓名')
				return
			}

			if (!Verify.isPhoneNum(formData.mobile)) {
				Toast.info('请输入正确的手机号')
				return
			}

			this.stores.postPayInfo({
				memberName: formData.name,
				memberMobile: formData.mobile,
				remark: formData.mark,
				carId: this.carId
			})
		}
		toUrl(url){
			window.app.routerGoTo(url)
		}

    render() {
        let { formData, inputIndex } = this.state;
        let { dealerInfo } = this.stores.state

        return (
            <div>
                <div className="confirm-order-page">

                    <div className="confirm-order-module confirm-order-car-config">
                        <Flex className="car-config-head f-borderb">
                            <div className="leftImg">
                                <img src="assets/images/carModel/cfo_car1.jpg" />
                            </div>
                            <Flex.Item className="right" >
                                <p className="title">福特福克斯 1.5T 三厢 EcoBoost 自动旗舰型  活力橙</p>
                            </Flex.Item>
                        </Flex>
                        <Flex className="car-config-descr">
                            <p className="descr">1.5T涡轮增压/紧凑型轿车/自动变速箱/无钥匙启动/全景天窗/17寸轮毂</p>
                        </Flex>
                        <Flex className="car-config-foot">
                            <div className="left">
                                <p className="price">经销商报价：￥11.58万起</p>
                            </div>
                            <Flex.Item className="right">
                                <p className="detailBtn" onClick={this.toUrl.bind(this, '/allConfig?itemId='+this.carId)}>查看详细配置清单</p>
                            </Flex.Item>
                        </Flex>
                    </div>

                    <div className="confirm-order-module confirm-order-dealer">
                        <Flex className="confirm-order-module-head" justify="left">
                            <span>经销商</span>
                        </Flex>
                        <div className="dealer-info">
                            <Flex justify="between">
                                <span className="store">{dealerInfo.dealerName}</span>
                                <StarRange number={dealerInfo.score} />
                            </Flex>
                            <div className="phone">
                                <span className="iconfont icon-dianhua"></span>
                                <span>{dealerInfo.salePhone}</span>
                            </div>

                            {
                                dealerInfo.shops && (
                                    dealerInfo.shops.map((item, index)=>{
                                        return (
                                            <Flex justify="between" className="address" key={index}>
                                                <Flex className="">
                                                    <div className="addressinfo">
                                                        <span className="iconfont icon-dizhi"></span>
                                                        <span className='ellipsis'>重庆市萝岗区科丰路31号华慧…重庆市萝岗区科丰路31号华慧…</span>
                                                    </div>
                                                </Flex>
                                                <span className="distance"> &lt;{item.distance&&Util.changeDistance(item.distance)}km</span>
                                            </Flex>

                                        )
                                    })
                                )
                            }
                        </div>
                    </div>

                    <div className="confirm-order-module confirm-order-data">
                        <Flex className="confirm-order-module-head f-borderb" justify="left">
                            <span>确认信息</span>
                        </Flex>
                        <div className="list">

                            <InputItem
                                placeholder="请输入姓名"
                                onClick={()=>this.onFocus(0)}
                                className={inputIndex == 0 ? 'selected' : ''}
                                value={formData.name}
                                maxLength={20}
                                onChange={val => this.onChange(val, 'name') }
                                data-index="0"
                            >
                                <div className="required">购车人姓名</div>
                            </InputItem>

                            <InputItem
                                placeholder="请输入手机号码"
                                type="phone"
                                data-index="1"
                                onClick={()=>this.onFocus(1)}
                                value={formData.mobile}
                                onChange={val => this.onChange(val, 'mobile') }
                                className={inputIndex == 1 ? 'selected' : ''}
                            >
                                <div className="required">手机号码</div>
                            </InputItem>
                            
                            <TextareaItem
                                title="备注"
                                rows={2}
                                data-index="6"
                                onClick={()=>this.onFocus(6)}
                                className={inputIndex == 6 ? 'selected' : ''}
                                value={formData.remark}
                                onChange={val => {this.onChange(val, 'remark')}}
                            />

                            <p className="orange_tip">*位置不能为空</p>
                        </div>
                    </div>

                    <div className="confirm-order-module confirm-order-payment">
                        <Flex className="item" justify="between" align="end">
                            <Flex className="ellipsis fz_24">
                                <span className="price">订单金额：</span>
                            </Flex>
                            <div className="price_number">￥5000.00</div>
                        </Flex>
                        <Flex className="item" justify="between" align="end">
                            <Flex className="ellipsis fz_24">
                                <span className="amount">实付金额：</span>
                            </Flex>
                            <div className="amount_number">￥5000.00</div>
                        </Flex>
                    </div>

                    <Button className="confirm-order-submit" type="ghost" onClick={this.postPayInfo.bind(this, 5000)}>使用微信支付定金 ￥5000</Button>

                </div>
            </div>
        );
    }
}
module.exports = ConfirmOrder;
