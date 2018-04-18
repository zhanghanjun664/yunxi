import React, { PropTypes, Component } from 'react';
import { observable, action, runInAction, useStrict, autorun } from 'mobx';
import Serv from './IndexServ';
import Config from 'config/Config';
/**
 * mod层
 * 业务逻辑，数据逻辑应该存储于此
 */
//定义为严格模式
useStrict(true)
class Activity {
    //将数据设为被观察者，这意味着数据将成为公共数据
    @observable state = {
        navTab: 0,
        adList: [],
        style: {},
        activityLabel:[],
        activityList: []
    };
    // 活动标签
    @action
    async getActivityLabel(cbf) {
        let {data} = await Serv.getActivityLabel({type:2});
        runInAction( () => {
            this.state.activityList = data;
            cbf(data);
        })
    }
    // 活动列表
    @action
    async getActivityList(params) {
        return Serv.getActivityList(params)
    }
    @action
    setStyle(style){
        this.state.style = style
    }

    // 广告列表
    @action
    getAdList = async (params) => {
        let { data } = await Serv.getAdList(params);
        runInAction(() => {
            this.state.adList = data;
        })

    }


}

const activity = new Activity();


export default activity;