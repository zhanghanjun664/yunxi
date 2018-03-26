import React,{Component} from 'react' ;

import { WingBlank, WhiteSpace ,SearchBar ,Flex} from 'antd-mobile';

import { AddressPicker } from 'widget';

import './TopLess.less' ;
import { inject, observer } from 'mobx-react';

/**
 * 云店首页搜索和定位
 */
@inject("home") 
@observer
class Top extends Component{

    constructor(props,context){

        super(props,context) ;

        this.storesHome = this.props.home ; 
        
    }

    selectAddr = () => {
        this.refs.addrModal.openModal();
    }

//<SearchBar placeholder='搜索您想要的车型' cancelText=''  />
    render(){
        let {position} = this.storesHome.state ; 
        return(
            <div>
                <Flex className="home-header">
                    <div className="logo"></div>
                    <Flex.Item className="input-wrap">
                        <input type="search" className="search-input" placeholder="搜索您想要的车型" />
                        <i className="iconfont icon-sousuo"></i>
                    </Flex.Item>
                    <Flex className="position" onClick={this.selectAddr}>
                        <i className="iconfont icon-dingwei"></i>
                        <span>{position && position.label }</span>
                    </Flex>
                </Flex>

                <AddressPicker ref="addrModal" ok={(item) => {
                    this.storesHome.setPosition(item);
                }} />
            </div>
        )
        
    }
}
/**
 * return(
            <div className='indextop'>
                <div className='indextop-logo'>
                    <img src='assets/images/cloubStoreIndex/fute-logo.png' />
                </div>
                <div className='indextop-search'>
                    <SearchBar placeholder='搜索您想要的车型' cancelText=''  />
                </div>
                <div className='indextop-map' onClick={this.handleMapClick}>
                    <div>
                        <img src='assets/images/cloubStoreIndex/定位.png' />
                    </div>
                    <div>重庆市</div>
                </div>
            </div>
        ) ;
 */
module.exports = Top ; 