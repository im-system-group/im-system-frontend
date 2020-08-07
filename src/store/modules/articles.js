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

            items.forEach(item => {
                item.likesCount = item.likesCount | 0;
                item.userAvatarUrl = item.userAvatarUrl.replace("..", "https://imsystem.site")
            })

            commit('pushItems', { items })
            commit('set', { isItemsLoading: false, isItemsLoaded: true, scrollTop: itemHeight * items.length })
        }
        catch (err) {
            console.log(err)
        }
    },
    async likeItem({ commit }, { id }) {
        try {
            const response = await apiRequest.post(`/create-like-api.php?id=${id}`)

            if (response.data.message === "已取消like") {
                commit('likeItem', { id, like: -1 })
            }
            else {
                commit('likeItem', { id, like: +1 })
            }
        }
        catch (err) {
            console.log(err)
        }
    },
    async addItem(_, { title, content, imageFile }) {
        const formData = new FormData()

        formData.append("title", title)
        formData.append("content", content)

        if (imageFile) {
            formData.append("file", imageFile)
        }

        try {
            /* const response =  */await apiRequest.post("/create-article-api.php", formData)
        }
        catch (err) {
            console.log(err)
        }

        try {
            commit('set', { isItemsLoading: true, isItemsLoaded: false })
            const response = await apiRequest.get(`/access-articles-api.php?page=1`)
            const items = response.data.results;

            items.forEach(item => {
                item.likesCount = item.likesCount | 0;
                item.userAvatarUrl = item.userAvatarUrl.replace("..", "https://imsystem.site")
            })

            commit('unshiftItems', { items })
            commit('set', { isItemsLoading: false, isItemsLoaded: true, scrollTop: itemHeight * items.length })
        }
        catch (err) {
            console.log(err)
        }
    }
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
    unshiftItems(state, { items }) {
        /** 過濾已存在的文章 */
        const notExistItems = items.filter(
            ({ id }) => !state.items.some(data => data.id === id)
        )

        state.items = state.items.concat(notExistItems.reverse())
    },
    likeItem(state, { id, like }) {
        state.items.forEach(item => {
            if (item.id === id) {
                item.likesCount += like
            }
        })
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
