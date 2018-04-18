import React, { PropTypes, Component } from 'react';
import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import Serv from './TestDriveServ';
import Config from 'config/Config';
/**
 * mod层
试驾时间，精确到小时
期望购车时间（1：一个月内，2：三个月内，3：半年内，4：一年内，5：未定）
预算区间（1：10万元以内，2：10~15万，3：15~20万，4：20万以上）
 */
//定义为严格模式
useStrict(true)
class TestDrive {
    //将数据设为被观察者，这意味着数据将成为公共数据
    @observable state = {
        verCode:'',
        dealerList:[],
        modelDetail:{
            name:''
        },
        formData: {},
        isLoading: false,
        appointmnetId:'' // 预约后得到的预约号
    };

    // 保留FromData
    @action
    async setFormData(data) {
        this.state.formData.memberName = data.memberName;
        this.state.formData.memberMobile = data.memberMobile;
        this.state.formData.remark = data.remark;
    }

    // 清除保留的state
    @action
    clearModel() {
        this.state.modelDetail = {
            name:''
        };
    }
    // 获取验证码
    @action
    async getVerCode(params) {
        let {data} = await Serv.getVerifyCode(params);
        //如果是异步，必须在runInAction
        runInAction(()=> {
            if(data) {
                this.state.verCode = data;
            }
        })
    }

     // 取用户基本信息
     @action
     async getUserInfo(params, cbf) {
         let {data } = await Serv.getUserInfo(params);
         //如果是异步，必须在runInAction
         runInAction(()=> {
            cbf(data);
         })
     }

    // 取车型的名字
    @action
    async getDetail(params, cbf) {
        let {data} = await Serv.getDetail(params);

        runInAction(() => {
            this.state.modelDetail = data;
            cbf(data)
        })
    }
    @action
    setLoading(val) {
        this.state.isLoading = val;
    }

    // 提交预约试驾
    @action
    async submitAppointMent(params) {
        this.state.isLoading = true;
        let {data, resultCode} = await Serv.submitAppointment(params);

        runInAction(()=> {
            this.state.isLoading = false;   
            this.state.appointmnetId = data;
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
     */
    async getDealer(params, dealerId,  cbf) {
        let {data, resultCode, resultMsg} = await Serv.dealerList(params) ;
        runInAction(() => {

            if(data && ('list' in data)) {
                if(dealerId !== undefined) {
                    this.state.dealerList = data.list.filter(x=> x.id === dealerId)
                } else {
                    this.state.dealerList = data.list
                }
                cbf&&cbf(data.list)
            } else {
                this.state.dealerList = [];
                cbf&&cbf([])
            }
        })
    }
}

//将组件实例化，这意味着组件将不能从别处实例化
const testDrive = new TestDrive();


export default testDrive;