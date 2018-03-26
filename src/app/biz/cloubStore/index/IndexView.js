import React,{Component} from 'react' ; 
import {Toast} from 'antd-mobile';

import IndexTop from './bus/top/TopView' ;
import MaskTitle from './global/title/TitleView' ;

//轮播图
import Carousels from './bus/activity/ActivityView';
//资讯
import CFunction from './bus/function/FunctionView' ;
//热门车型
import Horizontal from './bus/popularModels/PopularModelsView';
 
//活动资讯
import ActivityInformation from './bus/activityInformation/ActivityInformationView' ;

//特惠车专区
import SpecialCar from './bus/specialCar/SpecialCarView' ;

//精选视频
import SelectedVideo from './bus/selectedVideo/SelectedVideoView' ;

//经销商信息 
import Info from './bus/info/InfoView' ; 



import './IndexLess.less' ; 
import { inject,observer } from 'mobx-react';
import TabBar from 'pubBiz/tabBar/tabBarView'

/**
 * yie.lvlin
 * 云店首页
 */
//从全局中向prop注入cloubStoreIndex
//@inject("")
//设为观察者模式
//@observer
class AppView extends Component{
    
    constructor(){

        super() ;
    }

    render(){

        return(

            <div className='indexPage'>
                <IndexTop />
                <Carousels />
                <CFunction />
                <Info />
                <MaskTitle   iconClass='icon icon-hot'  titleName='热门车型'>
                    <Horizontal/>
                </MaskTitle>

                <ActivityInformation />

                <SpecialCar />

                <SelectedVideo />
                <TabBar selectedTab = 'searchTab' />
            </div>
        ); 
    }
}
//iconUrl='assets/images/home/huoyan.png'
module.exports = AppView ;