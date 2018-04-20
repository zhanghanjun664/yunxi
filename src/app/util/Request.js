import { Toast, Modal } from 'antd-mobile';
import Config from 'config/Config';
import Util from 'util';

export default function(obj) {
  let parameter = {
    //接口地址
    url: "",
    //接口类型
    type: "GET",
    //接口返回数据类型
    dataType: "json",

    processData: true,

    contentType:'application/x-www-form-urlencoded;charset=UTF-8',
    //接口头部
    headers: {
      "auth": Util.getLocalCache(Config.authName)
    },
    data: {}
  }


  parameter = Object.assign(parameter, obj);

  //将config文件中的常量整合进来
  parameter.headers = Object.assign(parameter.headers, Config.headers);


  return new Promise(function(resolve, reject) {
    $.ajax({
      headers: parameter.headers,
      type: parameter.type,
      url: Config.apiAppName(parameter.url),
      dataType: parameter.dataType,
      contentType: parameter.contentType,
      processData:parameter.processData,
      data: parameter.data,
      timeout:20000,
      statusCode: {
        401: function(r) {
          //跳注册页面
          //如果返回401 就需要登录
          window.app.routerGoTo(`/Login`);
        },
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        reject("失败了");
        Toast.fail('服务器开小差了！');
      },
      success: function(data) {
        if ('resultCode' in data) {
          //401未注册
          if (data.resultCode == '401') {
            window.app.routerGoTo(`/login`);
            return;
          } else if (data.resultCode == 0) {
            resolve(data);
          } else {
            // Toast.info(data.resultMsg)
            Toast.fail(data.resultMsg)
            reject("失败了");
          }
        } else {
          reject("失败了");
        }
      }
    });
  })
}