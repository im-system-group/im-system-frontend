import { apiRequest } from '../../utils'

const state = () => ({
    item: null,
    isItemLoading: true,
    isItemLoaded: false,
})

const getters = {

}

const actions = {
    async loadItem({ commit }) {
        try {
            commit('set', { isItemLoading: true, isItemLoaded: false })
            const response = await apiRequest.get(`/access-profile-api.php`)
            const item = response.data.result
            commit('set', { item, isItemLoading: false, isItemLoaded: true })
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
}

const profile = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

export default profile
