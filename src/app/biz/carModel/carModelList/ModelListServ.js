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

    // 即将弃用
    static listProps(params) {
        return Request({
            url: "caf/jdcloud/item/car/filter-props",
            type: "GET",
            data: params
        })
    }

     // 即将弃用
    static getItemByprops(params, d) {
        return Request({
            url: "caf/jdcloud/item/car?dealerId=" + d,
            type: "POST",
            data: JSON.stringify(params),
            contentType:'application/json', 
            processData:false,
        })
    }

    // 列出可筛选属性和车型
    static listSelItem(params) {
        return Request({
            url: "caf/jdcloud/item/car/list",
            type: "GET",
            data: params
        })
    }

    

};