import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router';
import { inject ,observer} from 'mobx-react';
import Style from './myComplateLess.less';
import { InputItem ,TextareaItem ,ActionSheet ,Modal ,List ,Button  } from 'antd-mobile';
import TabBar from 'pubBiz/tabBar/tabBarView'

@inject("complateInfo")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class complateInfo extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            labelname:'name',
        };
    }

    handleClickLabel(ele) {
        this.setState({
            labelname:ele
        });
    }

    render() {
        var labelname = this.state.labelname;
        return (
            <div style={{height: '100%'}}>
            <div className="complate-info-page">
                <div className="info-portrait">
                    <img src="assets/images/cloubStore/jxs.png" alt=""/>
                </div>
                <div onClick={ e => this.handleClickLabel('name') } className={labelname == 'name' ? 'selected info-name-tel' : 'info-name-tel'}>
                    <p className="title">姓名<span>*</span></p>
                    <InputItem
                        placeholder="no label"
                    />
                </div>
                <div onClick={ e => this.handleClickLabel('tel') } className={labelname == 'tel' ? 'selected info-name-tel' : 'info-name-tel'}>
                    <p className="title">手机号码<span>*</span></p>
                    <InputItem
                        placeholder="no label"
                    />
                </div>
                <div onClick={ e => this.handleClickLabel('code') } className={labelname == 'code' ? 'selected info-name-tel info-code' : 'info-name-tel info-code'}>
                    <p className="get-code">获取验证码</p>
                    <InputItem
                        placeholder="no label"
                    />
                </div>
                <div className="submit-btn">
                    <a href="">绑定手机号</a>
                    <p>点击提交则视为同意<span>《福特购个人信息保护声明》</span></p>
                </div>
            </div>
            <TabBar selectedTab = 'mineTab'/>
            </div>
        );
    }
}

module.exports = complateInfo;
