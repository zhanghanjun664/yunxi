
function rootOnEnter(nextState, replace) {
    var urlInfo = nextState.location.pathname;
    //修改标题
    let urlKey = urlInfo.split('/')[1];

    ////console.log("urlInfo====",urlInfo)
    //
    //if(nextState.location.query !=null){
    //    //console.log(nextState.location.query.id)
    //
    //    if(urlInfo!='/login'){ //如果是法律申明，也不用回跳
    //        window.app.currentRouterPath=urlInfo+"?id="+nextState.location.query.id;
    //        console.log(window.app.currentRouterPath);
    //    }
    //}else {
    //    if(urlInfo.indexOf("login") < 0){ //如果是法律申明，也不用回跳
    //        window.app.currentRouterPath=urlInfo;
    //    }
    //}
}
function rootOnLeave(prevState) {
    var urlInfo = prevState.location.pathname + prevState.location.search;
    if (urlInfo != '/login') { //如果是法律申明，也不用回跳
        window.app.currentRouterPath = urlInfo;
    }
}
//设置title信息
function titleText(title) {
    document.title = title;
    //部分ios标题设置错误
    var $iframe = $('<iframe frameborder="no" border="0" vspace="0" hspace="0" marginwidth="0" marginheight="0" framespacing="0" frameborder="0" scrolling="no" src=""></iframe>').on('load', function () {
        setTimeout(function () {
            $iframe.off('load').remove()
        }, 0)
    }).appendTo($('body'))
}

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
            },
            {
                //线上询底价
                path: '/askprice',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/askPrice/askPriceView'))
                        titleText("询底价")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },
            {
                //线上询底价
                path: '/testdrive',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/testDrive/testDriveView'))
                        titleText("预约试驾")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },
            {
                //测试初始页
                path: '/testIndex',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/test/TestIndex'))
                        titleText("测试testIndex")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },
            {
                //测试初始页
                path: '/template',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/test/Template'))
                        titleText("测试template")
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
                        cb(null, require('./biz/carModel/carModelList/modelListView'))
                        titleText("车型列表")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave,
                
            },
            // 车型详情
            {
                path: '/carModelDetail',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/carModel/carModelDetail/index/indexView'))
                        titleText("车型详情")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave,
            },
            {
                //车型配置
                path: '/allConfig',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/carModel/allConfig/indexView'))
                        titleText("全部参数")
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
                        cb(null, require('./biz/carModel/carImages/carImagesView'))
                        titleText("商品图片")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },
            {
                //云店
                path: '/cloubStore',
                component: require('./biz/cloubStore/CloubStoreView'),
                childRoutes: [
                    {
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
                    },
                ]
            },
            {
                path: '/mySubscribe',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/my/mySubscribe/mySubscribeView'))
                        titleText("我的预约")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },
            {
                path: '/myOrder',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/my/myOrder/myOrderView'))
                        titleText("我的订单")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },
            {
                path: '/myComplate',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/my/myComplate/myComplateView'))
                        titleText("完善用户信息")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },
            {
                path: '/activityDetails',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/activity/activityDetails/ActivityDetailsView'))
                        titleText("活动详情")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },
            {

                path: '/dealerQuotation',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/carModel/dealerQuotation/DealerQuotationView'))
                        titleText("经销商报价")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave

            },
            {
                path: '/dealerPrice',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/carModel/dealerPrice/dealerPriceView'))
                        titleText("经销商报价")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },
            {
                path: '/activity',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/activity/index/indexView'))
                        titleText("活动")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },
            {
                path: '/inquireDealer',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/store/inquireDealer/InquireDealerView'))
                        titleText("查询经销商")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },
            {
                path: '/quickLink',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/home/quickLink/QuickLinkView'))
                        titleText("长安福特官方商城")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },
            {
                path: '/personalCenter',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/my/personalCenter/PersonalCenterView'))
                        titleText("个人中心")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },

        ]
    },
]