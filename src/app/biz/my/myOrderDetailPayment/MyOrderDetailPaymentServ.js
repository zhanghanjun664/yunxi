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

    static listProps(params) {
        return Request({
            url: "caf/jdcloud/item/car/filter-props",
            type: "GET",
            data: params
        })
    }

    static getItemByprops(params, d) {
        return Request({
            url: "caf/jdcloud/item/car?dealerId=" + d,
            type: "POST",
            data: JSON.stringify(params),
            contentType:'application/json', 
            processData:false,
        })
    }

    

};