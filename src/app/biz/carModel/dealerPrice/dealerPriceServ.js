import React, { PropTypes, Component } from 'react';
import Request from "util/Request";

export default class {
    static MockServ() {
        return Request({
            url: "http://192.168.33.11:8004/mocking/caf/api/v1/caf/jdcloud/item/car/list-by-page",
            type: "GET"
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