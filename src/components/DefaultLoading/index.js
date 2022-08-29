// 手机Loading
import Vue from 'vue'
import LoadingComponent from './index.vue'


//extend 是构造一个组件的语法器.传入参数，返回一个组件
let LoadingConstructor = Vue.extend(LoadingComponent);

let initComponent;
export const showLoading = (option = {}) => {
    initComponent = new LoadingConstructor();
    // 手动挂载，js插入组件，若$mount(target.$el)则为替换组件
    initComponent.$mount();
    // 组件加入dom
    document.querySelector(option.container || 'body').appendChild(initComponent.$el);
}

export const hideLoading = () => {
    initComponent.$el.parentNode.removeChild(initComponent.$el)
}