import React, { PropTypes, Component } from 'react';
import Request from "util/Request";
import Util from 'util';
import Config from 'config/Config';

export default class {
    //获取订单列表
    static getOrderList(params) {

        let headers = {
            "Content-type": "application/json",
            "auth": Util.getLocalCache(Config.authName)
        }

        return Request({
            url: "caf/api/v1/appointment/list",
            type: "GET",
            data: params,
            headers: headers
        });
    }
};