import React, { PropTypes, Component } from 'react';
import Request from "util/Request";


export default class {

    /**
     * 经销商查询 
     * @param {*} params {
     *  dealerId:云店id
     *  longtitude:经度
     *  latitude:纬度
     *  areaCode:城市编码
     * }
     */
    static getDealerInfo(params){
        return Request({
            url: "caf/jdcloud/dealer",
            type: "GET",
            data: params
        })
            
    }

    /**
     * 提交订单信息 
     * @param {*} params {
     *  memberName:购车人
     *  memberMobile:手机号码
     *  remark:备注
     *  carId:特惠车id
     * }
     */
    static postPayInfo(params){
        return Request({
            url: "caf/jdcloud/trade/order",
            type: "POST",
            data: params
        })
            
    }

    

};