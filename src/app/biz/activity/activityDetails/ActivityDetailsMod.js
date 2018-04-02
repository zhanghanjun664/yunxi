/**
 * Created by zhang.weihua on 2018/3/23.
 */
import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import Serv from './ActivityDetailsServ';

useStrict(true)

class ActivityDetails {

    @observable state = {
        show: false,             //展示modal
        checked: true,           //勾选同意协议框
        info: {},                //活动信息
        checkCode: null            //验证码
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
        let { data } = await Serv.getCode(mobile);
        this.state.checkCode = data
    }

    // 活动报名
    @action
    async postActivityInfo(params) {
        let { data, resultCode, resultMsg } = await Serv.postActivityInfo(params);
        console.log(data)
        console.log('报名成功')
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