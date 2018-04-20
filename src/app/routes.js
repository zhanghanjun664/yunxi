// 进入路由触发的钩子函数
function rootOnEnter(nextState, replace) {
  var urlInfo = nextState.location.pathname;
  //修改标题
  let urlKey = urlInfo.split('/')[1];
  // 回到顶部
  window.scrollTo(0, 0);
}

// 离开路由触发的钩子函数
function rootOnLeave(prevState) {
  var urlInfo = prevState.location.pathname + prevState.location.search;
  if (urlInfo != '/login') { //如果是法律申明，也不用回跳
    window.app.currentRouterPath = urlInfo;
  }
}

// 设置title信息
function titleText(title) {
  document.title = title;
  //部分ios标题设置错误
  var $iframe = $('<iframe frameborder="no" border="0" vspace="0" hspace="0" marginwidth="0" margin' +
    'height="0" framespacing="0" frameborder="0" scrolling="no" src=""></iframe>').on('load', function () {
      setTimeout(function () {
        $iframe
          .off('load')
          .remove()
      }, 0)
    }).appendTo($('body'))
}

// 路由列表定义
export default [
  {
    path: '/',
    component: require('./app'),
    childRoutes: [
      {
        path: '/home',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./biz/home/index/IndexView'))
            titleText("首页")
          })
        },
        onEnter: rootOnEnter,
        onLeave: rootOnLeave
      }, {
        // 搜索页
        path: '/search',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./biz/search/index/IndexView'))
            titleText("搜索")
          })
        },
        onEnter: rootOnEnter,
        onLeave: rootOnLeave
      }, {
        // 搜索结果页
        path: '/searchResult',
        component: require('./biz/search/result/ResultView'),
        childRoutes: [
          {
            //车型
            path: 'car',
            getComponent: (nextState, cb) => {
              require.ensure([], (require) => {
                cb(null, require('./biz/search/components/resultColumnCar/ResultColumnCar'))
                titleText("搜索结果页-车型")
              })
            },
            onEnter: rootOnEnter,
            onLeave: rootOnLeave
          },
          {
            //新闻
            path: 'news',
            getComponent: (nextState, cb) => {
              require.ensure([], (require) => {
                cb(null, require('./biz/search/components/reultColumnNews/ResultColumnNews'))
                titleText("搜索结果页-新闻")
              })
            },
            onEnter: rootOnEnter,
            onLeave: rootOnLeave
          },
          {
            //活动
            path: 'activity',
            getComponent: (nextState, cb) => {
              require.ensure([], (require) => {
                cb(null, require('./biz/search/components/resultColumnActivity/ResultColumnActivity'))
                titleText("搜索结果页-活动")
              })
            },
            onEnter: rootOnEnter,
            onLeave: rootOnLeave
          }
        ]
      }, {
        //线上询底价
        path: '/askprice',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./biz/askPrice/AskPriceView'))
            titleText("询底价")
          })
        },
        onEnter: rootOnEnter,
        onLeave: rootOnLeave
      }, {
        //线上询底价
        path: '/testdrive',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./biz/testDrive/TestDriveView'))
            titleText("预约试驾")
          })
        },
        onEnter: rootOnEnter,
        onLeave: rootOnLeave
      }, {
        //特惠车首页
        path: '/specialcar',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./biz/specialCar/specialCarList/SpecialListView'))
                titleText("超值好车")
            })
        },
        onEnter: rootOnEnter,
        onLeave: rootOnLeave
      }, {
        path: '/search',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./biz/search/index/IndexView'))
            titleText("搜索")
          })
        },
        onEnter: rootOnEnter,
        onLeave: rootOnLeave
      }, {
        path: '/searchResult',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./biz/search/result/ResultView'))
            titleText("搜索结果")
          })
        },
        onEnter: rootOnEnter,
        onLeave: rootOnLeave
      }, {
        //线上询底价
        path: '/askprice',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./biz/askPrice/AskPriceView'))
            titleText("询底价")
          })
        },
        onEnter: rootOnEnter,
        onLeave: rootOnLeave
      }, {
        //线上询底价
        path: '/testdrive',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./biz/testDrive/TestDriveView'))
            titleText("预约试驾")
          })
        },
        onEnter: rootOnEnter,
        onLeave: rootOnLeave
      },
      // 车型列表
      {
        path: '/carModelList',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./biz/carModel/carModelList/ModelListView'))
            titleText("车型列表")
          })
        },
        onEnter: rootOnEnter,
        onLeave: rootOnLeave
      },
      // 车型详情
      {
        path: '/carModelDetail',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./biz/carModel/carModelDetail/index/IndexView'))
            titleText("车型详情")
          })
        },
        onEnter: rootOnEnter,
        onLeave: rootOnLeave
      }, {
        //车型配置
        path: '/allConfig',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./biz/carModel/allConfig/IndexView'))
            titleText("全部参数")
          })
        },
        onEnter: rootOnEnter,
        onLeave: rootOnLeave
      },
      // 客服聊天 
      {
        path: '/switchSpec',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./biz/carModel/switchSpec/SwitchSpecView'))
            titleText("切换规格")
          })
        },
        onEnter: rootOnEnter,
        onLeave: rootOnLeave
      },
      {
        //车型图文
        path: '/carImages',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./biz/carModel/carImages/CarImagesView'))
            titleText("商品图片")
          })
        },
        onEnter: rootOnEnter,
        onLeave: rootOnLeave
      }, {
        //云店
        path: '/cloubStore',
        component: require('./biz/cloubStore/CloubStoreView'),
        childRoutes: [{
          //云店首页
          path: 'index',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('./biz/cloubStore/index/IndexView'))
              titleText("云店首页")
            })
          },
          onEnter: rootOnEnter,
          onLeave: rootOnLeave
        },
        {
          //车型图文
          path: '/cloubCarImages',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('./biz/cloubStore/carImages/CarImagesView'))
              titleText("商品图片")
            })
          },
          onEnter: rootOnEnter,
          onLeave: rootOnLeave
        },
        {
          path: '/cloubSwitchSpec',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('./biz/cloubStore/switchSpec/SwitchSpecView'))
              titleText("切换规格")
            })
          },
          onEnter: rootOnEnter,
          onLeave: rootOnLeave
        },
        {
          //云店车型详情
          path: 'carModelDetail',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('./biz/cloubStore/carModelDetail/index/indexView'))
              titleText("云店商品详情")
            })
          },
          onEnter: rootOnEnter,
          onLeave: rootOnLeave
        }
      //云店的都写在这里
      ]
      }, {
        path: '/mySubscribe',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./biz/my/mySubscribe/MySubscribeView'))
            titleText("我的预约")
          })
        },
        onEnter: rootOnEnter,
        onLeave: rootOnLeave
      }, {
        path: '/myOrder',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./biz/my/myOrder/MyOrderView'))
            titleText("我的订单")
          })
        },
        onEnter: rootOnEnter,
        onLeave: rootOnLeave
      }, {
        path: '/myComplate',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./biz/my/myComplate/MyComplateView'))
            titleText("完善用户信息")
          })
        },
        onEnter: rootOnEnter,
        onLeave: rootOnLeave
      }, {
        path: '/activityDetails',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./biz/activity/activityDetails/ActivityDetailsView'))
            titleText("活动详情")
          })
        },
        onEnter: rootOnEnter,
        onLeave: rootOnLeave
      }, {

        path: '/dealerQuotation',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./biz/carModel/dealerQuotation/DealerQuotationView'))
            titleText("经销商报价")
          })
        },
        onEnter: rootOnEnter,
        onLeave: rootOnLeave

      }, {
        path: '/activity',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./biz/activity/index/IndexView'))
            titleText("活动")
          })
        },
        onEnter: rootOnEnter,
        onLeave: rootOnLeave
      }, {
        path: '/inquireDealer',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./biz/store/inquireDealer/InquireDealerView'))
            titleText("查询经销商")
          })
        },
        onEnter: rootOnEnter,
        onLeave: rootOnLeave
      }, {
        path: '/quickLink',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./biz/home/quickLink/QuickLinkView'))
            titleText("长安福特官方商城")
          })
        },
        onEnter: rootOnEnter,
        onLeave: rootOnLeave
      }, {
        path: '/personalCenter',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./biz/my/personalCenter/PersonalCenterView'))
            titleText("个人中心")
          })
        },
        onEnter: rootOnEnter,
        onLeave: rootOnLeave
      }, {
        path: '/accountManage',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./biz/my/accountManage/AccountManageView'))
            titleText("账号管理")
          })
        },
        onEnter: rootOnEnter,
        onLeave: rootOnLeave
      },
      {
        path: '/myCoupon',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./biz/my/myCoupon/MyCouponView'))
            titleText("我的优惠券")
          })
        },
        onEnter: rootOnEnter,
        onLeave: rootOnLeave
      },
      // 客服聊天 
      {
        path: '/chat',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./biz/staffs/StaffsView'))
            titleText("客服聊天")
          })
        },
        onEnter: rootOnEnter,
        onLeave: rootOnLeave
      },
      // 支付成功 
      {
        path: '/paymentSuccess',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./biz/carModel/paymentSuccess/PaymentSuccessView'))
            titleText("支付成功")
          })
        },
        onEnter: rootOnEnter,
        onLeave: rootOnLeave
      },
      // 预约详情 
      {
        path: '/subscribeDetail',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./biz/my/mySubscribeDetailComplete/mySubscribeDetailCompleteView'))
            titleText("预约详情")
          })
        },
        onEnter: rootOnEnter,
        onLeave: rootOnLeave
      }
    ]
  }]