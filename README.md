# KesuTopic
A Vue.js project for topic

## 运行命令
#### 新建
> npm run init pc demo
>> 新建demo的pc项目
#### 开发
> npm run dev
>> 根据package.json的DIR进入开发模式

#### 打包单个或者多个topic
> npm run build
>> 根据/client/build.list.js构建单个或者多个项目

#### 全部打包
> npm run build:all
>> 构建src/pages下所有项目，排除_开头项目


## 目录结构

    |── build
    |   |── build.js                 // 构建项目
    |   |── init.js                  // 新建单个项目，并把项目信息写入package.json
    |   |── utils.js                 // 公共方法
    |   |── vue-loader.conf.js       // vue-loader配置
    |   |── webpack.base.js          // 开发、构建通用配置
    |   |── webpack.config.js        // 开发、构建差异配置常量
    |   |── webpack.dev.conf.js      // 开发配置信息
    |   └── webpack.prod.conf.js     // 构建通用配置
    |── dist
    │   └── demo                     // 构建后的demo项目
    │       |── pc                   // 构建后的demo项目pc版，如果有
    │       └── wap                  // 构建后的demo项目wap版，如果有
    │           |── static           // 项目资源文件
    │           |   |── app.css      // 项目css文件
    │           |   |── app.js       // 项目js文件
    │           |   └── img          // 项目img文件
    │           └── index.ejs        // 入口网页文件
    |── src
    │   |── api
    │   |── common
    │   |── components
    │   |── util
    │   |── pages
    │   |   └── demo
    │   |       |── pc
    │   |       └── wap
    │   |           |── img
    │   |           |── App.vue
    │   |           |── main.js
    │   |           |── style.scss
    │   |           └── template.js  // 模板页
    │   └── layout                   // 公用layout
    │        |── default             // pc default
    │        |   |── index.js
    │        |   └── layout.ejs
    │        └── wapDefault          // wap default
    |── build.list.js                // 需要构建的目录列表
    └── README.md