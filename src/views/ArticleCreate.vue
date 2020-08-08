<template>
  <article-create-view @create="createArticle" @back="redirectToArticles" />
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({}),
  computed: {
    ...mapState("profile", {
      profile: (state) => state.item,
      isProfileLoaded: (state) => state.isItemLoaded,
    }),
  },
  methods: {
    redirectToArticles() {
      this.$router.push("/articles");
    },
    ...mapActions("profile", {
      loadProfile: "loadItem",
    }),
    ...mapActions("articles", ["addItem"]),
    async createArticle(form) {
      await this.addItem(form);
      this.redirectToArticles();
    },
  },
  async updated() {
    if (!this.isProfileLoaded) {
      await this.loadProfile();
    }
 
    if (!this.profile) {
      this.$router.push("/");
    }
  },
  mounted() {
    this.$forceUpdate();
  },
};
</script>