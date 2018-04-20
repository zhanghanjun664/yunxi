import React, { PropTypes, Component } from 'react'
import Request from "util/Request"
import config from 'config/Config'

export default class {
  // 获取空闲的客服ID - 平台客服
  static getStaffId(user_id, dealerId) {
    let url = `${config.imRestHost}/squadAdmin/api/v1/users/${user_id}/customStaff`
    if(dealerId){
      url += `/${dealerId}`
    }
    return new Promise((resolve, reject) => {
      jQuery.support.cors = true;//兼容ie8, 9
      return $.ajax({
        url: url,
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

  // 获取常见问题列表
  static getCommonQuestions(){
    return new Promise((resolve, reject) => {
      jQuery.support.cors = true;//兼容ie8, 9
      return $.ajax({
        url: `${config.imRestHost}/squadAdmin/api/v1/commonQuestions`,
        data: { page: 1, size: 3 },
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

  // 获取用户信息
  static getUserInfo(params) {
    return Request({
      url : 'personal/members/info',
      data: params,
      type: 'GET'
    })
  }

  // 根据id获取客服信息
  static getStaffInfoById(staffId){
    return new Promise((resolve, reject) => {
      jQuery.support.cors = true;//兼容ie8, 9
      return $.ajax({
        url: `${config.imRestHost}/squadAdmin/api/v1/staffs/${staffId}`,
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