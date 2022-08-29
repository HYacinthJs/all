import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import search from './modules/search'
import user from './modules/user'
import home from './modules/home'
import headline from './modules/headline'
import video from './modules/video'
import getters from './getters'



Vue.use(Vuex)

// store当作小数据库用，或者后端请求取数
const store = new Vuex.Store({
    state: {
        id: localStorage.getItem("id"),
        nickname: localStorage.getItem("nickname"),
        username: localStorage.getItem("username"),
        introduction: localStorage.getItem("introduction"),
        phone: localStorage.getItem("phone"),
        email: localStorage.getItem("email"),
        sex: localStorage.getItem("sex"),
        avatar: localStorage.getItem("avatar"),
        backgroundImage: localStorage.getItem("backgroundImage"),
        hotList: localStorage.getItem("hotList"),
    },
    getters, // state计算属性  state.xxx或mapGetters调用
    mutations: {}, // 同步操作 commit或mapMutations调用
    actions: {}, // 异步操作 dispatch或mapActions调用
    modules: {
        app,
        search,
        user,
        home,
        video,
        headline,
    },
});

export default store
