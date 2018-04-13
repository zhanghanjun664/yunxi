/**
 * Created by zhang.weihua on 2018/3/23.
 */
import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import Serv from './ActivityDetailsServ';
import { Toast } from 'antd-mobile';

useStrict(true)

class ActivityDetails {

    @observable state = {
        show: false,             //展示modal
        checked: true,           //勾选同意协议框
        info: {},                //活动信息
        checkCode: null,            //验证码
        sending:{
            code: false,
            signUp: false
        },
        userInfo: {},
        modelDetail: {}
    };
    // 活动详情
    @action
    async getActivityDetails(id) {
        let { data, resultCode, resultMsg } = await Serv.getActivityDetails(id);
        runInAction(() => {
            this.state.info = data;
        })
    }

    // 获取验证码
    @action
    async getCode(mobile) {
        console.log(mobile)
        if(this.state.sending.code){
            return
        }
        this.state.sending.code = true;
        let { data } = await Serv.getCode(mobile);
        runInAction(() => {
            this.state.checkCode = data;
        })
        this.state.sending.code = false;
        
    }

    // 活动报名
    @action
    async postActivityInfo(params) {
        if(this.state.sending.signUp){
            console.log('发送中')
            return
        }
        this.state.sending.signUp = true;
        let { data, resultCode, resultMsg } = await Serv.postActivityInfo(params);
        Toast.info('报名成功')
        console.log('报名成功')
        runInAction(()=>{
            this.state.sending.signUp = false;
        })
    }

    // 获取用户信息
    @action
    async getUserInfo() {
        let { data, resultCode, resultMsg } = await Serv.getUserInfo();
        runInAction(() => {
            this.state.userInfo = data;
        })

    }

    // 取车型的名字
    @action
    async getDetail(params) {
        let {data} = await Serv.getDetail(params);

        runInAction(() => {
            this.state.modelDetail = data;
        })
    }

    @action
    openModal = () => {
        this.state.show = true;
    }

    @action
    onClose = () => {
        this.state.show = false;
    }

    @action
    checkboxChange = () => {
        this.state.checked = !this.state.checked
    }


}

const activityDetails = new ActivityDetails();
export default activityDetails;