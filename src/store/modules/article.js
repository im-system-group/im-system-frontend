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
            var response
            if(window.TOKEN === null)
            {
                response = await apiRequest.get(`articles/${id}`)
            }else{
                response = await apiRequest.get(`articles/${id}`,
                    {
                        headers: {
                        "Authorization":`Bearer ${window.TOKEN}`
                    }
                })
            }

            //const response = await apiRequest.get(`articles/${id}`)
            //const item = response.data.data
            //item.likesCount = item.likesCount | 0
            const [item] = [response.data.data].map((structuredItem) => ({
                id: structuredItem.id,
                title: structuredItem.title,
                content: structuredItem.content,
                likesCount: structuredItem.likeNum,
                imageUrl: structuredItem.image,
                createTime: structuredItem.createTime || "0000-00-00 00:00:00",
                userName: structuredItem.author.name,
                userAvatarUrl: structuredItem.author.avatar || '/img/def_picture.jpg',
                userColor: structuredItem.author.color || '#fff',
                isLiked: structuredItem.isLiked
            }));
            // item.imageUrl = item.imageUrl.replace("..", "https://imsystem.site")
            // item.userAvatarUrl = item.userAvatarUrl.replace("..", "https://imsystem.site")
            commit('pushItems', { item })
            commit('set', { item, isItemLoading: false, isItemLoaded: true })
        }
        catch (err) {
            console.log(err)
        }
    },
    async loadComments({ commit }, { id }) {
        try {
            commit('set', { isCommentsLoading: true, isCommentsLoaded: false })
            //TODO:更改為分頁設計
            //const response = await apiRequest.get(`/articles/${id}/comments?perPage=10&page=1`)
            const response = await apiRequest.get(`/articles/${id}/comments/all`)
            //const comments = response.data.data
            const comments = response.data.data.map((structuredItem) => ({
                id: structuredItem.id,
                content: structuredItem.content,
                userName: structuredItem.author.name,
                userAvatarUrl:structuredItem.author.avatar || '/img/def_picture.jpg',
                userColor: structuredItem.author.color || '#fff'
            }));
            

            // comments.forEach(comment =>
            //     comment.userAvatarUrl = comment.userAvatarUrl.replace("..", "https://imsystem.site")
            // )
            commit('pushItems', { comments })
            commit('set', { comments, isCommentsLoading: false, isCommentsLoaded: true })
        }
        catch (err) {
            console.log(err)
        }
    },
    async addComment({ dispatch }, { id, content }) {
        try {
            await apiRequest.post(
                `articles/${id}/comments`,
                Object.entries({
                    content:content,
                }).reduce((formData, [name, value]) => (formData.append(name, value), formData), new FormData()),
                {
                    headers: {
                        "Authorization": `Bearer ${window.TOKEN}`,
                        "Content-Type": 'multipart/form-data'
                    }
                }
            )

            dispatch("loadComments", { id })
        }
        catch (err) {
            console.log(err)
        }
    },
    async likeItem({ commit, state }, { id }) {
        const item = state.item

        try {
            const response = await apiRequest.post(
                `articles/${id}/favorite`,
                Object.entries({
                    favorite:+!item.isLiked,
                    _method:'PATCH',
                }).reduce((formData, [name, value]) => (formData.append(name, value), formData), new FormData()),
                {
                    headers: {
                        "Authorization": `Bearer ${window.TOKEN}`,
                        'Content-Type': 'multipart/form-data'
                    },
                }
            );

            console.log(response.data)

            if (item.isLiked) {
                commit('set', { item: { ...state.item, 
                                        likesCount: state.item.likesCount - 1, 
                                        isLiked: !state.item.isLiked } })
            }
            else {
                commit('set', { item: { ...state.item, 
                                        likesCount: state.item.likesCount + 1, 
                                        isLiked: !state.item.isLiked } })
            }
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
