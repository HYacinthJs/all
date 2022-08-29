import Vue from 'vue'
import AlertComponent from './index.vue'

const merge = ($data, option) => {
    for (let prop in option) {
        if ($data.hasOwnProperty(prop))
            $data[prop] = option[[prop]]
    }
}

//extend 是构造一个组件的语法器.传入参数，返回一个组件
let AlertConstructor = Vue.extend(AlertComponent);

const Alert = (option = {}) => {
    let initComponent = new AlertConstructor();
    if (document.querySelector('.alert-mask')) {
        return;
    }
    // 手动挂载，js插入组件，若$mount(target.$el)则为替换组件
    initComponent.$mount();
    if (typeof option !== 'object') {
        initComponent.content = option;
    } else {
        merge(initComponent.$data, option)
    }
    return new Promise((resolve, reject) => {
        initComponent.success = () => {
            initComponent.show = false;
            resolve()
        }
        // 组件加入dom
        document.querySelector(option.container || 'body').appendChild(initComponent.$el);
    })
}

export default Alert