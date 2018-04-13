import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router';
import { inject ,observer} from 'mobx-react';
import Style from './TestDriveLess.less';
import {cloneDeep, get, extend} from 'lodash';
import { InputItem ,TextareaItem ,ActionSheet ,Modal ,List ,Button ,PickerView,DatePickerView,Toast} from 'antd-mobile';
import { StarRange } from 'widget';
import PickerOption from 'pubBiz/pickerOption/PickerOption'
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
        hasBind : false, // 是否绑定手机号
        selBuget: '',
        selBuyTime: '',
        formData: {
            vehicleModel:'',
            vehicleModelName:'',
            dealer: '',
            dealerName:'',
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
         
        return `${full}-${getZero(month)}-${getZero(date)} ${getZero(hour)}:${getZero(min) }`;
    }

    getCoordinate() {
        let tmp = localStorage.getItem('myPosition');
        if(tmp !==  null) {
            let {longitude, latitude} = JSON.parse(tmp);
            return {
                longitude,
                latitude
            };
        } else {
            // 默认坐标
            return {
                longitude:23.10674,
                latitude:113.440332,
            }
        }
    }

    getCityID() {
        let tmp = localStorage.getItem('myCity');
        if(tmp !==  null) {
            let {postCode} = JSON.parse(tmp);
            return {
                cityId:postCode
            };
        } else {
            return {}
        }
    }

    componentDidMount() {

        let location = window.app.router.location;

        let {formData} = this.state;


        if(location.search !== '') {

            let params = location.query;

            if('itemId' in params) {
                this.stores.getDetail(params, (x)=> {
                    formData.vehicleModelName = x.name
                });
                formData.vehicleModel = params.itemId
            }
            if('dealer' in params) {
                formData.dealer = params.dealer;
            }

            formData.vehicleModel = params.itemId
        }

        let parm2 = {
            carId: formData.vehicleModel,
            pageSize:20,
            pageNum:1,
            type:1
        }

        extend(parm2, this.getCityID(), this.getCoordinate())

        this.stores.getDealer(parm2, x=>{
            if(x.length > 0) {
                formData.dealer = x[0].id;
                formData.dealerName = x[0].dealerName;
            }
        })

        // 自动填充姓名和手机号，并判断是否要输入验证码
        this.stores.getUserInfo('', (data) => {
            formData.memberMobile = data.mobile;
            formData.memberName = data.name
            if(data.mobile) {
                this.setState({hasBind:false})
            }
        });
    }

    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }

    onClose = key => (flag) => {
        this.setState({
            [key]: false,
        });

        if(flag) {

            let {formData} = this.state;
            this.onChange(formData.appointmentTime, 'appointmentTime')
        }


    }

    onFocus(value){
        this.setState({inputIndex:value});
    }

    // 取验证码
    getVerCode(e) {

        let mobile = this.state.formData.memberMobile;
        let reg = /^1[3758]\d{9}$/g;

        if(mobile!=='' && reg.test(mobile)) {
            const params = {
                mobile
            }
            this.stores.getVerCode(params)

        } else {
            Toast.fail('请输入正确的手机号', 1.5);
        }
    }


    onChange (value, key) {
        let { formData } = this.state;
        
        formData[key] = value;

        if(key === 'memberMobile') {
            formData[key] = value.replace(/\s/g, '');
        }

        if(key === 'budgetRange') {
            this.setState({
                selBuget : value[1]
            })
        }

        if(key === 'purchaseTime') {
            this.setState({
                selBuyTime : value[1]
            })
        }

        this.setState({
            formData
        })
    }

    // 设置选中的经销商ID
    dealerSelect = (key, item) => {

        this.setState({dealindex:key});

        let { formData } = this.state;
        
        formData.dealer = item.id;
        formData.dealerName = item.dealerName;

        this.setState({formData})
        
    }

    gotoSelect() {
        window.app.routerGoTo('/carModelList?goback=testdrive')
    }

    // 提交预约试驾 
    onSubmit (e) {
        e.preventDefault();
        let {formData} = this.state;
        let {isLoading } = this.stores.state;
        let formSub = cloneDeep(formData);

        // 仅供测试用
        formSub.verifyCode = this.stores.state.verCode

        formSub.budgetRange = formSub.budgetRange[0];

        formSub.purchaseTime = formSub.purchaseTime[0];

        if(formSub.appointmentTime) {
            formSub.appointmentTime = this.getFormatDate(formSub.appointmentTime).replace(/-/g, '/') + ':00';
        }


        if(!isLoading) {
            this.stores.submitAppointMent(formSub, () => {
                Toast.success('提交成功！', 2.5)
            })
        }
    }

    render() {
        let dealindex = this.state.dealindex;
        let inputIndex = this.state.inputIndex;
        let activityList = this.props.activityList ;
        let { modelDetail} = this.stores.state;
        let { formData } = this.state;
        return (
            <div>
                <PickerOption name="budgetRange" type="budget" visible={this.state.costmodal} onPickClose={this.onClose('costmodal')} onChange={(a, b) => this.onChange(a, b)}/>

                <PickerOption name="purchaseTime" type="buytime" visible={this.state.buytimemodal} onPickClose={this.onClose('buytimemodal')} onChange={(a, b) => this.onChange(a, b)}/>
                
                <Modal
                    className="ask-price-modal-page"
                    visible={this.state.apptimemodal}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose('apptimemodal')}
                    title="预约时间"
                    footer={[{ text: '取消', onPress: () => { this.onClose('apptimemodal')(false); } },{ text: '确定', onPress: () => { this.onClose('apptimemodal')(true); } }]}
                > <DatePickerView
                    onChange={x => this.onChange(x, 'appointmentTime')}
                    mode="datetime"
                    minDate={(x=> {let m = new Date(x); m.setHours(m.getHours()+1);m.setMinutes(0); return m})(Date.now())}
                    maxDate={(x=> {let m = new Date(x); m.setFullYear(m.getFullYear()+1); return m})(Date.now())}
                    minuteStep={20}
                    value={formData.appointmentTime} 
                    />
                </Modal>
                <div className="ask-price-page">
                    <div className="fill-info">
                        <div className="fill-form">
                            <div className={inputIndex == 3 ? 'selected cost-time-range' : 'cost-time-range'} data-index="3" onClick={this.showModal('modal')}>
                                <span className="title required"><span>*</span>车型</span>
                                <input className="cost-selected" value={modelDetail.name} onClick={e=>this.gotoSelect(e)}/>
                                <i className="arrow"></i>
                            </div>
                            <InputItem
                                placeholder="请输入姓名"
                                ref={el => this.labelFocusInst = el}
                                onClick={()=>this.onFocus(0)}
                                className={inputIndex == 0 ? 'selected' : ''}
                                value={formData.memberName}
                                onChange={val => this.onChange(val, 'memberName') }
                                data-index="0"
                            ><div className="required" onClick={() => this.labelFocusInst.focus()}><span>*</span>姓名</div></InputItem>
                            <InputItem
                                placeholder="请输入手机号码"
                                type="phone"
                                ref={el => this.labelFocusInst = el}
                                data-index="1"
                                onClick={()=>this.onFocus(1)}
                                value={formData.memberMobile}
                                onChange={val => this.onChange(val, 'memberMobile') }
                                className={inputIndex == 1 ? 'selected' : ''}
                            ><div className="required" onClick={(e) => { this.labelFocusInst.focus(); this.onFocus()} }><span>*</span>手机号码</div></InputItem>
                            {this.state.hasBind ?'':
                            <InputItem
                                className={inputIndex == 2 ? 'selected' : ''}
                                placeholder="请输入验证码"
                                ref={el => this.labelFocusInst = el}
                                onClick={()=>this.onFocus(2)}
                                type="number"
                                maxLength={6}
                                data-index="2"
                                value={this.stores.state.verCode}
                                onChange={val => this.onChange(val, 'verifyCode') }
                            >
                            <div className="code" onClick={() => this.labelFocusInst.focus()}>验证码<span className="get-code" onClick={x=>this.getVerCode(x)}>获取验证码</span></div>
                            </InputItem>}                
                            <p className="fill-more">填写更多信息，以便为您更好的规划试驾过程</p>
                            <div className={inputIndex == 8 ? 'selected cost-time-range' : 'cost-time-range'} data-index="8" onClick={this.showModal('apptimemodal')}>
                                <span className="title">预计试驾时间</span>
                                <input className="cost-selected" id="time" value={this.getFormatDate(formData.appointmentTime)}/>
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
                                <i className="iconfont icon-dizhi"></i>广州市
                            </div>
                        </div>
                        <div className="ask-price-page-dealer-list">
                            <ul>
                                {
                                    this.stores.state.dealerList.map((item, index) => {
                                        return <li key={item.id} onClick={() => this.dealerSelect(index, item)}
                                                className={dealindex == index ? 'selected' : ''}>
                                                <span className="dealer-name">{item.dealerName}</span>
                                                <span className="dealer-star">
                                                    <StarRange number={item.score} />
                                                </span>
                                                <p className="dealer-tel"><i className="iconfont icon-dianhua"></i>{item.salePhone}</p>
                                                {item.shops.length > 0?
                                                <p className="dealer-address"><i className="iconfont icon-dizhi"></i>{item.shops[0].address}<span>&lt;{(item.shops[0].distance/1000).toFixed(2)}km</span>
                                                </p>:''}
                                                <p className="dealer-test"><i className="iconfont icon-Checkbox1"></i>体验上门试驾</p>
                                            </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>

                    <div className="submit-btn">
                        <Button  onClick={e=>this.onSubmit(e)} loading={this.stores.state.isLoading}>提 交</Button>
                        <p className="agree"><i></i>点击提交则视为同意<span>《福特购个人信息保护声明》</span></p>
                        <p className="have-tel"><i></i>提交后，经销商会尽快回访，请留意接听电话</p>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = testDrice;
