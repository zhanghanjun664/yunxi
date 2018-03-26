import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router';
import { inject ,observer} from 'mobx-react';
import Style from './testDriveLess.less';
import { InputItem ,TextareaItem ,ActionSheet ,Modal ,List ,Button ,PickerView  } from 'antd-mobile';

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
    ],
    [
        {
            label: '—',
            value: '—',
        },
    ],
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
    ],
    [
        {
            label: '万',
            value: '万',
        },

    ],
];

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
        costmodal: false,
        timemodal:false,
        inputIndex:0,
        value: null,
        cost:null,
        time:null,
        dealindex:0
    };

    componentDidMount(){
        this.getData();
        console.log("0000",this.stores.state.list)
    }

    getData = () =>{
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
            value,
        });
    }

    onScrollChange = (value) => {

    }

    dealerSelect = (key) =>{
        this.setState({dealindex:key});
    }

    render() {
        let dealindex = this.state.dealindex;
        let inputIndex = this.state.inputIndex;
        let activityList = this.props.activityList ;
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
                    <div>
                        <PickerView
                            onChange={this.onChange}
                            onScrollChange={this.onScrollChange}
                            value={this.state.cost}
                            data={seasons}
                            cascade={false}
                        />

                    </div>
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
                    <div>
                        <PickerView
                            onChange={this.onChange}
                            onScrollChange={this.onScrollChange}
                            value={this.state.time}
                            data={seasons}
                            cascade={false}
                        />

                    </div>
                </Modal>

                <div className="ask-price-page">
                    <div className="fill-info">
                        <div className="fill-form">
                            <div className={inputIndex == 3 ? 'selected cost-time-range' : 'cost-time-range'} data-index="3" onClick={this.showModal('costmodal')}>
                                <span className="title required"><span>*</span>车型</span>
                                <input className="cost-selected" id="modal" />
                                <i className="arrow"></i>
                            </div>
                            <InputItem
                                placeholder="click label to focus input"
                                ref={el => this.labelFocusInst = el}
                                onClick={()=>this.onFocus(0)}
                                className={inputIndex == 0 ? 'selected' : ''}
                                data-index="0"
                            ><div className="required" onClick={() => this.labelFocusInst.focus()}><span>*</span>姓名</div></InputItem>
                            <InputItem
                                placeholder="click label to focus input"
                                ref={el => this.labelFocusInst = el}
                                data-index="1"
                                onClick={()=>this.onFocus(1)}
                                className={inputIndex == 1 ? 'selected' : ''}
                            ><div className="required" onClick={(e) => { this.labelFocusInst.focus(); this.onFocus()} }><span>*</span>手机号码</div></InputItem>
                            <InputItem
                                placeholder="click label to focus input"
                                ref={el => this.labelFocusInst = el}
                                onClick={()=>this.onFocus(2)}
                                data-index="2"
                                className={inputIndex == 2 ? 'selected' : ''}
                            ><div className="code" onClick={() => this.labelFocusInst.focus()}>APPL <span className="get-code">获取验证码</span></div></InputItem>
                            <p className="fill-more">填写更多信息，以便为您更好的规划试驾过程</p>
                            <div className={inputIndex == 8 ? 'selected cost-time-range' : 'cost-time-range'} data-index="8" onClick={this.showModal('costmodal')}>
                                <span className="title">预计试驾时间</span>
                                <input className="cost-selected" id="time" />
                                <i className="arrow"></i>
                            </div>
                            <div className={inputIndex == 3 ? 'selected cost-time-range' : 'cost-time-range'} data-index="3" onClick={this.showModal('costmodal')}>
                                <span className="title">预算区间</span>
                                <input className="cost-selected" id="cost" />
                                <i className="arrow"></i>
                            </div>
                            <div className={inputIndex == 4 ? 'selected cost-time-range' : 'cost-time-range'} data-index="4" onClick={this.showModal('timemodal')}>
                                <span className="title">期望购车时间</span>
                                <input className="cost-selected" id="buy" />
                                <i className="arrow"></i>
                            </div>
                            <TextareaItem
                                title="留言"
                                placeholder="click the button below to focus"
                                rows={2}
                                data-index="6"
                                onClick={()=>this.onFocus(6)}
                                className={inputIndex == 6 ? 'selected' : ''}
                            />
                        </div>
                    </div>

                    <div className="select-dealer">
                        <div className="select-type">
                            <p>经销商:<span>共<i>2</i>家经销商</span></p>
                            <div className="address">
                                <i></i>重庆市
                            </div>
                        </div>
                        <div className="ask-price-page-dealer-list">
                            <ul>
                                {
                                    this.stores.state.list.map((list) => {
                                        return <li key={list.index} onClick={() => this.dealerSelect(0)}
                                                   className={dealindex == 0 ? 'selected' : ''}>
                                                    <span className="dealer-name">万江汽车投资有限公司两江分公司</span>
                                                    <span className="dealer-star"><i className="star"></i><i
                                                        className="star"></i><i className="star"></i><i className="star"></i><i
                                                        className="star"></i></span>
                                                    <p className="dealer-tel"><i></i>021-12345678</p>
                                                    <p className="dealer-address"><i></i>重庆市萝岗区科丰路31号华慧…<span>&lt;100km</span>
                                                    </p>
                                                    <p className="dealer-test"><i></i>体验上门试驾</p>
                                                </li>
                                    })
                                }
                                <li key="0" onClick={ () => this.dealerSelect(0) } className={dealindex == 0 ? 'selected' : ''}>
                                    <span className="dealer-name">万江汽车投资有限公司两江分公司</span>
                                    <span className="dealer-star"><i className="star"></i><i className="star"></i><i className="star"></i><i className="star"></i><i className="star"></i></span>
                                    <p className="dealer-tel"><i></i>021-12345678</p>
                                    <p className="dealer-address"><i></i>重庆市萝岗区科丰路31号华慧…<span>&lt;100km</span></p>
                                    <p className="dealer-test"><i></i>体验上门试驾</p>
                                </li>
                                <li key="1" onClick={ () => this.dealerSelect(1) } className={dealindex == 1 ? 'selected' : ''}>
                                    <span className="dealer-name">万江汽车投资有限公司两江分公司</span>
                                    <span className="dealer-star"><i className="star"></i><i className="star"></i><i className="star"></i><i className="star"></i><i className="star"></i></span>
                                    <p className="dealer-tel"><i></i>021-12345678</p>
                                    <p className="dealer-address"><i></i>重庆市萝岗区科丰路31号华慧…<span>&lt;100km</span></p>
                                    <p className="dealer-test"><i></i>体验上门试驾</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="submit-btn">
                        <a href="">提 交</a>
                        <p className="agree"><i></i>点击提交则视为同意<span>《福特购个人信息保护声明》</span></p>
                        <p className="have-tel"><i></i>提交后，经销商会尽快回访，请留意接听电话</p>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = askPrice;
