# 项目文档


### 项目目录


```
│- .gitignore
│- package.json
│- readme.md
│- webpack.config.js //webpack打包配置
└─src
    │  global.css //放全局通用样式
    │  index.html //生成静态页面入口模版
    │
    ├─app
    │  │  app.js //路由入口组件
    │  │  index.js //入口配置
    │  │  routes.js //路由配置
    │  │
    │  ├─assets //静态资源目录
    │  │  └─mock  存放本地mock数据
    │  │  └─js
    │  │  │      jquery-1.7.1.min.js
    │  │  │      jquery.md5.js
    │  │  │
    │  │  └─ ...//更多静态目录
    │  │
    │  ├─biz //业务逻辑代码
    │  │  │
    │  │  ├─auth
            │  │  │  └─resource  //业务模块目录
            │  │  │  │   └─resourceList   //业务页面目录
            │  │  │  │           modelListMod.js  //页面逻辑
            │  │  │  │           modelListView.js //页面视图
            │  │  │  │           modelListServ.js   //页面请求
            │  │  │  │           TestLess.less   //页面样式
            │  │  │  │
            │  │  │  └─ ...  //更多业务模块目录│
    │  │  │
    │  │  └─test //测试页面目录
    │  │          Template.js
    │  │          TestIndex.js
    │  │
    │  ├─util //工具类目录
    │  │  │  Request.js
    │  │  │
    │  │  └─wechat //工具分类目录
    │  │
    │  └─widget //项目组件
    │      │- index.js //组件导出模块文件
    │      │
    │      └─uploadImage //组件案例
    │              index.js
    │
    └─theme
            theme.less //antd-mobile组件样式配置
```

### 项目规范说明

- 组件目录：首字母小写驼峰命名，例如：uploadImage
- 组件命名：首字母大写并以驼高式命名，例如：UploadImage.js，如果组件目录只有一个文件，可以用index.js
- 业务模块：目录在src>app>biz>
- 目录别名：webpack.config.js 以配置，现在有widget、util、module。
- mock：修改config.mock为true后，在loc环境下，所有不是http开头的接口会被拦截请求，转而请求本地mock文件夹的接口同名json文件，但/会被转成-

#### 目录别名使用案例：widget引用

>目录别名好处主要是减少本地目录引用路径的出现的 ../../../../xx/xx/xx.js

```
import {UploadImage} from 'widget';//由widget目录下的index.js要对他目录下的组件做了导出处理
import Verify from 'util/Verify';
```

#### 业务模块目录

建议在目录下新建一个以<span color='yellow'> 模块中文名称.md</span> 空文件
