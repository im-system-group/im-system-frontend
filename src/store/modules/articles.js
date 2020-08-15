import { apiRequest } from '../../utils'

const state = () => ({
    loadedPagesCount: 0,
    items: [],
    isItemsLoading: true,
    isItemsLoaded: false,
})

const getters = {

}

const actions = {
    async loadItems({ state, commit }, { page }) {
        if (state.loadedPagesCount > page) {
            return
        }

        try {
            commit('set', { isItemsLoading: true, isItemsLoaded: false })
            const response = await apiRequest.get(`/access-articles-api.php?page=${page}`)
            const items = response.data.results
            commit('pushItems', { items })
            commit('set', { isItemsLoading: false, isItemsLoaded: true })
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

        state.items = state.items.concat(notExistItems.reverse())
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
