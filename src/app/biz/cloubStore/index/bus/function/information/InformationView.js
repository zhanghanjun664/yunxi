import React,{Component} from 'react' ; 

import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';

import AppServ from './InformationServ' ;

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
        this.storeCode = 'C001' ;
    }

    componentDidMount(){

        
        /*
        //let _news = await AppServ.getNews() ;
        let _news = {
            "data": [
                {
                    "id":1,
                    "title":"长安福特冬季特惠，百城千店联合",
                      "redirectUrl":"/advanced/advanced?action=table&token=1596945391&lang=zh_CN"
                },
                {
                    "id":2,
                    "title":"长安福特冬季特惠，百城千店联合",
                      "redirectUrl":"/advanced/advanced?action=table&token=1596945391&lang=zh_CN"
                }
            ],
            "resultCode": 0,
            "resultMsg": "success"
        } ;
        
        this.setState({news:_news.data}) ;*/

        this.stores.getInformationList(this.storeCode) ;
        
    }

    /**
     * 调用阿里的Carousel控件绘制
     */
    drawNews=()=>{
        
        let {informationList} = this.stores.state ;    
        //防止Carousel内没有list的时候占位100的高度
        if(informationList.length===0)return;
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
                                    onClick={window.app.routerGoTo.bind(this,val.redirectUrl)}
                                >
                                    <span className='tag'>围观</span>
                                    <span>{val.title}</span>
                                </div>
                               ) ;
                           })
                           
                            
                        }
                    </Carousel>
        )
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
                <div className='Information-more'>
                    <span>更多</span>   
                </div>
            </div>
        )
    }

}

module.exports = Information ;