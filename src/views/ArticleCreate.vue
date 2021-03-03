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
    console.log('load updated')
    if (!this.isProfileLoaded) {
      console.log('load Profile')
      await this.loadProfile();
      console.log('load Profile Complte')
    }
 
    if (!this.profile) {
      this.$router.push("/");
    }
  },
  mounted() {
    console.log('load mounted')
    this.$forceUpdate();
  },
};
</script>