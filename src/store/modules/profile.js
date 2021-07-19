import { apiRequest } from '../../utils'

const state = {
    item: null,
    isItemLoading: true,
    isItemLoaded: false,

    localStorageToken: window.localStorage.getItem('token_v1') || '',
    localStorageMemberId: window.localStorage.getItem('identity_id_v1') || ''
}

const getters = {

}

const actions = {
    async loadItem({ commit, state }) {
        try {
            commit('set', { isItemLoading: true, isItemLoaded: false })
            const response = await apiRequest.get(
                `member`,
                {
                    headers: {
                        "Authorization": `Bearer ${state.localStorageToken}`,
                    },
                }
            )
            const [item] = [response.data.data].map((structuredItem) => ({
                id: structuredItem.id,
                name: structuredItem.name,
                email: structuredItem.email,
                account: structuredItem.account,
                avatarUrl: structuredItem.avatar || '/img/def_picture.jpg',
                color: structuredItem.color || "#FFF",
                password: structuredItem.password || ""
            }));

            commit('set', { item, isItemLoading: false, isItemLoaded: true })
            return true
        }
        catch (err) {
            console.log(err.response.status)
            return false
        }
    },
    async login({ commit, state }, { account, password }) {
        try {
            commit('set', { isItemLoading: true, isItemLoaded: false })

            const response = await apiRequest.post(
                `login`,
                Object.entries({
                    account: account,
                    password: password,
                }).reduce((formData, [name, value]) => (formData.append(name, value), formData), new FormData()),
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )

            const item = response.data.data

            //window.TOKEN = item.token
            
            // set token into localStorage
            window.localStorage.setItem('token_v1', item.token)
            state.localStorageToken = item.token

        

            commit('set', { item, isItemLoading: false, isItemLoaded: false })

            
            // get memberId
           await apiRequest.get(`member`, {
                headers: {
                    "Authorization": `Bearer ${item.token}`
                },
            }).then((res) =>{
                let memberId = res.data.data.id
                
                console.log(memberId)
                // set memberId into localStorage
                window.localStorage.setItem('identity_id_v1', memberId)
                state.localStorageMemberId = memberId
            })

        }
        catch (err) {
            console.log(err)
            commit('set', { isItemLoading: false, isItemLoaded: false })
        }
    },
    async logout({ state }) {
        try {
            //commit('set', { isItemLoading: true, isItemLoaded: false })
            await apiRequest.delete(
                `logout`,
                {
                    headers: {
                        "Authorization": `Bearer ${state.localStorageToken}`
                    },
                }
            )
            //console.log(response)
            localStorage.clear('token_v1')
            localStorage.clear('identity_id_v1')
        }
        catch (err) {
            console.log(err)
        }
    },
    async updateItem({ commit, state }, { name, email, password, newPassword, imageFile }) {
        try {
            await apiRequest.post(
                `member/${state.localStorageMemberId}`,
                Object.entries({
                    name: name,
                    email: email,
                    _method: 'PATCH',
                }).reduce((formData, [name, value]) => (formData.append(name, value), formData), new FormData()),
                {
                    headers: {
                        "Authorization": `Bearer ${state.localStorageToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            commit("set", { name, email });
            commit('set', { isItemLoading: false, isItemLoaded: false })

            if (password || newPassword) {
                //TODO:前端畫面需要加上confirm的欄位
                await apiRequest.post(
                    "password-reset",
                    Object.entries({
                        old_password: encodeURI(password),
                        password: encodeURI(newPassword),
                        confirm_password: encodeURI(newPassword),
                        _method: 'PATCH',
                    }).reduce((formData, [name, value]) => (formData.append(name, value), formData), new FormData()),
                    {
                        headers: {
                            "Authorization": `Bearer ${state.localStorageToken}`,
                            "Content-Type": "multipart/form-data"
                        },
                    }
                );
            }

            if (imageFile) {
                const response = await apiRequest.post(
                    `member/${state.localStorageMemberId}`,
                    Object.entries({
                        name: name,
                        email: email,
                        avatar: imageFile,
                        _method: 'PATCH',
                    }).reduce((formData, [name, value]) => (formData.append(name, value), formData), new FormData()),
                    {
                        headers: {
                            "Authorization": `Bearer ${state.localStorageToken}`,
                            "Content-Type": "multipart/form-data"
                        },
                    }
                );

                const avatarUrl = response.data.data;
                commit("set", { avatarUrl });
                commit('set', { isItemLoading: false, isItemLoaded: false })
            }
        }
        catch (err) {
            console.log(err);
        }
    },
    createItem(_, { name, email, account, password }) {
        return apiRequest.post(
            "register",
            Object.entries({
                account: account,
                password: password,
                name: name,
                email: email
            }).reduce((formData, [name, value]) => (formData.append(name, value), formData), new FormData()),
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
    },
    createForgotPasswordRequest(_, { account, email }) {
        return apiRequest.post(
            "forgot-password",
            Object.entries({
                account: account,
                email: email
            }).reduce((formData, [name, value]) => (formData.append(name, value), formData), new FormData()),
            {
                headers: {
                    "Content-Type": "application/form-data",
                },
            }
        );
    }
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
