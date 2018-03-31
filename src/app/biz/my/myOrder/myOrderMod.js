import { observable, action, runInAction, useStrict, autorun } from 'mobx';
import Serv from './myOrderServ';

useStrict(true)
class MyOrder {
  @observable state = {
    tabIndex: "",
    key: '',   //搜索内容
    style: {}
  };

  @action
  changeTab(num){
    this.state.tabIndex = num
  }
  @action
  setStyle(style){
    this.state.style = style
  }

  @action
  getOrderList = (params) => {
    params = Object.assign({}, params, { searchContent: this.state.key });
    return Serv.getOrderList(params);
  }

}

const myOrder = new MyOrder();


export default myOrder;