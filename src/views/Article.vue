<template>
  <div class="background-main">

    <div v-if="!item" class="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

    <article-view
      v-else
      :article="item"
      :comments="comments"
      :user="profile"
      @like="likeArticle"
      @back="$router.back('/articles')"
      @del="deleteArticle"
      @edit="editArticle"
      @add-comment="addArticleComment"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data: () => ({
    user: {},
    login: false,
  }),

  computed: {
    ...mapState("article", [
      "item",
      "comments",
      "isItemLoading",
      "isCommentsLoading",
      "isItemLoaded",
      "isCommentsLoaded",
    ]),
    ...mapState("profile", {
      profile: (state) => state.item,
    }),
  },

  methods: {
    ...mapActions("articles", [
      "delArticleFromArticles"
    ]),
    ...mapActions("article", [
      "set",
      "loadItem",
      "loadComments",
      "likeItem",
      "addComment",
      "dropItemAndComments",
      "delArticle"
    ]),
    ...mapMutations("article", [
      "set"
    ]),
    ...mapActions("articles", {
      articlesLike:"likeItem"
    }),
    ...mapActions("profile", {
      loadProfile: "loadItem",
      editArticle: "editArticle",
    }),
    addArticleComment(content) {
      const { id } = this.$route.params;
      this.addComment({ id, content });
    },
    likeArticle() {
      const { id } = this.$route.params;
      this.likeItem({ id });
      // 更新文章列表的 like
      this.articlesLike({ id })
    },
    deleteArticle() {
      const { id } = this.$route.params;
      console.log({ id });
      this.delArticle({ id });
      this.delArticleFromArticles({ id });
      this.$router.push("/articles");
    },
    editArticle() {
      alert('Coming Soon!')
      // const { id } = this.$route.params;
      // this.editArticle({ id });
    },
  },

  async mounted() {
    if (!this.profile) {
      await this.loadProfile();
    }

    const { id } = this.$route.params;
    await this.loadItem({ id });
    await this.loadComments({ id });
  },

  beforeUnmount() {
    this.dropItemAndComments();
  },
};
</script>

<style>
.lds-spinner {
  margin: 0 auto;
  margin-top: 10vh;
  color: official;
  display: block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-spinner div {
  transform-origin: 40px 40px;
  animation: lds-spinner 900ms linear infinite;
}
.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: -25px;
  left: 37px;
  width: 14px;
  height: 14px;
  border-radius: 99em;
  background-color: #fff;
}
.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1000ms;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(45deg);
  animation-delay: -900ms;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(90deg);
  animation-delay: -800ms;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(135deg);
  animation-delay: -700ms;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(180deg);
  animation-delay: -600ms;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(225deg);
  animation-delay: -500ms;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(270deg);
  animation-delay: -400ms;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(315deg);
  animation-delay: -300ms;
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>