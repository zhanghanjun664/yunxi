# 云店首页
## 目录结构

```
    bus
        activity
        activityInformation
        function
        info
        popularModels
        selectedVideo
        specialCar
        top
    global
        stars
        title
```

### 说明
IndexView.js是云店首页的路口    

### bus
    云店首页的所有组件都放在次目录下

#### activity
    活动轮播图

#### activityInformation
    精彩资讯已经快捷功能
#### function
    活动资讯
#### info
    经销商云店信息
#### popularModels
    热门车型
#### selectedVideo
    精选视频
#### specialCar
    特惠车专区
#### top
    首页logo  搜索和定位

### global
    云店首页使用到一些通用组件
#### stars
    星星组件
    返回Stars和StarsList两个class
    1.Stars单个星星样式
      参数:
        -type  //0 未点亮  1点亮  2半星
        -color  //颜色
    2.StarsList多个星星样式
      参数:
        -score 分数
        -className 
#### title
    标题组件 热门车型、特惠车专区和精选视频都是使用的该组件生成的标题
    参数:
      -titleName  //标题名称  ==必填==
      -iconUrl  //icon图片地址
      -iconClass  //icon字体图标样式
  ==注== iconUrl和iconClass二选一即可

## 1.云店首页接口联调情况
### 1.1. 活动轮播图
```
    接口地址：caf/jdcloud/index/carousel-figures
    测试地址&参数：https://wxdev.dtyunxi.cn/ford/dev/caf-trade-application/api/v1/caf/jdcloud/index/carousel-figures?type=2&dealerId=1171252663755543500
    完成情况：已完成
```
### 1.2. 精彩资讯
```
    接口地址：caf/jdcloud/index/news
    测试地址&参数：https://wxdev.dtyunxi.cn/ford/dev/caf-trade-application/api/v1/caf/jdcloud/index/news?type=2&dealerId=1171252663755543500
    完成情况：已完成
```
### 1.3. 快速导航
```
    接口地址：caf/jdcloud/index/quick-links
    测试地址&参数：https://wxdev.dtyunxi.cn/ford/dev/caf-trade-application/api/v1/caf/jdcloud/index/quick-links?type=1
    完成情况：
        已完成
        注：首页快速导航应当只有4个，后端接口目前返回超过4；
            目前界面处理方法是固定只取了前4个
```
### 1.4. 经销商云店信息
```
    接口地址：caf/jdcloud/dealer
    测试地址&参数：https://wxdev.dtyunxi.cn/ford/dev/caf-trade-application/api/v1/caf/jdcloud/dealer?longtitude=113.436542&latitude=23.103679&areaCode=cq&dealerId=1171252663755543500
    完成情况：已完成
```
### 1.5. 热门车型
```
    接口地址：caf/jdcloud/index/hot-items
    测试地址&参数：https://wxdev.dtyunxi.cn/ford/dev/caf-trade-application/api/v1/caf/jdcloud/index/hot-items?type=2&dealerId=1171252663755543500
    完成情况：已完成
```
### 1.6. 活动资讯
```
    接口地址：mall/activity/list-by-page
    测试地址&参数：https://wxdev.dtyunxi.cn/ford/dev/caf-trade-application/api/v1/mall/activity/list-by-page?pageNum=1&pageSize=3&storeId=1171252663755543500
    完成情况：已完成
```
### 1.7. 特惠车专区
```
    接口地址：
    测试地址&参数：
    完成情况：绅士回复一阶段不做
```
### 1.8. 精选视频
```
    接口地址：
    测试地址&参数：
    完成情况：绅士回复一阶段不做
```