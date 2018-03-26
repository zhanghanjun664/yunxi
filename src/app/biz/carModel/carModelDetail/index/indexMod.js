import React, { PropTypes, Component } from 'react';
import { observable, action, runInAction, useStrict, autorun } from 'mobx';
import Serv from './indexServ';
import Config from 'config/Config';
/**
 * mod层
 * 业务逻辑，数据逻辑应该存储于此
 */
//定义为严格模式
useStrict(true)
class ProductDetailIndex {
  //将数据设为被观察者，这意味着数据将成为公共数据
  @observable state = {
    navTab: 0,
    baseInfo: {},
    commentData: {},
    nearbyInfo: {},
    commentParams: {
      showNum: 5,
      showList: [],
      loading: false,
      sum: 99
    },
    carConfig: {},
    activityList: [],
    imgDetail: {
      activeIndex: 0
    }
  };
  //如果设定了useStrict严格模式，那么所有observable的值的修改必须在action定义的方法内，否则可以直接修改
  //用action定义事件
  @action
  handleScroll(type) {
    this.state.navTab = type
  }
  @action
  changeImg(obj) {
    this.state.imgDetail.activeIndex = obj.index
    console.log(obj)
  }
  // 基本信息
  @action
  async getBaseInfo(params) {
    let data = await Serv.getBaseInfo(params)
    runInAction(() => {
      this.state.baseInfo = data.data
    })
  }
  // 经销商信息
  @action
  async getNearbyInfo(params) {
    let data = await Serv.getNearbyInfo(params)
    runInAction(() => {
      this.state.nearbyInfo = data.data
    })
    console.log("经销商")
    console.log(data)
  }
  // 评论caf/jdcloud/store/item/info/detail
  @action
  async getCommentData(params) {
    var params = this.state.commentParams;
    if (params.loading || params.sum <= 3) {
      return
    }
    let data = await Serv.getCommentData(params)
    runInAction(() => {
      this.state.commentData = data.data
      params.showList = data.data.list
      // params.showList.push(...data.data.list)
      // console.log(params.showList)
    })
    // console.log(this.state.commentData)
  }
  // 车型详情（参数）
  @action
  async getCarConfig(params) {
    let data = await Serv.getCarConfig(params)
    runInAction(() => {
      this.state.carConfig = data.data
    })
    console.log(this.state.carConfig)
  }
  // 活动
  @action
  async getActivityList(params) {
    let data = await Serv.getActivityList(params)
    runInAction(() => {
      this.state.activityList = data.data.list
    })
    console.log(this.state.carConfig)
  }


}

//将组件实例化，这意味着组件将不能从别处实例化
const productDetailIndex = new ProductDetailIndex();


export default productDetailIndex;