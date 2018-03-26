import React, { PropTypes, Component } from 'react';
import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import Serv from './testDriveServ';
import Config from 'config/Config';
/**
 * mod层
 * 业务逻辑，数据逻辑应该存储于此
 */
//定义为严格模式
useStrict(true)
class price {
    //将数据设为被观察者，这意味着数据将成为公共数据
    @observable state = {
        list: [],
        // dealerDistance:[],  //经销商(距离)
        // dealerScore:[],     //经销商(评分)
    };
    //如果设定了useStrict严格模式，那么所有observable的值的修改必须在action定义的方法内，否则可以直接修改
    //用action定义事件
    @action
    async text() {
        let {data} = await Serv.MockServ();
        let {data2} = await Serv.testServ();
        //如果是异步，必须在runInAction
        runInAction(()=> {
            this.state.list = data.list;
        })
        //监控数据变化的回调,读取什么参数，即代表将要监控什么数据
        autorun(() => {
            console.log("Tasks left: ", this.state.list)
        })
    }
    @action
    async mockPriceText() {
        let {data} = await Serv.MockServ();
        //如果是异步，必须在runInAction
        runInAction(()=> {
            this.state.list = data.list;
            console.log("data",data.list)
        })
        //监控数据变化的回调,读取什么参数，即代表将要监控什么数据
        autorun(() => {
            console.log("Tasks left: ", this.state.list)
        })
    }

    /**
     * 查询经销商
     * @param {*} params {
     *   carName  --车型
     *   longitude  --用户位置经度
     *   latitude  --用户位置纬度
     *   cityId   --城市编码
     *   pageNum  --当前页码数
     *   pageSize  --每页记录数
     *   type      --0：距离最近，1：评分最高
     * }
     * http://192.168.33.11:8004/document/detailPage?id=2870
     */
    async getDealer(params){
        let {data, resultCode, resultMsg} = await Serv.MockServ(params) ;
        runInAction(() => {
            this.state.dealerList = data.list
        })
    }
}

//将组件实例化，这意味着组件将不能从别处实例化
const askPrice = new price();


export default askPrice;