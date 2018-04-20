import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router';
import { inject ,observer} from 'mobx-react';
import Style from './TestDriveLess.less';
import {cloneDeep, get, extend} from 'lodash';
import { InputItem ,TextareaItem ,ActionSheet ,Modal ,List ,Button ,PickerView,DatePickerView,Toast} from 'antd-mobile';
import { StarRange, CountDown } from 'widget';
import PickerOption from 'pubBiz/pickerOption/PickerOption'
import Util from 'util'
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
        fromUrl: '', // 来源URL
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
            verifyCode:'',
            remark: ''
        }
    }
    cityInfo = Util.getCityID()

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

    // 表单值的记录
    componentWillUnmount() {

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

        this.setState({formData});

        let params = location.query;

        if(location.search !== '') {
            if('itemId' in params) {
                this.stores.getDetail(params, (x)=> {
                    formData.vehicleModelName = x.name
                });
                formData.vehicleModel = params.itemId
            } else {
                this.stores.clearModel();
            }
            if('dealerId' in params) {
                formData.dealer = params.dealerId;
            }

            this.setState({fromUrl: get(params, 'from', '')})

            formData.vehicleModel = params.itemId
        }

        let parm2 = {
            carId: formData.vehicleModel,
            pageSize:20,
            pageNum:1,
            type:1
        }

        extend(parm2, this.getCityID(), this.getCoordinate())

        this.stores.getDealer(parm2, params.dealerId, x=>{
            if(x.length > 0) {
                formData.dealer = x[0].id;
                formData.dealerName = x[0].dealerName;
            }
        })

        // 自动填充姓名和手机号，并判断是否要输入验证码
        this.stores.getUserInfo('', (data) => {
            formData.memberMobile = data.mobile;
            formData.memberName = data.name;
            if(data.mobile) {
                this.setState({hasBind:true})
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

    onFocus(value) {
        this.setState({inputIndex:value});
    }

    // 取验证码
    getVerCode(e) {

        let mobile = this.state.formData.memberMobile;
        // 是否正在倒计时
        let {showCountdown} = this.refs.countDown.state;
        

        if(mobile!=='' && Util.checkInput(mobile, 'mobile')) {
            const params = {
                mobile
            }

            if(showCountdown) {
                return ;
            }

            this.stores.getVerCode(params).then(()=>{
                this.refs.countDown.start()
            })

        } else {
            Toast.fail('请输入正确的手机号', 1.5);
        }
    }


    onChange (value, key) {
        let { formData } = this.state;
        
        formData[key] = value;

        if(key === 'memberName') {
            formData[key] = value.replace(/[^a-z\u4e00-\u9fa5]/g, '');
        }

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

    // 去选择车型
    gotoSelect() {
        let {fromUrl} = this.state;

        let {query} = window.app.router.location;
        
        if(fromUrl.indexOf('carModelDetail') > -1) {
            return false;
        }
        let target = '/carModelList?goback=testdrive&' + Util.qs(query);;
        window.app.routerGoTo(target)
    }

    // 提交预约试驾 
    onSubmit (e) {
        e.preventDefault();
        let {formData, hasBind, fromUrl} = this.state;
        let {isLoading } = this.stores.state;

        let {query} = window.app.router.location;

        let formSub = cloneDeep(formData);

        if(formSub.appointmentTime) {
            formSub.appointmentTime = this.getFormatDate(formSub.appointmentTime) + ':00';
        }
        if(formSub.budgetRange) {
            formSub.budgetRange = formSub.budgetRange[0];
        }

        if(formSub.purchaseTime) {
            formSub.purchaseTime = formSub.purchaseTime[0];
        }

        // 开始表单验证
        if(!formSub.vehicleModel) {
            return Toast.info('请选择车型', 1.5)
        }
        if(!formSub.dealer) {
            return Toast.info('请选择经销商', 1.5)
        }
        if(!formSub.memberName) {
            return Toast.info('请输入姓名', 1.5)
        }
        if(!formSub.memberMobile) {
            return Toast.info('请输入手机号', 1.5)
        }

        if(!Util.checkInput(formSub.memberMobile, 'mobile')) {
            return Toast.info('请输入正确的手机号', 1.5)
        }

        if(!hasBind) {
            if(!formSub.verifyCode) {
                return Toast.info('请输入验证码', 1.5)
            }

            if(!Util.checkInput(formSub.verifyCode, 'verifyCode')) {
                return Toast.info('验证码为6位数字', 1.5)
            }
        }

         // 加上 areaCode
        formSub.areaCode = this.getCityID().cityId;
        console.log(this.getCityID())

        if(!isLoading) {
            this.stores.submitAppointMent(formSub).then((data)=> {
                Toast.success('提交成功！', 2)
                setTimeout(()=> {
                    if(fromUrl) {
                        window.app.routerGoTo('/' + fromUrl + '?' + Util.qs(query))
                    }
                }, 2100)
            }, (error) => {
                this.stores.setLoading(false)
            })
        }
    }

    render() {
        let dealindex = this.state.dealindex;
        let inputIndex = this.state.inputIndex;
        let activityList = this.props.activityList ;
        let { modelDetail} = this.stores.state;
        let { formData,fromUrl } = this.state; 
        return (
            <div>
                <PickerOption name="budgetRange" type="budget" visible={this.state.costmodal} onPickClose={this.onClose('costmodal')} onChange={(a, b) => this.onChange(a, b)} />

                <PickerOption name="purchaseTime" type="buytime" visible={this.state.buytimemodal} onPickClose={this.onClose('buytimemodal')} onChange={(a, b) => this.onChange(a, b)} />
                
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
                                <input className="cost-selected" value={modelDetail.name} onClick={e=>this.gotoSelect(e)} readOnly={true}/>
                                {fromUrl.indexOf('carModelDetail')>-1?'':<i className="arrow"></i>}
                            </div>
                            <InputItem
                                placeholder="请输入姓名"
                                ref={el => this.labelFocusInst = el}
                                onClick={()=>this.onFocus(0)}
                                className={inputIndex == 0 ? 'selected' : ''}
                                value={formData.memberName}
                                maxLength={20}
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
                                value={formData.verifyCode}
                                onChange={val => this.onChange(val, 'verifyCode') }
                            >
                            <div className="code" onClick={() => this.labelFocusInst.focus()}>验证码<span className="get-code" onClick={x=>this.getVerCode(x)}><CountDown ref='countDown'/></span></div>
                            </InputItem>}                
                            <p className="fill-more">填写更多信息，以便为您更好的规划试驾过程</p>
                            <div className={inputIndex == 8 ? 'selected cost-time-range' : 'cost-time-range'} data-index="8" onClick={this.showModal('apptimemodal')}>
                                <span className="title">预计试驾时间</span>
                                <div className="cost-selected">{this.getFormatDate(formData.appointmentTime)}</div>
                                <i className="arrow"></i>
                            </div>
                            <div className={inputIndex == 3 ? 'selected cost-time-range' : 'cost-time-range'} data-index="3" onClick={this.showModal('costmodal')}>
                                <span className="title">预算区间</span>
                                <div className="cost-selected">{this.state.selBuget}</div>
                                <i className="arrow"></i>
                            </div>
                            <div className={inputIndex == 4 ? 'selected cost-time-range' : 'cost-time-range'} data-index="4" onClick={this.showModal('buytimemodal')}>
                                <span className="title">期望购车时间</span>
                                <div className="cost-selected">{this.state.selBuyTime}</div>
                                <i className="arrow"></i>
                            </div>
                            <TextareaItem
                                title="备注"
                                rows={2}
                                data-index="6"
                                onClick={()=>this.onFocus(6)}
                                className={inputIndex == 6 ? 'selected' : ''}
                                value={formData.remark}
                                onChange={val => {this.onChange(val, 'remark')}}
                            />
                        </div>
                    </div>

                    <div className="select-dealer">
                        <div className="select-type">
                            <p>经销商:<span>共<i>{ this.stores.state.dealerList.length}</i>家经销商</span></p>
                            <div className="address">
                                <i className="iconfont icon-dizhi"></i>{this.cityInfo.cityName}
                            </div>
                        </div>
                        <div className="ask-price-page-dealer-list">
                            <ul>
                                {
                                    this.stores.state.dealerList.length > 0 ?
                                    this.stores.state.dealerList.map((item, index) => {
                                        return <li key={item.id} onClick={() => this.dealerSelect(index, item)}
                                                className={dealindex == index ? 'selected' : ''}>

                                                <span className="dealer-name">{item.dealerName}</span>
                                                <span className="dealer-star">
                                                    <StarRange number={item.score} />
                                                </span>

                                                <p className="dealer-tel"><i className="iconfont icon-dianhua"></i>{item.salePhone}</p>
                                                {item.shops&&item.shops.length > 0&&item.shops.map((subItem, index)=>{
                                                    return (
                                                        <p className="dealer-address" key={index}>
                                                    <i className="iconfont icon-dizhi"></i>
                                                    <span className="txt-left">{subItem.address}</span>
                                                    <span className="txt-right">&lt;{(subItem.distance&&(subItem.distance/1000)).toFixed(2)}km</span>
                                                </p>)
                                                })
                                            }
                                                <p className="dealer-test"><i className="iconfont icon-Checkbox1"></i>体验上门试驾</p>
                                            </li>
                                    })
                                    :
                                    <div className='noDealerList'>本地暂无经销商，请切换城市后选择</div>
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
