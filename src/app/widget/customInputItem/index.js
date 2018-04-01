/**
 * @author 蓝胖
 * @time 2018-3-31
 * inputType   vertical-两行  horizontal-一行   code-发送验证码
 * necessary
 * label
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
        let {label = '', value, onChange, inputType = 'vertical', type='text', necessary = true,} = this.props;

        let classname = 'form-input-widget';
        classname += ` ${this.inputTypeStyle[inputType]}`;
        if (this.state.active)
            classname += ' active';

        return (
            <InputItem className={classname} onFocus={this.toggle} onBlur={this.toggle}
                       value={value} onChange={e => onChange(e)} type={type} >
                <span className={necessary ? 'necessary' : ''}>{label}</span>
            </InputItem>
        );
    }

}

module.exports = CustomInputItem;



