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
        // const page = loadedPagesCount + 1;
        // this.loadItems({ page: 1 });
      }
    },
    redirectToArticle(id) {
      this.$router.push("/article/" + id);
    }
  },
  async mounted() {
    if (!this.isItemsLoaded) {
      // this.loadItems({ page: 1 });

      this.set({
        items: [
          {
            id: 0,
            posterName: "TreeNoAlice",
            title: "太扯了吧",
            likesCount: 67
          },

          {
            id: 1,
            posterName: "Flower_Head",
            title: "[轉貼] 通緝犯 Xenon 突現身化解危機",
            likesCount: 19037
          },

          { id: 2, posterName: "PAFF", title: "Here I am!", likesCount: 24183 },

          {
            id: 3,
            posterName: "NEKO#ФωФ",
            title: "NEKO#(ФωФ)的早起蟲兒被鳥吃採訪時間~~~~",
            likesCount: 2575
          },

          {
            id: 4,
            posterName: "Xenon",
            title: "稍微可以休息一下。",
            likesCount: 904
          },

          { id: 5, posterName: "ConneR", title: "重啟。", likesCount: 168 },

          {
            id: 6,
            posterName: "JOEZ Cafe",
            title: "Check this OOOOOut!",
            likesCount: 353
          }
        ]
      });
    }
  }
};
</script>
