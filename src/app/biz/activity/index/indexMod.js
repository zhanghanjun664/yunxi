import React, { PropTypes, Component } from 'react';
import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import Serv from './indexServ';
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
    };
    //如果设定了useStrict严格模式，那么所有observable的值的修改必须在action定义的方法内，否则可以直接修改
    @action
    async getBaseData(params){
      let data = await Serv.getBaseInfo(params)
      this.state.baseInfo = data.data
      console.log(data)
    }
    @action
    getAdList = async (params) => {

        let { data } = await Serv.getAdList(params);
        //如果是异步，必须在runInAction
        runInAction(()=> {
            this.state.adList = data.list;
            console.log(data)
        })

    }

    
}

//将组件实例化，这意味着组件将不能从别处实例化
const activity = new Activity();


export default activity;