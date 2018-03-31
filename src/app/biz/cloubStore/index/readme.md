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