import Request from 'util/Request';

export default class {
  //获取首页轮播图
  static getAdList(params) {
    try {
      let data = Request({
        url: "caf/jdcloud/index/carouselFigure",
        type: "GET",
        data: params
      })
      return data;
    } catch (e) {
      console.log(e)
    }
  }
  //获取首页轮播图
  static getActivityList(params) {
    try {
      let data = Request({
        url: "mall/activity/list-by-page",
        type: "GET",
        data: params
      })
      return data;
    } catch (e) {
      console.log(e)
    }
  }
}