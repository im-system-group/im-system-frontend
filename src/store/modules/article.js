import { apiRequest } from "../../utils"

const state = () => ({
    item: null,
    comments: [],
    isItemLoaded: false,
    isItemLoading: true,
    isCommentsLoaded: false,
    isCommentsLoading: true,
})

const getters = {

}

const actions = {
    async loadItem({ commit }, { id }) {
        try {
            commit('set', { isItemLoading: true, isItemLoaded: false });
            const response = await apiRequest.get(`/access-article-api.php?id=${id}`)
            const item = response.data.result
            item.userAvatarUrl = item.userAvatarUrl.replace("..", "https://imsystem.site")
            commit('set', { item, isItemLoading: false, isItemLoaded: true })
        }
        catch (err) {
            console.log(err)
        }
    },
    async loadComments({ commit }, { id }) {
        try {
            commit('set', { isCommentsLoading: true, isCommentsLoaded: false })
            const response = await apiRequest.get(`/access-comments-api.php?id=${id}`)
            const comments = response.data.results

            comments.forEach(comment =>
                comment.userAvatarUrl = comment.userAvatarUrl.replace("..", "https://imsystem.site")
            )

            commit('set', { comments, isCommentsLoading: false, isCommentsLoaded: true })
        }
        catch (err) {
            console.log(err)
        }
    },
    async addComment({ dispatch }, { id, content }) {
        try {
            await apiRequest.post(`create-comments-api.php?id=${id}`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `content=${encodeURI(content)}`
            })

            dispatch("loadComments")
        }
        catch (err) {
            console.log(err)
        }
    },
    dropItemAndComments({ commit }) {
        commit('set', {
            item: null,
            comments: [],
            isItemLoaded: false,
            isItemLoading: true,
            isCommentsLoaded: false,
            isCommentsLoading: true,
        })
    }
}

const mutations = {
    set(state, partialState) {
        Object.assign(state, partialState);
    },
}

const article = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

export default article
