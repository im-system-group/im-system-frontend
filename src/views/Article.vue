<template>
  <article-view :article="item" :comments="comments" :user="user" @back="$router.push('/articles')" />
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data: () => ({
    user: {

    },
  }),
  computed: {
    ...mapState("article", [
      "item",
      "comments",
      "isItemLoading",
      "isCommentsLoading",
      "isItemLoaded",
      "isCommentsLoaded"
    ])
  },
  methods: {
    ...mapActions("article", [
      "loadItem",
      "loadComments",
      "dropItemAndComments"
    ]),
    ...mapMutations("article", ["set"])
  },
  async mounted() {
    const { id } = this.$route.params
    await this.loadItem({ id })
    await this.loadComments({ id })
  },
  beforeDestroy() {
    this.dropItemAndComments()
  }
};
</script>
