import React, { Component } from 'react';
import './index.less';

class CountDown extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
          curTime: 60,
          showCountdown: false
        }
    }

    start(){
      this.setState({showCountdown: true})
      let countDown = setInterval(()=>{
        this.state.curTime--
        this.setState({curTime:this.state.curTime})
        if(this.state.curTime <= 0) {
          this.setState({showCountdown: false, curTime: 60})
          clearInterval(countDown)
        }
      },1000)
    }


    render() {

        let { className = '' } = this.props;

        return (
            <div className={`countDown_page ${className}`}>
                <span className={this.state.showCountdown?'hidden':''}>获取验证码</span>
                <span className={this.state.showCountdown?'':'hidden'}>{this.state.curTime} s</span>
            </div>
        )
    }
}

module.exports = CountDown;