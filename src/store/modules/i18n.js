const i18n = {
    state: {
        lang: null  // 存放使用者選用的語系
    },
    mutations: {
        // 切換語系設定
        setLang (state, value) {
          state.lang = value;
        }
    },
    actions: {},
    modules: {}
}

export default i18n
