import Vue from 'vue'
import App from './App.vue'
import router from './router/permission' // 导航守卫
import store from './store'
import axios from 'axios'
/**
 * 后台管理全局样式
 */
import './assets/css/global.css' //添加全局样式
/**
 * 导入全局的样式文件，其中包含icon.less，icon、font样式，iconfont图标库链接引用方式
 * 项目详情页生成在线链接，以icon标识符引用如&#x100d8;
 */
import './styles/global.less'

/*样式*/
import './styles/index.css'
import './styles/index.less'

/**
 * icon、font样式，iconfont图标库下载使用方式
 * iconfont官网收集项目所需iconfont加入购物车，添加到项目，进入项目详情页下载
 * 以svg标签克隆形式引用
 */
import './assets/iconfont/iconfont.css'
import './utils/iconfont' // 全局引入iconfont图标引用

/**
 * icon、font样式，iconmoon图标库下载生成的https://icomoon.io/app/#/select
 * 进入官网点击右上角icoMoon App，点选所需图标，点击右下角Generate Font，点击右下角Download
 * 以class形式引用 class="icon-iconname"
 */
import "./assets/iconmoon/iconmoon.css"

/*指令*/
import './directive'

/*工具类*/
import './utils/rem' // 初始化rem大小
import './utils/dayjs' // 处理相对时间、初始化过滤器

/**
 * 用于客户端与服务端会话认证
 * cookie只支持存字符串数据存储于客户端不能超过4k可长期留存
 * session支持任意数据类型存储于服务端可存储大量数据占用服务器资源失效快（客户端关闭或session超时）
 * token客户端正确登录请求服务端签发token，发给客户端存储于cookie/localStorage，客户端每次向服务端请求资源带上token，减少session使用
 */
import { Cookie } from './utils/storage'
Vue.prototype.Cookie = Cookie

/*
layui
 */

/**
 * ElementUI
 *
 */
import ElementUI from 'element-ui'
// 默认样式
import 'element-ui/lib/theme-chalk/index.css'
// 自定义主题
// import 'src/theme/element/index.css'
Vue.use(ElementUI)

/**
 * vant ui
 */
import Vant from 'vant'
import { Lazyload } from 'vant';
import 'vant/lib/index.css'
// 注册
Vue.use(Vant)
Vue.use(Lazyload);

// 注册时可以配置额外的选项
Vue.use(Lazyload, {
    lazyComponent: true,
});

// 编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

// 用于跨域访问
import { VueJsonp } from 'vue-jsonp'
Vue.use(VueJsonp)
/**
 * 使用
 * const vm = new Vue()
 * vm.$jsonp('/some-jsonp-url', {  someParam: 'veryNice'})
 */

// swiper轮播
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
/**
 * 使用库内标签<swiper><swiperSlide>等
 */

// nativeshare分享插件
// import NativeShare from 'nativeshare'
// Vue.use(NativeShare);
// 剪贴板插件
// import Clipboard from 'clipboard'
// Vue.use(Clipboard);

// fastclick消除mobile端点击事件延迟，mobile端双击响应缩放导致click事件判断有300ms延迟，
import FastClick from 'fastclick'
FastClick.attach(document.body)

// vue-touch监听mobile端用户手势事件
import VueTouch from 'vue-touch'
Vue.use(VueTouch, {
    name: 'v-touch'
})
VueTouch.config.swipe = {
    threshold: 50 //设置左右滑动的距离
}
/**
 * 使用标签<v-touch>
 */

// 引入install全局组件
// import install from './install';
// Vue.use(install);

// 全局组件
import customComponents from './customComponents.js'
Vue.use(customComponents)

// 挂载axios
Vue.prototype.$axios = axios
Vue.prototype.$http = axios
// 设置访问根路径
axios.defaults.baseURL = "http://localhost:8081/"
Vue.prototype.$base = "http://localhost:8081/"

// 返回
Vue.prototype.back = (route) => {
    route.animate = 2
    history.go(-1)
}

// 跳转文章页
Vue.prototype.skip = (route, id) => {
    route.push('/article/' + id)
}

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
