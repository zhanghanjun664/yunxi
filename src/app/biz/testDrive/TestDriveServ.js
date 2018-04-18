import React, { PropTypes, Component } from 'react';
import Request from "util/Request";

export default class {
    static dealerList(params) {
        return Request({
            url: "caf/jdcloud/dealer/offers",
            type: "GET",
            data:params
        })
    } 
    // 提交预约使用JSON数据 
    static submitAppointment(params) {
        return Request({
            url: "appointment/drive",
            type: "POST",
            processData:false,
            contentType:'application/json',
            data: JSON.stringify(params)
        })
    }

    static getDetail(params) {
        return Request({
            url : 'caf/jdcloud/item/car/info',
            data: params,
            type:'GET'
        })
    }

    static getVerifyCode(params) {
        return Request({
            url : 'verify/code/get',
            data:params,
            type:'GET'
        })
    } 

    static getUserInfo(params) {
        return Request({
            url : 'members/info',
            data: params,
            type: 'GET'
        })
    } 
};