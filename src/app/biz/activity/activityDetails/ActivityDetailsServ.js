/**
 * Created by zhang.weihua on 2018/3/23.
 */

import Request from "util/Request";

export default class {

    //获取活动详情
    static getActivityDetails(id) {
        return Request({
            url: "mall/activity/detail/get",
            type: "GET",
            data: {id: id}
        })
    }
    //发送验证码 postActivityInfo
    static getCode(mobile) {
        console.log(mobile)
        return Request({
            url: "verify/code/get",
            type: "GET",
            data: {mobile: mobile}
        })
    }
    //活动报名 postActivityInfo
    static postActivityInfo(params) {
        console.log(params)
        return Request({
            url: "mall/activity/attend",
            type: "POST",
            data: params
        })
    }
    // 获取用户信息
    static getUserInfo() {
        return Request({
            url: "members/info",
            type: "GET"
        })
    }
    // 获取车型名称
    static getDetail(params) {
        return Request({
            url : 'caf/jdcloud/item/car/info',
            data:params,
            type:'GET'
        })
    }
}