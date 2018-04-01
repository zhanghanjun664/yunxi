import Request from 'util/Request';

export default class {
  //获取首页轮播图
  static getAdList(params) {
    let data = Request({
      url: "caf/jdcloud/index/carousel-figures",
      type: "GET",
      data: params
    })
    return data;
  }
  //获取首页轮播图
  static getActivityList(params) {
    let data = Request({
      url: "mall/activity/list-by-page",
      type: "GET",
      data: params
    })
    return data;
  }
  //  活动 
  static getActivityList(params) {
    let data = Request({
      url: "mall/activity/list-by-page",
      type: "GET",
      data: params
    })
    return data;
  }
}