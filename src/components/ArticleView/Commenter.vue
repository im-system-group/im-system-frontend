<template>
  <div class="article-comment-container" :class="{ 'disabled': commentData.isUploading }">
    <div class="article-commenter">
      <Avatar :src="commentData.userAvatarUrl" :color="commentData.userColor" type="comment" />
    </div>
    
    <div class="article-comment">
      <div
        class="article-commenter-name"
        v-text="commentData.userName"
        :style="`color: ${commentData.userColor};`"
      />

      <div
        v-if="commentData.isDeleted"
        class="article-comment-content"
      >
        [該留言已刪除]
      </div>
      
      <div class="article-comment-content" v-else-if="commentData.isUploading">
        {{ commentContent }}
      </div>

      <template v-else>
        <!-- 回應內容
        @keyup.shift.enter.exact.stop="keyShiftEnter"
        @keyup.enter="keyEnter"
        -->
        <!-- 編輯模式 -->
        <template v-if="editMode">
          <textarea
            v-model="commentContent"
            class="article-comment-content"
            :placeholder="$t('article.comment')"
            @keyup="keyUp"
            @keydown.stop="keyDown"
            ref="commentTextBox"
            rows="1"
          >
          </textarea>

          <div class="comment-edit-container">
            <button class="cancel-button" @click="editMode = false">取消</button>
          </div>
        </template>
        <!-- 顯示模式 -->
        <template v-else>
          <div class="article-comment-content" v-text="commentContent" />

          <div class="comment-edit-container" v-if="user !== null && commentData.userName === user.name">
            <button class="comment-button comment-edit" @click="edit"></button>
            <button class="comment-button comment-delete" @click="removeModal = !removeModal"></button>
          </div>
        </template>

        <!-- Remove Modal -->
        <BaseModal v-if="removeModal">
          <div class="modal-border-line top"></div>

          <div class="modal-card-container">
            <h2>刪除留言</h2>
            <p>確定要刪除這則留言嗎？</p>
          </div>

          <div class="modal-actions">
            <button class="modal-button action" @click="remove;removeModal = false;commentData.isDeleted = true;">確認</button>
            <button class="modal-button" @click="removeModal = false">取消</button>
          </div>
        </BaseModal>

      </template>
    </div>

  </div>
</template>

<script>
import Avatar from './Avatar'
import { apiRequest } from '@/utils'

export default {
  name: 'commenter',

  props: [
    'articleId',
    'comment'
  ],

  components: {
    Avatar
  },

  data() {
    return {
      commentId: this.comment.id,
      commentContent: this.comment.content,
      commentData: this.comment,

      user: this.$store.state.profile.item || null,
      editMode: false,
      pressShift: false,
      removeModal: false
    }
  },

  methods: {
    edit() {
      this.editMode = true;
      this.$nextTick(() => {
        this.$refs.commentTextBox.style.height = "auto";
        this.$refs.commentTextBox.style.height = this.$refs.commentTextBox.scrollHeight + "px";

        this.$refs.commentTextBox.focus()
      })
    },

    async remove() {
      let commentId = this.commentData.id
      let articleId = this.articleId
      
      this.commentContent = '[該留言已刪除]'

      await apiRequest.delete(`articles/${articleId}/comments/${commentId}`, {
          headers: {
              "Authorization": `Bearer ${window.TOKEN}`
          },
      }).then(() => {
        console.log('刪除成功')
      })
      .catch(() => {
        console.log('error')
      })
    },

    keyUp(event) {
      //console.log('key up')
      if (event.key === "Shift") {
          this.pressShift = false
      }

      // shift + enter
      if (this.pressShift && (event.key === "Enter")) {
        //console.log('is shift + enter')
        this.$refs.commentTextBox.style.height = "auto";
        this.$refs.commentTextBox.style.height = this.$refs.commentTextBox.scrollHeight + "px";
        return 
      }

      // enter
      if (event.key === "Enter") {
        this.editMode = false

        // 編輯文章送出
        apiRequest.post(`/articles/${this.articleId}/comments/${this.commentId}`, 
          Object.entries({
            content: this.commentContent,
            _method: 'PATCH'
          }).reduce((formData, [name, value]) => (formData.append(name, value), formData), new FormData()),
          {
            headers: {
              "Authorization": `Bearer ${window.TOKEN}`,
              "Content-Type": 'multipart/form-data'
            }
          }
        )

      }
    },

    keyDown(event) {
      //console.log('key down')
      if (event.key === "Shift") {
        this.pressShift = true
      }
      
      // Enter 編輯完成不斷行
      if (!this.pressShift && event.key === "Enter") {
        event.preventDefault()
      }
    }
  }
}
</script>

<style scoped>
textarea {
  font-family: "Noto Sans TC", "Noto Sans JP", "Noto Sans KR", "Roboto";
}

/* 留言傳送中的頭明效果 */
.article-comment-container.disabled {
  opacity: .8;
}

.comment-edit-container {
  display: flex;
  justify-content: flex-end;
}

.cancel-button {
  border: none;
  outline: none;
  padding: .3rem .5rem;
  border: 2px solid #e6e6e6;
  border-radius: 12px;
  background: none;
  margin-left: .2em;
  margin-right: .3em;
  transition: all .12s;
  cursor: pointer;
  font-size: 16px;
  color: #f6f6f6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cancel-button:active {
  transform: scale(0.8);
}

.comment-button {
  border: none;
  outline: none;
  width: 38px;
  height: 38px;
  border: 2px solid #ffffff;
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

.comment-button:active {
  transform: scale(0.8);
}

.comment-edit {
  background-image: url(/img/article-images/edit_button.svg);
  background-size: 38px;
  background-repeat: no-repeat;
  background-position: center;
}

.comment-delete {
  background-image: url(/img/article-images/del_button.svg);
  background-size: 38px;
  background-repeat: no-repeat;
  background-position: center;
}
</style>