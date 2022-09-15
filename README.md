all
前端两端集合项目

业务代码段展示、笔记、文章发布、拓展性...
windows页面为主、mobile体验为辅

bable-loader处理js
postcss处理css

webpack
webpack提取库映射，打包链接库dll，映射到打包库
抽离css，压缩js
用户配置全在config.js

index.html
 xmlns:th="http://www.thymeleaf.org"
引入打包链接库dll、引入layui

main.js
引入axios及配置
引入assets全局css和styles全局业务less
引入业务全局css：公共common、功能function、pc端初始化css、mobile端初始化css
引入业务全局less：公共common、功能function
引入图标库
引入指令
引入工具类：初始化rem、时间和过滤器、cookie session storage
引入element、vant、mavonEditor
引入vuejsonp、vue-swiper、vue-touch、fastclick
引入公共组件、配置公共方法、配置公共属性 prototype

app.vue
准备popup气泡框
准备login块未登录则top上来且不透明
准备loading，暴露全局方法挂载loading组件上vue实例 alert同
 
组件components
使用svg克隆图标库图标，或使用svg形状
使用常规html标签，如transition、section、
使用常规css属性，如transform、animation、

页面views
router挂载layout，layout里children页面内容
layout和children页面内容文件夹下有自用组件
