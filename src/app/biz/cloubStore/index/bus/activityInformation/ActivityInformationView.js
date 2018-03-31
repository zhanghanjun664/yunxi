import React,{Component} from 'react' ; 
import { Flex, WhiteSpace } from 'antd-mobile';

import { inject, observer } from 'mobx-react';

import Util from 'util';

import './ActivityInformationLess.less' ;
/**
 * yie.lvlin
 * 活动资讯
 */
@inject("cloubStoreIndex")
@observer
class ActivityInformation extends Component{

    constructor(props,context){

        super(props,context) ;

        this.stores = this.props.cloubStoreIndex ;
    }

    componentDidMount(){
        this.stores.getActivityInformation() ;
    }

    /**
     * 打开活动详情
     */
    handleClickActivity = (e) => {
        window.app.routerGoTo('/activityDetails') ;
    }
    render(){
        let {activityInformationList} = this.stores.state ; 
        
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
                                <Flex className='activityInformation-content-item' key={'activityInformation'+i} onClick={this.handleClickActivity}>
                                    <div className='activityInformation-content-item-img'>
                                        <img src={val.imgUrl}/>
                                    </div>
                                    <Flex.Item className='activityInformation-content-item-c'>
                                        <div className='activityInformation-content-item-title'>
                                            <span>
                                                {val.name}
                                            </span>
                                        </div>
                                        <div className='activityInformation-content-item-b'>
                                            <span>汽车资讯</span>
                                            <span className='activityInformation-content-item-b-space'></span>
                                            <span>
                                            {
                                                Util.formatDate(val.beginDate,1) 
                                            }
                                            </span>
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