/**
 * Created by zhang.weihua on 2018/3/23.
 */
import React, { PropTypes, Component } from 'react';
import { Flex, Button, } from 'antd-mobile';

import './QuickLinkLess.less';

class QuickLinkView extends Component {

    constructor(props, context) {
        super(props, context);

    }


    render() {
        return (

            <div className="quick-link-page">
                <div className="link-module">
                    <Flex className="link-header">
                        <span className="iconfont icon-jiaoche"></span>
                        <span>客户服务</span>
                    </Flex>
                    <Flex className="link-list" wrap="wrap">
                        <div className="link-item">
                            <img src="assets/images/home/shichengshijia.png" />
                            <div className="link-text ellipsis">客户服务</div>
                        </div>
                        <div className="link-item">
                            <img src="assets/images/home/shichengshijia.png" />
                            <div className="link-text ellipsis">客户服务</div>
                        </div>
                        <div className="link-item">
                            <img src="assets/images/home/shichengshijia.png" />
                            <div className="link-text ellipsis">客户服务</div>
                        </div>
                        <div className="link-item">
                            <img src="assets/images/home/shichengshijia.png" />
                            <div className="link-text ellipsis">客户服务</div>
                        </div>
                        <div className="link-item">
                            <img src="assets/images/home/shichengshijia.png" />
                            <div className="link-text ellipsis">客户服务</div>
                        </div>
                    </Flex>
                </div>

                <div className="link-module">
                    <Flex className="link-header">
                        <span className="iconfont icon-jiaoche"></span>
                        <span>我的福特</span>
                    </Flex>
                    <Flex className="link-list" wrap="wrap">
                        <div className="link-item">
                            <img src="assets/images/home/shichengshijia.png" />
                            <div className="link-text ellipsis">客户服务</div>
                        </div>
                        <div className="link-item">
                            <img src="assets/images/home/shichengshijia.png" />
                            <div className="link-text ellipsis">客户服务</div>
                        </div>
                        <div className="link-item">
                            <img src="assets/images/home/shichengshijia.png" />
                            <div className="link-text ellipsis">客户服务</div>
                        </div>
                        <div className="link-item">
                            <img src="assets/images/home/shichengshijia.png" />
                            <div className="link-text ellipsis">客户服务</div>
                        </div>
                        <div className="link-item">
                            <img src="assets/images/home/shichengshijia.png" />
                            <div className="link-text ellipsis">客户服务</div>
                        </div>
                    </Flex>
                </div>
            </div>


        )
    }
}

module.exports = QuickLinkView;