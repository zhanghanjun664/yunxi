import React, { PropTypes, Component } from 'react'
import Request from "util/Request"
import config from 'config/Config'

export default class {

  // 获取空闲的客服ID - 平台客服
  static getStaffId(user_id) {
    return new Promise((resolve, reject) => {
      jQuery.support.cors = true;//兼容ie8, 9
      return $.ajax({
        url: `${config.imRestHost}/squadAdmin/api/v1/users/${user_id}/customStaff`,
        type: 'GET',
        crossDomain: true
      }).then((res) => {
        resolve(res)
      }).fail((err) => {
        console.log('err：', err)
        reject(err)
      })
    })
  }
}