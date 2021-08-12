<template>
  <router-view />

  <!-- PWA Update Notification v-if="updateExists" -->
  <BaseModal v-if="updateExists">
    <div class="modal-border-line top"></div>

    <div class="modal-card-container">
      <h2>iM System 有新版本！</h2>
      <p>我們已經自動下載好，點擊更新會自動更新網站！</p>
    </div>

    <div class="modal-actions">
      <button class="modal-button" @click="refreshApp">更新</button>
    </div>
  </BaseModal>
</template>

<script>
import pwaUpdate from '@/mixins/update'
import { apiRequest } from './utils'



export default {
  name: 'App',

  mixins: [
    pwaUpdate
  ],

  created() {
    // localStorage global setting init
    window.TOKEN = window.localStorage.getItem('token_v1')
    window.memberId = window.localStorage.getItem('identity_id_v1')

    apiRequest.get('/sanctum/csrf-cookie')
  }
}
</script>

<style>
/* default scrollbar */
::-webkit-scrollbar {
  width: 8px;
  background-color: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background-color: rgb(255, 255, 255);
}

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
  -webkit-tap-highlight-color: transparent;
}

#app {
  margin: 0;
  position: relative;
  top: 0;
  left: 0;
}




.scale-click {
  cursor: pointer;
  transition: all 0.1s;
}

.scale-click:active {
  transform: scale(0.85);
}

.back-button {
  background-size: 64px;
  background-repeat: no-repeat;
  width: 64px;
  height: 64px;
  position: fixed;
  bottom: 15px;
}

.back-button {
  background-image: url(/img/article-images/back_button.svg);
  left: 15px;
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


.del-button {
  background-image: url(/img/article-images/del_button.svg);
  /* left: calc(100vw -20px); */

  background-size: 64px;
  background-repeat: no-repeat;
  width: 64px;
  height: 64px;
  position: fixed;
  bottom: 15px;
  right: 16px;

  border: 2.5px solid #fff;
  border-radius: 999px;
  background-position: center;
}

.status-button {
  background-image: url(/img/article-images/status_button.svg);
  right: 15px;
}
</style>
