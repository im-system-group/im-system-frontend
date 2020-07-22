import { apiRequest } from '../../utils'

const state = () => ({
    loadedPagesCount: 0,
    items: [],
    isItemsLoading: true,
    isItemsLoaded: false,
    scrollTop: Infinity,
})

const getters = {

}

const actions = {
    async loadItems({ state, commit }, { page, itemHeight }) {
        if (state.loadedPagesCount > page) {
            return
        }

        try {
            commit('set', { isItemsLoading: true, isItemsLoaded: false })
            const response = await apiRequest.get(`/access-articles-api.php?page=${page}`)
            const items = response.data.results;

            items.forEach(item =>
                item.userAvatarUrl = item.userAvatarUrl.replace("..", apiRequest.defaults.baseURL.replace("/api", "/"))
            )

            commit('pushItems', { items })
            commit('set', { isItemsLoading: false, isItemsLoaded: true, scrollTop: itemHeight * items.length })
        }
        catch (err) {
            console.log(err)
        }
    },
}

const mutations = {
    set(state, partialState) {
        Object.assign(state, partialState);
    },
    pushItems(state, { items }) {
        /** 過濾已存在的文章 */
        const notExistItems = items.filter(
            ({ id }) => !state.items.some(data => data.id === id)
        )

        state.items = notExistItems.reverse().concat(state.items)
        state.loadedPagesCount++
    },
}

const articles = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

export default articles
