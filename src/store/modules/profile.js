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
            //console.log("test")
            commit('set', { isItemLoading: true, isItemLoaded: false })
            const response = await apiRequest.get(
                `member`,
                {
                    headers: {
                        "Authorization": `Bearer ${window.TOKEN}`
                    },
                }
            )
            //const item = response.data.data
            const [item] = [response.data.data].map((structuredItem) => ({
                id:structuredItem.id,
                name: structuredItem.name,
                email: structuredItem.email,
                account: structuredItem.account,
                avatarUrl: structuredItem.avatar || '/img/def_picture.jpg',
                color: structuredItem.color || "#FFF",
                password: structuredItem.password || ""
            }));
            
            //console.log(item.memberId)
            //window.memberId = item.id
            
            commit('set', { item, isItemLoading: false, isItemLoaded: true })
        }
        catch (err) {
            console.log(err)
        }
    },
    async login({ commit }, { account, password }) {
        try {
            commit('set', { isItemLoading: true, isItemLoaded: false })
            /*const getToken = await apiRequest.get(`sanctum/csrf-cookie`,{
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Access-Control-Allow-Origin': 'http://220.135.99.236:8081',
                    'Access-Control-Allow-Credentials': 'true'
                }
            })
            console.log(getToken.headers)*/
            const response = await apiRequest.post(
                `login`,
                Object.entries({
                  account:account,
                  password:password,
                }).reduce((formData, [name, value]) => (formData.append(name, value), formData), new FormData()),
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )

            const item = response.data.data
            window.TOKEN = item.token
            // item.avatarUrl = item.avatarUrl.replace("..", "https://imsystem.site")

            commit('set', { item, isItemLoading: false, isItemLoaded: false })
            
            getMemberId()

        }
        catch (err) {
            console.log(err)
            commit('set', { isItemLoading: false, isItemLoaded: false })
        }
    },
    async updateItem({ commit }, { name, email, password, newPassword, imageFile }) {
        try {
            //name = encodeURI(name);
            //email = encodeURI(email);
            
            await apiRequest.post(
                `member/${window.memberId}`,
                Object.entries({
                    name:name,
                    email:email,
                    _method:'PATCH',
                }).reduce((formData, [name, value]) => (formData.append(name, value), formData), new FormData()),
                {
                    headers: {
                        "Authorization": `Bearer ${window.TOKEN}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            //name = decodeURI(name);
            //email = decodeURI(email);

            commit("set", { name, email });
            commit('set', { isItemLoading: false, isItemLoaded: false })

            if (password || newPassword) {
                //password = encodeURI(password);
                //newPassword = encodeURI(newPassword);

                //TODO:前端畫面需要加上confirm的欄位
                await apiRequest.post(
                    "password-reset",
                    Object.entries({
                        old_password:encodeURI(password),
                        password:encodeURI(newPassword),
                        confirm_password:encodeURI(newPassword),
                        _method:'PATCH',
                    }).reduce((formData, [name, value]) => (formData.append(name, value), formData), new FormData()),
                    {
                        headers: {
                            "Authorization": `Bearer ${window.TOKEN}`,
                            "Content-Type": "multipart/form-data"
                        },
                    }
                );
            }

            if (imageFile) {
                const response = await apiRequest.post(
                    `member/${window.memberId}`,
                    Object.entries({
                        name:name,
                        email:email,
                        avatar:imageFile,
                        _method:'PATCH',
                    }).reduce((formData, [name, value]) => (formData.append(name, value), formData), new FormData()),
                    {
                        headers: {
                            "Authorization": `Bearer ${window.TOKEN}`,
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
        //name = encodeURI(name);
        //email = encodeURI(email);
        //account = encodeURI(account);
        //password = encodeURI(password);

        return apiRequest.post(
            "register",
            Object.entries({
                account:account,
                password:password,
                name:name,
                email:email
            }).reduce((formData, [name, value]) => (formData.append(name, value), formData), new FormData()),
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
    },
    createForgotPasswordRequest(_, { account, email }) {
        //account = encodeURI(account);
        //email = encodeURI(email);

        return apiRequest.post(
            "forgot-password",
            Object.entries({
                account:account,
                email:email
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

async function getMemberId() {
    console.log(window.TOKEN)
    const response = await apiRequest.get(
        `member`,
        {
            headers: {
                "Authorization": `Bearer ${window.TOKEN}`
            },
        }
    )

    const memberId = response.data.data.id
    window.memberId = memberId
}

export default profile
