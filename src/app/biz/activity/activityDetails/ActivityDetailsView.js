/**
 * Created by zhang.weihua on 2018/3/22.
 */

import React, { PropTypes, Component } from 'react';
import { Flex, Button, Icon, Modal, TextareaItem, InputItem, Toast } from 'antd-mobile';
import { inject, observer } from 'mobx-react';
import './ActivityDetailsLess.less';
import { StarRange, CustomInputItem, CountDown } from 'widget';
import Util from 'util';
import Verify from 'util/Verify.js';
import { extend } from 'lodash'
import PickerOption from 'pubBiz/pickerOption/PickerOption'



@inject("activityDetails")
@observer
class ActivityDetailsView extends Component {

    constructor(props, context) {
        super(props, context);

        this.stores = props.activityDetails;

        this.state = {
            
            dealer: '',
            carItem: '',
            modal: false,// 车型显示状态
            costmodal: false, //   预算金额弹出层
            buytimemodal: false, // 预计购车时间
            dealerIndex: 0,
            formData: {
                budgetRange: '',
                purchaseTime: '',
                dealer: '',
                dealerName: '',
                mobile: '',
                name: '',
                checkCode: '',
            }
        }
        this.activityId = this.props.location.query.activityId
    }

    componentWillMount(){
        console.log(this.stores.state.formData)
        this.setState({
            formData: JSON.parse(JSON.stringify(this.stores.state.formData))
        })

    }
    componentDidMount() {
        let query = this.props.location.query
        this.stores.getActivityDetails(this.props.location.query.activityId);
        this.stores.getUserInfo()
        if ('itemId' in query) {
            this.stores.getDetail({
                itemId: query.itemId
            })
        }

        this.getData(1);
    }

    checkBox(checked = true, onClick = () => { }) {

        let activeClass = checked ? 'active' : '';

        return (
            <div className={`checkbox ${activeClass}`} onClick={onClick}>
                <Icon type="check"></Icon>
            </div>
        )
    }


    renderCommentItems = (commentList = []) => {
        // return commentList.map((item, index) => {
        //     return (
        //         <Flex className="comment-item" align="start" key={"comment" + index}>
        //             <img src="assets/images/activity/header.png" className="header-img" />
        //             <Flex.Item className="comment-info">
        //                 <Flex justify="between">
        //                     <Flex className="ellipsis fz_24">
        //                         <span>福**糖</span>
        //                         <StarRange className="ml-30" number={2.3} />

        //                     </Flex>
        //                     <div className="color_gray fz_24">2017.08.12</div>
        //                 </Flex>
        //                 <div className="comment-content ellipsis">
        //                     动力强，操控感好，目前开了5000公里，很满意速度发了解是否是
        //                 </div>
        //                 <div className="reply-container">
        //                     <div className="arrow-up"></div>
        //                     <div className="reply-wrap fz_24">
        //                         <Flex justify="between">
        //                             <span>客服回复:</span>
        //                             <span className="color_gray">2017.08.12</span>
        //                         </Flex>
        //                         <p className="reply-text">感谢支持！！</p>
        //                     </div>
        //                 </div>
        //             </Flex.Item>
        //         </Flex>
        //     )
        // })
        return (
            <Flex className="comment-item" align="start">
                <img src="assets/images/activity/header.png" className="header-img" />
                <Flex.Item className="comment-info">
                    <Flex justify="between">
                        <Flex className="ellipsis fz_24">
                            <span>福**糖</span>
                            <StarRange className="ml-30" number={2.3} />

                        </Flex>
                        <div className="color_gray fz_24">2017.08.12</div>
                    </Flex>
                    <div className="comment-content ellipsis">
                        动力强，操控感好，目前开了5000公里，很满意速度发了解是否是
                        </div>
                    <div className="reply-container">
                        <div className="arrow-up"></div>
                        <div className="reply-wrap fz_24">
                            <Flex justify="between">
                                <span>客服回复:</span>
                                <span className="color_gray">2017.08.12</span>
                            </Flex>
                            <p className="reply-text">感谢支持！！</p>
                        </div>
                    </div>
                </Flex.Item>
            </Flex>
        )

    }

