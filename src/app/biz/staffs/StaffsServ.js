import React, { PropTypes, Component } from 'react'
import Request from "util/Request"

export default class {
  // 请求mock接口地址
  static testServ() {
    return Request({
      url: "http://192.168.33.11:8004/mocking/nuskin/api/v1/yundt/mgmt/item/list-by-page",
      type: "GET",
      data: { xx: 1, bb: 2 }
    })
  }

  // 请求本地json
  static testServ2() {
    return Request({
      url: "yundt/mgmt/item/list-by-page",
      type: "GET",
      data: { xx: 1, bb: 2 }
    })
  }
}