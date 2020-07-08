<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    data: () => ({
        user_data: null
    }),
    created() {
        let self = this;

        this.axios.get('/api/me.json')
            .then(function (response) {
                let data = response.data

                if(data.status === 'ok'){
                    self.$store.state.user_data = response.data
                }else{
                    self.$router.push('/login')
                }

            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    },
    mounted() {
        document.title = 'iM'
    }
}
</script>

<style>
* {
    font-family: "Noto Sans CJK TC", BlinkMacSystemFont, -apple-system"Segoe UI", "Roboto", "Oxygen",
  "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica",
  "Arial", "微軟正黑體", sans-serif;
}
</style>