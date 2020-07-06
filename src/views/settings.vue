<template>
    <div class="im-bg">
        <router-link to="/list" tag="button" class="navigation-button left fixed">
            <span class="mdi mdi-arrow-left"></span>
        </router-link>

        <div class="container mx-auto" style="max-width: 1028px;margin-top:8vh;min-height: 100vh">
            <div class="im-card">
                <div class="im-card__content">
                    <h2>SnowFireWolf</h2>
                    <h2>
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
                    </h2>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data: () => ({
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
            }]
    }),
    watch: {
        $i18n: function() {
            console.log(this.$i18n)
        }
    },
    mounted() {
        console.log(this.$i18n.locale)
    }
}
</script>
