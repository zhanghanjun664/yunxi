import React, { PropTypes, Component } from 'react';
import Request from "util/Request";
import Util from 'util';
import Config from 'config/Config';

export default class {
    //获取订单列表
    static getOrderList(params) {
        return Request({
            url: "caf/api/v1/appointment/list",
            type: "GET",
            data: params,
        });
    }
};