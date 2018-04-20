import React, { PropTypes, Component } from 'react';
import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import Serv from './ConfirmOrderServ';
import Config from 'config/Config';


useStrict(true)
class model {
    @observable state = {
        dealerInfo: {},
        payInfo: {}
    };


    /**
     * 经销商查询 
     * @param {*} params {
     *  dealerId:云店id
     *  longtitude:经度
     *  latitude:纬度
     *  areaCode:城市编码
     * }
     */
    @action
    async getDealerInfo(params) {
        let {data, resultCode, resultMsg} = await Serv.getDealerInfo(params);
        runInAction(() => {
            this.state.dealerInfo = data ;
        })
    }

    /**
     * 提交订单信息 
     * @param {*} params {
     *  memberName:购车人
     *  memberMobile:手机号码
     *  remark:备注
     *  carId:特惠车id
     * }
     */
    @action
    async postPayInfo(params) {
        let {data, resultCode, resultMsg} = await Serv.postPayInfo(params);
        runInAction(() => {
            this.state.payInfo = data ;
        })
    }
 }

const confirmOrder = new model();
export default confirmOrder;