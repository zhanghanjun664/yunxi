import {observable,action,runInAction,useStrict,autorun} from 'mobx';

import Serv from './IndexServ' ;

//严格模式
useStrict(true)

/**
 * 云店首页接口
 */
class IndexMod {

    @observable state = {
        storeCode:'C0001',
        activityBannerList:[] , //首页活动轮播图列表
        informationList:[],  //最新资讯
        dealerInfo:{},  //经销商查询
        activityInformationList:[],  //活动资讯
        specialCarList:[],  //特惠车
        hotItemList:[] //热门车型
    } ;

    getStoreCode(storeCode){
        storeCode = storeCode||this.state.storeCode ;
        return storeCode ; 
    }
    /**
     * 获取活动轮播图列表
     * storeCode  云店编码
     */
    @action
    getActivityBannerList = async(storeCode) => {
        storeCode = this.getStoreCode(storeCode) ;
        let {data, resultCode, resultMsg} = await Serv.getActivityBannerList(storeCode) ;

       
        runInAction(() => {
            this.state.activityBannerList = data.list ; 
        }) ;
    }

    /**
     * 最新资讯
     * @param {*} storeCode 云店编码
     */
    @action
    async getInformationList(storeCode) {
        storeCode = this.getStoreCode(storeCode) ;
        let {data, resultCode, resultMsg} = await Serv.getInformationList(storeCode) ;

        runInAction(() => {
            this.state.informationList = data ;
        })
    }

    /**
     * 经销商查询
     * @param {*} storeCode 云店编码
     */
    @action
    async getdealerInfo(storeCode) {
        storeCode = this.getStoreCode(storeCode) ;
        let {data, resultCode, resultMsg} = await Serv.getdealerInfo(storeCode);
        runInAction(() => {
            this.state.dealerInfo = data ;
        })
    }

    /**
     * 活动资讯
     * @param {*} storeCode 
     */
    @action
    async getActivityInformation(storeCode){
        storeCode = this.getStoreCode(storeCode) ;
        let {data, resultCode, resultMsg} = await Serv.getActivityInformation(storeCode);
        runInAction(() => {
            this.state.activityInformationList = data.list ;
        })
    }

    /**
     * 特惠车
     * @param {*} storeCode 
     */
    @action
    async getSpecialCar(storeCode){
        storeCode = this.getStoreCode(storeCode) ;
        let {data, resultCode, resultMsg} = await Serv.getSpecialCar(storeCode);
        runInAction(() => {
            this.state.specialCarList = data.list ;
        })
    }

    /**
     * 热门车型
     * @param {*} storeCode 
     */
    @action
    async getHotItemList(storeCode){
        
        storeCode = this.getStoreCode(storeCode) ;
        let {data, resultCode, resultMsg} = await Serv.getHotItemList(storeCode);
        runInAction(() => {
            this.state.hotItemList = data.list ;
        })
    }

}

//只实例化一次
const indexMod = new IndexMod() ;

export default indexMod ; 