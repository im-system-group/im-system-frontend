module.exports = {
    devServer: {
        proxy: 'http://111.250.156.133'
    },
    publicPath: '/',
    productionSourceMap: false,
    pwa: {
        name: 'iM',
        themeColor: '#3d403f',
        manifestOptions: {
            background_color: '#3d403f',
        },
        msTileColor: '#3d403f',
        assetsVersion: '0.0202',
    },
    css: {
        // 是否使用css分離外掛 ExtractTextPlugin
        extract: true,
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