<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  watch: {
    'window.TOKEN'(token) {
      window.TOKEN = token
    },
    'window.memberId'(id) {
      window.memberId = id
    }
  },

  created() {
    // localStorage global setting
    window.TOKEN = localStorage.getItem('token')
    window.memberId = localStorage.getItem('memberId')
  },
}
</script>

<style>
* {
  box-sizing: border-box;
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
  margin: 0;
  background-color: #153048;
}

#app {
  margin: 0;
  position: relative;
  top: 0;
  left: 0;
}
</style>
