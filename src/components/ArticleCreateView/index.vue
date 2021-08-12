<template>
  <div class="article-create">
    <div class="article-create-top-border"></div>
    <div class="article-create-header">
      <strong>&lt;</strong>
      {{ $t('articleCreate.title')}}
      <strong>&gt;</strong>
    </div>
    <div class="article-create-content-form-container">
      <div tabindex="0" class="article-create-content-form">
        <input type="text" :placeholder="$t('articleCreate.form.title')" v-model="title" required />
        <textarea :placeholder="$t('articleCreate.form.content')" v-model="content" required></textarea>
      </div>

      
      <img
        v-if="previewImage"
        class="img-preview"
        :src="filePreviewUrl"
      />
      
      <div class="article-create-upload-form">
        <label class="plus-block" for="upload-file">
          <span
            :class="`mdi mdi-${$refs.imageFile && $refs.imageFile.files[0] ? 'image' : 'plus'}`"
          ></span>
        </label>
        <input
          id="upload-file"
          type="file"
          ref="imageFile"
          @change="readFile"
        />
        <div class="plus-block">
          <span class="mdi mdi-close"></span>
        </div>
        <div class="plus-block">
          <span class="mdi mdi-close"></span>
        </div>
      </div>
      <div class="article-create-post-button" @click="create">
        <span v-if="loading" class="blink">LOADING...</span>
        <span v-else>{{ $t('articleCreate.post')}}</span>
      </div>

    </div>
    <div class="article-create-bottom-border"></div>
  </div>

  <!-- file size warning Modal -->
    <BaseModal v-if="warningModal">
      <div class="modal-border-line top"></div>

      <div class="modal-card-container">
        <h2>檔案大小不能超過 5 MB</h2>
      </div>

      <div class="modal-actions">
        <button class="modal-button" @click="warningModal = false">了解</button>
      </div>
    </BaseModal>

  <div class="scale-click back-button" @click="$emit('back')" />
</template>



<script>
export default {
  name: "article-create-view",
  
  // fix vue 3 emit warning
  emits: [
    'create',
    'back'
  ],

  data() {
    return {
      loading: false,
      title: "",
      content: "",
      warningModal: false,
      filePreviewUrl: "",
      previewImage: false
    }
  },
  
  methods: {
    create() {
      if(this.loading === false) {
        this.loading = true;

        this.$emit("create", {
          title: this.title,
          content: this.content,
          imageFile: this.$refs.imageFile.files[0],
        });
      }
    },
    readFile() {
      let filesLength = this.$refs.imageFile.files.length;
      this.filesLength = filesLength;
  
      if(filesLength !== 0) {
        let file = this.$refs.imageFile.files[0]
        let sizeInBytes = file.size;
        let sizeInMB = (sizeInBytes / (1024*1024)).toFixed(2);

        if(sizeInMB > 5) {
          //console.log('檔案大小超過 5MB')
          this.warningModal = true
        } else {
          if (/.(jpg|jpeg|png|gif)$/i.test(file.type)) {
            this.previewImage = true
            this.filePreviewUrl = URL.createObjectURL(this.$refs.imageFile.files[0]);
          } else {
            this.previewImage = false
          }
        }
      } else {
        this.previewImage = false
      }
    },
  }
};
</script>

<style scoped>
/*@import "https://fonts.googleapis.com/css2?family=Electrolize&family=Noto+Sans+TC&family=Noto+Sans+JP&family=Noto+Sans+KR&display=swap";*/

.blink {
  animation: blink 1s infinite;
}

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
  font-family: "Electrolize","Noto Sans TC","Noto Sans JP","Noto Sans KR","Roboto";
  font-weight: 100;
  color: #fff;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background-color: rgba(255, 255, 255, 0.3);
}

.article-create-content-form-container {
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

.img-preview {
  display: block;
  position: relative;
  margin: 0 auto;
  margin-top: 1rem;
  width: 100%;
  max-width: 500px;
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
  font-family: "Electrolize","Noto Sans TC","Noto Sans JP","Noto Sans KR","Roboto";
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