
/**
 * 
 * yie.lvlin
 * 云店首页请求
 */
import Request from "util/Request";

let locaPath = document.location.origin+document.location.pathname ;
export default class{
    /**
     * 获取活动轮播图列表
     * dealerId  经销商ID
     */
    static getActivityBannerList(_dealerId){

        let params = {
            type:2,
            dealerId:_dealerId
        }
        
        try {
            let data = Request({
                //url: "caf/jdcloud/index/carouselFigure",
                url: "caf/jdcloud/index/carousel-figures",
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
     * @param {*} _dealerId  经销商ID
     */
    static getInformationList(_dealerId){
        let params = {
            type:2,
            dealerId:_dealerId
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
     * @param {*} params {
     *  dealerId:云店id
     *  longtitude:经度
     *  latitude:纬度
     *  areaCode:城市编码
     * }
     */
    static getdealerInfo(params){
        
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
    static getActivityInformation(params){
       
        try {
            let data = Request({
                //url: "caf/jdcloud/index/activity",
                //url: "caf/jdcloud/index/activities",
                url:"mall/activity/list-by-page",
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
                //url: "caf/jdcloud/index/specialItem",
                url: locaPath+"assets/mock/caf-jdcloud-index-special-items.json", 
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
     * @param {*} _dealerId 云店编码
     */
    static getHotItemList(_dealerId){
        let params = {
            type:2,
            dealerId:_dealerId
        }

        try {
            let data = Request({
                url: "caf/jdcloud/index/hot-items",
                type: "GET",
                data: params
            })
            return data;
        } catch (e) {
            Toast.fail(e) ;
            console.log(e)
        }
    }

    //获取导航栏
    static getQuickLinkList() {
        return Request({
            url: "caf/jdcloud/index/quick-links",
            type: "GET",
            data: {type: 1}
        })
    }


}