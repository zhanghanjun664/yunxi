
/**
 * 
 * yie.lvlin
 * 云店首页请求
 */
import Request from "util/Request";

export default class{

    /**
     * 获取活动轮播图列表
     * storeCode  云店编码
     */
    static getActivityBannerList(_storeCode){

        let params = {
            type:2,
            storeCode:_storeCode
        }
        
        try {
            let data = Request({
                url: "caf/jdcloud/index/carouselFigure",
                type: "GET",
                data: params
            })
            return data;
        } catch (e) {
            Toast.fail(e) ;
            console.log(e)
        }
    }

    /**
     * 获取最新资讯
     * @param {*} _storeCode 云店编码
     */
    static getInformationList(_storeCode){
        let params = {
            type:2,
            storeCode:_storeCode
        }

        try {
            let data = Request({
                url: "caf/jdcloud/index/news",
                type: "GET",
                data: params
            })
            return data;
        } catch (e) {
            Toast.fail(e) ;
            console.log(e)
        }
    }

    /**
     * 经销商查询 
     * @param {*} _storeCode 云店编码
     */
    static getdealerInfo(_storeCode){
        let params = {
            storeCode:_storeCode
        }

        try {
            let data = Request({
                url: "caf/jdcloud/dealer",
                type: "GET",
                data: params
            })
            return data;
        } catch (e) {
            Toast.fail(e) ;
            console.log(e)
        }
    }

    /**
     * 活动资讯
     * @param {*} _storeCode 云店编码
     */
    static getActivityInformation(_storeCode){
        let params = {
            type:2,
            storeCode:_storeCode
        }
        try {
            let data = Request({
                url: "caf/jdcloud/index/activity",
                type: "GET",
                data: params
            })
            return data;
        } catch (e) {
            Toast.fail(e) ;
            console.log(e)
        }

    }

    /**
     * 获取特惠车
     * @param {*} _storeCode 云店编码
     */
    static getSpecialCar(_storeCode){

        let params = {
            type:2,
            storeCode:_storeCode
        }

        try {
            let data = Request({
                url: "caf/jdcloud/index/specialItem",
                type: "GET",
                data: params
            })
            return data;
        } catch (e) {
            Toast.fail(e) ;
            console.log(e)
        }
    }

    /**
     * 热门车型
     * @param {*} _storeCode 云店编码
     */
    static getHotItemList(_storeCode){

        let params = {
            type:2,
            storeCode:_storeCode
        }

        try {
            let data = Request({
                url: "caf/jdcloud/index/hotItem",
                type: "GET",
                data: params
            })
            return data;
        } catch (e) {
            Toast.fail(e) ;
            console.log(e)
        }
    }


}