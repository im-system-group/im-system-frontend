<template>
  <!-- new comment -->
  <div class="article-comment-container">
    <div class="article-commenter">
      <Avatar :src="user.avatarUrl" :color="user.color" type="comment" />
    </div>
    <div class="article-comment">
      <div class="article-commenter-name">
        {{ $t("article.youHint") }}
      </div>
      <textarea
        class="article-comment-content"
        :placeholder="$t('article.comment')"
        @keyup="keyUp"
        @keydown="keyDown"
        ref="commentTextBox"
        rows="1"
      ></textarea>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar'
import { mapActions } from 'vuex'

export default {
  name: 'newComment',

  props: [
    'articleId',
    'comment'
  ],

  emits: [
    'add-comment'
  ],

  components: {
    Avatar
  },

  data() {
    return {
      user: this.$store.state.profile.item,
      pressShift: false
    }
  },

  methods: {
    ...mapActions("article", [
      "addComment"
    ]),

    addArticleComment(content) {
      const { id } = this.$route.params;
      this.addComment({ id, content, user: this.user });
    },

    keyUp(event) {
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
        this.addArticleComment(this.$refs.commentTextBox.value);
        this.$refs.commentTextBox.value = "";
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
</style>