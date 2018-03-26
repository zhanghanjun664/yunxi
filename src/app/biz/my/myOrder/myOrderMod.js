import { observable, action, runInAction, useStrict, autorun } from 'mobx';
import Serv from './myOrderServ';

useStrict(true)
class MyOrder {
  @observable state = {
    tabIndex: "",
    key: '',   //搜索内容
  };

  @action
  changeTab(num){
    this.state.tabIndex = num
  }

  @action
  getOrderList = (params) => {
    // console.log('this.state.tabIndex:'+this.state.tabIndex+' params.appointmentStatus:'+params.appointmentStatus)
    // if(this.state.tabIndex !== params.appointmentStatus){
    //   console.log('不一样')
    //   return
    // }
    // console.log('可以拉')
    params = Object.assign({}, params, { searchContent: this.state.key });
    return Serv.getOrderList(params);
  }

}

const myOrder = new MyOrder();


export default myOrder;