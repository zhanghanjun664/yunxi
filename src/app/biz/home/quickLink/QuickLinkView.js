/**
 * Created by zhang.weihua on 2018/3/23.
 */
import React, { PropTypes, Component } from 'react';
import { Flex, Button, } from 'antd-mobile';
import {inject,observer} from 'mobx-react';
import './QuickLinkLess.less';
import Util from 'util';

@inject('quickLink')
@observer
class QuickLinkView extends Component {

    constructor(props, context) {
        super(props, context);

        this.stores = this.props.quickLink;
    }

    componentDidMount() {
        this.stores.getQuickLinkList();
    }
    toUrl(url){
        if(url){
            let urls = Util.getUrl(url)
            location.href = urls
        }
    }

    renderNavItem = (item, index, key) => {
        return (
            <div className="link-item" key={key + index} onClick={this.toUrl.bind(this, item.redirectUrl)}>
                <img src={item.imgUrl} />
                <div className="link-text ellipsis">{item.name}</div>
            </div>
        )
    }


    render() {

        let { quickLinkList } = this.stores.state;

        return (

            <div className="quick-link-page">
                <div className="link-module">
                    <Flex className="link-header">
                        <span className="iconfont icon-jiaoche"></span>
                        <span>客户服务</span>
                    </Flex>
                    <Flex className="link-list" wrap="wrap">
                        { this.stores.data.service.map((item, index) => this.renderNavItem(item, index, 'service'))}


                    </Flex>
                </div>

                <div className="link-module">
                    <Flex className="link-header">
                        <span className="iconfont icon-jiaoche"></span>
                        <span>我的福特</span>
                    </Flex>
                    <Flex className="link-list" wrap="wrap">
                        { this.stores.data.my.map((item, index) => this.renderNavItem(item, index, 'my'))}
                    </Flex>
                </div>
            </div>


        )
    }
}

module.exports = QuickLinkView;