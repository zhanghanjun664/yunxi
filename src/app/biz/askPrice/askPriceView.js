/*
 * @time 2017.4.5
 * @author 七天
 * @title 询询价组件 
 */
import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router';
import { inject ,observer} from 'mobx-react';
import Style from './AskPriceLess.less';
import {get, cloneDeep} from 'lodash'
import { InputItem ,TextareaItem ,ActionSheet ,Modal ,List ,Button ,PickerView, Toast} from 'antd-mobile';
import { StarRange } from 'widget';

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}
const buyDate = [
    [
        {
            label: '一个月内',
            value: 1,
        },
        {
            label: '三个月内',
            value: 2,
        },
        {
            label: '半年内',
            value: 3,
        },
        {
            label: '一年内',
            value: 4,
        },
        {
            label: '未定',
            value: 5,
        }
    ]
];
const buyDateArr = buyDate[0].map(x=>x.label);
const buyBuget = [
    [
        {
            label: '10万元以内',
            value: 1,
        },
        {
            label: '10~15万',
            value: 2,
        },
        {
            label: '15~20万',
            value: 3,
        },
        {
            label: '20万以上',
            value: 4,
        },
    ]
];
const buyBugetArr = buyBuget[0].map(x=>x.label);

@inject("askPrice")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class askPrice extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.askPrice;
        this.state = {
            selBuget:'',
            selBuyTime:'',
            modal: false, // 车型显示状态
            costmodal: false, //   预算金额弹出层
            buytimemodal:false, // 预计购车时间
            tabindex:0,
            inputIndex:0,
            dealerIndex:0,
            formData: {
                vehicleModel:'',
                dealer: '',
                memberName: '',
                memberMobile: '',
                budgetRange:'',
                purchaseTime:'',
                type:2,
                verifyCode:''
            }
        }
    }

    componentDidMount() {

        let location = window.app.router.location;

        let {formData} = this.state;


        if(location.search !== '') {

            let params = location.query;

            this.stores.getDetail(params);

            formData.vehicleModel = params.itemId

        }

        this.getData(1);
    }

    getFormatDate(d) {
        if(d == '' ) return '';
        let full = d.getFullYear(),
            month = d.getMonth() + 1,
            date = d.getDate(),
            hour = d.getHours(),
            min = d.getMinutes();
        
        return `${full}年${month}月${date}日 ${hour<10?('0'+hour):hour}:${min<10?('0'+min):min }`;
    }

    getData(type) {
        const params = {
            carName: 'car',
            longitude: '12.486455',
            latitude: '23.241323',
            cityId :'440000000000',
            pageNum : 1,
            pageSize : 20,
            type
        }

        this.stores.getDealers(params)

    }

    handleClickTab(key) {
        this.setState({tabindex:key})

        this.getData(key+1)
    }

    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }

    getVerCode(e) {
        let mobile = this.state.formData.memberMobile;
        let reg = /^1[3758]\d{9}$/g;

        if(mobile!=='' && reg.test(mobile)) {
            const params = {
                mobile
            }
            this.stores.getVerCode(params)

        } else {
            Toast.fail('请输入正确的手机号', 3);
        }
    }

    onFocus(value){
        this.setState({inputIndex:value});
    }


    onChange (value, key) {

        let formData = this.state.formData;
        
        formData[key] = value;

        if(key === 'memberMobile') {
            formData[key] = value.replace(/\s/g, '');
        }

        if(key === 'budgetRange') {
            this.setState({
                selBuget : buyBugetArr[value[0]]
            })
        }

        if(key === 'purchaseTime') {
            this.setState({
                selBuyTime : buyDateArr[value[0]]
            })
        }

        this.setState({
            formData
        })
    }
    //表单提交
    submitAskPrice = () => {
        let {formData} = this.state;
        let {isLoading } = this.stores.state;
        let formSub = cloneDeep(formData);

        formSub.budgetRange = formSub.budgetRange[0];

        formSub.purchaseTime = formSub.purchaseTime[0];

        if(!isLoading) {
            this.stores.askPriceSubmit(formSub, () => {
                Toast.success('提交成功！', 2.5)
            })
        }

    }

    dealerSelect (item, dealerIndex) {
        let {formData } = this.state;

        formData.dealer = item.id;

        this.setState({formData, dealerIndex});
    }

    //经销商列表 more==1查看更多，==0展示3条,type==0表示距离,type==1表示评分
    renderDealer (dealerList) {

        let length = dealerList.length;

        let dealerIndex = this.state.dealerIndex
    
        if(length < 1) {
           return <div>本地暂无经销商，请切换城市后选择</div>
        } else {
           return dealerList.map((item,index)=> {
                let shop = item.shops[0]
                return <li key={'Ac_' + item.id} onClick={(e) => this.dealerSelect(item, index)} className={dealerIndex===index?'selected':''} >
                        <span className="dealer-name">{item.dealerName}</span>
                        <span className="dealer-star"><StarRange number={item.score} /></span>
                        <p className="dealer-tel fz_24"><i></i>{item.salePhone}</p>
                        <p className="dealer-address"><i></i>{shop.address}<span>距您&lt;{(shop.distance/1000).toFixed(2)}km</span>
                        </p>
                    </li>;
            })
        }
    }

    render() {
        let {tabindex, dealindex, inputIndex} = this.state;

        let activityList = this.props.activityList ;
        let dealerList = this.stores.state.dealerList;
        let modeDetail = this.stores.state.modelDetail 
        return (
            <div>
                 <Modal
                    className="ask-price-modal-page"
                    visible={this.state.costmodal}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose('costmodal')}
                    title="预算区间"
                    footer={[{ text: '取消', onPress: () => { this.onClose('costmodal')(); } },{ text: '确定', onPress: () => { this.onClose('costmodal')(); } }]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                > <PickerView
                            onChange={x => this.onChange(x, 'budgetRange')}
                            data={buyBuget}
                            value={this.state.formData.budgetRange}
                            cascade={false}
                        />
                </Modal>

                <Modal
                    className="ask-price-modal-page"
                    visible={this.state.buytimemodal}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose('buytimemodal')}
                    title="购车时间"
                    footer={[{ text: '取消', onPress: () => { this.onClose('buytimemodal')(); } },{ text: '确定', onPress: () => { this.onClose('buytimemodal')(); } }]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                        <PickerView
                            onChange={ x => this.onChange(x, 'purchaseTime') }
                            value={this.state.formData.purchaseTime}
                            data={buyDate}
                            cascade={false}
                        />
                </Modal>

                <Modal
                    popup
                    visible={this.state.modal}
                    onClose={this.onClose('modal')}
                    animationType="slide-up"
                >
                    <div className="ask-price-page-popup-list">
                        <div className="ask-price-page-title">选择经销商</div>
                        <div className="ask-price-page-dealer-list">
                            <ul>
                                {
                                    this.renderDealer(dealerList)
                                }
                            </ul>
                        </div>
                        <div className="ask-price-page-grey"></div>
                        <div className="ask-price-page-cancel-btn">
                            <p onClick={ this.onClose('modal') }>取消</p>
                        </div>
                    </div>
                </Modal>

                <div className="ask-price-page">
                    <div className="aim-model">
                        <p>意向车型：</p>
                        <p>
                            <span>{modeDetail.name}</span>
                            <Link  to={'/carModelList?goback=askprice'}>切换车型</Link>
                        </p>
                    </div>
                    <div className="select-dealer">
                        <div className="select-type">
                            <p>选择经销商</p>
                            <div className="type">
                                <span onClick={ () => this.handleClickTab(0) } className={tabindex == 0 ? 'selected distance' : 'distance'}><i></i>距离</span>
                                <span onClick={ () => this.handleClickTab(1) }  className={tabindex == 1 ? 'selected score' : 'score'}><i></i>评分</span>
                            </div>
                        </div>
                        <div className="ask-price-page-dealer-list">
                            <ul>
                                {
                                    this.renderDealer(dealerList)
                                }
                            </ul>
                            <div className="dealer-more">
                                <span className="more-btn" onClick={this.showModal('modal')}>查看更多</span>
                            </div>
                        </div>
                    </div>
                    <div className="fill-info">
                        <p className="fill-title">填写信息</p>
                        <div className="fill-form">
                            <InputItem
                                placeholder="请输入姓名"
                                ref={el => this.labelFocusInst = el}
                                onClick={()=>this.onFocus(0)}
                                className={inputIndex == 0 ? 'selected' : ''}
                                onChange={val => this.onChange(val, 'memberName') }
                                data-index="0"
                            ><div className="required" onClick={() => this.labelFocusInst.focus()}><span>*</span>姓名</div></InputItem>
                            <InputItem
                                placeholder="请输入手机号码"
                                ref={el => this.labelFocusInst = el}
                                type="phone"
                                data-index="1"
                                onChange={val => this.onChange(val, 'memberMobile') }
                                onClick={()=>this.onFocus(1)}
                                className={inputIndex == 1 ? 'selected' : ''}
                            ><div className="required" onClick={(e) => { this.labelFocusInst.focus(); this.onFocus()} }><span>*</span>手机号码</div></InputItem>
                            <InputItem
                                placeholder="请输入验证码"
                                ref={el => this.labelFocusInst = el}
                                onClick={()=>this.onFocus(2)}
                                data-index="2"
                                type="number"
                                maxLength={6}
                                value={this.stores.state.verCode}
                                onChange={val => this.onChange(val, 'verifyCode') }
                                className={inputIndex == 2 ? 'selected' : ''}
                            ><div className="code" onClick={() => this.labelFocusInst.focus()}>验证码<span className="get-code"  onClick={x=>this.getVerCode(x)}>发送验证码</span></div></InputItem>
                            <div className={inputIndex == 3 ? 'selected cost-time-range' : 'cost-time-range'} data-index="3" onClick={this.showModal('costmodal')}>
                                <span className="title">预算区间</span>
                                <input className="cost-selected" value={this.state.selBuget}/>
                                <i className="arrow"></i>
                            </div>
                            <div className={inputIndex == 4 ? 'selected cost-time-range' : 'cost-time-range'} data-index="4" onClick={this.showModal('buytimemodal')}>
                                <span className="title">购车时间</span>
                                <input className="cost-selected" id="buy" value={this.state.selBuyTime}/>
                                <i className="arrow"></i>
                            </div>
                            <TextareaItem
                                title="留言"
                                rows={2}
                                data-index="6"
                                onClick={()=>this.onFocus(6)}
                                className={inputIndex == 6 ? 'selected' : ''}
                                onChange={(value) => {this.setState({note: value})}}
                            />
                            <p className="fill-tips fz_24">*位置不能为空</p>
                        </div>
                    </div>
                    <div className="submit-btn">
                        <Button className="sub-span" onClick={e => this.submitAskPrice() } loading={this.stores.state.isLoading} >提交</Button>
                        <p className="fz_24"><i></i>点击提交则视为同意<span>《福特购个人信息保护声明》</span></p>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = askPrice;