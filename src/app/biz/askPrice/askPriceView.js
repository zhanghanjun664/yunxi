import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router';
import { inject ,observer} from 'mobx-react';
import Style from './askPriceLess.less';
import { InputItem ,TextareaItem ,ActionSheet ,Modal ,List ,Button ,PickerView  } from 'antd-mobile';
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

const seasons = [
    [
        {
            label: '5',
            value: '5',
        },
        {
            label: '10',
            value: '10',
        },
        {
            label: '15',
            value: '15',
        },
        {
            label: '20',
            value: '20',
        },
    ]
];

const rightCost = [
    [
        {
            label: '10',
            value: '10',
        },
        {
            label: '20',
            value: '20',
        },
        {
            label: '30',
            value: '30',
        },
        {
            label: '40',
            value: '40',
        },
    ]
]

@inject("askPrice")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class askPrice extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.askPrice;
    }

    state = {
        modal: false,
        costmodal: false,//预算区间弹窗
        timemodal:false,//g
        tabindex: 0,
        inputIndex:0,
        value: null,
        costone:null,
        costtwo:null,
        time:null,
        dealindex:0,//经销商num
        dealData:null, //经销商列表
        name: '',
        tel: '',
        code: '',
        cost: '',
        time: '',
        note: ''
    };

    componentDidMount(){
        this.getData();
    }

    getData = () =>{
        this.getDealerList({
            carName:'car',
            longitude:'0001',
            latitude:'001',
            cityId:'0001',
            pageNum:1,
            pageSize:2,
            type:1
        })
        this.getDealerList({
            carName:'car',
            longitude:'0001',
            latitude:'001',
            cityId:'0001',
            pageNum:1,
            pageSize:2,
            type:0
        })

    }

    /**
     * 获取经销商列表
     */
    getDealerList = (params) => {
        this.stores.getDealer(params)
    }

    handleClickTab(key) {
        let data;
        if(key==0){
            data=this.stores.state.dealerDistance;
        }else{
            data=this.stores.state.dealerScore;
        }
        this.setState({
            tabindex:key,
            dealData:data
        });

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

    onFocus(value){
        this.setState({inputIndex:value});
    }


    onChange = (value) => {
        this.setState({
            costone: value,
        });
    }

    onChangetwo = (value) => {
        this.setState({
            costtwo: value,
        });
    }

    onScrollChange = (value) => {

    }

    dealerSelect = (key) =>{
        this.setState({dealindex:key});
    }

    //表单提交
    submitAskPrice = () => {
        this.stores.askPriceSubmit({
            vehicleModel:'car',
            dealer:'0001',
            memberName:'001',
            memberMobile:'0001',
            appointmentTime:1,
            appointmentTime:2,
            purchaseTime:0,
            type:2,
            verifyCode:'',
            openid:''
        })
    }

    //经销商列表 more==1查看更多，==0展示3条,type==0表示距离,type==1表示评分
    renderDealer = (dealerList,more=0,type=0) => {
        let arr = [];
        let num = 0;
        if(!dealerList){
            let list=<div>
                本地暂无经销商，请切换城市后选择</div>
            arr.push(list)
        }else{
            let length = dealerList.length
            for(let i = 0; i < length; i++) {
                let dealer = dealerList[i];
                for(let j = 0; j < dealer.shop.length;j++){
                    if(num > 2 && more == 0) break;
                    let shop = dealer.shop[j];
                    let html=<li key={num} onClick={this.dealerSelect.bind(this, num)}
                                 className={this.state.dealindex == num ? 'selected' : ''}>
                        <span className="dealer-name">{shop.name}</span>
                        <span className="dealer-star"><StarRange number={dealer.score} /></span>
                        <p className="dealer-tel fz_24"><i></i>{dealer.salePhone}</p>
                        <p className="dealer-address"><i></i>{shop.address}<span>距您&lt;{shop.distance}km</span>
                        </p>
                    </li>;
                    num++;
                    arr.push(html)
                }


            }
        }

        return arr;
    }

    render() {
        let tabindex = this.state.tabindex;
        let dealindex = this.state.dealindex;
        let inputIndex = this.state.inputIndex;
        let activityList = this.props.activityList ;
        this.state.dealData = this.stores.state.dealerDistance;
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
                >
                        <PickerView
                            onChange={this.onChange}
                            onScrollChange={this.onScrollChange}
                            value={this.state.costone}
                            data={seasons}
                            cascade={false}
                        />
                         <span className="picker-part-left">—</span>
                         <span className="picker-part-right">万</span>
                        <PickerView
                            onChange={this.onChangetwo}
                            prefixCls  ={'am-picker picker-right'}
                            onScrollChange={this.onScrollChange}
                            value={this.state.costtwo}
                            data={rightCost}
                            cascade={false}
                        />
                        <div className="show-picker-selected"></div>
                </Modal>

                <Modal
                    className="ask-price-modal-page"
                    visible={this.state.timemodal}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose('timemodal')}
                    title="购车时间"
                    footer={[{ text: '取消', onPress: () => { this.onClose('timemodal')(); } },{ text: '确定', onPress: () => { this.onClose('timemodal')(); } }]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                        <PickerView
                            onChange={this.onChange}
                            onScrollChange={this.onScrollChange}
                            value={this.state.costone}
                            data={seasons}
                            cascade={false}
                        />
                        <span className="picker-part-left">—</span>
                        <PickerView
                            prefixCls  ={'am-picker picker-right'}
                            onChange={this.onChangetwo}
                            onScrollChange={this.onScrollChange}
                            value={this.state.costtwo}
                            data={rightCost}
                            cascade={false}
                        />
                        <span className="picker-part-right">年</span>
                        <div className="show-picker-selected"></div>
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
                                    this.renderDealer(this.state.dealData,1,tabindex)
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
                            <span>福特福克斯 三厢 EcoBoost 1.5T 自动旗舰型</span>
                            <a href="">切换车型</a>
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
                                    this.renderDealer(this.state.dealData,0,tabindex)
                                }
                            </ul>
                            <div className="dealer-more">
                                <span className={!this.state.dealData ? 'hide' : 'more-btn'} onClick={this.showModal('modal')}>查看更多</span>
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
                                data-index="0"
                                value={this.state.name}
                                onChange={(value) => {this.setState({name: value})}}
                            ><div className="required" onClick={() => this.labelFocusInst.focus()}><span>*</span>姓名</div></InputItem>
                            <InputItem
                                placeholder="请输入手机号码"
                                ref={el => this.labelFocusInst = el}
                                data-index="1"
                                onClick={()=>this.onFocus(1)}
                                className={inputIndex == 1 ? 'selected' : ''}
                                value={this.state.tel}
                                onChange={(value) => {this.setState({tel: value})}}
                            ><div className="required" onClick={(e) => { this.labelFocusInst.focus(); this.onFocus()} }><span>*</span>手机号码</div></InputItem>
                            <InputItem
                                placeholder="请输入验证码"
                                ref={el => this.labelFocusInst = el}
                                onClick={()=>this.onFocus(2)}
                                data-index="2"
                                className={inputIndex == 2 ? 'selected' : ''}
                                value={this.state.code}
                                onChange={(value) => {this.setState({code: value})}}
                            ><div className="code" onClick={() => this.labelFocusInst.focus()}>APPL <span className="get-code">发送验证码</span></div></InputItem>
                            <div className={inputIndex == 3 ? 'selected cost-time-range' : 'cost-time-range'} data-index="3" onClick={this.showModal('costmodal')}>
                                <span className="title">预算区间</span>
                                <span className="cost-selected"></span>
                                <i className="arrow"></i>
                            </div>
                            <div className={inputIndex == 4 ? 'selected cost-time-range' : 'cost-time-range'} data-index="4" onClick={this.showModal('timemodal')}>
                                <span className="title">购车时间</span>
                                <span className="time-selected"></span>
                                <i className="arrow"></i>
                            </div>
                            <TextareaItem
                                title="留言"
                                rows={2}
                                data-index="6"
                                onClick={()=>this.onFocus(6)}
                                className={inputIndex == 6 ? 'selected' : ''}
                                value={this.state.note}
                                onChange={(value) => {this.setState({note: value})}}
                            />
                            <p className="fill-tips fz_24">*位置不能为空</p>
                        </div>
                    </div>
                    <div className="submit-btn">
                        <span className="sub-span" onClick={this.submitAskPrice() }>提 交</span>
                        <p className="fz_24"><i></i>点击提交则视为同意<span>《福特购个人信息保护声明》</span></p>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = askPrice;
