import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import Serv from './AskPriceServ';
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
        verCode:'',
        dealerList:[],  //经销商(距离)
        modelDetail:{},
        askPriceId:'',    // 询底价预约ID
        isLoading: false // 是否在请求中
    };
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
    async getDealers(params) {
        let {data, resultCode, resultMsg} = await Serv.listDealers(params) ;

        runInAction(() => {
            this.state.dealerList = data.list
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
    async getDetail(params) {
        let {data} = await Serv.getDetail(params);

        runInAction(() => {
            this.state.modelDetail = data;
        })
    }

    @action
    async askPriceSubmit(params, cbf) {
        this.state.isLoading = true;
        let {data} = await Serv.priceSubmit(params) ;
        runInAction(() => {
            this.state.priceSubmit = data;
            this.state.isLoading = false;
            cbf()
        })
    }
}

//将组件实例化，这意味着组件将不能从别处实例化
const askPrice = new price();


export default askPrice;
