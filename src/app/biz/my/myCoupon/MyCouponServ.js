import Request from "util/Request";
import Config from 'config/Config';

export default class {
    //获取订单列表
    static getCouponList(params) {
        return Request({
            url: "mall/coupon/list-by-page",
            type: "GET",
            data: params,
        });
    }
};