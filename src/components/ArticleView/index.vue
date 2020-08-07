<template>
  <main>
    <div v-if="article !== null" class="article-container">
      <div class="article-less-info">
        <div class="article-poster">
          <div
            class="article-poster-avatar"
            :style="`background-image: url(${article.userAvatarUrl}); border-color: ${article.userColor}; color: ${article.userColor};`"
          />
          <div
            class="article-poster-name"
            :title="article.userName"
            v-html="article.userName"
            :style="`color: ${article.userColor};`"
          />
        </div>

        <div class="article-top-border" />

        <div class="article-title" v-html="article.title" />

        <div class="article-likes">
          <div class="article-like-thumb-container" @click.stop="$emit('like', article.id)" />
          <div class="article-likes-count" v-text="article.likesCount" />
        </div>
      </div>
      <div class="article-content-and-comments-container">
        <div class="article-content" v-html="article.content" />
        <div class="article-comments">
          <div class="article-comment-container" v-for="comment in comments" :key="comment.id">
            <div class="article-commenter">
              <div
                class="article-commenter-avatar"
                :style="`background-image: url(${comment.userAvatarUrl}); border-color: ${comment.userColor};`"
              />
            </div>
            <div class="article-comment">
              <div
                class="article-commenter-name"
                v-html="comment.userName"
                :style="`color: ${comment.userColor};`"
              />
              <div class="article-comment-content" v-html="comment.content" />
            </div>
          </div>
          <div class="article-comment-container">
            <div class="article-commenter">
              <div
                class="article-commenter-avatar"
                :style="`background-image: url(${user.avatarUrl}); border-color: ${user.color}; color: ${user.color};`"
              />
            </div>
            <div class="article-comment">
              <div class="article-commenter-name">你</div>
              <textarea
                class="article-comment-content"
                ref="commentTextBox"
                placeholder="回應..."
                rows="1"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="scale-click back-button" @click="$emit('back')" />
  </main>
</template>

<script>
export default {
  data: () => ({
    handleCommentTextBoxKeyDown: null,
    handleCommentTextBoxInput: null
  }),
  name: "article-view",
  props: ["article", "comments", "user"],
  updated() {
    if (this.$refs.commentTextBox) {
      if (!this.handleCommentTextBoxInput) {
        this.handleCommentTextBoxInput = () => {
          this.$refs.commentTextBox.style.height = "auto";

          this.$refs.commentTextBox.style.height =
            this.$refs.commentTextBox.scrollHeight + "px";
        };

        this.$refs.commentTextBox.addEventListener(
          "input",
          this.handleCommentTextBoxInput
        );
      }

      if (!this.handleCommentTextBoxKeyDown) {
        this.handleCommentTextBoxKeyDown = event => {
          if (event.keyCode === 13 && this.$refs.commentTextBox.value.replace(/\n| |\t/g, "")) {
            if (!event.shiftKey && this.$refs.commentTextBox.selectionEnd === this.$refs.commentTextBox.value.length) {
              event.preventDefault();
              this.$emit("add-comment", this.$refs.commentTextBox.value);
              this.$refs.commentTextBox.value = "";
              this.handleCommentTextBoxInput();
            }
          }
        };

        this.$refs.commentTextBox.addEventListener(
          "keydown",
          this.handleCommentTextBoxKeyDown
        );
      }
    }
  },
  mounted() {
    this.$forceUpdate();
  },
  beforeDestroy() {
    if (this.$refs.commentTextBox) {
      this.$refs.commentTextBox.removeEventListener(
        "input",
        this.handleCommentTextBoxInput
      );

      this.$refs.commentTextBox.removeEventListener(
        "keydown",
        this.handleCommentTextBoxKeyDown
      );
    }
  }
};
</script>

<style>
.back-button,
.status-button {
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

.status-button {
  background-image: url(/img/article-images/status_button.png);
  right: 15px;
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

.article-container {
  margin: 5px auto 0;
  width: calc(100% - 10px);
  height: calc(100% - 5px);
  max-width: 1028px;
}

.article-less-info {
  width: 100%;
  height: 95px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
}

.article-poster {
  margin-left: 5px;
  width: 81px;
  height: 95px;
}

.article-poster-avatar {
  width: 64px;
  height: 64px;
  margin: 15px auto 2px;
  border-radius: 64px;
  border-width: 2.5px;
  border-color: #fff;
  border-style: solid;
  background-size: 100%;
}

.article-poster-name {
  color: #fff;
  text-align: center;
  font-size: 12.5px;
  font-family: Electrolize;
  width: 81px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.article-title {
  font-size: 23px;
  letter-spacing: 0.25px;
  font-family: "Noto Sans TC";
  margin-left: 6px;
  width: calc(100% - 106px - 141px);
  height: 95px;
  padding-left: 40px;
  line-height: 95px;
  color: rgb(255, 255, 255);
  text-shadow: 0px 4px rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.2);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.article-likes {
  width: 141px;
  height: 95px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 7.5px;
  background-color: rgba(255, 255, 255, 0.2);
}

.article-like-thumb-container {
  width: 38px;
  height: 38px;
  border-radius: 38px;
  background-color: rgba(81, 128, 144, 0.6);
  margin-left: 0.5px;
  margin-right: 6px;
  transition: all 0.5s;
}

.article-like-thumb-container:active {
  transform: scale(0.7);
}

.article-likes-count {
  font-size: 18.5px;
  font-family: Electrolize;
  color: rgb(140, 228, 230);
  text-shadow: 0px 4px rgba(140, 228, 230, 0.2);
}

.article-top-border {
  width: calc(100% - 106px - 1px);
  position: absolute;
  top: 0;
  left: 93px;
  border-top: #77c6ce solid 2px;
}

.article-top-border::before {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  left: -10px;
  width: 2px;
  border-top: #77c6ce solid 2px;
}

.article-top-border::after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  left: calc(100% + 7px);
  width: 2px;
  border-top: #77c6ce solid 2px;
}

@media screen and (max-width: 1028px) {
  .article-container::-webkit-scrollbar {
    width: 0px;
  }
}
</style>

<style scoped>
.article-content-and-comments-container {
  margin-left: 92px;
  padding: 10px 40px 0px;
  width: calc(100% - 106px);
  height: calc(100% - 95px);
  overflow-y: scroll;
  background-color: rgba(255, 255, 255, 0.2);
}

.article-content-and-comments-container::-webkit-scrollbar {
  width: 8px;
  background-color: rgba(255, 255, 255, 0.1);
}

.article-content-and-comments-container::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background-color: rgb(255, 255, 255);
}

.article-content {
  color: #fff;
  font-size: 18px;
  margin-bottom: 15px;
}

.article-content,
.article-comments {
  font-family: "Noto Sans TC";
  width: 100%;
}

.article-comment-container {
  color: #fff;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  margin-bottom: 15px;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.article-commenter {
  margin-left: 5px;
  margin-right: 5px;
  width: 81px;
  height: 64px;
}

.article-commenter-avatar {
  width: 64px;
  height: 64px;
  border-radius: 64px;
  border-width: 2.5px;
  border-color: #fff;
  border-style: solid;
  background-size: cover;
  background-position: center;
}

.article-commenter-name {
  color: #fff;
  font-size: 14px;
  font-family: Electrolize;
  width: 100%;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.article-comment {
  width: calc(100% - 81px);
}

.article-comment-content {
  font-size: 18px;
  resize: none;
  border: none;
  width: 100%;
  outline: none;
  display: block;
  background: transparent;
  color: #fff;
}
</style>