    //渲染留资活动表单组件
    _renderFormItem = (type, index) => {
        let content = null;
        let { userInfo, modelDetail } = this.stores.state
        let { formData } = this.state
        if (userInfo.mobile) {
            formData.name = userInfo.name
            formData.mobile = userInfo.mobile
            this.stores.changeFormData(formData)
        }
        switch (type) {
            case 1:
                content = (
                    <CustomInputItem
                        key={'input' + index}
                        label="姓名"
                        type="text"
                        value={formData.name}
                        onChange={e => this.onChange(e, 'name')}
                        className="input"
                        maxLength={20}
                    />
                )
                break;
            case 2:
                content = [
                    <CustomInputItem
                        key={'input' + index}
                        label="手机号码"
                        type="number"
                        value={formData.mobile}
                        onChange={e => this.onChange(e, 'mobile')}
                        className="input"
                        maxLength={11}
                    />
                ]
                if (!userInfo.mobile) {
                    content.push(<CustomInputItem
                        key={'code' + index}
                        inputType="code"
                        type="number"
                        value={formData.checkCode}
                        onChange={e => this.onChange(e, 'checkCode')}
                        label={<div onClick={this.getCode.bind(this, formData.mobile)}><CountDown ref='countDown'/></div>}
                        maxLength={6}
                        className="input"
                    />)
                }
                break;
            case 3:
                content = (
                    <CustomInputItem
                        key={'input' + index}
                        label="意向经销商"
                        type="text"
                        value={formData.dealerName}
                        onClick={() => { this.showModal('modal') }}
                        className="input"
                        necessary={false}
                    />
                )
                break;
            case 4:
                content = (
                    <CustomInputItem
                        key={'input' + index}
                        label="意向车型"
                        type="text"
                        value={modelDetail.name}
                        onClick={e => this.gotoSelect()}
                        className="input"
                        necessary={false}
                    />
                )
                break;
            case 5:
                content = (
                    <CustomInputItem
                        key={'input' + index}
                        label="预算区间"
                        type="text"
                        value={formData.budgetRange[1]}
                        onClick={e => this.showModal('costmodal')}
                        className="input"
                        necessary={false}
                    />
                )
                break;
            case 6:
                content = (
                    <CustomInputItem
                        key={'input' + index}
                        label="购买时间"
                        type="text"
                        value={formData.purchaseTime[1]}
                        onClick={e => this.showModal('buytimemodal')}
                        className="input"
                        necessary={false}
                    />
                )
                break;
        }

        return content;
    }

