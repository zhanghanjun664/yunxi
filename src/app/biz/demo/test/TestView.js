import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router'
import {inject,observer} from 'mobx-react';
import { Flex, Toast, Carousel, } from 'antd-mobile';

import './TestLess.less';
/**
 * 视图层，功能逻辑，html代码将存放于此
 */
//inject从props中获取相应的数据
@inject("activity")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class Test extends Component {
    constructor(props, context) {
        super(props, context)
        //this.stores = this.props.test;
        this.state = {}
    }

    render() {
        return (
            <div className="test-page">

            </div>
        );
    }
}

module.exports = Test;
