"use strict";

process.env.NODE_ENV = 'production'

//node for loading 优雅的终端转轮
const ora = require("ora");
// rm-rf for node 用来删除文件和文件夹
const rm = require("rimraf");
//console for node 正确处理终端字符串样式
const chalk = require("chalk");
//path for node
const path = require("path");
//webpack
const webpack = require("webpack");
//webpack production setting
const config = require("./webpack.prod.conf");
//指定删除的文件
const rmFile = path.resolve(__dirname, "../dist/static");
//build start loading
const spinner = ora("building for production...");
spinner.start();

//构建全量压缩包！
rm(rmFile, function (err) {
    if (err) throw err; // 阻止程序运行，打印错误信息到控制台
    webpack(config, function (err, stats) {
        spinner.stop();
        if (err) throw err;
        // process.stdout属性是流程模块的内置应用程序编程接口，用于从程序中发送数据到标准输出的可写流。它实现了write()方法。
        process.stdout.write(
            stats.toString({
                colors: true,
                modules: false,
                children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
                chunks: false,
                chunkModules: false
            }) + "\n\n"
        );

        if (stats.hasErrors()) {
            console.log(chalk.red("  Build failed with errors.\n"));
            process.exit(1);
        }

        console.log(chalk.cyan("  Build complete.\n"));
        console.log(
            chalk.yellow(
                "  Tip: built files are meant to be served over an HTTP server.\n" +
                "  Opening index.html over file:// won't work.\n"
            )
        );
    });
});
