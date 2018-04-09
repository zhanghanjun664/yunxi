import React, { PropTypes, Component } from 'react';
import { observable, action, runInAction, useStrict, autorun } from 'mobx';
import Serv from './IndexServ';
import Config from 'config/Config';

useStrict(true)
class ProductDetailIndex {
  @observable state = {
    navTab: 0,
    itemId: '',
    skusId: '',
    baseInfo: {},
    commentData: {},
    nearbyInfo: {},
    carConfig: {},
    activityList: [],
    imgDetail: {
      activeIndex: 0,
      data: {},
      tabsBox: [
        { title: "全景", isShow: false },
        { title: "外观", isShow: false },
        { title: "中控", isShow: false },
        { title: "座椅", isShow: false },
        { title: "细节", isShow: false },
        { title: "视频", isShow: false },
      ],
      qjList: [],
      wgList: [],
      zkList: [],
      zyList: [],
      xjList: [],
      spList: []
    },
    switchSpec:{

    }
  };
  @action
  handleScroll(type) {
    this.state.navTab = type
  }
  @action
  setItemId(id){
    this.state.itemId = id
  }
  @action
  changeImg(obj) {
    this.state.imgDetail.activeIndex = obj.index
    console.log(obj)
  }
  @action
  setItem(type) {
    this.state.navTab = type
  }
  // 基本信息
  @action
  async getBaseInfo(params) {
    let data = await Serv.getBaseInfo(params)
    runInAction(() => {
      console.log(data)
      this.state.baseInfo = data.data
      !this.state.skusId&&this.setSkusId(data.data.skus[0].id)
      this.changeImgData(this.state.skusId)
      
    })
  }

  // 选择skus
  @action
  changeImgData(id) {
    for (let item of this.state.baseInfo.skus) {
      if (item.id == id) {
        this.state.imgDetail.data = item
        this.handleTabsBox()
        return
      }
    }
  }

  // 设置skusId
  @action
  setSkusId(id) {
    this.state.skusId = id
  }

  // 经销商信息
  @action
  async getNearbyInfo(params) {
    let data = await Serv.getNearbyInfo(params)
    console.log(this)
    runInAction(() => {
      this.state.nearbyInfo = data.data
    })
  }
  // 评论
  @action
  async getCommentData(params) {
    let data = await Serv.getCommentData(params)
    runInAction(() => {
      this.state.commentData = data.data
    })
  }
  // 车型详情（参数）
  @action
  async getCarConfig(params) {
    let data = await Serv.getCarConfig(params)
    runInAction(() => {
      this.state.carConfig = data.data
    })
  }
  @action
  handleTabsBox() {
    let { qjList, wgList, zkList, zyList, xjList, spList, data, tabsBox } = this.state.imgDetail
    data.cmpMedias.map((item, index) => {
      item.fileType == 1 && qjList.push(item)
      item.fileType == 2 && wgList.push(item)
      item.fileType == 3 && zkList.push(item)
      item.fileType == 4 && zyList.push(item)
      item.fileType == 5 && xjList.push(item)
      item.fileType == 6 && spList.push(item)
      tabsBox[item.fileType - 1].isShow = true
    })
    this.state.imgDetail.tabsBox = tabsBox.filter(item => item.isShow)
  }
  // 活动
  @action
  async getActivityList(params) {
    let data = await Serv.getActivityList(params)
    runInAction(() => {
      this.state.activityList = data.data.list
    })
    console.log(this)
  }


}

const productDetailIndex = new ProductDetailIndex();


export default productDetailIndex;