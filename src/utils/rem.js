
// 该写法表示定义并调用函数
// 1rem=16px(移动端默认)，font-size是继承的，改变html根元素的font-size即改变rem
(function (win, doc) {
    var docEl = doc.documentElement, // 即html
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        refresh = function () {
            var w = docEl.clientWidth,
                dpr = win.devicePixelRatio || 1;

            // 一般以iPhone6/se 屏宽375开发mobile端
            docEl.style.fontSize = 100 * (w / 375) + 'px';

            function setBodyFontSize() {
                if (doc.body) {
                    doc.body.style.fontSize = '16px';
                } else {
                    // 当dom解析完成后触发
                    doc.addEventListener('DOMContentLoaded', refresh)
                }
            }
            setBodyFontSize();
        };
    refresh();

    if (!doc.addEventListener) return;
    // 监听设备旋转和刷新事件，重新设置rem
    win.addEventListener(resizeEvt, refresh, false);
})(window, document);