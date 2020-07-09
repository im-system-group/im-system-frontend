import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user_profile: null,
        list_data: [],
        current_page: 0,
        scroll_top: 0,
    },
    mutations: {
        pushListData(state, newListData) {
            state.list_data = state.list_data.concat(newListData.filter(({ id }) => 
                !state.list_data.some(data => data.id === id)
            ));
        },
        setCurrentListPage(state, page) {
            state.current_page = page;
        },
        setScrollTop(state, scrollTop) {
            state.scroll_top = scrollTop;
        },
    },
    actions: {
        async loadArticles({ commit }, page) {
            let response = await Axios.get(`/api/article-title-api.php?list=${page}`);
            let { data } = response;

            let list_data = data.id.reduce(function (list, id, i) {
                let author_avator = data.author_avator[i];
                let author_avator_color = data.author_avator_color[i];
                let author = data.author[i];
                let title = data.title[i];
                let thumbsup = parseInt(data.thumbsup[i]);

                list.push({
                    id,
                    author_avator,
                    author_avator_color,
                    author,
                    title,
                    thumbsup
                });

                return list;
            }, []);

            commit("pushListData", list_data);
            commit("setCurrentListPage", page);
        },
    },
    modules: {
    }
})
