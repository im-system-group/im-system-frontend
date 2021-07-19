<template>
  <article-view
    v-if="item"
    :article="item"
    :comments="comments"
    :user="profile"
    @like="likeArticle"
    @back="$router.push('/articles')"
    @del="deleteArticle"
    @edit="editArticle"
    @add-comment="addArticleComment"
  />
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
    ...mapActions("article", [
      "loadItem",
      "loadComments",
      "likeItem",
      "addComment",
      "dropItemAndComments",
    ]),
    ...mapMutations("article", ["set"]),
    ...mapActions("profile", {
      loadProfile: "loadItem",
      delArticle: "delArticle",
      editArticle: "editArticle",
    }),
    addArticleComment(content) {
      const { id } = this.$route.params;
      this.addComment({ id, content });
    },
    likeArticle() {
      const { id } = this.$route.params;
      this.likeItem({ id });
    },
    deleteArticle() {
      alert('Coming Soon!');
      // var _confirm = confirm("確定要刪除嗎？");
      // if (_confirm) {
      //   const { id } = this.$route.params;
      //   console.log({ id });
      //   this.delArticle({ id });
      //   this.$router.push("/articles");
      // }
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
  beforeDestroy() {
    this.dropItemAndComments();
  },
};
</script>
