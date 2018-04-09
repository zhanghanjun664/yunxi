import React, { PropTypes, Component } from 'react';
import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import Serv from './ModelListServ';
import Config from 'config/Config';
/**
 * mod层
 * 业务逻辑，数据逻辑应该存储于此
 */
//定义为严格模式
useStrict(true)
class model {
    //将数据设为被观察者，这意味着数据将成为公共数据
    @observable state = {
        list: [],
        total: 0,
        propsList : [],
        carItemList: []
    };

    @action
    async getList(params) {
        let {resultCode, data} = await Serv.getList(params);
        runInAction(()=>{
            if(resultCode === 0) {
                this.state.list = data.list;
                this.state.total = data.total;
            }
        })
    }
    //如果设定了useStrict严格模式，那么所有observable的值的修改必须在action定义的方法内，否则可以直接修改
    //用action定义事件
    @action
    async listProps(params) {
        let {resultCode,data} = await Serv.listProps(params);
        //如果是异步，必须在runInAction
        runInAction(()=> {
            this.state.propsList = data;
        })
        //监控数据变化的回调,读取什么参数，即代表将要监控什么数据
        autorun(() => {

        })
    }

    @action
    async listItems(params) {
        let {resultCode,data} = await Serv.getItemByprops(params);
        //如果是异步，必须在runInAction
        runInAction(()=> {
            this.state.carItemList = data;
        })
        //监控数据变化的回调,读取什么参数，即代表将要监控什么数据
        autorun(() => {
            // console.log('carItemList->', this.state.carItemList)
        })

    }
 }

//将组件实例化，这意味着组件将不能从别处实例化
const modelList = new model();


export default modelList;