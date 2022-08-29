'use strict'
const path = require('path')
const fs = require('fs');
//一个抽离出css的webpack插件！
const ExtractTextPlugin = require("extract-text-webpack-plugin")
// 获取自定义less变量用于全局 格式如{theme-red: "#f85959"}
const getLessVariables = function getLessVariables(file) {
    var themeContent = fs.readFileSync(file, 'utf-8')
    var variables = {}
    themeContent.split('\n').forEach(function (item) {
        if (item.indexOf('//') > -1 || item.indexOf('/*') > -1) {
            return
        }
        var _pair = item.split(':')
        if (_pair.length < 2) return;
        var key = _pair[0].replace('\r', '').replace('@', '')
        if (!key) return;
        var value = _pair[1].replace(';', '').replace('\r', '').replace(/^\s+|\s+$/g, '')
        variables[key] = value
    })
    return variables
}


exports.cssLoader = function (opts) {
    // 生成加载器数组
    function generateLoaders(loader, loaderOpts) {
        const loaders = [
            { //默认loader
                loader: 'css-loader',
                options: {
                    minimize: process.env.NODE_ENV === 'production',
                    sourceMap: opts.sourceMap
                }
            }
        ]
        if (loader) { // 需要增加的loader
            loaders.push({
                loader: `${loader}-loader`,
                options: Object.assign({}, loaderOpts, {
                    sourceMap: opts.sourceMap
                })
            })
        }

        if (opts.extract) { //是否需要抽离css
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader',
                publicPath: '../../' //抽离出来的css 添加路径前缀, 让其打包出来的路径正确
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }
    // 获取自定义less变量用于全局 格式如{theme-red: "#f85959"}
    let variables = getLessVariables(path.join(__dirname, '../static/color.less'))
    return {
        // 返回css加载器集
        css: generateLoaders(),
        // 返回less加载器集
        less: generateLoaders('less', {
            globalVars: variables
        })
    }
}

exports.styleLoader = function (opts) {
    const output = []
    const cssLoaders = exports.cssLoader(opts)
    for (let extension in cssLoaders) {
        let loader = cssLoaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'), //路径匹配
            use: loader
        })
    }
    return output
}