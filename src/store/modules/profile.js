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
    async updateItem({ commit }, { name, email, password, newPassword, imageFile }) {
        try {
            name = encodeURI(name);
            email = encodeURI(email);

            await apiRequest.post(
                "/update-profile-api.php",
                `name=${name}&email=${email}`,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            name = decodeURI(name);
            email = decodeURI(email);

            commit("set", { name, email });

            if (password || newPassword) {
                password = encodeURI(password);
                newPassword = encodeURI(newPassword);

                await apiRequest.post(
                    "/update-password-api.php",
                    `password=${password}&new_password=${newPassword}`,
                    {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    }
                );
            }

            if (imageFile) {
                const formData = new FormData();
                formData.append("file", imageFile);

                const response = await apiRequest.post(
                    "/update-profile-photo.php",
                    formData
                );

                const avatarUrl = response.data.result;
                commit("set", { avatarUrl });
            }
        }
        catch (err) {
            console.log(err);
        }
    },
    async createItem(_, { name, email, account, password }) {
        name = encodeURI(name);
        email = encodeURI(email);
        account = encodeURI(account);
        password = encodeURI(password);

        await apiRequest.post(
            "/auth-register-api.php",
            `name=${name}&email=${email}&account=${account}&password=${password}`,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
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
