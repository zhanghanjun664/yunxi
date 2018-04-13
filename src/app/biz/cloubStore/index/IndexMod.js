import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import Util from 'util';
import Serv from './IndexServ' ;

//严格模式
useStrict(true)

/**
 * 云店首页接口
 */
class IndexMod {

    @observable state = {
        storeCode:'C0001',
        dealerId: Util.getQueryString('dealerId'),
        activityBannerList:[] , //首页活动轮播图列表
        informationList:[],  //最新资讯
        dealerInfo:{},  //经销商查询
        activityInformationList:[],  //活动资讯
        specialCarList:[],  //特惠车
        hotItemList:[], //热门车型
        quickLinkList:[],  //快速导航
    } ;

    set dealerId(_dealerId){
        this.state.dealerId = _dealerId ; 
    }

    getStoreCode(storeCode){
        storeCode = storeCode||this.state.storeCode ;
        return storeCode ; 
    }
    getDealerId(dealerId){
        dealerId = dealerId||this.state.dealerId ;
        return dealerId ; 
    }
    /**
     * 获取活动轮播图列表
     * storeCode  云店编码
     */
    @action
    getActivityBannerList = async(dealerId) => {
        //storeCode = this.getStoreCode(storeCode) ;
        dealerId = this.getDealerId(dealerId) ;
        
        let {data, resultCode, resultMsg} = await Serv.getActivityBannerList(dealerId) ;

       
        runInAction(() => {
            this.state.activityBannerList = data ; 
        }) ;
    }

    /**
     * 最新资讯
     * @param {*} storeCode 云店编码
     */
    @action
    async getInformationList(dealerId) {
        //storeCode = this.getStoreCode(storeCode) ;
        dealerId = this.getDealerId(dealerId) ;
        let {data, resultCode, resultMsg} = await Serv.getInformationList(dealerId) ;

        runInAction(() => {
            this.state.informationList = data ;
        })
    }

    /**
     * 经销商查询 
     * @param {*} params {
     *  dealerId:云店id
     *  longtitude:经度
     *  latitude:纬度
     *  areaCode:城市编码
     * }
     */
    @action
    async getdealerInfo(params) {
        // !params.dealerId?params.dealerId=this.getDealerId():'' ;
        // params
        params.dealerId = this.state.dealerId
        let {data, resultCode, resultMsg} = await Serv.getdealerInfo(params);
        runInAction(() => {
            this.state.dealerInfo = data ;
        })
    }

    /**
     * 活动资讯
     * @param {*} storeCode 
     */
    @action
    async getActivityInformation(params){

        
        //storeCode = this.getStoreCode(storeCode) ;
        
        let {data, resultCode, resultMsg} = await Serv.getActivityInformation(params);
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
    async getHotItemList(dealerId){
        
        //storeCode = this.getStoreCode(storeCode) ;
        dealerId = this.getDealerId(dealerId) ; 
        let {data, resultCode, resultMsg} = await Serv.getHotItemList(dealerId);
        runInAction(() => {
            this.state.hotItemList = data ;
        })
    }

    @action
    async getQuickLink() {
        let {data, resultCode, resultMsg} = await Serv.getQuickLinkList();
        //如果是异步，必须在runInAction
        runInAction(()=> {
            this.state.quickLinkList = data;
        })
    }

}

//只实例化一次
const indexMod = new IndexMod() ;

export default indexMod ; 