module.exports = {
    // 遠端開發 api proxy
    devServer: {
        proxy: {
            '/api': {
                target: 'https://api.imsystem.site', // target host
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/': '/'
                },
                onProxyReq: (request) => {
                    request.setHeader("origin", "https://imsystem.site");
                },
            },
        }
    },

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
            swSrc: 'public/service-worker.js',
            importWorkboxFrom: 'disabled',
            importScripts:"https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
            //importScripts: 'https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js'
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
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: true,
            enableLegacy: false,
            runtimeOnly: false,
            compositionOnly: false,
            fullInstall: true
        },
        electronBuilder: {
            nodeIntegration: false,
            preload: 'src/preload.js', // preload 檔案位置
            builderOptions: {
                appId: 'site.imsystem.app', // 應用程式 ID
                productName: 'iM', // 專案名稱
                copyright: `2021 iM System Group`,
                win: { // Windows 相關設定
                    icon: 'public/favicon.ico', // 安裝檔圖示
                    target: ['nsis', 'portable', 'zip'] // 安裝、免安裝、ZIP
                },
                linux: { // Linux 相關設定
                    icon: 'build/icons'
                },
                mac: { // Mac 相關設定
                    icon: 'build/icons/icon.icns'
                },
                nsis: {
                    oneClick: false, // 是否一鍵安裝
                    perMachine: true, // 是否為每一台機器安裝
                    installerIcon: 'public/favicon.ico', // 安裝圖示
                    uninstallerIcon: 'public/favicon.ico', // 卸載圖示
                    installerHeaderIcon: 'public/favicon.ico', // 安裝頂部圖示
                    allowToChangeInstallationDirectory: true, // 是否可更改安裝目錄
                    createDesktopShortcut: true, // 是否建立桌面捷徑
                    createStartMenuShortcut: true // 是否建立開始捷徑
                },
                publish: [{
                    provider: 'github',
                    owner: 'iM System Group',
                    repo: 'https://github.com/im-system-group/im-system-frontend'
                }]
            }
        },
    }
}
