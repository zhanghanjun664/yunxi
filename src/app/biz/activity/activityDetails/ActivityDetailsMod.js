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
        info: {
            name:'Hello',
            readTotal:'1000+',
            commentTotal:23,
            publishTime:'2015-10-12 10:21:30',
            content:'最近身体还不错',
            infoType: [],
            commentList:[
                1,2,3
            ]
        },                //活动信息
        checkCode: null,            //验证码
        sending:{
            code: false,
            signUp: false,
            getCoupon: false
        },
        userInfo: {},
        modelDetail: {},
        dealerList: {},
        formData: {
            budgetRange: '',
                purchaseTime: '',
                dealer: '',
                dealerName: '',
                mobile: '',
                name: '',
                checkCode: '',
        }
    };
    @action
    changeFormData(form){
        runInAction(()=>{
            this.state.formData = form
        })
    }
    // 活动详情
    @action
    async getActivityDetails(id) {
        let { data, resultCode, resultMsg } = await Serv.getActivityDetails(id);
        runInAction(() => {
            this.state.info = data;
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
    @action
    async getDealers(params, cbf) {
        let {data, resultCode, resultMsg} = await Serv.getDealers(params) ;

        runInAction(() => {
            this.state.dealerList = data.list
            cbf&&cbf(data.list)
        })
    }

    /**
     * 领取优惠券
     * @param {*} params {
     *   couponId  --优惠券id
     *   activityId  --活动id
     * }
     */
    @action
    async getCoupon(params) {
        if(this.state.sending.getCoupon) return
        this.state.sending.getCoupon = true;
        await Serv.getCoupon(params) ;
        this.state.sending.getCoupon = false;
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
    @action
    setLoadingStatus(key, val){
        this.state.sending[key] = val
    }

    // 活动报名
    @action
    async postActivityInfo(params) {
        if(this.state.sending.signUp){
            return
        }
        this.state.sending.signUp = true;
        let { data, resultCode, resultMsg } = await Serv.postActivityInfo(params);
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