import React, { PropTypes, Component } from 'react';
import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import Serv from './MyComplateServ'; 
import Config from 'config/Config';
/**
 * mod层
 * 业务逻辑，数据逻辑应该存储于此
 */
//定义为严格模式
useStrict(true)
class user {
    //将数据设为被观察者，这意味着数据将成为公共数据
    @observable state = {
        verCode: '',
        isLoading: false,
        curUser:{}
    };

    @action
    async getUserInfo(params = {}) {
        let {data} = await Serv.getMemberinfo(params);
        //如果是异步，必须在runInAction
        runInAction(()=> {
            this.state.curUser = data;

            console.log('User data->', data);
        })
    }

    @action
    async getVerCode(params) {
        let {data} = await Serv.getVerifyCode(params);
        //如果是异步，必须在runInAction
        runInAction(()=> {
            this.state.verCode = data;
        })
    }

    @action
    async submitBind(params, cbf) {
        this.state.isLoading = true;
        try {
            let {data} = await Serv.submitBind(params);
            
        } catch(e) {

            this.state.isLoading = false;
            
        }

        //如果是异步，必须在runInAction
        runInAction(()=> {
            this.state.isLoading = false;
            cbf()
        })
        //监控数据变化的回调,读取什么参数，即代表将要监控什么数据
        autorun(() => {
            console.log("Tasks left: ", this.state)
        })
    }
}

//将组件实例化，这意味着组件将不能从别处实例化
const complateInfo = new user();


export default complateInfo;