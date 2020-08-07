<template>
  <article-create-view @create="createArticle" @back="redirectToArticles" />
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({}),
  computed: {},
  methods: {
    redirectToArticles() {
      this.$router.push("/articles");
    },
    ...mapActions("articles", ["addItem"]),
    async createArticle(form) {
      await this.addItem(form);
      this.redirectToArticles();
    },
  },
  async mounted() {},
};
</script>