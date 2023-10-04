module.exports = {
    //ここで指定した場所で展開する
    outputDir: '../server',
    //サーバーを起動した時のルートパス
    publicPath: '/',
    //outputDir起点でindex.htmlを格納する場所を指定
    indexPath: 'templates/index.html',
    //outputDir起点でstaticファイルを格納する場所を指定
    assetsDir: 'templates/static',

    configureWebpack: {
        devtool: 'source-map'
    }
}