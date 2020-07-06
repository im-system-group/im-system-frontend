module.exports = {
    devServer: {
        //proxy: 'http://localhost:3000'
    },
    publicPath: '/',
    productionSourceMap: false,
    pwa: {
        name: 'iM System',
        themeColor: '#3d403f',
        manifestOptions: {
            background_color: '#3d403f',
        },
        msTileColor: '#3d403f',
        assetsVersion: '0.2201',
    },
    css: {
        // 是否使用css分離外掛 ExtractTextPlugin
        //extract: true,
        // 開啟 CSS source maps?
        sourceMap: false,
        // css預設器配置項
        loaderOptions: {},
        // 啟用 CSS modules for all css / pre-processor files.
        requireModuleExtension: true
    },
    pluginOptions: {
        i18n: {
          locale: 'en',
          fallbackLocale: 'en',
          localeDir: 'lang',
          enableInSFC: true
        }
    }
}