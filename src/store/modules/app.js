import Vue from 'vue'
import axios from 'utils/fetch'
const app = {
    state: {
        articleInfo: {},
        pageLoading: false
    },
    actions: { // 用于异步操作
        // context上下文：{state,commit,rootState}
        getArticle({ commit }, params) {
            return new Promise((resolve, reject) => {
                axios.get('relComment/getRealComm', params)
                    .then(res => {
                        console.log(res.data)
                        commit('GETARTICLE', res.data)
                        resolve(res.data)
                    }).catch(err => {
                        reject(err)
                    })
            })
        }
    },
    mutations: {
        GETARTICLE(state, info) {
            state.articleInfo = info
        }
    }
}
export default app
