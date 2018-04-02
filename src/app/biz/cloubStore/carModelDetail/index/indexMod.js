
import Serv from './indexServ' ;
import { observable, action, runInAction } from 'mobx';

/**
 * yie.lvlin
 * 云店车型详情mod
 * 
 */
class CloubStoreCarModelDetail {
    @observable state = {
        itemId:'1171328588805309440', //车型id
        carDetailBaseInfo:{} ,  //车型基础信息
        followFlag:"0",  //是否已关注
        commentList:[], //评论列表
        activityList:[],  //促销活动
        carDetailInfo:{},  //车型详情信息
        navTab:0
    }

    @action
    handleScroll(type){
      this.state.navTab = type
    }

    set itemId(_itemId){
        this.state.itemId = _itemId ; 
    }

    /**
     * 获取车型基本信息
     * @param {*} params {
     *   itemCode  --车型编码
     *   storeCode  --云店编码
     * }
     * http://192.168.33.11:8004/document/detailPage?id=2755
     */
    @action
    async getCarDetailBaseInfo(params){
        
        let {data, resultCode, resultMsg} = await Serv.getCarDetailBaseInfo(params) ;
        runInAction(() => {
            this.state.carDetailBaseInfo = data
        })
    }

    /**
     * 查询用户是否已关注车型
     * @param {*} params {
     *   itemCode  --车型编码
     *   account  --微信unionId
     *   itemId  --车型ID
     * 
     * }
     * http://192.168.33.11:8004/document/detailPage?id=2764
     */
    @action
    async getFollowFlag(params){

        let {data, resultCode, resultMsg} = await Serv.getFollowFlag(params) ;
        runInAction(() => {
            if(data!=null){
                this.state.followFlag = data.followFlag
            }
        })
    }

    /**
     * 查询车型评价列表
     * @param {*} params {
     *   itemCode  --车型编码
     *   pageNum  --当前页码数，不传后台默认是1
     *   pageSize  --每页的记录数，不传后台默认是10
     * }
     * http://192.168.33.11:8004/document/detailPage?id=2764
     */
    @action
    async getCommentList(params){
        let {data, resultCode, resultMsg} = await Serv.getCommentList(params) ;
        runInAction(() => {
            this.state.commentList = data.list 
        })
    }

    /**
     * 查询商品活动
     * @param {*} params {
     *   storeId  --云店id（官方商城活动不传此参数）
     *   pageNum  --当前页码数
     *   pageSize  --每页记录数
     *   type   --活动类型
     *   areaCode  --城市编码
     * }
     * http://192.168.33.11:8004/document/detailPage?id=2709
     */
    @action
    async getCloubActivity(params){
        let {data, resultCode, resultMsg} = await Serv.getCloubActivity(params) ;
        runInAction(() => {
            this.state.activityList = data.list 
        })
    }

    /**
     * 云店车型详情
     * @param {*} params {
     *   itemCode  --车型编码
     * }
     * http://192.168.33.11:8004/document/detailPage?id=2762
     */
    @action
    async getCarDetailInfo(params){
        let {data, resultCode, resultMsg} = await Serv.getCarDetailInfo(params) ;
        runInAction(() => {
            this.state.carDetailInfo = data 
        })
    }

    // 车型详情（参数）
    @action
    async getCarConfig(params) {
        let {data, resultCode, resultMsg} = await Serv.getCarConfig(params) ; 
        runInAction(() => {
        this.state.carConfig = data ;
        })
    }
}

const cloubStoreCarModelDetail = new CloubStoreCarModelDetail() ;

export default cloubStoreCarModelDetail ;