/**
 * @author 蓝胖
 * @time 2018-3-31
 * inputType   vertical-两行  horizontal-一行   code-发送验证码
 * necessary   是否必填
 * label       说明文字
 * activeClassName  高亮样式
 * 其他同antd-mobile inputItem组件
 */

import React, {PropTypes, Component} from 'react';
import { Flex, InputItem, } from 'antd-mobile';
import './index.less';

class CustomInputItem extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            active: false,
        }

        this.inputTypeStyle = {
            vertical: 'form-input-vertical',     //
            horizontal: 'form-input-horizontal',
            code: 'form-code',       //验证码
        };
    }

    toggle = () => {
        this.setState({
            active: !this.state.active
        })
    }

    render() {
        let {label = '', inputType = 'vertical', necessary = true, activeClassName='active', className='', ...props} = this.props;
        let inputClass = 'form-input-widget';
        inputClass += ` ${this.inputTypeStyle[inputType]}`;
        if (this.state.active)
            inputClass += ` ${activeClassName}`;

        inputClass += ' ' + className;

        return (
            <InputItem className={inputClass} onFocus={this.toggle} onBlur={this.toggle}
                       {...props} >
                <span className={necessary ? 'necessary' : ''}>{label}</span>
            </InputItem>
        );
    }

}

module.exports = CustomInputItem;



