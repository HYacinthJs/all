const path = require('path')
const webpack = require('webpack');

module.exports = {
    entry: {
        // vendor依赖的第三方库
        vendor: [
            'axios',
            'vue',
            'vue-router',
            'vuex',
            'qs',
            'babel-polyfill'
        ]
    },
    output: {
        filename: 'dll/[name].dll.js',
        path: path.resolve(__dirname, '../static/js/'),
        library: '[name]', // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
    },
    plugins: [
        // 把第三方库和代码分开，vendor.dll.js文件里包含的就是第三方库的文件
        // webpack.dll.config.js打包生成的两个文件，一个vendor.dll.js，另一个是vendor-manifest.json。
        // 前一个是保存的第三方库文件，后一个是库文件的索引。
        // DllReferencePlugin插件读取vendor-manifest.json文件，把库文件映射到相关的依赖上去
        new webpack.DllPlugin({
            path: path.resolve(__dirname, './manifest.json'), // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
            name: '[name]',
            context: __dirname,
        }),
    ],
}