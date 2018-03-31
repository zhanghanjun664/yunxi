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
}