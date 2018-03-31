import React, { PropTypes, Component } from 'react';
import Request from "util/Request";

export default class {
    static mockServ(params) {
        return Request({
            url: "caf/jdcloud/dealer/offers",
            type: "GET",
            data:{
                carName:params.carName,
                longitude:params.longitude,
                latitude:params.latitude,
                cityId:params.cityId,
                pageNum:params.pageNum,
                pageSize:params.pageSize,
                type:params.type
            }
        })
    }
    static priceSubmit(params) {
        return Request({
            url: "caf/api/v1/appointment/drive",
            type: "POST",
            data:{
                vehicleModel:params.vehicleModel,
                dealer:params.dealer,
                memberName:params.memberName,
                memberMobile:params.memberMobile,
                appointmentTime:params.appointmentTime,
                purchaseTime:params.purchaseTime,
                type:params.type,
                verifyCode:params.verifyCode,
                openid:params.openid
            }
        })
    }
    static testServ2() {
        return Request({
            url: "yundt/mgmt/item/list-by-page",
            type: "GET",
            data: {xx: 1, bb: 2}
        })
    }
};