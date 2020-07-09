<template>
    <div class="home">
        <div class="container">
            <h1>頁面整理</h1>
            <p><router-link to="/old_interface">Interface</router-link></p>
            <p><router-link to="/home">Home</router-link></p>
            <p><router-link to="/list">List</router-link></p>
            <p><router-link to="/post/1">Post id 1</router-link></p>
            <p><router-link to="/settings">settings</router-link></p>

            Data test : {{ this.$store.state.user_profile }}
        </div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'home'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.home a {
    font-weight: bold;
    color: #2c3e50;
}
.home a.router-link-exact-active {
  color: #42b983;
}
</style>
