import React, { PropTypes, Component } from 'react';
import Request from "util/Request";

export default class {
    // 车型基本信息
    static getBaseInfo(params) {
        try {
            let data = Request({
                url: "caf/jdcloud/store/item/info/base",
                type: "GET",
                data: params
            })
            return data;
        } catch (e) {
            console.log(e)
        }
    }
     //   经销商信息
     static getNearbyInfo(params) {
        //  必填	STRING	areaCode	城市编码
//      必填	STRING	itemCode	车型编码
        try {
            let data = Request({
                url: "caf/jdcloud/dealer/nearby/stastics",
                type: "GET",
                data: params
            })
            return data;
        } catch (e) {
            console.log(e)
        }
    }
    //   评论carConfig
    static getCommentData(params) {
        try {
            let data = Request({
                url: "caf/jdcloud/store/item/comment",
                type: "GET",
                data: params
            })
            return data;
        } catch (e) {
            console.log(e)
        }
    }
    //  车型详情（参数） 
    static getCarConfig(params) {
        try {
            let data = Request({
                url: "caf/jdcloud/store/item/info/detail",
                type: "GET",
                data: params
            })
            return data;
        } catch (e) {
            console.log(e)
        }
    }
    //  活动 
    static getActivityList(params) {
        try {
            let data = Request({
                url: "mall/activity/list-by-page",
                type: "GET",
                data: params
            })
            return data;
        } catch (e) {
            console.log(e)
        }
    }
};