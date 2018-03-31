/**
 * Created by zhang.weihua on 2018/3/19.
 */
// import { Toast } from 'antd-mobile';
import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import Serv from './IndexServ';

useStrict(true)

class Home {

    @observable state = {
        bannerList: [],
        newsList: [],
        quickLinkList: [],
        hotCarList: [],
        discountCarList: [],
        hotActivityList: [],
        position: { label: '广州市', value: '123' },

    };

    //获取首页数据
    @action
    getIndexData = () => {
        this.getBannerList();
        this.getNewsList()
        // this.getHotCarList()
        // this.getDiscountCarList();
        // this.getHotActivityList()
    }

    @action
    async getBannerList() {
        let params = {
            type: '1',
            areaCode: this.state.position.value
        };
        let {data, resultCode, resultMsg} = await Serv.getBannerList(params);
        //如果是异步，必须在runInAction
        runInAction(()=> {
            this.state.bannerList = data;
            console.log(data)
        })

    }

    @action
    async getNewsList() {
        let params = {
            type: '1',
            areaCode: this.state.position.value
        };
        let {data, resultCode, resultMsg} = await Serv.getNewsList(params);
        runInAction(()=> {
            this.state.newsList = data;
        })
    }

    @action
    async getQuickLinkList() {

        let {data, resultCode, resultMsg} = await Serv.getQuickLinkList();
        runInAction(()=> {

            this.state.quickLinkList = data;
        })
    }

    @action
    async getHotCarList() {
        let params = {
            type: '1',
            areaCode: this.state.position.value,
            pageSize: 3,
        };
        let {data, resultCode, resultMsg} = await Serv.getHotCarList(params);
        runInAction(()=> {

            this.state.hotCarList = data.list;
        })
    }

    @action
    async getDiscountCarList() {
        let params = {
            type: '1',
            areaCode: this.state.position.value
        };
        let {data, resultCode, resultMsg} = await Serv.getDiscountCarList(params);
        runInAction(()=> {
            this.state.discountCarList = data.list;
        })
    }

    @action
    async getHotActivityList() {
        let params = {
            type: '1',
            areaCode: this.state.position.value
        };
        let {data, resultCode, resultMsg} = await Serv.getHotActivityList(params);
        runInAction(()=> {
            this.state.hotActivityList = data.list;
        })
    }


    @action
    setPosition = (item) => {
        this.state.position = item;
        this.getIndexData();  //刷新数据
    }


}

const home = new Home();


export default home;