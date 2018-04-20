import React, { PropTypes, Component } from 'react';
import Request from "util/Request";


export default class {

    static getList(params) {
        return Request({
            url: "caf/jdcloud/item/car/list-by-page",
            type: "GET",
            data: params
        })
    }
    static getBannerList(params) {
        return Request({
            url: "caf/jdcloud/index/carousel-figures",
            type: "GET",
            data: params
        })
    }
    static getSpecialList(params) {
        return Request({
            url: "caf/jdcloud/item/special-cars",
            type: "GET",
            data: params
        })
    }


};