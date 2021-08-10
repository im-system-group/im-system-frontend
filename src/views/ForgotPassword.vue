<template>
  <main>
    <div class="forgot-password">
      <div class="forgot-password-top-border"></div>
      <div class="forgot-password-header">
        <strong>&lt;</strong>
        {{ $t('forgotPassword.title')}}
        <strong>&gt;</strong>
      </div>
      <div class="forgot-password-content-form-container">
        <div tabindex="0" class="forgot-password-content-form">
          <input type="text" :placeholder="$t('forgotPassword.form.account')" v-model="account" />
          <input type="text" :placeholder="$t('forgotPassword.form.email')" v-model="email" />
        </div>
        <div class="forgot-password-done-button" @click="create">
          <span v-if="loading" class="blink">LOADING...</span>
          <span v-else>{{ $t('forgotPassword.done')}}</span>
        </div>
      </div>
      <div class="forgot-password-bottom-border"></div>
    </div>
    <div class="scale-click back-button" @click="$router.push('/')" />
  </main>
</template>

<script>
import { mapActions /* , mapMutations */ } from "vuex";

export default {
  data: () => ({
    loading: false,
    account: "",
    email: "",
  }),
  methods: {
    ...mapActions("profile", ["createForgotPasswordRequest"]),
    async create() {
      if(this.loading === false)
      {
        this.loading = true;

        this.createForgotPasswordRequest({
          account: this.account,
          email: this.email,
        })
          .then((response) => {
            if(response.status === 201)
            {
              alert(this.$t('forgotPassword.success'));
            }
            this.loading = false;
            this.$router.push("/");
          })
          .catch(({ response }) => {
            alert(response);
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style scoped>
/*@import "https://fonts.googleapis.com/css2?family=Electrolize&family=Passion+One&family=Noto+Sans+TC&family=Rubik:wght@300&family=Ubuntu+Mono:wght@700&family=Roboto+Mono&family=Mukta&display=swap";*/

.blink {
  animation: blink 1s infinite;
}

@keyframes blink {
  from {
    opacity: 0;
  }
}

.forgot-password {
  background-color: rgba(255, 255, 255, 0.2);
  width: calc(100% - 10px);
  max-width: 860px;
  position: relative;
  height: 80vh;
  margin: 10vh auto;
  animation: forgot-password-form-show 0.5s;
}

@keyframes forgot-password-form-show {
  from {
    opacity: 0;
    transform: scaleY(0.1);
  }
}

.forgot-password-top-border,
.forgot-password-bottom-border {
  width: 100%;
  position: absolute;
  left: 0px;
  border-top: #77c6ce solid 2px;
}

.forgot-password-top-border {
  top: -20px;
}

.forgot-password-bottom-border {
  bottom: -20px;
}

.forgot-password-top-border::before,
.forgot-password-bottom-border::before {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  left: -10px;
  width: 2px;
  border-top: #77c6ce solid 2px;
}

.forgot-password-top-border::after,
.forgot-password-bottom-border::after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  right: -10px;
  width: 2px;
  border-top: #77c6ce solid 2px;
}

.forgot-password-header {
  user-select: none;
  font-size: 22px;
  font-family: "Noto Sans TC","Noto Sans JP","Noto Sans KR","Roboto";
  font-weight: 100;
  color: #fff;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background-color: rgba(255, 255, 255, 0.3);
}

.forgot-password-content-form-container {
  width: 100%;
  height: calc(100% - 40px);
  overflow: auto;
  padding-bottom: 10px;
}
</style>

<style scoped>
[type="file"] {
  display: none;
}

.forgot-password-content-form {
  margin: calc(10px + 128px) auto 0px;
  border: 2px rgba(255, 255, 255, 0.4) solid;
  width: calc(100% - 10px);
  max-width: 500px;
  height: 125px;
  border-radius: 10px;
  outline: none;
}

.forgot-password-content-form input,
.forgot-password-content-form textarea {
  color: #fff;
  display: block;
  width: 100%;
  background-color: transparent;
  border: none;
  resize: none;
  outline: none;
  padding: 10px;
}

.forgot-password-content-form input::placeholder,
.forgot-password-content-form textarea::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.forgot-password-content-form input {
  width: calc(100% - 20px);
  font-size: 20px;
  height: 60px;
  margin: 0 auto;
  padding: 10px 0px;
  border-bottom: 1px rgba(255, 255, 255, 0.4) solid;
}

.forgot-password-content-form input:last-child {
  border-bottom-color: transparent;
}

.forgot-password-content-form textarea {
  font-size: 16px;
  height: 240px;
}

.forgot-password-content-form textarea::-webkit-scrollbar {
  width: 8px;
  background-color: rgba(255, 255, 255, 0.1);
}

.forgot-password-content-form textarea::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background-color: rgb(255, 255, 255);
}

.forgot-password-done-button {
  cursor: pointer;
  user-select: none;
  font-family: "Noto Sans TC","Noto Sans JP","Noto Sans KR","Roboto";
  margin: 0px auto;
  color: rgba(255, 255, 255, 0.4);
  border: 2px rgba(255, 255, 255, 0.4) solid;
  font-size: 20px;
  width: calc(100% - 10px);
  max-width: 500px;
  height: 40px;
  border-radius: 10px;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10px;
}

.forgot-password-done-button:active {
  background-color: rgba(255, 255, 255, 0.4);
}
</style>

<style scoped>
/*@import "https://fonts.googleapis.com/css2?family=Electrolize&family=Noto+Sans+TC&family=Noto+Sans+JP&family=Noto+Sans+KR&display=swap";*/

main {
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url(/img/article-images/background.svg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #153048;
}

svg,
img {
  user-select: none;
  position: absolute;
  top: 0;
  left: 0;
}
</style>

<style scoped>
.forgot-password-avatar {
  display: block;
  width: 128px;
  height: 128px;
  border-radius: 128px;
  border-width: 5px;
  border-color: #fff;
  border-style: solid;
  background-size: cover;
  background-position: center;
  margin: 10px auto;
}
</style>