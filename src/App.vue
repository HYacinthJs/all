<template>
    <div id="app">
        <van-popup v-model="show" position="top" :overlay="false" :duration="0.4" :lock-scroll="false"
            :close-on-click-overlay="false" :close-on-popstate="true" :style="{ height: '8%' }" round closeable>
            <div class="msgs_cls" @click="fn()">{{ msgs }}</div>
        </van-popup>
        <transition :name="animate">
            <router-view id="view" v-if="isRouterAlive"></router-view>
        </transition>
        <!-- 是否前往登录，如果是，登录块top上来且不透明 -->
        <login :class="{ 'login-active': isLogin }" @close="$store.state.user.isLogin = false"></login>
        <full-circle-loading v-show="pageLoading"></full-circle-loading>
    </div>
</template>
<script>
// 在组件或界面中调用mapGetter映射vuex中的getter到局部计算属性中
import { mapGetters } from 'vuex'
import Login from 'components/Login/index'
import Register from 'components/Register/index'
export default {
    components: { Login },

    data() {
        return {
            animate: '',
            isRouterAlive: true,
            msg: "1",
            show: false,
            msgs: "dddd",
            articleIds: 0,
        }
    },
    provide() {
        return {
            reload: this.reload
        }
    },
    computed: {
        // 扩展运算符，将数组、字符串、对象在语法层面展开，逐项调用
        ...mapGetters(['isLogin', 'isRegister', 'pageLoading'])
    },
    watch: {
        // 监听路由跳转，设置vue动画类名（transition name属性用于自动生成 CSS 动画类名）
        $route(to, from) {
            /*
            0: 不做动画
            1: 左切换
            2: 右切换
            3: 上切换
            4: 下切换
             */
            let animate = this.$router.animate || to.meta.slide
            if (!animate) {
                this.animate = ''
            } else {
                this.animate = animate === 1 ? 'slide-left' :
                    animate === 2 ? 'slide-right' :
                        animate === 3 ? 'slide-top' :
                            animate === 4 ? 'slide-bottom' : ''
            }
            this.$router.animate = 0
        }
    },
    created() {
        if (this.$store.getters.user.id !== "0") {
            // 已登录，则创建socket会话
            this.createWebSocket();
        }
    },
    methods: {
        // 刷新重载实例
        async reload() {
            this.isRouterAlive = false
            await this.$nextClick(() => {
                this.isRouterAlive = true
            })
        },
        fn() {
            this.show = false;
            if (this.articleIds === -1) {
                this.$router.push("/home")
            } else {
                this.$router.push("/article/" + this.articleIds)
            }
        },
        createWebSocket() {
            let wsUri = "ws://localhost:8081/websocket/" + this.$store.getters.user.id;
            try {
                let wsObj = new WebSocket(wsUri);
                var that = this;
                this.initWsEventHandle(wsObj, that);
            } catch (e) {
                console.log("执行关闭事件，开始重连");
                this.reconnect();
            }
        },
        initWsEventHandle(wsObj, that) {
            try {
                wsObj.onopen = function (evt) {
                    // heartCheck.start();
                    console.log("CONNECTED");
                };
                wsObj.onmessage = function (evt) {
                    that.show = true;
                    let ss = evt.data.split(",\"msg\":")[1].split(",\"data\":");
                    let number = Number(ss[1].split(",\"ok\":")[0]);
                    that.msgs = "您有一条消息：" + ss[0];
                    that.articleIds = number;
                };

                wsObj.onclose = function (evt) {
                    console.log("执行关闭事件，开始重连");
                    //reconnect();
                    console.log(evt);
                };
                wsObj.onerror = function (evt) {
                    console.log("执行error事件，开始重连");
                    this.reconnect();
                    console.log(evt);
                };
            } catch (e) {
                console.log("绑定事件没有成功");
                this.reconnect();
            }
        },
        reconnect() {
            let lockReconnect = false;
            let wsCreateHandler = null;
            if (lockReconnect) {
                return;
            };
            console.log("1秒后重连");
            lockReconnect = true;
            //没连接上会一直重连，设置延迟避免请求过多
            wsCreateHandler && clearTimeout(wsCreateHandler);
            wsCreateHandler = setTimeout(function () {
                console.log("重连...");
                this.createWebSocket();
                lockReconnect = false;
                console.log("重连完成");
            }, 1000);
        },

    },

}

</script>
<style lang="less" scoped>
#app {
    width: 100%;
    height: 100%;

    .login-active {
        opacity: 1;
        top: 0;
    }
}

#view {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    // transition: transition-property(过渡效果名称), transition-duration(完成过渡效果所需时间), transition-timing-function(过渡效果的速度曲线), transition-delay(过渡效果何时开始)
    // transition：all 0 easy 0
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

// 进入始状态，离开动画
.slide-left-enter,
.slide-right-leave-active {
    opacity: 0;
    transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
    opacity: 0;
    transform: translate(-100%, 0);
}

.slide-top-enter,
.slide-bottom-leave-active {
    opacity: 0;
    transform: translate(0, 100%);
}

.slide-top-leave-active,
.slide-bottom-enter {
    opacity: 0;
    transform: translate(0, -100%);
}

.msgs_cls {
    display: inline-block;
    margin-top: 16px;
    margin-left: 25px;
    height: 35%;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-decoration: blink; // 文本修饰，下划线/上划线/闪烁
}
</style>
