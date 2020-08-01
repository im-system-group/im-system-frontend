<template>
  <articles-view
    :articles="items"
    :scrollTop="scrollTop"
    @post="postArticle"
    @scroll="setScrollTop"
    @ahead="redirectToArticle"
    @like="likeArticle"
  />
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data: () => ({}),
  computed: {
    ...mapState("articles", [
      "items",
      "loadedPagesCount",
      "isItemsLoading",
      "isItemsLoaded",
      "scrollTop",
    ])
  },
  methods: {
    ...mapActions("articles", ["loadItems", "likeItem"]),
    ...mapMutations("articles", ["set"]),
    setScrollTop(scrollTop) {
      this.set({ scrollTop });

      if (scrollTop === 0) {
        const page = this.loadedPagesCount + 1;
        this.loadItems({ page, itemHeight: (95 + 15) });
      }
    },
    redirectToArticle(id) {
      this.$router.push("/article/" + id);
    },
    likeArticle(id) {
      this.likeItem({ id })
    },
    postArticle() {
      this.$router.push("/article-create");
    }
  },
  async mounted() {
    if (!this.isItemsLoaded) {
      this.loadItems({ page: 1, itemHeight: (95 + 15) });
    }
  }
};
</script>
