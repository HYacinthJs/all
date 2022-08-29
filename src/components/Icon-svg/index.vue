<template>
    <!-- svg矢量图标签，width,height框的宽高，viewBox="x,y,w,h"左上角坐标（x,y)图片宽高wh，fill填充颜色 -->
    <!-- aria-hidden：移除可访问性，屏幕识别设备过滤该信息 -->
    <svg class="icon" aria-hidden="true">
        <!-- 深度克隆id为iconName的svg形状 -->
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
export default {
    name: "icon-svg",
    props: {
        name: {
            type: String,
            required: true
        }
    },
    computed: {
        iconName() {
            // es6模板字符串拼接
            return `#icon-${this.name}`;
        }
    }
};
</script>
