
import {observable,action,runInAction,useStrict,autorun, } from 'mobx';
import Serv from './mySubscribeServ';

useStrict(true)
class MySubsribe {



    @observable state = {
        tabIndex: 0,
        key: '',   //搜索内容
    };



    @action
    changeTab = (index) => {
        this.state.tabIndex = index;
    }


    @action
    changeKey = (event) => {
        this.state.key = event.target.value
    }

    @action
    getAppointment = (params) => {
        params = Object.assign({}, params, {searchContent: this.state.key});
        return Serv.getAppointment(params);
    }

}

const mySubsribe = new MySubsribe();


export default mySubsribe;
