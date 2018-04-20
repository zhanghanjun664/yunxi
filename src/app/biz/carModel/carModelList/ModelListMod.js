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
        carItemList: {}, // 属性与车型之间的映射 
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

    @action
    async getPropsItem(params) {
        let {resultCode, data} = await Serv.listSelItem(params);
        runInAction(()=> {
            if(resultCode === 0) {
                this.state.propsList = data.props;
                this.state.carItemList = data.propItems;
            }
        })
    }
 }

//将组件实例化，这意味着组件将不能从别处实例化
const modelList = new model();


export default modelList;