    gotoSelect() {
        window.app.routerGoTo('/carModelList?goback=activityDetails&activityId=' + this.activityId)
    }
    showModal(key) {
        this.setState({
            [key]: true,
        });
    }
    onClose = key => (flag) => {
        this.setState({
            [key]: false,
        });

        // if(flag) {

        //     let {formData} = this.state;
        //     this.onChange(formData.appointmentTime, 'appointmentTime')
        // }

    }
    onChange(value, key) {
        let { formData } = this.state;

        formData[key] = value;

        // if (key === 'memberMobile') {
        //     formData[key] = value.replace(/\s/g, '');
        // }

        // if (key === 'budgetRange') {
        //     this.setState({
        //         selBuget: value[1]
        //     })
        // }

        // if (key === 'purchaseTime') {
        //     this.setState({
        //         selBuyTime: value[1]
        //     })
        // }

        this.setState({
            formData
        })
        this.stores.changeFormData(formData)
    }
    signUp() {
        let { activityId, itemId } = this.props.location.query
        let { budgetRange, purchaseTime, name, mobile, checkCode, dealer } = this.state.formData
        let { info, userInfo } = this.stores.state
        let params = {
            memberName: name.trim(),//姓名
            memberMobile: mobile,//手机号
            activityId: activityId,//活动id
            itemId: itemId,//车型id
            budgetRange: budgetRange[0],//预算区间
            purchaseTime: purchaseTime[0],//购买时间
            dealer: dealer,//意向经销商
            verifyCode: checkCode,
            areaCode: Util.getCityID().postCode
        }
        if (!params.memberName) {
            Toast.info('请输入姓名')
            return
        }
        if (!Verify.isPhoneNum(params.memberMobile)) {
            Toast.info('请输入正确的手机号')
            return
        }
        if (!userInfo.mobile&&!params.verifyCode) {
            Toast.info('请输入验证码')
            return
        }
        // if ((info.infoType.indexOf(4) != -1) && !params.itemId) {
        //     Toast.info('请选择意向车型')
        //     return
        // }
        // if ((info.infoType.indexOf(5) != -1) && !params.budgetRange) {
        //     Toast.info('请选择预算区间')
        //     return
        // }
        // if ((info.infoType.indexOf(6) != -1) && !params.purchaseTime) {
        //     Toast.info('请选择购买时间')
        //     return
        // }
        console.log(window.app.router.location.query)
        this.stores.postActivityInfo(params).then(()=>{
            Toast.info('报名成功', 2, ()=>{
                let urls = '';
                let query = window.app.router.location.query
                if('from' in query){
                    urls = `/${query.from}?itemId=${query.itemId}&dealerId=${query.dealerId}&tabBarType=${query.tabBarType}`
                }
                window.app.routerGoTo(urls)
            })

        },()=>{
            this.stores.setLoadingStatus('signUp', false)
        })

    }
    getCode(mobile) {
        let { showCountdown } = this.refs.countDown.state
        if(showCountdown){
            return
        }
        if (!Verify.isPhoneNum(mobile)) {
            Toast.info('请输入正确的手机号')
            return
        }
        this.stores.getCode(mobile).then(()=>{
            this.refs.countDown.start()
        },()=>{
            this.stores.setLoadingStatus('code', false)
        })

    }

    getData(type) {
        let { longitude, latitude } = Util.getCoordinate();
        let { postCode } = Util.getCityID();
        const params = {
            carId: this.props.location.query.itemId,
            pageNum: 1,
            pageSize: 20,
            type,
            longitude,
            latitude,
            cityId: postCode
        }


        this.stores.getDealers(params, item => {
            if (item.length > 0) {
                this.state.formData.dealer = item[0].id;
                this.state.formData.dealerName = item[0].dealerName;
                this.setState({
                    formData: this.state.formData
                })
                this.stores.changeFormData(this.state.formData)
            }
        })
    }
    noOpen(){
        Toast.info('此功能暂未开放')
    }

    dealerSelect(item, dealerIndex) {
        let { formData } = this.state;

        console.log(item, dealerIndex)
        formData.dealer = item.id;
        formData.dealerName = item.dealerName;
        this.setState({ formData, dealerIndex });
    }
    //经销商列表 more==1查看更多，==0展示3条,type==0表示距离,type==1表示评分
    renderDealer(dealerList) {

        let length = dealerList.length;

        let dealerIndex = this.state.dealerIndex

        if (length < 1) {
            return <div>本地暂无经销商，请切换城市后选择</div>
        } else {
            return (
                dealerList.map((item, index) => {
                    return <li key={'Ac_' + index} onClick={(e) => this.dealerSelect(item, index)} className={dealerIndex === index ? 'selected' : ''} >
                        <span className="dealer-name">{item.dealerName}</span>
                        <span className="dealer-star"><StarRange number={item.score} /></span>
                        <p className="dealer-tel fz_24"><i className="iconfont icon-dianhua"></i>{item.salePhone}</p>
                        {item.shops&&item.shops.length > 0&& item.shops.map((subItem, index)=>{
                            return (
                                <p className="dealer-address" key={index}><i className="iconfont icon-dizhi"></i>{subItem.address}<span>距您&lt;{(subItem.distance&&(subItem.distance / 1000)).toFixed(2)}km</span></p>
                            )
                        })
                             }
                    </li>;
                })
            )
        }
    }

