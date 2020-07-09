<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    data: () => ({
    }),
    created() {
        document.title = 'iM'

        let self = this;

        this.axios.post('/api/check-me.php')
            .then(function (response) {
                let data = response.data

                //staus is ok
                if(data.message === 'ok'){
                    //set data 到 store
                    self.$store.state.user_profile = data
                }else{
                    self.$router.push('/')
                }

            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }
}
</script>

<style>
* {
    font-family: -apple-system, BlinkMacSystemFont, "Noto Sans CJK TC", "Segoe UI", "Roboto", "Oxygen",
  "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica",
  "Arial", "微軟正黑體", sans-serif;
}

.im-font {
    font-family: "Electrolize", sans-serif;
    letter-spacing: 0.07em;
}

html,
body,
#app {
    width: 100%;
    height: 100%;
    max-width: 100vw;
    max-height: 100vh;
    max-width: -webkit-fill-available;
    max-height: -webkit-fill-available;
}
</style>