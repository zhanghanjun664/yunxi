import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router'
import { inject ,observer} from 'mobx-react';


@inject("activity")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class TestIndex extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = {};
    }

    render() {
        return (
            <div className="row">
                <p><a onClick={e=>{
                    window.app.routerGoTo("/test")
                }}>test</a></p>
                <p>hihihihi</p>

                <p><a onClick={e=>{
                    window.app.routerGoTo("/test3")
                }}>跳转测试异步请求页面</a></p>
                <p>hihihihi</p>
            </div>
        );
    }
}

module.exports = TestIndex;
