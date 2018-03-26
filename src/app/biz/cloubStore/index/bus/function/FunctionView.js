import React,{Component} from 'react' ; 

import Information from './information/InformationView'
import { Flex} from 'antd-mobile';

import './FunctionLess.less' ;

/**
 * yie.lvlin
 * 精彩资讯+功能选项
 */
class CFunction extends Component{

    constructor(){
        super() ;
    }

    /**
     * 更多
     */
    handleClickMore = (e) => {

        window.app.routerGoTo('/quickLink') ;
        
    }
    /**
     * 试乘试驾
     */
    handleClickTestDrivie = (e) => {
        window.app.routerGoTo('/testdrive') ;
    }
    /**
     * 询底价
     */
    handleClickAskprice = (e) => {
        window.app.routerGoTo('/askprice') ;
    }
    render(){

        

        return(
            <div className="cfunction-div">
                <div className='cfunction-box'>
                    <div className='cfunction-box-news'>
                        <Information/>
                    </div>
                    <div className='cfunction-nav'>
                        <Flex className="nav">
                            <div className="nav-item" onClick={this.handleClickTestDrivie}>
                                <img src="assets/images/home/shichengshijia.png" />
                                <span>试乘试驾</span>
                            </div>
                            <div className="nav-item" onClick={this.handleClickAskprice}>
                                <img src="assets/images/home/xundijia.png" />
                                <span>询底价</span>
                            </div>
                            <div className="nav-item">
                                <img src="assets/images/home/kefuzhongxin.png" />
                                <span>客服中心</span>
                            </div>
                            <div className="nav-item">
                                <img src="assets/images/home/gouchejisuanqi.png" />
                                <span className="ellipsis">购车计算器</span>
                            </div>
                            <div className="nav-item" onClick={this.handleClickMore}>
                                <img src="assets/images/home/gengduo.png" />
                                <span>更多</span>
                            </div>
                        </Flex>
                    </div>
                </div>
            </div>
        ) ;
    }
}

module.exports = CFunction ; 