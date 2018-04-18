import Request from 'util/Request'
import Config from 'config/Config'
import Util from 'util';

// 初始化微信jssdk配置
const initConfig = (debug) => {
  let url = document.location.href.split('#')[0];

  $.ajax({
    url: `${Config.host}/api/v1/weixin/config`,
    type: "GET",
    contentType:'application/x-www-form-urlencoded;charset=UTF-8',
    //接口头部
    headers: {
      "auth": Util.getLocalCache(Config.authName)
    },
    data: {
      url: url
    }
  }).then(data => {
    wx.config({
      debug: debug,
      appId: data.appId,
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: ['onMenuShareTimeline', 'chooseImage', 'uploadImage', 'previewImage', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'getLocation', 'openLocation', 'getNetworkType']
    })
  }).fail(e => {
    console.error('接口出错！' + e)
  })


}

export { initConfig }