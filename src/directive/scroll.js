import Vue from 'vue'

/**
 * 注册或获取全局指令
 * 除了核心功能默认内置的指令 (v-model 和 v-show)，Vue 也允许注册自定义指令
Vue.directive('myDirective',{
    bind:  function () {},              只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置     
    inserted: function () {},           被绑定元素插入父节点时调用(仅保证父节点存在，但不一定已被插入文档中)
    update: function () {},             所在组件的vNode更新时调用，但是可能发生在其子vNode更新之前
    componentUpdated: function () {},   指令所在组件的 VNode 及其子 VNode 全部更新后调用
    unbind: function() {}               只调用一次，指令与元素解绑时调用
})
 * 使用：v-myDirective
 */
Vue.directive('scroll', {
    inserted: function (el, binding, vnode, oldVnode) {
        let h = el.offsetHeight,
            isLoading = false,
            cb_name = binding.expression,
            cb = vnode.context[cb_name]

        el.addEventListener('scroll', async () => {
            // 滑到底部，若未加载完成则重新加载本组件
            if (h + el.scrollTop + 10 >= el.firstChild.clientHeight && !isLoading) {
                isLoading = true
                try {
                    cb && await cb()
                } catch (e) {
                    console.error(e)
                }
                isLoading = false
            }
        })
    }
})