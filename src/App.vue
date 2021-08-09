<template>
  <router-view />
</template>

<script>
import { apiRequest } from './utils'



export default {
  name: 'App',

  created() {
    // localStorage global setting init
    window.TOKEN = window.localStorage.getItem('token_v1')
    window.memberId = window.localStorage.getItem('identity_id_v1')

    apiRequest.get('/sanctum/csrf-cookie')
  }
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

.edit-button,
.status-button {
  background-size: 64px;
  background-repeat: no-repeat;
  width: 64px;
  height: 64px;
  position: fixed;
  bottom: 15px;
}

.edit-button {
  background-image: url(/img/article-images/edit_button.svg);
  left: 15px;
}

.status-button {
  background-image: url(/img/article-images/status_button.svg);
  right: 15px;
}
</style>
