import Request from 'util/Request';

export default class {
  //获取首页轮播图
  static getAdList(params) {
    return Request({
      url: "caf/jdcloud/index/carousel-figures",
      type: "GET",
      data: params
    })
  }
  //获取首页轮播图
  static getActivityList(params) {
    return Request({
      url: "mall/activity/list-by-page",
      type: "GET",
      data: params
    })
  }
  //  活动标签
  static getActivityLabel(params) {
    return Request({
      url: "mall/activity/label/get",
      type: "GET",
      data: params
    })
  }
}