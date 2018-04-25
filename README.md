# MultiTopicVue
A Vue.js project for topic

## 运行命令
#### 开发
> npm run dev

#### 打包单个topic
> npm run build [topic]

#### 全部打包
> npm run dist

## 目录结构

    |── build
    |   |── build.all.js             // 构建src/pages下所有
    |   |── build.js                 // 构建单个项目
    |   |── init.js                  // 新建单个项目，并把项目信息写入package.json
    |   |── utils.js                 // 公共方法
    |   |── vue-loader.conf.js       // vue-loader配置
    |   |── webpack.base.js          // 开发、构建通用配置
    |   |── webpack.config.js        // 开发、构建差异配置常量
    |   |── webpack.dev.conf.js      // 开发配置信息
    |   |── webpack.prod.js          // 构建通用配置
    |   └── webpack.prod.conf.js     // 构建单个项目配置
    |   └── webpack.prod.all.conf.js // 构建单个项目配置
    |── dist
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