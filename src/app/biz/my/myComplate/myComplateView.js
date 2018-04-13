import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router';
import { inject ,observer} from 'mobx-react';
import Style from './MyComplateLess.less';
import { InputItem ,TextareaItem ,ActionSheet ,Modal ,List ,Button, Flex, Toast } from 'antd-mobile';
import TabBar from 'pubBiz/tabBar/TabBarView'

@inject("complateInfo")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class complateInfo extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.complateInfo;
        this.state = {
            labelname:'name',
            formData: {
                
            }
        };
    }
    componentDidMount() {
        this.stores.getUserInfo()
    }

    handleClickLabel(ele) {
        this.setState({
            labelname:ele
        });
    }

    onChange (val, key) {
        let { formData } = this.state
        formData[key] = val
        if(key==='phone') {
            formData[key] = val.replace(/\s+/g, '')
        }
    }

    getVercode() {
        let { phone } = this.state.formData;

        let reg = /^1[3758]\d{9}$/g;

        if(phone!=='' && reg.test(phone)) {
            const params = {
                mobile:phone
            }
            this.stores.getVerCode(params)

        } else {
            Toast.fail('请输入正确的手机号', 3);
        }
    }

    bindPhone() {
        let { formData } = this.state

        let {isLoading } = this.stores.state;

        formData.verifyCode = this.stores.state.verCode

        if(!isLoading) {
            this.stores.submitBind(formData, () => {
                Toast.success('提交成功！', 2.5)
            })
        }

    }
    render() {
        let labelname = this.state.labelname;
        let {imgUrl} = this.stores.state.curUser || 'assets/images/cloubStore/jxs.png'
        return (
            <div className="complate-height">
            <div className="complate-info-page">
                <div className="info-portrait">
                    <img src={imgUrl} alt=""/>
                </div>
                <div onClick={ e => this.handleClickLabel('name') } className={labelname == 'name' ? 'selected info-name-tel' : 'info-name-tel'}>
                    <p className="title">姓名<span>*</span></p>
                    <InputItem
                        maxLength={5}
                        onChange={x=>this.onChange(x, 'name')}
                        placeholder="请输入姓名"
                    />
                </div>
                <div onClick={ e => this.handleClickLabel('tel') } className={labelname == 'tel' ? 'selected info-name-tel' : 'info-name-tel'}>
                    <p className="title">手机号码<span>*</span></p>
                    <InputItem
                        type="phone"
                        onChange={x=>this.onChange(x, 'phone')}
                        placeholder="请输入手机号码 "
                    />
                </div>
                <div onClick={ e => this.handleClickLabel('code') } className={labelname == 'code' ? 'selected info-name-tel info-code' : 'info-name-tel info-code'}>
                    <p className="get-code" onClick={e=>this.getVercode(e)}>获取验证码</p>
                    <InputItem
                        placeholder="请输入验证码"
                        type="number"
                        value={this.stores.state.verCode}
                        maxLength="6"
                        onChange={x=>this.onChange(x, 'verifyCode')}
                    />
                </div>
                <div className="submit-btn">
                    <Button onClick={e => { this.bindPhone(e)}} loading={this.stores.state.isLoading}>绑定手机号</Button>
                    <Flex>
                        <i></i>点击提交则视为同意<span>《福特购个人信息保护声明》</span>
                    </Flex>

                </div>
            </div>
            </div>
        );
    }
}

module.exports = complateInfo;
