module.exports = {
    //编译打包存放的目录默认dist
    outputDir: 'dist',
    // 如果你不需要使用eslint，把lintOnSave设为false即可
    lintOnSave: false,
    // 设为false打包时不生成.map文件
    configureWebpack: {
        externals: {
            AMap: 'window.AMap',
        },
    },
    productionSourceMap: false,
    assetsDir: 'static',
}