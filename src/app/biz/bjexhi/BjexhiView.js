/*
 * @author 七天
 * @date 2018.4.19
 * 北京车展留资活动
 */
import React, {Component} from 'react';
import Style from './BjexhiLess.less';
import {get,cloneDeep} from 'lodash';
import {InputItem,Button,Toast} from 'antd-mobile'
import {Link, IndexLink} from 'react-router';
import { inject ,observer} from 'mobx-react';
import { AddressPicker } from 'widget';
import PickerOption from 'pubBiz/pickerOption/PickerOption'
import Util from 'util'

@inject("bjexhi")
@observer
class Bjexhi extends Component {

    constructor(props, context) {
        super(props, context);
        this.stores = this.props.bjexhi;

        this.state = {
            inputIndex: 0,
            buytimemodal: false,
            fastitemmodal:false,
            selBuyTime:'',
            selItem:'',
            addrName:'',
            formData: {
                memberName:'',
                memberMobile:'',
                itemId:'',
                purchaseTime:'',
                provinceCode: '',
                provinceName:'',
                cityCode: '',
                cityName: ''
            }
        }
    }

    componentDidMount() {

    }

    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }

    onFocus(value) {
        this.setState({inputIndex:value});
    }

    onChange(value, key) {
        let { formData } = this.state;
        
        formData[key] = value;


        if(key === 'memberName') {
            formData[key] = value.replace(/[^a-z\u4e00-\u9fa5]/g, '');
        }

        if(key === 'memberMobile') {
            formData[key] = value.replace(/\s/g, '');
        }

        if(key === 'purchaseTime') {
            this.setState({
                selBuyTime : value[1]
            })
        }
        if(key === 'itemId') {
            this.setState({
                selItem : value[1]
            })
        }

        this.setState({
            formData
        })
    }

    onClose = key => (flag) => {
        this.setState({
            [key]: false,
        });
    }

    onSubmit() {
        let { formData } = this.state;
        let { isLoading } = this.stores.state
        let formSub = cloneDeep(formData);
        // 开始表单验证
        if(!formSub.itemId) {
            return Toast.info('请选择车型', 1.5)
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
        if(!formSub.cityCode) {
            return Toast.info('请选择所在城市', 1.5)
        }

        if(!formSub.purchaseTime) {
            return Toast.info('请选择预计购车时间', 1.5)
        }

        if(formSub.purchaseTime) {
            formSub.purchaseTime = formSub.purchaseTime[0];
        }
        if(formSub.itemId) {
            formSub.itemId = formSub.itemId[0];
        }

        if(!isLoading) {
            this.stores.submitApp(formSub).then((data)=> {
                
                window.app.routerGoTo('/bjExhisend');
            }, err=> {
                this.stores.setLoading(false)
            })
        }
    }

    selectAddr() {
		this.refs.addrModal.openModal();
	}
 
    render() {
        let {formData, inputIndex} = this.state;
        let {modelDetail} = this.stores.state
        return (<div className="bj-page-warpper">

            <PickerOption name="purchaseTime" type="buytime" visible={this.state.buytimemodal} onPickClose={this.onClose('buytimemodal')} onChange={(a, b) => this.onChange(a, b)} />
            
            <PickerOption name="itemId" type="fastitem" visible={this.state.fastitemmodal} onPickClose={this.onClose('fastitemmodal')} onChange={(a, b) => this.onChange(a, b)} />
                
            <div className="top-logo iconfont icon-futegoulogo"/>
                <div className="bj-page">
                <div className="fill-form">
                    <div className={inputIndex == 0 ? 'selected cost-time-range' : 'cost-time-range'} data-index="0" onClick={this.showModal('fastitemmodal')}>
                        <span className="required"><span>*</span>意向车型</span>
                        <div className="cost-selected">{this.state.selItem}</div>
                        <i className="arrow"></i>
                    </div>
                    <InputItem
                        placeholder="请输入姓名"
                        ref={el => this.labelFocusInst = el}
                        onClick={()=>this.onFocus(1)}
                        value={formData.memberName}
                        className={inputIndex == 1 ? 'selected' : ''}
                        maxLength={20}
                        onChange={val => this.onChange(val, 'memberName') }
                    ><div className="required" onClick={() => this.labelFocusInst.focus()}><span>*</span>姓名</div></InputItem>

                     <InputItem
                        placeholder="手机号码"
                        ref={el => this.labelFocusInst = el}
                        type="phone"
                        onClick={()=>this.onFocus(2)}
                        value={formData.memberMobile}
                        className={inputIndex == 2 ? 'selected' : ''}
                        onChange={val => this.onChange(val, 'memberMobile') }
                    ><div className="required" onClick={() => this.labelFocusInst.focus()}><span>*</span>手机号码</div></InputItem>


                    <div className={inputIndex == 3 ? 'selected cost-time-range' : 'cost-time-range'} data-index="3" onClick={(e)=>this.selectAddr()}>
                        <span className="required"><span>*</span>城&nbsp;&nbsp;&nbsp;&nbsp;市</span>
                        <div className="cost-selected">{this.state.addrName}</div>
                        <i className="arrow"></i>
                    </div>

                    <div className={inputIndex == 4 ? 'selected cost-time-range' : 'cost-time-range'} data-index="4" onClick={this.showModal('buytimemodal')}>
                        <span className="required"><span>*</span>预计购车时间</span>
                        <div className="cost-selected">{this.state.selBuyTime}</div>
                        <i className="arrow"></i>
                    </div>

                    <div className="submit-btn">
                        <Button  onClick={e=>this.onSubmit(e)} loading={this.stores.state.isLoading}>提 交</Button>
                        <p className="agree"><i></i>点击提交则视为同意<span>《福特购个人信息保护声明》</span></p>
                    </div>
                </div>
                </div>
                <AddressPicker ref="addrModal" ok={(item, pro) => {
                    let {formData } = this.state;
                    formData.provinceCode = pro.value;
                    formData.provinceName = pro.label;
                    formData.cityCode = item.value;
                    formData.cityName = item.label;
                    this.setState({formData,addrName: `${pro.label} ${item.label}`});
				}} />
            </div>);
    }
}

module.exports = Bjexhi;