    render() {
        let { info, sending, dealerList } = this.stores.state;
        let showSignUp = false;
        // 在活动期间内显示
        if(info.enrollBeginTime&&Date.now()>=Util.getTimestamp(info.enrollBeginTime)&&Date.now()<=Util.getTimestamp(info.enrollEndTime)){
            showSignUp = true
        }
        console.log(showSignUp)

        return (
            <div>
                <PickerOption name="budgetRange" type="budget" visible={this.state.costmodal} onPickClose={this.onClose('costmodal')} onChange={(a, b) => this.onChange(a, b)} />

                <PickerOption name="purchaseTime" type="buytime" visible={this.state.buytimemodal} onPickClose={this.onClose('buytimemodal')} onChange={(a, b) => this.onChange(a, b)} />

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
                                    dealerList && dealerList.length > 0 && this.renderDealer(dealerList)
                                }
                            </ul>
                        </div>
                        <div className="ask-price-page-grey"></div>
                        <div className="ask-price-page-cancel-btn">
                            <p onClick={this.onClose('modal')}>取消</p>
                        </div>
                    </div>
                </Modal>

                <div className="activity-details-page">
                    <div className="details-module">
                        <div className="activity-info">
                            <p className="title">
                                {info.name}
                            </p>
                            <Flex className="activity-status">
                                <div>
                                    <span className="iconfont icon-yuedu"></span>
                                    <span>{info.readTotal}</span>
                                </div>
                                <div>
                                    <span className="iconfont icon-pinglun"></span>
                                    <span>{info.commentTotal}</span>
                                </div>
                                <div>
                                    <span className="iconfont icon-shijian"></span>
                                    <span>{info.publishTime ? Util.formatDate(info.publishTime) : '-'}</span>
                                </div>
                            </Flex>
                            {info.type == 1 && (
                                <div className="color_orange">优惠券</div>
                            )}
                            {/* <div className="activity-text" dangerouslySetInnerHTML={{__html: info.content}}></div> */}
                            <div className="activity-text" dangerouslySetInnerHTML={{__html:info.content}} ></div>
                        </div>
                        {
                            info.type == 2 && showSignUp && (
                                <div className="sign-up-container">
                                    <div className="sign-up-title">
                                        活动报名
                                    </div>

                                    {info.infoType.map((item, index) => {
                                        return this._renderFormItem(item, index);
                                    })}

                                    <Button disabled={sending.signUp} className="submit-btn" onClick={this.signUp.bind(this)}>报名</Button>


                                    <div className="statement">
                                        {this.checkBox(this.stores.state.checked, this.stores.checkboxChange)}
                                        <span>点击提交则视为同意</span>
                                        <span>《福特购个人信息保护声明》</span>
                                    </div>
                                </div>
                            )
                        }

                    </div>

                    <div className="hot-comment">
                        <Flex className="comment-header" justify="between">
                            <div>热门评价</div>
                            <div onClick={this.stores.openModal}><span className="iconfont icon-xiepinglun icon-comment"></span><span>写评论</span></div>
                        </Flex>

                        <div className="comment-list">
                            {this.renderCommentItems(info.commentList)}
                        </div>

                    </div>

                    <div className="look-more-wrap">
                        <Button className="more-btn" onClick={this.noOpen.bind(this)}>查看全部评价</Button>
                    </div>

                    <div className="qrcode-wrap">
                        <img src='assets/images/activity/dev_qrcode.png' />
                        <span className="fz_24 color_gray">长按或扫描二维码，关注公众号</span>
                    </div>

                    <Modal
                        popup
                        visible={this.stores.state.show}
                        animationType="slide-up"
                        onClose={this.stores.onClose}
                    >
                        <div className="comment-form">
                            <div className="title">评论</div>
                            <TextareaItem
                                className="comment-textarea"
                                placeholder="评论将由客户审核后发布，对所有人可见"
                                rows={3}
                            />
                            <Flex justify="end">
                                <Button className="submit-comment-btn">提交评论</Button>
                            </Flex>
                        </div>

                    </Modal>

                </div>

            </div>
        )
    }
}

module.exports = ActivityDetailsView;