/**
 * Created by zhang.weihua on 2018/3/19.
 */

import Request from "util/Request";

export default class {

    //获取首页轮播图
    static getBannerList(params) {
        return Request({
            url: "caf/jdcloud/index/carousel-figures",
            type: "GET",
            data: params
        })
    }

    //获取导航栏
    static getQuickLinkList() {
        return Request({
            url: "caf/jdcloud/index/quick-links",
            type: "GET",
            data: {type: 1}
        })
    }

    //获取最新资讯列表
    static getNewsList(params) {
        return Request({
            url: "caf/jdcloud/index/news",
            type: "GET",
            data: params
        })
    }


    //热门车型
    static getHotCarList(params) {
        return Request({
            url: "caf/jdcloud/index/hot-items",
            type: "GET",
            data: params
        })
    }

    //特惠车型
    static getDiscountCarList(params) {
        return Request({
            url: "caf/jdcloud/item/special-cars",
            type: "GET",
            data: params
        })
    }

    //热门活动
    static getHotActivityList(params) {

        return Request({
            url: "mall/activity/list-by-page",
            type: "GET",
            data: params
        })
    }

    // logo信息
    static getLogoData(params){
        return Request({
            url: 'caf/jdcloud/index/logo',
            data: params
        })
    }

}