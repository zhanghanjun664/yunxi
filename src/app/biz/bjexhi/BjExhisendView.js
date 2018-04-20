import React,{Component} from 'react'
import {Button} from 'antd-mobile';
import Style from './BjexhiLess.less';

class BjExhisend extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="bjsend-ok">
                <div className="top-block">
                    <div className="iconfont icon-danxuanxiangxuanzhong"></div>
                    <div className="top-text">提交成功，感谢您的支持！</div>
                </div>
                <div className="mid-block">
                    <img src="assets/images/bjexhi/changan.jpg" />
                    <div className="gray-text">长按二维码，关注福特官方公众号</div>
                    <div className="bot-block">
                        <Button>关闭页面</Button>
                    </div>
                </div>
                
            </div> 
        );
    }
}

module.exports =  BjExhisend;