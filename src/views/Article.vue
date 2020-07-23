<template>
  <article-view
    :article="item"
    :comments="comments"
    :user="profile"
    @like="likeArticle"
    @back="$router.push('/articles')"
    @add-comment="addArticleComment"
  />
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data: () => ({
    user: {},
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
      profile: state => state.item
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
    addArticleComment(content) {
      const { id } = this.$route.params;
      this.addComment({ id, content });
    },
    likeArticle() {
      const { id } = this.$route.params;
      this.likeItem({ id });
    }
  },
  async mounted() {
    const { id } = this.$route.params;
    await this.loadItem({ id });
    await this.loadComments({ id });
  },
  beforeDestroy() {
    this.dropItemAndComments();
  },
};
</script>
