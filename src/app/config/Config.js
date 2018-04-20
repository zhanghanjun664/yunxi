// 基础共同的配置
let baseConfig = {
  // auth名，登陆后得到的令牌缓存的名字
  authName: "auth",
  // 登录后存放的用户信息的名字
  userName: "userName",
  // 环境变量，loc, dev，test，stage
  ENV: ENV,
  // headers所存放的常量
  headers: {
    testId: 1
  }
}

// 根据不同环境变量，不同的配置
let envConfig = {
  loc: {
    // api接口主机地址
    // host: document.location.origin,
    host: 'https://wxdev.dtyunxi.cn/ford/test/caf-trade-application',
    // host: 'https://wxdev.dtyunxi.cn/ford/dev/caf-trade-application',
    // 进行IM通讯的主机
    imSocketHost: 'http://localhost:7002',
    // 请求IM REST数据
    imRestHost: 'http://localhost:7001',
    // 只能在本地生效
    mock: false,
    // mock: true
  },
  dev: {
    // api接口主机地址，演示阶段，先用本地，且开启mock
    host: 'https://wxdev.dtyunxi.cn/ford/dev/caf-trade-application',
    // 进行IM通讯的主机
    imSocketHost: '',
    // 请求IM REST数据
    imRestHost: '',
    // 只能在本地生效
    mock: false
  },
  test: {
    // api接口主机地址
    host: 'https://wxdev.dtyunxi.cn/ford/test/caf-trade-application',
    // 进行IM通讯的主机
    imSocketHost: '',
    // 请求IM REST数据
    imRestHost: '',
    // 只能在本地生效
    mock: false
  },
  qa: {
    // api接口主机地址
    host: 'http://jdc.changanford.cn/caf-trade-application',
    // 进行IM通讯的主机
    imSocketHost: '',
    // 请求IM REST数据
    imRestHost: '',
    // 只能在本地生效
    mock: false
  }
}

// 合并配置
let config = Object.assign(baseConfig, envConfig[baseConfig.ENV])

/**
 * 获得api接口地址
 * @param  {String} url    接口地址
 * @param  {Object} config 基础配置信息
 * @return {String}        转换过的接口地址
 */
const getApiAppName = function(url){
  if(!url){
    return
  }else if(url.indexOf("http") >= 0){
    return url
  }

  let str = ""
  // 本机开发环境，则当前assets/mock下面的json
  if(config.mock && (config.ENV == 'loc' || config.ENV === 'dev')){
    return config.host + "/assets/mock/" + url.replace(/\//g, "-") + '.json'

  // 其它环境，则读取真实应用的接口
  }else{
    // url到应用的映射
    let apiAppName = {
      "smartsales/trade": "smartsales-trade-application",
      "smartsales/mgmt": "smartsales-mgmt-application",
      "yundt/mgmt": "yundt-application-mgmt"
    }
    for (let key in apiAppName) {
      if (url.indexOf(key) >= 0) {
        str = apiAppName[key]
      }
    }
    let version = 'api/v1'
    return `${config.host}/${version}/${url}`
  }
}

// 拼接接口所需域名和服务名，只需要输入接口名即可  如 yundt/mgmt/item/list-by-page，也不要加斜杆开始，
// 如果接口以http开头，则不会进拼接，而是保留原样
// 如果是mock，则会去assets/mock请求同名json，但/会被替换为-   如  yundt-mgmt-item-list-by-page.js
config.apiAppName = getApiAppName

export default config