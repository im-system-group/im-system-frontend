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
            const response = await apiRequest.get(`articles?perPage=10&page=${page}`)
            const items = response.data.data.map((structuredItem) => ({
                id: structuredItem.id,
                title: structuredItem.title,
                likesCount: structuredItem.likeNum,
                imageUrl: structuredItem.image,
                userName: structuredItem.author.name,
                userAvatarUrl: structuredItem.author.avatar,
                userColor: structuredItem.author.color || '#fff',
                isLiked: structuredItem.isLiked
            }));

            items.forEach(item => {
                item.likesCount = item.likesCount | 0;
            //     item.imageUrl = item.imageUrl.replace("..", "https://imsystem.site")
            //     item.userAvatarUrl = item.userAvatarUrl.replace("..", "https://imsystem.site")
            })

            commit('pushItems', { items })
            commit('set', { isItemsLoading: false, isItemsLoaded: true, scrollTop: itemHeight * items.length })
        }
        catch (err) {
            console.log(err)
        }
    },
    async likeItem({ commit, state }, { id }) {
        const item = state.items.find((item) => item.id === id)

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

            if (item.isLiked) {//TODO:需要改成驗status，204為成功
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
    async addItem({ commit }, { title, content, imageFile }) {
        if(title === '' || content === '')
        {
            alert('請輸入內容')
            return
        }
        const formData = new FormData()

        console.log(content)
        formData.append("title", title)
        formData.append("content", content)

        if (imageFile) {
            formData.append("image", imageFile)
        }

        try {
            /* const response =  */
            await apiRequest.post(
                "articles",
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${window.TOKEN}`,
                        "Content-Type": 'multipart/form-data'
                    },
                }
            )
        }
        catch (err) {
            console.log(err)
        }

        try {
            commit('set', { isItemsLoading: true, isItemsLoaded: false })
            const response = await apiRequest.get(`articles?perPage=1&page=1`)
            //const items = response.data.data;

            const items = response.data.data.map((structuredItem) => ({
                id: structuredItem.id,
                title: structuredItem.title,
                likesCount: structuredItem.likeNum,
                imageUrl: structuredItem.image,
                userName: structuredItem.author.name,
                userAvatarUrl: structuredItem.author.avatar,
                userColor: structuredItem.author.color || '#fff',
                isLiked: structuredItem.isLiked
            }));

            items.forEach(item => {
                item.likesCount = item.likesCount | 0
            //     item.imageUrl = item.imageUrl.replace("..", "https://imsystem.site")
            //     item.userAvatarUrl = item.userAvatarUrl.replace("..", "https://imsystem.site")
            })

            commit('unshiftItems', { items })
            commit('set', { isItemsLoading: false, isItemsLoaded: true })
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
                item.isLiked = like === +1
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
