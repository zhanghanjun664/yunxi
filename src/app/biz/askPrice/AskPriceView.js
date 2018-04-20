/*
 * @time 2017.4.5
 * @author 七天
 * @title 询底价组件 
 */
import React, {Component} from 'react'
import {Link, IndexLink} from 'react-router';
import { inject ,observer} from 'mobx-react';
import Style from './AskPriceLess.less';
import {get, cloneDeep, extend} from 'lodash'
import { InputItem ,TextareaItem ,ActionSheet ,Modal ,List ,Button ,PickerView, Toast} from 'antd-mobile';
import { StarRange, CountDown } from 'widget';
import Util from 'util';
import PickerOption from 'pubBiz/pickerOption/PickerOption'

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
            curItemId: '',
            fromUrl: '', // 来源URL
            hasBind: false, // 是否已经绑定手机
            tabindex:0,
            inputIndex:0,
            dealerIndex:0,
            formData: {
                vehicleModel:'',
                vehicleModelName:'',
                dealer: '',
                dealerName:'',
                memberName: '',
                memberMobile: '',
                budgetRange:'',
                purchaseTime:'',
                type:2,
                verifyCode:'',
                remark: ''
            }
        }
    }

    componentDidMount() {
        let location = window.app.router.location;

        let { formData } = this.state;

        let params = location.query;

        // 自动填充姓名和手机号，并判断是否要输入验证码
        this.stores.getUserInfo('', (data) => {
            formData.memberMobile = data.mobile;
            formData.memberName = data.name;
            if(data.mobile) {
                this.setState({hasBind:true})
            }
            this.setState({formData});
        });

        if(location.search !== '') {
            if('itemId' in params) {
                formData.vehicleModel = params.itemId
                this.stores.getDetail(params, x=> {
                    formData.vehicleModelName = x.name;
                    this.setState({formData})
                    
                });
            } else {
                this.stores.clearDetail();
            }
            if('dealerId' in params) {
                formData.dealer = params.dealerId;
            }

            this.setState({fromUrl: get(params, 'from', '')})
        }
        this.getData(1, params.dealerId);
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

    getCoordinate() {
        let tmp = localStorage.getItem('myPosition');
        if(tmp !==  null) {
            let {longitude, latitude} = JSON.parse(tmp);
            return {
                longitude,
                latitude
            };
        } else {
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

    

    getData(type, dealerId) {
        const params = {
            carId: this.state.formData.vehicleModel,
            pageNum : 1,
            pageSize : 20,
            type
        }
        let {formData} = this.state;
        extend(params, this.getCoordinate(), this.getCityID());

        this.stores.getDealers(params, dealerId, item => {
            // 设置默认选中项
            if(item.length > 0) {
                formData.dealer = item[0].id;
                formData.dealerName = item[0].dealerName;

            }
        })
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
            Toast.fail('请输入正确的手机号', 3);
        }
    }

    onFocus(value){
        this.setState({inputIndex:value});
    }


    onChange (value, key) {

        let { formData } = this.state;
        
        formData[key] = value;

        if(key === 'memberMobile') {
            formData[key] = value.replace(/\s/g, '');
        }

        if(key === 'memberName') {
            formData[key] = value.replace(/[^a-z\u4e00-\u9fa5]/g, '');
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

        this.setState({formData})
    }
    //表单提交
    submitAskPrice () {
        let {formData,hasBind, fromUrl} = this.state;

        let {query} = window.app.router.location;

        let {isLoading } = this.stores.state;
        let formSub = cloneDeep(formData);

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

        if(formSub.budgetRange) {
            formSub.budgetRange = formSub.budgetRange[0];
        }

        if(formSub.purchaseTime) {
            formSub.purchaseTime = formSub.purchaseTime[0];
        }

        // 加上 areaCode
        formSub.areaCode = this.getCityID().cityId;

        if(!isLoading) {

            this.stores.askPriceSubmit(formSub).then((data)=> {
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

    dealerSelect (item, dealerIndex) {
        let {formData } = this.state;
        formData.dealer = item.id;
        formData.dealerName = item.dealerName;
        this.setState({formData, dealerIndex});
    }

    componentWillUnmount() {
        let { formData } = this.state;

    }

    getToggurl() {
        let {query} = window.app.router.location;

        let target = '/carModelList?goback=askprice&' + Util.qs(query);
        
        return target;
    }

    //经销商列表 more==1查看更多，==0展示3条,type==0表示距离,type==1表示评分
    renderDealer (dealerList) {

        let length = dealerList.length, tmpList;

        let {dealerIndex} = this.state;
        
        if(length < 1) {
           return <div>本地暂无经销商，请切换城市后选择</div>
        } else {
            return dealerList.map((item,index)=> {
                return <li key={'Ac_' + item.id} onClick={(e) => this.dealerSelect(item, index)} className={dealerIndex===index?'selected':''} >
                        <span className="dealer-name">{item.dealerName}</span>
                        <span className="dealer-star"><StarRange number={item.score} /></span>
                        <p className="dealer-tel fz_24"><i className="iconfont icon-dianhua"></i>{item.salePhone}</p>
                        {item.shops&&item.shops.length > 0&&item.shops.map((subItem, index)=>{
                            return (
                                <p className="dealer-address" key={subItem.id}>
                        <i className="iconfont icon-dizhi"></i>
                        <span className="txt-left">{subItem.address}</span>
                        <span className="txt-right">距您&lt;{(subItem.distance&&(subItem.distance/1000)).toFixed(2)}km</span></p>
                            )
                        }) 
                        }
                    </li>;
            })
        }
    }

    render() {
        let {tabindex, dealindex, inputIndex, formData,fromUrl} = this.state;

        let activityList = this.props.activityList ;
        let dealerList = this.stores.state.dealerList;
        let modeDetail = this.stores.state.modelDetail 
        return (
            <div>
        <PickerOption name="budgetRange" type="budget" visible={this.state.costmodal} onPickClose={this.onClose('costmodal')} onChange={(a, b) => this.onChange(a, b)}/> 
        <PickerOption name="purchaseTime" type="buytime" visible={this.state.buytimemodal} onPickClose={this.onClose('buytimemodal')} onChange={(a, b) => this.onChange(a, b)}/>
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
                            {fromUrl.indexOf('carModelDetail')>-1?'':<Link  to={this.getToggurl()}>切换车型</Link>}
                            
                        </p>
                    </div>
                    <div className="select-dealer">
                        <div className="select-type">
                            <p>选择经销商</p>
                            <div className="type">
                                <span onClick={ () => this.handleClickTab(0) } className={tabindex == 0 ? 'selected distance' : 'distance'}><i className="iconfont icon-julishaixuan"></i>距离</span>
                                <span onClick={ () => this.handleClickTab(1) }  className={tabindex == 1 ? 'selected score' : 'score'}><i className="iconfont icon-pingfenshaixuan"></i>评分</span>
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
                                value={formData.memberName}
                                className={inputIndex == 0 ? 'selected' : ''}
                                maxLength={20}
                                onChange={val => this.onChange(val, 'memberName') }
                                data-index="0"
                            ><div className="required" onClick={() => this.labelFocusInst.focus()}><span>*</span>姓名</div></InputItem>
                            <InputItem
                                placeholder="请输入手机号码"
                                ref={el => this.labelFocusInst = el}
                                type="phone"
                                data-index="1"
                                value={formData.memberMobile}
                                onChange={val => this.onChange(val, 'memberMobile') }
                                onClick={()=>this.onFocus(1)}
                                className={inputIndex == 1 ? 'selected' : ''}
                            ><div className="required" onClick={(e) => { this.labelFocusInst.focus(); this.onFocus()} }><span>*</span>手机号码</div></InputItem>
                            {this.state.hasBind ?'':
                            <InputItem
                                placeholder="请输入验证码"
                                ref={el => this.labelFocusInst = el}
                                onClick={()=>this.onFocus(2)}
                                data-index="2"
                                type="number"
                                maxLength={6}
                                value={formData.verifyCode}
                                onChange={val => this.onChange(val, 'verifyCode') }
                                className={inputIndex == 2 ? 'selected' : ''}
                            ><div className="code" onClick={() => this.labelFocusInst.focus()}>验证码<span className="get-code"  onClick={x=>this.getVerCode(x)}><CountDown ref='countDown'/></span></div>
                            </InputItem>}
                            <div className={inputIndex == 3 ? 'selected cost-time-range' : 'cost-time-range'} data-index="3" onClick={this.showModal('costmodal')}>
                                <span className="title">预算区间</span>
                                <div className="cost-selected">{this.state.selBuget}</div>
                                <i className="arrow"></i>
                            </div>
                            <div className={inputIndex == 4 ? 'selected cost-time-range' : 'cost-time-range'} data-index="4" onClick={this.showModal('buytimemodal')}>
                                <span className="title">购车时间</span>
                                <div className="cost-selected">{this.state.selBuyTime}</div>
                                <i className="arrow"></i>
                            </div>
                            <TextareaItem
                                title="留言"
                                rows={2}
                                data-index="6"
                                onClick={()=>this.onFocus(6)}
                                className={inputIndex == 6 ? 'selected' : ''}
                                onChange={val => {this.onChange(val, 'remark')}}
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