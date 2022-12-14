import Vue from 'vue'
import LoadingComponent from './full-loading.vue'


//extend 是构造一个组件的语法器.传入参数，返回一个组件
let LoadingConstructor = Vue.extend(LoadingComponent);

let initComponent;
export const showCircleLoading = (option = {}) => {
    initComponent = new LoadingConstructor();
    initComponent.$mount();
    document.querySelector(option.container || 'body').appendChild(initComponent.$el);
}

export const hideCircleLoading = () => {
    initComponent.$el.parentNode.removeChild(initComponent.$el)
}