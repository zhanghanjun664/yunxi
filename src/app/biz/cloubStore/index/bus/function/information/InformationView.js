import React,{Component} from 'react' ; 

import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';

import AppServ from './InformationServ' ;

import IndexUtil from './../../../global/IndexUtil' ;
import './InformationLess.less' ;
import { inject, observer } from 'mobx-react';
/**
 * yie.lvlin
 * 精彩资讯
 */
@inject("cloubStoreIndex") 
@observer
class Information extends Component{

    constructor(props){
        super(props) ;

        this.state = {news:[]}

        this.stores = this.props.cloubStoreIndex ; 
    }

    componentDidMount(){

        this.stores.getInformationList() ;
        
    }

    /**
     * 调用阿里的Carousel控件绘制
     */
    drawNews=()=>{
        
        let {informationList} = this.stores.state ;    
        //防止Carousel内没有list的时候占位100的高度
        if(informationList.length===0){
            return(
                <span>暂无消息</span>
            )
        }else{
            return(
                <Carousel vertical
                                dots={false}
                                dragging={false}
                                swiping={false}
                                autoplay
                                infinite>
                            
                            
                            {
                               informationList.map((val,i)=>{
                                   //val.redirectUrl 点击跳转的页面
                                   return(
                                    <div 
                                        key={val.id} 
                                        className="v-item ellipsis"
                                        onClick={e=>{
                                            IndexUtil.toUrl(val.redirectUrl)                                      
                                            //window.app.routerGoTo(val.redirectUrl)
                                        }}
                                    >
                                        {/* <span className='tag'>围观</span> */}
                                        <span>{val.title}</span>
                                    </div>
                                   ) ;
                               })
                               
                                
                            }
                        </Carousel>
            )
        }
    }

    render(){

        return(
            <div className='Information'>
                <div className='Information-title'>精彩资讯</div>
                <div className='Information-carousel'>
                    {
                        this.drawNews() 
                    }
                </div>
                <div className='Information-sep'></div>
                <div className='Information-more'>
                    <span>更多</span>   
                </div>
            </div>
        )
    }

}

module.exports = Information ;