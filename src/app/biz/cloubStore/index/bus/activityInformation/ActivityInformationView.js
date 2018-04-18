import React,{Component} from 'react' ; 
import { Flex, WhiteSpace } from 'antd-mobile';

import { inject, observer } from 'mobx-react';

import Util from 'util';

import './ActivityInformationLess.less' ;

/*
 * 活动资讯
 * @author yie.lvlin
 * @time 2017-3
 * */
@inject("cloubStoreIndex")
@observer
class ActivityInformation extends Component{

    constructor(props,context){

        super(props,context) ;

        this.stores = this.props.cloubStoreIndex ;
        this.dealerId = window.app.router.location.query.dealerId
    }

    componentDidMount(){
        let params = {
            pageNum:1,
            pageSize:3,
            storeId:this.stores.state.dealerId
        }
        this.stores.getActivityInformation(params) ;
    }

    /**
     * 打开活动详情
     */
    handleClickActivity = (e,id) => {
        
        window.app.routerGoTo('/activityDetails?from=cloubStore/index&tabBarType=1&activityId='+id+'&dealerId='+this.dealerId) ;
    }
    render(){
        let {activityInformationList} = this.stores.state ; 
        
        let type = ['推荐','行业','测评','特惠'] ;

        return(
            <div className='activityInformation'>
                <div className='activityInformation-title'>
                    <i className='iconfont icon-huodongzixun'/>
                    <span>活动资讯</span>
                </div>
                <div className='activityInformation-content'>

                    {
                        activityInformationList.map((val,i) => {
                            
                            return(
                                <Flex className='activityInformation-content-item' 
                                      key={'activityInformation'+i} 
                                      onClick={(e) => {this.handleClickActivity(e,val.id)}}>
                                    <div className='activityInformation-content-item-img'>
                                        <img src={val.image}/>
                                    </div>
                                    <Flex.Item className='activityInformation-content-item-c'>
                                        <div className='activityInformation-content-item-title'>
                                            <span className='ellipsis-two'>
                                                {val.name}
                                            </span>
                                        </div>
                                        {/* <div className='activityInformation-content-item-b'>
                                            <span>{type[val.type-1]}资讯</span>
                                            <span className='activityInformation-content-item-b-space'></span>
                                            <span>
                                            {
                                                Util.formatDate(val.publishTime||'2018-04-02',1) 
                                            }
                                            </span>
                                        </div> */}
                                        <div className='activityInformation-content-item-b'>
                                            <div className='item-tab-1'>
                                                <span className="iconfont icon-yuedu"></span>
                                                <span>{val.readTotal}</span>
                                            </div>
                                            <div className='item-tab-2'>
                                                <span className="iconfont icon-pinglun"></span>
                                                <span>{val.commentTotal}</span>
                                            </div>
                                            <div className='item-tab-3'>
                                                <span className="iconfont icon-shijian"></span>
                                                <span className="ellipsis">
                                                {
                                                    Util.formatDate(val.publishTime||'2018-04-02',1) 
                                                }
                                                </span>
                                            </div>
                                        </div>
                                    </Flex.Item>
                                </Flex>
                            ) 
                        })
                    }
                </div>
            </div>
        ) 
    }

}

module.exports = ActivityInformation ;