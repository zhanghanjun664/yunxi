import React, { PropTypes, Component } from 'react';
import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import Serv from './SpecialListServ';
import Config from 'config/Config';


useStrict(true)
class SpecialList {
    @observable state = {
        list: [],
        bannerList:[],
        specialList: [],
        position: { label: '广州', postCode: '440100000000' },
        style:{}
    };

    //获取首页数据
    @action
    getSpecialData = () => {
        this.getList();
        this.getBannerList();
    }

    @action
    setStyle(style){
        this.state.style = style
    }

    @action
    getSpecialList = (params) => {
        return Serv.getSpecialList(params);
    }

    @action
    async getList(params) {
        let {resultCode, data} = await Serv.getList(params);
        runInAction(()=>{
            if(resultCode === 0) {
                this.state.specialList = data.list;
            }
        })
    }

    @action
    async getBannerList() {
        let params = {
            type: '1',
            areaCode: this.state.position.postCode
        };
        let {data, resultCode, resultMsg} = await Serv.getBannerList(params);
        runInAction(()=> {
            this.state.bannerList = data;
            // console.log(data)
        })
    }

 }

//将组件实例化，这意味着组件将不能从别处实例化
const specialList = new SpecialList();


export default specialList;