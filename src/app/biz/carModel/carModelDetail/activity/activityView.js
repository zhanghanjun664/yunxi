import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router'
import {inject,observer} from 'mobx-react';
import Config from 'config/Config';
import Util from 'util';
import './indexLess.less';
/**
 * 视图层，功能逻辑，html代码将存放于此
 */
//inject从props中获取相应的数据
@inject("productDetailIndex")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class ProductDetailIndex extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.productDetailIndex;
    }

    data(){
        this.stores.text();
    }

    data2(){
        this.stores.mockText();
    }

    render() {
        return (
            <div className="row">
                商品详情
            </div>
        );
    }
}

module.exports = ProductDetailIndex;
