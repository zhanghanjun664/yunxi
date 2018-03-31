/**
 * Created by zhang.weihua on 2018/3/22.
 */

import React, { PropTypes, Component } from 'react';
import { Flex, Button, Icon, Modal, TextareaItem, InputItem, } from 'antd-mobile';
import { inject, observer } from 'mobx-react';
import './ActivityDetailsLess.less';
import { StarRange } from 'widget';



function CheckBox({checked = true, onClick = () => {}}) {

    let activeClass = checked ? 'active' : '';

    return (
        <div className={`checkbox ${activeClass}`} onClick={onClick}>
            <Icon type="check"></Icon>
        </div>
    )
}

class InputC extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            active: false,
        }
    }

    onFocus = () => {
        this.setState({
            active: true
        })
    }

    onBlur = () => {
        this.setState({
            active: false
        })
    }

    render() {
        let {name = '', necessary = true, value, onChange, inputType = 'input', type} = this.props;
        let content = null;
        if(inputType == 'input') {
            content = (
                <InputItem className={`form-input ${this.state.active ? 'active' : ''}`} onFocus={this.onFocus} onBlur={this.onBlur}
                    value={value} onChange={onChange} type={type}
                >
                    <span className={necessary ? 'necessary' : ''}>{name}</span>
                </InputItem>
            );
        }else {
            content = (
                <InputItem className={`form-code ${this.state.active ? 'active' : ''}`} onFocus={this.onFocus} onBlur={this.onBlur}
                           value={value} onChange={onChange} type={type} >
                    发送验证码
                </InputItem>
            );
        }
        return content;

    }
}


@inject("activityDetails")
@observer
class ActivityDetailsView extends Component {

    constructor(props, context) {
        super(props, context);

        this.stores = props.activityDetails;
    }


    componentDidMount() {
        this.stores.getActivityDetails(this.props.location.query.id);
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
                    <InputC
                        key={'input'+index}
                        name="姓名"
                        type="text"
                    />
                )
                break;
            case 2:
                content = [
                    <InputC
                        key={'input'+index}
                        name="手机号码"
                        type="phone"
                    />,
                    <InputC
                        key={'code'+index}
                        inputType="code"
                        type="digit"
                    />

                ]
                break;
        }

        return content;
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
                                    <span>{info.publishTime}</span>
                                </div>
                            </Flex>
                            { info.type == 1 && (
                                <div className="color_orange">此处应该有优惠券，但ui还没给</div>
                            )}
                            <div className="activity-text" dangerouslySetInnerHTML={{__html: info.content}}>

                            </div>
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

                                    <Button className="submit-btn">报名</Button>


                                    <div className="statement">
                                        <CheckBox checked={this.stores.state.checked} onClick={this.stores.checkboxChange} />
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
                            { this.renderCommentItems(info.commentList) }
                        </div>

                    </div>

                    <div className="look-more-wrap">
                        <Button className="more-btn">查看全部评价</Button>
                    </div>

                    <div className="qrcode-wrap">
                        <img src={info.qrCode} />
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