import React, { PropTypes, Component } from 'react';
import Request from "util/Request";

export default class {
    static listDealers(params) {
        return Request({
            url: "caf/jdcloud/dealer/offers",
            type: "GET",
            data:params
        })
    }

    static getVerifyCode(params) {
        return Request({
            url : 'verify/code/get',
            data:params,
            type:'GET'
        })
    }

    static getDetail(params) {
        return Request({
            url : 'caf/jdcloud/item/car/info',
            data:params,
            type:'GET'
        })
    }

    static priceSubmit(params) {
        return Request({
            url: "personal/appointment/drive",
            type: "POST",
            processData:false,
            contentType:'application/json',
            data: JSON.stringify(params)
        })
    }

    static getUserInfo(params) {
        return Request({
            url : 'personal/members/info',
            data: params,
            type: 'GET'
        })
    } 
};