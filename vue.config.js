module.exports = {
    publicPath: '/',
    productionSourceMap: false,
    pwa: {
        name: 'iM',
        shortName: 'iM',
        themeColor: '#3d403f',
        manifestOptions: {
            background_color: '#3d403f',
            orientation: "landscape",
            display: "fullscreen"
        },
        msTileColor: '#3d403f',
        assetsVersion: '0.020173',
        appleMobileWebAppCapable: 'yes',
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: 'src/service-worker.js',
            importWorkboxFrom: 'disabled',
            importScripts: 'https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js'
            // ...other Workbox options...
            },
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
            locale: 'zh-TW',
            fallbackLocale: 'zh-TW',
            localeDir: 'lang',
            enableInSFC: true
        }
    }
}
