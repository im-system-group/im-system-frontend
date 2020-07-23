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
    async login({ commit }, { account, password }) {
        try {
            commit('set', { isItemLoading: true, isItemLoaded: false })
            
            const response = await apiRequest.post(
                `/auth-login-api.php`, 
                `account=${encodeURI(account)}&password=${encodeURI(password)}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            )

            const item = response.data.result

            item.avatarUrl = item.avatarUrl.replace("..", "https://imsystem.site")

            commit('set', { item, isItemLoading: false, isItemLoaded: true })
        }
        catch (err) {
            console.log(err)
            commit('set', { isItemLoading: false, isItemLoaded: true })
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
