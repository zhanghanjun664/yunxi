import { observable, action, runInAction, useStrict, autorun } from 'mobx';
import Serv from './MyCouponServ';
import Config from 'config/Config';

useStrict(true)
class MyCoupon {
  @observable state = {
    couponList: [],
    style: {}
  };

  @action
  setStyle(style){
    this.state.style = style
  }

  // 优惠券
  @action
  async getCouponList(params){
    return Serv.getCouponList(params);
  }


}

const myCoupon = new MyCoupon();


export default myCoupon;