<template>
  <articles-view
    :articles="items"
    :scrollTop="scrollTop"
    @scroll="setScrollTop"
    @ahead="redirectToArticle"
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
      "scrollTop"
    ])
  },
  methods: {
    ...mapActions("articles", ["loadItems"]),
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
    }
  },
  async mounted() {
    if (!this.isItemsLoaded) {
      this.loadItems({ page: 1, itemHeight: (95 + 15) });
    }
  }
};
</script>
