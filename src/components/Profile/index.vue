<template>
  <main>
    <div class="profile">
      <div class="profile-top-border"></div>
      <div class="profile-header">
        <strong>&lt;</strong>
        PROFILE
        <strong>&gt;</strong>
      </div>
      <input id="upload-avatar" type="file" ref="imageFile" />
      <label
        for="upload-avatar"
        class="profile-avatar"
        :style="`background-image: url(${avatarUrl}); border-color: ${color};`"
      />
      <div tabindex="0" class="profile-content-form">
        <input type="text" placeholder="輸入名稱" v-model="name" />
        <input type="text" placeholder="輸入Email" v-model="email" />
        <input type="password" placeholder="輸入密碼(更換密碼用)" v-model="password" />
        <input type="password" placeholder="輸入新密碼(更換密碼用)" v-model="newPassword" />
      </div>
      <div class="profile-done-button" @click="update">DONE</div>
      <div class="profile-bottom-border"></div>
    </div>
    <div class="scale-click back-button" @click="$emit('back')" />
  </main>
</template>

<script>
export default {
  data: () => ({
    password: "",
    newPassword: "",
  }),
  name: "profile",
  props: ["name", "email", "avatarUrl", "color"],
  methods: {
    update() {
      this.$emit("update", {
        name: this.name,
        email: this.email,
        password: this.password,
        newPassword: this.newPassword,
        imageFile: this.$refs.imageFile.files[0],
      });
    },
  },
  mounted() {
  },
};
</script>

<style scoped>
@import "https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap";

.profile {
  background-color: rgba(255, 255, 255, 0.2);
  width: calc(100% - 10px);
  max-width: 860px;
  position: relative;
  height: 80vh;
  margin: 10vh auto;
  animation: profile-form-show 0.5s;
}

@keyframes profile-form-show {
  from {
    opacity: 0;
    transform: scaleY(0.1);
  }
}

.profile-top-border,
.profile-bottom-border {
  width: 100%;
  position: absolute;
  left: 0px;
  border-top: #77c6ce solid 2px;
}

.profile-top-border {
  top: -20px;
}

.profile-bottom-border {
  bottom: -20px;
}

.profile-top-border::before,
.profile-bottom-border::before {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  left: -10px;
  width: 2px;
  border-top: #77c6ce solid 2px;
}

.profile-top-border::after,
.profile-bottom-border::after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  right: -10px;
  width: 2px;
  border-top: #77c6ce solid 2px;
}

.profile-header {
  user-select: none;
  font-size: 22px;
  font-family: "Roboto";
  font-weight: 100;
  color: #fff;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background-color: rgba(255, 255, 255, 0.3);
}
</style>

<style scoped>
[type="file"] {
  display: none;
}

.profile-content-form {
  margin: 10px auto 0px;
  border: 2px rgba(255, 255, 255, 0.4) solid;
  width: calc(100% - 10px);
  max-width: 500px;
  height: 245px;
  border-radius: 10px;
  outline: none;
}

.profile-content-form input,
.profile-content-form textarea {
  color: #fff;
  display: block;
  width: 100%;
  background-color: transparent;
  border: none;
  resize: none;
  outline: none;
  padding: 10px;
}

.profile-content-form input::placeholder,
.profile-content-form textarea::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.profile-content-form input {
  width: calc(100% - 20px);
  font-size: 20px;
  height: 60px;
  margin: 0 auto;
  padding: 10px 0px;
  border-bottom: 1px rgba(255, 255, 255, 0.4) solid;
}

.profile-content-form input:last-child {
  border-bottom-color: transparent;
}

.profile-content-form textarea {
  font-size: 16px;
  height: 240px;
}

.profile-content-form textarea::-webkit-scrollbar {
  width: 8px;
  background-color: rgba(255, 255, 255, 0.1);
}

.profile-content-form textarea::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background-color: rgb(255, 255, 255);
}

.profile-done-button {
  cursor: pointer;
  user-select: none;
  font-family: "Roboto";
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

.profile-done-button:active {
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
  background-image: url(/img/article-images/back_button.png);
  left: 15px;
}
</style>

<style scoped>
@import "https://fonts.googleapis.com/css2?family=Electrolize&family=Noto+Sans+TC&display=swap";

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
.scale-click {
  transition: all 0.5s;
}

.scale-click:active {
  transform: scale(0.7);
}
</style>

<style scoped>
.profile-avatar {
  display: block;
  width: 128px;
  height: 128px;
  border-radius: 128px;
  border-width: 5px;
  border-color: #fff;
  border-style: solid;
  background-size: 100%;
  margin: 10px auto;
}
</style>