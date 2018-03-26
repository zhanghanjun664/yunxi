/**
 * Created by zhang.weihua on 2018/3/22.
 */

import React, { PropTypes, Component } from 'react';
import { Flex, Button, Icon, Modal, TextareaItem, } from 'antd-mobile';
import { inject, observer } from 'mobx-react';
import './ActivityDetailsLess.less';
import TabBar from 'pubBiz/tabBar/tabBarView';
import { StarRange } from 'widget';



function CheckBox({checked = true, onClick = () => {}}) {

    let activeClass = checked ? 'active' : '';

    return (
        <Flex className={`checkbox ${activeClass}`} onClick={onClick}>
            <Icon type="check" size="xs"></Icon>
        </Flex>
    )
}


@inject("activityDetails")
@observer
class ActivityDetailsView extends Component {

    constructor(props, context) {
        super(props, context);

        this.stores = props.activityDetails;
    }


    renderCommentItem = () => {
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

    render() {
        return (
            <div>
                <div className="activity-details-page">
                    <div className="details-module">
                        <div className="activity-info">
                            <p className="title">
                                日内瓦车展首发 新福克斯有望2018年上市
                            </p>
                            <Flex className="activity-status">
                                <div>
                                    <span className="iconfont icon-yuedu"></span>
                                    <span>1767</span>
                                </div>
                                <div>
                                    <span className="iconfont icon-pinglun"></span>
                                    <span>1767</span>
                                </div>
                                <div>
                                    <span className="iconfont icon-shijian"></span>
                                    <span>2018.3.22</span>
                                </div>
                            </Flex>
                            <div className="activity-text">
                                <p>日前有国内媒体报道称，全新长安福特福克斯有望在2018年内正式投放国内市场。根据此前报道，全新福克斯预计会在3月份开幕的日内瓦车展期间正式发布。</p>
                                <p>
                                    <img src="assets/images/activity/banner01.png" />
                                </p>
                            </div>
                        </div>
                        <div className="sign-up-container">
                            <div className="sign-up-title">
                                活动报名
                            </div>
                            <div className="input-form">
                                <label className="input-label" htmlFor="name">姓名<span className="color_orange">*</span></label>
                                <input className="input-text" id="name" />
                                <div className="border-box"></div>
                            </div>
                            <div className="input-form">
                                <label className="input-label" htmlFor="mobile">手机号码<span className="color_orange">*</span></label>
                                <input className="input-text" id="mobile" />
                                <div className="border-box"></div>
                            </div>
                            <Flex className="input-form send-code-form" justify="between">
                                <input className="input-text" id="mobile" />
                                <div className="border-box"></div>
                                <div className="input-btn color_orange" onClick={() => {
                                    console.log('发送验证码');
                                }}>发送验证码</div>
                            </Flex>

                            <Button className="submit-btn">报名</Button>


                            <Flex className="statement">
                                <CheckBox checked={this.stores.state.checked} onClick={this.stores.checkboxChange} />
                                <span>点击提交则视为同意</span>
                                <span>《福特购个人信息保护声明》</span>
                            </Flex>
                        </div>
                    </div>


                    <div className="hot-comment">
                        <Flex className="comment-header" justify="between">
                            <div>热门评价</div>
                            <div onClick={this.stores.openModal}><span className="iconfont icon-xiepinglun icon-comment"></span><span>写评论</span></div>
                        </Flex>

                        <div className="comment-list">
                            { this.renderCommentItem() }
                            { this.renderCommentItem() }
                            { this.renderCommentItem() }
                        </div>

                    </div>

                    <div className="look-more-wrap">
                        <Button className="more-btn">查看全部评价</Button>
                    </div>

                    <div className="qrcode-wrap">
                        <img />
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

                    <div style={{height: '1.2rem', width: '100%'}}></div>

                </div>
                <TabBar selectedTab = 'activityTab'/>
            </div>
        )
    }
}

module.exports = ActivityDetailsView;