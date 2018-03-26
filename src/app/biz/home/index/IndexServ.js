/**
 * Created by zhang.weihua on 2018/3/19.
 */

import Request from "util/Request";

export default class {

    //获取首页轮播图
    static getBannerList(params) {
        try {
            let data = Request({
                url: "caf/jdcloud/index/carouselFigure",
                type: "GET",
                data: params
            })
            return data;
        } catch (e) {
            console.log(e)
        }
    }

    //获取最新资讯列表
    static getNewsList(params) {
        try {
            let data = Request({
                url: "caf/jdcloud/index/news",
                type: "GET",
                data: params
            })
            return data;
        } catch (e) {
            console.log(e)
        }
    }

    //快速导航列表
    static getQuickLinkList() {
        try {
            let data = Request({
                url: "caf/jdcloud/index/quickLink",
                type: "GET",
            })
            return data;
        } catch (e) {
            console.log(e)
        }
    }

    //热门车型
    static getHotCarList(params) {
        try {
            let data = Request({
                url: "caf/jdcloud/index/hotItem",
                type: "GET",
                data: params
            })
            return data;
        } catch (e) {
            console.log(e)
        }
    }

    //特惠车型
    static getDiscountCarList(params) {
        try {
            let data = Request({
                url: "caf/jdcloud/index/specialItem",
                type: "GET",
                data: params
            })
            return data;
        } catch (e) {
            console.log(e)
        }
    }

    //热门活动
    static getHotActivityList(params) {
        try {
            let data = Request({
                url: "caf/jdcloud/index/activity",
                type: "GET",
                data: params
            })
            return data;
        } catch (e) {
            console.log(e)
        }
    }

}