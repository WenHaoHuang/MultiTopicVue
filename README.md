# MultiTopicVue
A Vue.js project for topic

## 运行命令
#### 新建
> npm run init pc demo
>> 新建demo的pc项目
#### 开发
> npm run dev
>> 根据package.json的DIR进入开发模式

#### 打包单个topic
> npm run build
>> 根据package.json的DIR构建单个项目

#### 全部打包
> npm run dist
>> 构建src/pages下所有项目，排除_开头项目

## 目录结构

    |── build
    |   |── build.all.js             // 构建src/pages下全部项目
    |   |── build.js                 // 构建单个项目
    |   |── init.js                  // 新建单个项目，并把项目信息写入package.json
    |   |── utils.js                 // 公共方法
    |   |── vue-loader.conf.js       // vue-loader配置
    |   |── webpack.base.js          // 开发、构建通用配置
    |   |── webpack.config.js        // 开发、构建差异配置常量
    |   |── webpack.dev.conf.js      // 开发配置信息
    |   |── webpack.prod.js          // 构建通用配置
    |   └── webpack.prod.conf.js     // 构建单个项目配置
    |   └── webpack.prod.all.conf.js // 构建全部项目配置
    |── dist
    │   |── static                   // 构建后的所有项目公共资源文件
    │   └── demo                     // 构建后的demo项目
    │       |── pc                   // 构建后的demo项目pc版，如果有
    │       └── wap                  // 构建后的demo项目wap版，如果有
    │           |── static           // 项目资源文件
    │           |   |── app.css      // 项目css文件
    │           |   |── app.js       // 项目js文件
    │           |   └── img          // 项目图片文件夹
    │           └── index.ejs        // 入口网页文件
    |── src
    │   |── common
    │   |── components
    │   |── filter
    │   |── pages
    │   |   └── demo
    │   |       |── assets
    │   |       |── static
    │   |       |── App.vue
    │   |       |── main.js
    │   |       └── template.js
    │   └── static
    └── README.md