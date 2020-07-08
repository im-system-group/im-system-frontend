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
    }
}
</script>