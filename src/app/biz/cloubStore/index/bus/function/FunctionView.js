import React,{Component} from 'react' ; 

import Information from './information/InformationView'
import { Flex} from 'antd-mobile';

import './FunctionLess.less' ;
import { inject, observer } from 'mobx-react';

import IndexUtil from './../../global/IndexUtil' ; 

/**
 * yie.lvlin
 * 精彩资讯+功能选项
 */
@inject("cloubStoreIndex") 
@observer
class CFunction extends Component{

    constructor(props){
        super(props) ;
        this.stores = this.props.cloubStoreIndex ; 
    }

    componentDidMount(){
        this.stores.getQuickLink() ;
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

        let {quickLinkList} = this.stores.state ;
        
        return(
            <div className="cfunction-div">
                <div className='cfunction-box'>
                    <div className='cfunction-box-news'>
                        <Information/>
                    </div>
                    <div className='cfunction-nav'>
                        <Flex className="nav">
                            {/* <div className="nav-item" onClick={this.handleClickTestDrivie}>
                                <img src="assets/images/home/shichengshijia.png" />
                                <span>预约试驾</span>
                            </div>
                            <div className="nav-item" onClick={this.handleClickAskprice}>
                                <img src="assets/images/home/xundijia.png" />
                                <span>查询底价</span>
                            </div>
                            <div className="nav-item">
                                <img src="assets/images/home/kefuzhongxin.png" />
                                <span>在线客服</span>
                            </div>
                            <div className="nav-item">
                                <img src="assets/images/home/gouchejisuanqi.png" />
                                <span className="ellipsis">金融方案</span>
                            </div> */}
                            { quickLinkList.map((item, index) => {
                                //固定只取前4个
                                if(index>=4) return '';
                                return (
                                    <div className="nav-item" onClick={() => { IndexUtil.toUrl(item.redirectUrl) }} key={'nav'+index}>
                                        <img src={item.imgUrl} />
                                        <span>{item.name}</span>
                                    </div>
                                )
                            })}
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