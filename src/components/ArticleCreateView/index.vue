<template>
  <main>
    <div class="article-create">
      <div class="article-create-top-border"></div>
      <div class="article-create-header">
        <strong>&lt;</strong>
        POST CREATE
        <strong>&gt;</strong>
      </div>
      <div tabindex="0" class="article-create-content-form">
        <input type="text" placeholder="輸入標題" v-model="title" />
        <textarea placeholder="輸入內容" v-model="content"></textarea>
      </div>
      <div class="article-create-upload-form">
        <label class="plus-block" for="upload-file">
          <span :class="`mdi mdi-${$refs.imageFile && $refs.imageFile.files[0] ? 'image' : 'plus'}`"></span>
        </label>
        <input id="upload-file" type="file" ref="imageFile" />
        <div class="plus-block">
          <span class="mdi mdi-plus"></span>
        </div>
        <div class="plus-block">
          <span class="mdi mdi-plus"></span>
        </div>
      </div>
      <div class="article-create-post-button" @click="create">POST</div>
      <div class="article-create-bottom-border"></div>
    </div>
    <div class="scale-click back-button" @click="$emit('back')" />
  </main>
</template>

<script>
export default {
  data: () => ({
    title: "",
    content: "",
    fileChangeHandler: null,
  }),
  methods: {
    create() {
      this.$emit("create", {
        title: this.title,
        content: this.content,
        imageFile: this.$refs.imageFile.files[0],
      });
    },
  },
  name: "article-create-view",
  props: [],
  mounted() {
    this.$refs.imageFile.addEventListener("change", this.fileChangeHandler = () => {
      this.$forceUpdate();
    });
  },
  beforeDestroy() {
    this.$refs.imageFile.removeEventListener("change", this.fileChangeHandler);
  },
};
</script>

<style scoped>
@import "https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap";

.article-create {
  background-color: rgba(255, 255, 255, 0.2);
  width: calc(100% - 10px);
  max-width: 860px;
  position: relative;
  height: 80vh;
  margin: 10vh auto;
  animation: article-create-form-show 0.5s;
}

@keyframes article-create-form-show {
  from {
    opacity: 0;
    transform: scaleY(0.1);
  }
}

.article-create-top-border,
.article-create-bottom-border {
  width: 100%;
  position: absolute;
  left: 0px;
  border-top: #77c6ce solid 2px;
}

.article-create-top-border {
  top: -20px;
}

.article-create-bottom-border {
  bottom: -20px;
}

.article-create-top-border::before,
.article-create-bottom-border::before {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  left: -10px;
  width: 2px;
  border-top: #77c6ce solid 2px;
}

.article-create-top-border::after,
.article-create-bottom-border::after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  right: -10px;
  width: 2px;
  border-top: #77c6ce solid 2px;
}

.article-create-header {
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

.article-create-content-form {
  margin: 10px auto 0px;
  border: 2px rgba(255, 255, 255, 0.4) solid;
  width: calc(100% - 10px);
  max-width: 500px;
  height: 300px;
  border-radius: 10px;
  outline: none;
}

.article-create-content-form input,
.article-create-content-form textarea {
  color: #fff;
  display: block;
  width: 100%;
  background-color: transparent;
  border: none;
  resize: none;
  outline: none;
  padding: 10px;
}

.article-create-content-form input::placeholder,
.article-create-content-form textarea::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.article-create-content-form input {
  width: calc(100% - 20px);
  font-size: 20px;
  height: 60px;
  margin: 0 auto;
  padding: 10px 0px;
  border-bottom: 1px rgba(255, 255, 255, 0.4) solid;
}

.article-create-content-form textarea {
  font-size: 16px;
  height: 240px;
}

.article-create-content-form textarea::-webkit-scrollbar {
  width: 8px;
  background-color: rgba(255, 255, 255, 0.1);
}

.article-create-content-form textarea::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background-color: rgb(255, 255, 255);
}

.article-create-upload-form {
  margin: 10px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 10px);
  max-width: 500px;
}

.article-create-upload-form .plus-block {
  color: rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  user-select: none;
  width: 100px;
  height: 100px;
  border: 2px rgba(255, 255, 255, 0.4) solid;
  border-radius: 10px;
}

.article-create-post-button {
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
}

.article-create-post-button:active {
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