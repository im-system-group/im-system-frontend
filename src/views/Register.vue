<template>
  <main>
    <div class="register">
      <div class="register-top-border"></div>
      <div class="register-header">
        <strong>&lt;</strong>
        {{ $t("register.title") }}
        <strong>&gt;</strong>
      </div>
      <div class="register-content-form-container">
        <div tabindex="0" class="register-content-form">
          <input
            type="text"
            :placeholder="$t('register.form.account')"
            v-model="account"
          />
          <input
            type="password"
            :placeholder="$t('register.form.password')"
            v-model="password"
          />
          <input
            type="text"
            :placeholder="$t('register.form.name')"
            v-model="name"
          />
          <input
            type="text"
            :placeholder="$t('register.form.email')"
            v-model="email"
          />
        </div>
        <div class="register-done-button" @click="create">
          <span v-if="loading" class="blink">LOADING...</span>
          <span v-else>{{ $t("register.done") }}</span>
        </div>
      </div>
      <div class="register-bottom-border"></div>
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
    password: "",
    name: "",
    email: "",
  }),
  methods: {
    ...mapActions("profile", ["createItem"]),
    async create() {
      if (this.loading === false) {
        this.loading = true;
        this.createItem({
          account: this.account,
          password: this.password,
          name: this.name,
          email: this.email,
        })
          .then((response) => {
            if (response.status === 201) {
              alert(this.$t("register.success"));
            }
            this.$router.push("/");
          })
          .catch(({ response }) => {
            alert(response);
            this.$router.push("/");
          });
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
/*@import "https://fonts.googleapis.com/css2?family=Electrolize&family=Noto+Sans+TC&family=Noto+Sans+JP&family=Noto+Sans+KR&display=swap"; */

.blink {
  animation: blink 1s infinite;
}

.register {
  background-color: rgba(255, 255, 255, 0.2);
  width: calc(100% - 10px);
  max-width: 860px;
  position: relative;
  height: 80vh;
  margin: 10vh auto;
  animation: register-form-show 0.5s;
}

@keyframes register-form-show {
  from {
    opacity: 0;
    transform: scaleY(0.1);
  }
}

.register-top-border,
.register-bottom-border {
  width: 100%;
  position: absolute;
  left: 0px;
  border-top: #77c6ce solid 2px;
}

.register-top-border {
  top: -20px;
}

.register-bottom-border {
  bottom: -20px;
}

.register-top-border::before,
.register-bottom-border::before {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  left: -10px;
  width: 2px;
  border-top: #77c6ce solid 2px;
}

.register-top-border::after,
.register-bottom-border::after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  right: -10px;
  width: 2px;
  border-top: #77c6ce solid 2px;
}

.register-header {
  user-select: none;
  font-size: 22px;
  font-family: "Noto Sans TC", "Noto Sans JP", "Noto Sans KR", "Roboto";
  font-weight: 100;
  color: #fff;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background-color: rgba(255, 255, 255, 0.3);
}

.register-content-form-container {
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

.register-content-form {
  margin: calc(10px + 64px) auto 0px;
  border: 2px rgba(255, 255, 255, 0.4) solid;
  width: calc(100% - 10px);
  max-width: 500px;
  height: 245px;
  border-radius: 10px;
  outline: none;
}

.register-content-form input,
.register-content-form textarea {
  color: #fff;
  display: block;
  width: 100%;
  background-color: transparent;
  border: none;
  resize: none;
  outline: none;
  padding: 10px;
}

.register-content-form input::placeholder,
.register-content-form textarea::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.register-content-form input {
  width: calc(100% - 20px);
  font-size: 20px;
  height: 60px;
  margin: 0 auto;
  padding: 10px 0px;
  border-bottom: 1px rgba(255, 255, 255, 0.4) solid;
}

.register-content-form input:last-child {
  border-bottom-color: transparent;
}

.register-content-form textarea {
  font-size: 16px;
  height: 240px;
}

.register-done-button {
  cursor: pointer;
  user-select: none;
  font-family: "Noto Sans TC", "Noto Sans JP", "Noto Sans KR", "Roboto";
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

.register-done-button:active {
  background-color: rgba(255, 255, 255, 0.4);
}
</style>

<style>
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
.register-avatar {
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