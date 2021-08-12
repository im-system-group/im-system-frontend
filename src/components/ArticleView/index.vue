<template>
  <div v-if="article !== null" class="article-container">
    <div class="article-less-info">
      <div class="article-poster">
        <Avatar :src="article.userAvatarUrl" :color="article.userColor" type="poster" />
        <div
          class="article-poster-name"
          :title="article.userName"
          v-html="article.userName"
          :style="`color: ${article.userColor};`"
        />
      </div>
      <div class="article-top-border" />
      <div class="article-title" v-text="articleTitle" />
      <div :class="{ 'article-likes': true, active: article.isLiked }">
        <div
          class="article-like-thumb-container"
          @click.stop="$emit('like', article.id)"
        >
          <span class="mdi mdi-thumb-up"></span>
        </div>
        <div class="article-likes-count" v-text="article.likesCount" />
      </div>
    </div>
    <!-- article content -->
    <div class="article-content-and-comments-container">
      <img
        v-if="article.imageUrl"
        :src="article.imageUrl"
        style="max-width: calc(100% - 186px); margin-bottom: 10px"
      />
      <div class="article-content" v-text="articleContent" />
      <!-- 留言 -->
      <div class="article-comments">
        <Commenter
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
          :articleId="article.id"
        />
        <!-- 新留言 -->
        <newComment
          v-if="user"
          @add-comment="add-comment"
        ></newComment>
      </div>
    </div>
  </div>

  <!-- Remove Modal -->
  <BaseModal v-if="removeModal">
    <div class="modal-card-container">
      <h2 class="modal-header">刪除文章</h2>
      <p>確定要刪除這則文章嗎？</p>
    </div>
    <div class="modal-actions">
      <button class="modal-button action" @click="$emit('del');removeModal = false;">確認</button>
      <button class="modal-button" @click="removeModal = false">取消</button>
    </div>
  </BaseModal>

  <!-- Edit Modal -->
  <BaseModal v-if="editModal">
    <div class="modal-card-container">
      <h2 class="modal-header">編輯文章</h2>
      <input type="text" :placeholder="$t('articleCreate.form.title')" v-model="newArticleTitle" required />
      <textarea v-model="newArticleContent" style="margin-top: 1em;">
      </textarea>
    </div>
    <div class="modal-actions">
      <button class="modal-button action" @click="editedDone();editModal = false;">確認</button>
      <button class="modal-button" @click="editModal = false">取消</button>
    </div>
  </BaseModal>

  <!-- 按鈕群 -->
  <div class="scale-click back-button" @click="$emit('back')" />
  <div v-if="login" class="scale-click edit-button" @click="editModal = true" />
  <div v-if="login" class="scale-click del-button" @click="removeModal = true" />
</template>



<script>
import { mapActions } from 'vuex'
import { apiRequest } from '@/utils'

import Avatar from './Avatar';
import Commenter from './Commenter';
import newComment from './newComment';

export default {
  name: "article-view",

  emits: [
    "like",
    "back",
    "del",
    "edit",
    "add-comment"
  ],

  props: ["article", "comments", "user"],

  components: {
    Avatar,
    Commenter,
    newComment
  },

  data() {
    return {
      handleCommentTextBoxKeyDown: null,
      handleCommentTextBoxInput: null,

      articleTitle: this.article.title,
      articleContent: this.article.content,
      newArticleTitle:  this.article.title,
      newArticleContent:  this.article.content,

      removeModal: false,
      editModal: false,
    }
  },

  computed: {
    login() {
      // 檢查登入
      if (this.article.authorId === window.memberId) {
        return true;
      } else {
        return false;
      }
    }
  },

  methods: {
    ...mapActions("articles", [
      "editItem"
    ]),

    // 編輯文章送出
    async editedDone() {
      let articleId = this.article.id;
      let newTitle = this.newArticleTitle;
      let newContent = this.newArticleContent;

      this.articleTitle = newTitle;
      this.articleContent = newContent;

      // 編輯文章送出
      await apiRequest.post(`/articles/${articleId}`, 
        Object.entries({
          title: newTitle,
          content: newContent,
          _method: 'PATCH'
        }).reduce((formData, [name, value]) => (formData.append(name, value), formData), new FormData()),
        {
          headers: {
            "Authorization": `Bearer ${window.TOKEN}`,
            "Content-Type": 'multipart/form-data'
          }
        }
      );

      // 文章列表更新標題
      this.editItem({
        id: articleId,
        title: newTitle
      })
    }
  },
};
</script>

<style scoped>
/*@import "https://fonts.googleapis.com/css2?family=Electrolize&family=Noto+Sans+TC&family=Noto+Sans+JP&family=Noto+Sans+KR&display=swap";*/

.edit-button {
  background-image: url(/img/article-images/edit_button.svg);
  /* left: calc(100vw - 80px); */

  background-size: 64px;
  background-repeat: no-repeat;
  width: 64px;
  height: 64px;
  position: fixed;
  left: unset;
  right: 95px;
}

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

/* svg,
img {
  user-select: none;
  position: absolute;
  top: 0;
  left: 0;
} */
</style>

<style scoped>
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

.article-poster-name {
  color: #fff;
  text-align: center;
  font-size: 12.5px;
  font-family: "Electrolize", "Noto Sans TC", "Noto Sans JP", "Noto Sans KR",
    "Roboto";
  width: 81px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.article-title {
  font-size: 23px;
  letter-spacing: 0.25px;
  font-family: "Noto Sans TC", "Noto Sans JP", "Noto Sans KR", "Roboto";
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

.article-likes.active .article-like-thumb-container {
  background-color: rgb(140, 228, 230);
  color: #111;
}

.article-like-thumb-container {
  width: 38px;
  height: 38px;
  border-radius: 38px;
  background-color: rgba(81, 128, 144, 0.6);
  margin-left: 0.5px;
  margin-right: 6px;
  transition: all .12s;
  box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.5);
  cursor: pointer;
  font-size: 16px;
  color: rgb(140, 228, 230);
  display: flex;
  align-items: center;
  justify-content: center;
}

.article-like-thumb-container:active {
  transform: scale(0.8);
}

.article-likes-count {
  font-size: 18.5px;
  font-family: "Electrolize", "Noto Sans TC", "Noto Sans JP", "Noto Sans KR",
    "Roboto";
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

<style>
.article-content-and-comments-container {
  margin-left: 92px;
  padding: 10px 40px 0px;
  width: calc(100% - 106px);
  height: calc(100% - 95px);
  overflow-y: scroll;
  background-color: rgba(255, 255, 255, 0.2);
}

.article-content {
  color: #fff;
  font-size: 18px;
  margin-bottom: 15px;
  line-height: 1.9;
}

.article-content,
.article-comments {
  font-family: "Noto Sans TC", "Noto Sans JP", "Noto Sans KR", "Roboto";
  width: 100%;
  white-space: pre-wrap;
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

.article-commenter-name {
  color: #fff;
  font-size: 14px;
  font-family: "Electrolize", "Noto Sans TC", "Noto Sans JP", "Noto Sans KR",
    "Roboto";
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