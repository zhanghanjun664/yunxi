/**
 * Created by zhang.weihua on 2018/3/22.
 */

import React, { PropTypes, Component } from 'react';
import { Flex, Button, Icon, Modal, TextareaItem, InputItem, Toast } from 'antd-mobile';
import { inject, observer } from 'mobx-react';
import './ActivityDetailsLess.less';
import { StarRange, CustomInputItem } from 'widget';
import Util from 'util';
import Verify from 'util/Verify.js';
import PickerOption from 'pubBiz/pickerOption/PickerOption'



@inject("activityDetails")
@observer
class ActivityDetailsView extends Component {

    constructor(props, context) {
        super(props, context);

        this.stores = props.activityDetails;

        this.state = {
            mobile: '',
            name: '',
            checkCode: '',
            dealer: '',
            carItem: '',
            costmodal: false, //   预算金额弹出层
            buytimemodal:false, // 预计购车时间
            formData:{
                budgetRange:'',
                purchaseTime:'',
            }
        }
        this.activityId = this.props.location.query.activityId
    }


    componentDidMount() {
        let query = this.props.location.query
        this.stores.getActivityDetails(this.props.location.query.activityId);
        this.stores.getUserInfo()
        if('itemId' in query){
            this.stores.getDetail({
                itemId: query.itemId
            })
        }
    }

    checkBox(checked = true, onClick = () => {}) {

        let activeClass = checked ? 'active' : '';

        return (
            <div className={`checkbox ${activeClass}`} onClick={onClick}>
                <Icon type="check"></Icon>
            </div>
        )
    }


    renderCommentItems = (commentList= []) => {
        return commentList.map((item, index) => {
            return (
                <Flex className="comment-item" align="start" key={"comment" + index}>
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
        })

    }

    //渲染留资活动表单组件
    _renderFormItem = (type, index) => {
        let content = null;
        let { userInfo, modelDetail } = this.stores.state
        if(userInfo.mobile !== null){
            this.state.name = userInfo.name
            this.state.mobile = userInfo.mobile
            // this.setState({
            //     name: userInfo.name,
            //     mobile: userInfo.mobile
            // })
        }
        switch (type) {
            case 1:
                content = (
                    <CustomInputItem
                        key={'input'+index}
                        label="姓名"
                        type="text"
                        value={this.state.name}
                        onChange={e => this.setState({name: e})}
                        className="input"
                        maxLength={50}
                    />
                )
                break;
            case 2:
                content = [
                    <CustomInputItem
                        key={'input'+index}
                        label="手机号码"
                        type="number"
                        value={this.state.mobile}
                        onChange={e => this.setState({mobile: e})}
                        className="input"
                        maxLength={11}
                    />
                ]
                if(userInfo.mobile === null){
                    content.push(<CustomInputItem
                        key={'code'+index}
                        inputType="code"
                        type="number"
                        value={this.stores.state.checkCode}
                        onChange={e => this.setState({checkCode: e})}
                        label={<div onClick={this.getCode.bind(this, this.state.mobile)}>发送验证码</div>}
                        className="input"
                    />)
                }
                break;
            // case 3:
            //     content = (
            //         <CustomInputItem
            //             key={'input'+index}
            //             label="意向经销商"
            //             type="text"
            //             value={this.state.dealer}
            //             onChange={e => this.setState({name: e})}
            //             className="input"
            //         />
            //     )
            //     break;
            case 4:
                content = (
                    <CustomInputItem
                        key={'input'+index}
                        label="意向车型"
                        type="text"
                        value={modelDetail.name}
                        onClick={e => this.gotoSelect()}
                        className="input"
                    />
                )
                break;
            case 5:
                content = (
                    <CustomInputItem
                        key={'input'+index}
                        label="预算区间"
                        type="text"
                        value={this.state.formData.budgetRange[1]}
                        onClick={e => this.showModal('costmodal')}
                        className="input"
                    />
                )
                break;
            case 6:
                content = (
                    <CustomInputItem
                        key={'input'+index}
                        label="购买时间"
                        type="text"
                        value={this.state.formData.purchaseTime[1]}
                        onClick={e => this.showModal('buytimemodal')}
                        className="input"
                    />
                )
                break;
        }

        return content;
    }

    gotoSelect() {
        window.app.routerGoTo('/carModelList?goback=activityDetails&activityId='+this.activityId)
    }
    showModal(key){
        console.log(12121212)
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
    onChange (value, key) {
        let { formData } = this.state;
        
        formData[key] = value;
        console.log(value, key)

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
    signUp(){
        let { activityId, itemId } = this.props.location.query
        let { budgetRange, purchaseTime } = this.state.formData
        let params = {
            memberName: this.state.name.trim(),//姓名
            memberMobile: this.state.mobile,//手机号
            activityId: activityId,//活动id
            itemId: itemId,//车型id
            budgetRange: budgetRange[0],//预算区间
            purchaseTime: purchaseTime[0],//购买时间
            dealer: ''//意向经销商
        }
        // if(this.state.checkCode != this.stores.state.checkCode){
        //     Toast.info("请输入正确的验证码")
        //     return
        // }
        if(!params.memberName){
            Toast.info('请输入姓名')
            return
        }
        if(!params.budgetRange){
            Toast.info('请选择预算区间')
            return
        }
        if(!params.purchaseTime){
            Toast.info('请选择购买时间')
            return
        }
        this.stores.postActivityInfo(params)

    }
    getCode(mobile){
        if(!Verify.isPhoneNum(mobile)){
            Toast.info('请输入正确的手机号')
            return
        }
        this.stores.getCode(mobile)

    }

    render() {
        let { info, sending } = this.stores.state;

        return (
            <div>
                <PickerOption name="budgetRange" type="budget" visible={this.state.costmodal} onPickClose={this.onClose('costmodal')} onChange={(a, b) => this.onChange(a, b)}/>

                <PickerOption name="purchaseTime" type="buytime" visible={this.state.buytimemodal} onPickClose={this.onClose('buytimemodal')} onChange={(a, b) => this.onChange(a, b)}/>

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
                                    <span>{info.publishTime?Util.formatDate(info.publishTime):'-'}</span>
                                </div>
                            </Flex>
                            { info.type == 1 && (
                                <div className="color_orange">此处应该有优惠券，但ui还没给</div>
                            )}
                            {/* <div className="activity-text" dangerouslySetInnerHTML={{__html: info.content}}></div> */}
                            <div className="activity-text" >{info.content}</div>
                        </div>
                        {
                            info.type == 2 && (
                                <div className="sign-up-container">
                                    <div className="sign-up-title">
                                        活动报名
                                    </div>

                                    { info.infoType.map((item, index) => {
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


                        {/* 2期 */}
                    {/* <div className="hot-comment">
                        <Flex className="comment-header" justify="between">
                            <div>热门评价</div>
                            <div onClick={this.stores.openModal}><span className="iconfont icon-xiepinglun icon-comment"></span><span>写评论</span></div>
                        </Flex>

                        <div className="comment-list">
                            { this.renderCommentItems(info.commentList) }
                        </div>

                    </div>

                    <div className="look-more-wrap">
                        <Button className="more-btn">查看全部评价</Button>
                    </div> */}

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