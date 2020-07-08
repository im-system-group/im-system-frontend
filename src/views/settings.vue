<template>
    <div class="im-bg">




        <router-link v-if="!open_edit" to="/list" tag="button" class="navigation-button left fixed">
            <span class="mdi mdi-arrow-left"></span>
        </router-link>

        <button v-else @click="edit_m" class="navigation-button left fixed">
            <span class="mdi mdi-close"></span>
        </button>

        <div class="container mx-auto" style="max-width: 920px;margin-top:8vh;">
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

                    <h3 class="mt-2 text-center display-1 im-font">{{ user_data.profile.name }}</h3>

                    <div class="mt-4">
                        <div class="">
                            使用者名稱
                        </div>
                        <div class="im-font">
                            @{{ user_data.profile.screen_name }}
                        </div>
                    </div>

                    <div class="mt-4">
                        <div class="">
                            電子郵件
                        </div>
                        <div class="im-font">
                            {{ user_data.profile.email }}
                        </div>
                    </div>

                    <div class="mt-4">
                        <div class="">
                            更改密碼
                        </div>
                    </div>

                    <div class="mt-4">
                        <div class="">
                            {{ $t('screen_lang' )}}
                        </div>
                        <div>
                            <select v-model="$i18n.locale">
                            <option
                                v-for="(lang, i) in langs"
                                :key="`Lang${i}`"
                                :value="lang.value"
                            >
                                {{ lang.name }}
                            </option>
                        </select>
                        </div>
                    </div>

                    <div class="mt-4">
                        <button @click="edit_m" class="button outlined">
                            編輯個人資料
                        </button>
                    </div>



                </div>
            </div>
        </div>


        <!-- edit modal -->
        <div v-if="!loading" class="im-modal" style="overflow-y: scroll" :class="{'active': open_edit}">
            <div class="im-modal-bg">
            </div>
            <div class="im-modal__card">
                <div class="im-card">

                    <div class="im-card__content" style="min-height: 50vh">
                        <h2>編輯資訊</h2>


                        <div>名稱</div>

                        <input
                            class="im-textarea mt-2"
                            placeholder="名稱"
                            v-model="new_settings.profile.name"
                        />


                        <div>使用者名稱</div>

                        <input
                            class="im-textarea mt-2"
                            placeholder="使用者名稱"
                            v-model="new_settings.profile.screen_name"
                        />


                        <div class="d-flex">
                            <button class="button outlined mt-2 ml-auto">編輯完成</button>
                        </div>
                    </div>

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
            //{
            //    name: '日本語',
            //    value: 'jp'
            //},
            {
                name: '中文（台灣）',
                value: 'tw'
            }
        ],
        open_edit: false,
        new_settings: null
    }),
    methods: {
        edit_m() {
            let open_edit = this.open_edit;
            this.open_edit = !open_edit;

            //如果打開 新文章 modal 鎖定滾動
            if(open_edit)
                document.body.style = 'overflow-y: scroll;'
            else
                document.body.style = 'overflow-y: hidden;'
        }
    },
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
                self.new_settings = data
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

<style>
.im-font {
    font-family: 'Electrolize', sans-serif;
    letter-spacing: 0.07em;
}
</style>
