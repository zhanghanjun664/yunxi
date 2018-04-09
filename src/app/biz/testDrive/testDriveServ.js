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
    static submitAppointment(params) {
        return Request({
            url: "appointment/drive",
            type: "POST",
            data: params
        })
    }

    static getDetail(params) {
        return Request({
            url : 'caf/jdcloud/item/car/base-info',
            data:params,
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
};