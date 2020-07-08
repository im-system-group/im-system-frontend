<template>
    <div class="im-bg">
        <router-link to="/list" tag="button" class="navigation-button left fixed">
            <span class="mdi mdi-arrow-left"></span>
        </router-link>

        <div class="container mx-auto" style="max-width: 1028px;margin-top:8vh;">
            <div class="im-card" style="min-height: 100vh">

                <!-- 取得資料中 -->
                <div v-if="loading" class="im-card__content">
                    <loading-spinner style="margin-top: 5vh;margin-bottom: 5vh;"></loading-spinner>
                </div>




                <!-- 取得成功 -->
                <div v-else class="im-card__content">

                    <im-avator
                        :src="user_data.avator_url"
                        width="120px"
                        style="margin: 0 auto;"
                    ></im-avator>

                    <p class="mt-2 text-center display-1">{{ user_data.profile.screen_name }}</p>

                    <p>Email: {{ user_data.profile.email }}</p>

                    <p>
                        {{ $t('screen_lang' )}}
                        <select v-model="$i18n.locale">
                            <option
                                v-for="(lang, i) in langs"
                                :key="`Lang${i}`"
                                :value="lang.value"
                            >
                                {{ lang.name }}
                            </option>
                        </select>
                    </p>

                    {{ user_data }}

                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data: () => ({
        loading: true,
        error: false,
        user_data: null,
        langs: [
            {
                name: 'English',
                value: 'en'
            },
            {
                name: '日本語',
                value: 'jp'
            },
            {
                name: '中文（台灣）',
                value: 'tw'
            }
        ]
    }),
    computed: {
        /*user_data() {
            return this.$store.state.user_data
        }*/
    },
    mounted() {
        console.log(this.$i18n.locale)

        let self = this;

        this.axios.get('/api/settings.json')
            .then(function (response) {
                let data = response.data

                self.loading = false
                self.user_data = data
            })
            .catch(function (error) {
                console.log(error);
                self.error = true;
            })
            .then(function () {
                // always executed
            });
    }
}
</script>
