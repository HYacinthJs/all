<template>
    <div class="loader">
        <svg class="loader-circular" viewBox="25 25 50 50">
            <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10">
            </circle>
        </svg>
    </div>
</template>
<style lang="less" scoped>
.loader-wrapper {
    width: 100%;
    height: 100%;
}

.loader {
    width: 30px;
    height: 30px;
    position: relative;
}

.loader-path {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
    stroke-linecap: round;
}

.loader-circular {
    animation: rotate 2s linear infinite;
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}

// css3创建动画，语法为@keyframes 动画名{keyframes-selector{css-styles;}}
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }

    50% {
        transform: rotate(180deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes dash {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35;
    }

    100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124;
    }
}

@keyframes color {

    0%,
    100% {
        stroke: #FFD300;
    }

    40% {
        stroke: #5B7492;
    }

    66% {
        stroke: #FFD300;
    }

    80%,
    90% {
        stroke: #acb9c8;
    }
}
</style>