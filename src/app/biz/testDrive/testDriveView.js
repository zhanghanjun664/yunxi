import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router';
import { inject ,observer} from 'mobx-react';
import Style from './TestDriveLess.less';
import {cloneDeep, get} from 'lodash';
import { InputItem ,TextareaItem ,ActionSheet ,Modal ,List ,Button ,PickerView,DatePickerView   } from 'antd-mobile';
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

@inject("testDrive")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class testDrice extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.testDrive;
    }

    state = {
        modal: false, // 车型显示状态
        costmodal: false, //   预算金额弹出层
        buytimemodal:false, // 预计购车时间
        apptimemodal:false, // 预约时间弹出 状态
        inputIndex:0,
        dealindex:0,

        selBuget: '',
        selBuyTime: '',
        formData: {
            vehicleModel:'',
            dealer: '',
            memberName: '',
            memberMobile: '',
            appointmentTime:'',
            budgetRange:'',
            purchaseTime:'',
            type:1,
            verifyCode:''
        }
    };

    getFormatDate(d) {
        if(d == '' ) return '';
        let full = d.getFullYear(),
            month = d.getMonth() + 1,
            date = d.getDate(),
            hour = d.getHours(),
            min = d.getMinutes();

        let getZero = (x) =>{
            return x<10?('0'+x):x;
        }
         
        return `${full}-${getZero(month)}-${getZero(month)} ${getZero(hour)}:${getZero(min) }`;
    }

    componentDidMount() {

        let location = window.app.router.location;

        let {formData} = this.state;


        if(location.search !== '') {

            let params = location.query;

            this.stores.getDetail(params);

            formData.vehicleModel = params.itemId

        }

        

        this.stores.getDealer({
            pageSize:20,
            pageNum:1,
            cityId:'440000000000',
            longitude:40,
            latitude:120,
            type:1
        })
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

    // 取验证码
    getVerCode(e) {
        const params = {
            mobile: this.state.formData.memberMobile
        }

        this.stores.getVerCode(params)
    }


    onChange (value, key) {
        let { formData } = this.state;
        
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

    // 设置选中的经销商ID
    dealerSelect = (key, id) =>{

        this.setState({dealindex:key});

        let { formData } = this.state;
        
        formData.dealer = id;

        this.setState({formData})
        
    }

    gotoSelect() {
        window.app.routerGoTo('/carModelList?goback=testdrive')
    }

    // 提交预约试驾 
    onSubmit (e) {
        e.preventDefault();
        let {formData} = this.state;
        let formSub = cloneDeep(formData);

        formSub.budgetRange = formSub.budgetRange[0];

        formSub.purchaseTime = formSub.purchaseTime[0];

        formSub.appointmentTime = this.getFormatDate(formSub.appointmentTime).replace(/-/g, '/') + ':00';

        this.stores.submitAppointMent(formSub)
    }


    render() {
        let dealindex = this.state.dealindex;
        let inputIndex = this.state.inputIndex;
        let activityList = this.props.activityList ;
        let carDetail = this.stores.state.modelDetail;
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
                    visible={this.state.apptimemodal}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose('apptimemodal')}
                    title="预约时间"
                    footer={[{ text: '取消', onPress: () => { this.onClose('apptimemodal')(); } },{ text: '确定', onPress: () => { this.onClose('apptimemodal')(); } }]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                > <DatePickerView
                    onChange={x => this.onChange(x, 'appointmentTime')}
                    mode="datetime"
                    minDate={(x=> {let m = new Date(x); m.setHours(m.getHours()+1);m.setMinutes(0); return m})(Date.now())}
                    maxDate={(x=> {let m = new Date(x); m.setFullYear(m.getFullYear()+1); return m})(Date.now())}
                    minuteStep={20}
                    value={this.state.formData.appointmentTime}
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

                <div className="ask-price-page">
                    <div className="fill-info">
                        <div className="fill-form">
                            <div className={inputIndex == 3 ? 'selected cost-time-range' : 'cost-time-range'} data-index="3" onClick={this.showModal('modal')}>
                                <span className="title required"><span>*</span>车型</span>
                                <input className="cost-selected" value={carDetail.name} onClick={e=>this.gotoSelect(e)}/>
                                <i className="arrow"></i>
                            </div>
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
                                type="phone"
                                ref={el => this.labelFocusInst = el}
                                data-index="1"
                                onClick={()=>this.onFocus(1)}
                                onChange={val => this.onChange(val, 'memberMobile') }
                                className={inputIndex == 1 ? 'selected' : ''}
                            ><div className="required" onClick={(e) => { this.labelFocusInst.focus(); this.onFocus()} }><span>*</span>手机号码</div></InputItem>
                            <InputItem
                                placeholder="请输入验证码"
                                ref={el => this.labelFocusInst = el}
                                onClick={()=>this.onFocus(2)}
                                type="number"
                                maxLength={6}
                                data-index="2"
                                value={this.stores.state.verCode}
                                onChange={val => this.onChange(val, 'verifyCode') }
                                className={inputIndex == 2 ? 'selected' : ''}
                            ><div className="code" onClick={() => this.labelFocusInst.focus()}>验证码<span className="get-code" onClick={x=>this.getVerCode(x)}>获取验证码</span></div></InputItem>
                            <p className="fill-more">填写更多信息，以便为您更好的规划试驾过程</p>
                            <div className={inputIndex == 8 ? 'selected cost-time-range' : 'cost-time-range'} data-index="8" onClick={this.showModal('apptimemodal')}>
                                <span className="title">预计试驾时间</span>
                                <input className="cost-selected" id="time" value={this.getFormatDate(this.state.formData.appointmentTime)}/>
                                <i className="arrow"></i>
                            </div>
                            <div className={inputIndex == 3 ? 'selected cost-time-range' : 'cost-time-range'} data-index="3" onClick={this.showModal('costmodal')}>
                                <span className="title">预算区间</span>
                                <input className="cost-selected" id="cost" value={this.state.selBuget}/>
                                <i className="arrow"></i>
                            </div>
                            <div className={inputIndex == 4 ? 'selected cost-time-range' : 'cost-time-range'} data-index="4" onClick={this.showModal('buytimemodal')}>
                                <span className="title">期望购车时间</span>
                                <input className="cost-selected" id="buy" value={this.state.selBuyTime}/>
                                <i className="arrow"></i>
                            </div>
                            <TextareaItem
                                title="备注"
                                rows={2}
                                data-index="6"
                                onClick={()=>this.onFocus(6)}
                                className={inputIndex == 6 ? 'selected' : ''}
                            />
                        </div>
                    </div>

                    <div className="select-dealer">
                        <div className="select-type">
                            <p>经销商:<span>共<i>{ this.stores.state.dealerList.length}</i>家经销商</span></p>
                            <div className="address">
                                <i></i>广州市
                            </div>
                        </div>
                        <div className="ask-price-page-dealer-list">
                            <ul>
                                {
                                    this.stores.state.dealerList.map((item, index) => {
                                        return <li key={item.id} onClick={() => this.dealerSelect(index, item.id)}
                                                   className={dealindex == index ? 'selected' : ''}>
                                                    <span className="dealer-name">{item.dealerName}</span>
                                                    <span className="dealer-star">
                                                        <StarRange number={item.score} />
                                                    </span>
                                                    <p className="dealer-tel"><i></i>{item.salePhone}</p>
                                                    <p className="dealer-address"><i></i>{item.shops[0].address}<span>&lt;{(item.shops[0].distance/1000).toFixed(2)}km</span>
                                                    </p>
                                                    <p className="dealer-test"><i></i>体验上门试驾</p>
                                                </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>

                    <div className="submit-btn">
                        <a href="#" onClick={e=>this.onSubmit(e)}>提 交</a>
                        <p className="agree"><i></i>点击提交则视为同意<span>《福特购个人信息保护声明》</span></p>
                        <p className="have-tel"><i></i>提交后，经销商会尽快回访，请留意接听电话</p>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = testDrice;
