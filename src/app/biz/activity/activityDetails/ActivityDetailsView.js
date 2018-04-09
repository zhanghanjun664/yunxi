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



@inject("activityDetails")
@observer
class ActivityDetailsView extends Component {

    constructor(props, context) {
        super(props, context);

        this.stores = props.activityDetails;

        this.state = {
            mobile: '',
            name: '',
            checkCode: ''
        }
    }


    componentDidMount() {
        this.stores.getActivityDetails(this.props.location.query.id);
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
                    />,
                    <CustomInputItem
                        key={'code'+index}
                        inputType="code"
                        type="number"
                        value={this.stores.state.checkCode}
                        onChange={e => this.setState({checkCode: e})}
                        label={<div onClick={this.getCode.bind(this, this.state.mobile)}>发送验证码</div>}
                        className="input"
                    />

                ]
                break;
        }

        return content;
    }

    signUp(){
        let params = {
            memberName: this.state.name.trim(),
            memberMobile: this.state.mobile,
            activityId: this.props.location.query.id
        }
        
        // if(this.state.checkCode != this.stores.state.checkCode){
        //     Toast.info("请输入正确的验证码")
        //     return
        // }
        if(!params.memberName){
            Toast.info('请输入姓名')
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
        let { info } = this.stores.state;

        return (
            <div>
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

                                    <Button className="submit-btn" onClick={this.signUp.bind(this)}>报名</Button>


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