import { newsList } from './classify'
import { Local } from 'utils/storage'
import axios from 'utils/fetch'
import Vue from 'vue'

const home = {
    state: {
        newsList: (function () {
            let newList = JSON.parse(Local.get('newList')) || newsList.slice(0, 12)
            newList.forEach(news => {
                if (news.list) delete news.title
            })
            Local.set('newList', JSON.stringify(newList))
            return newList
        })(),
        newsIndex: 0,
        newsPrevIndex: 0,
        newsLoading: false,
        end: false
    },
    actions: {
        addHomeTag({ commit }, news) {
            commit('ADDHOMETAG', news)
        },
        delHomeTag({ commit }, news) {
            commit('DELHOMETAG', news)
        },
        getHomeList({ commit, state }, params) {
            let obj = state.newsList.find(v => v.id == params.id)
            if (obj.list) return
            state.newsLoading = true
            return new Promise((resolve, reject) => {
                axios.post('home/list', params.id)
                    .then(res => {
                        console.log(res)
                        state.newsLoading = false
                        if (res.articleList.length < 11) {
                            state.end = true
                        }
                        commit('GETHOMELIST', res.articleList)
                        resolve(res.articleList)
                    }).catch(err => {
                        reject(err)
                    })
            })
        }
    },
    mutations: {
        ADDHOMETAG(state, news) {
            if (state.newsList.every(tag => tag.title !== news.title)) {
                state.newsList.push(news)
                Local.set('newList', JSON.stringify(state.newsList))
            }
        },
        DELHOMETAG(state, news) {
            let index = state.newsList.findIndex(tag => tag.title === news.title)
            state.newsList.splice(index, 1)
            Local.set('newList', JSON.stringify(state.newsList))
        },
        GETHOMELIST(state, list) {
            state.newsList[state.newsIndex].list = list
            /**
             * 向响应式对象中添加一个属性，且触发视图更新。它必须用于向响应式对象上添加新属性，因为 Vue 无法探测普通的新增属性
             * 调用方法: Vue.set( target , key , value)
             * target: 要更改的数据源（可以是一个对象或者数组）
             * key 要更改的具体数据 （索引）
             * value 重新赋的值
             */
            Vue.prototype.$set(state.newsList, state.newsIndex, state.newsList[state.newsIndex])
        }
    }
}
export default home