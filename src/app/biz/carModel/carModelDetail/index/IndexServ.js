import React, { PropTypes, Component } from 'react';
import Request from "util/Request";

export default class {
    // 车型基本信息, 暂不调用，已经合并到 detail-info
    static getBaseInfo(params) {
        return Request({
            url: "caf/jdcloud/item/car/base-info",
            type: "GET",
            data: params
        })
    }
    //   经销商信息
    static getNearbyInfo(params) {
        return Request({
            url: "caf/jdcloud/dealer/nearby/stastics",
            type: "GET",
            data: params
        })
    }
    //   评论
    static getCommentData(params) {
        return Request({
            url: "caf/jdcloud/item/car/comments",
            type: "GET",
            data: params
        })
    }
    //  车型详情（参数） 
    static getCarConfig(params) {
        return Request({
            url: "caf/jdcloud/item/car/detail-info",
            type: "GET",
            data: params
        })
    }
    //  活动 
    static getActivityList(params) {
        return Request({
            url: "mall/activity/list-by-page",
            type: "GET",
            data: params
        })
    }
    //  关注 
    static getFollowFlag(params) {
        return Request({
            url: "caf/jdcloud/item/car/follow",
            type: "GET",
            data: params
        })
    }
};