<template>
  <div class="background-main">

    <div class="articles-container" ref="articlesContainer" @scroll="scrollTopChecker">
      <articles-item v-for="(article, index) in items" :key="index" :source="article">

      </articles-item>
    </div>
  
    <div class="scale-click edit-button" @click.stop="postArticle" />
    <div class="scale-click status-button" @click.stop="editProfile" />

  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

import ArticlesItem from '@/components/ArticlesView/items'

export default {
  name: "articles-view",

  data(){
    return { 
      maxView: 15,

      articlesContainerheight: 0,
    }
  },

  components: {
    'articles-item': ArticlesItem
  },

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
    ...mapActions("articles", ["loadItems", "likeItem"]),
    ...mapMutations("articles", ["set"]),
  
    postArticle() {
      this.$router.push("/article-create");
    },

    editProfile() {
      this.$router.push("/profile");
    },

    async scrollTopChecker() {
      this.set({scrollTop: this.$refs.articlesContainer.scrollTop})

      if(this.scrollTop === 0) {
        const page = this.loadedPagesCount + 1;
        await this.loadItems({ page, itemHeight: (95 + this.maxView) });

        this.$nextTick(() => {
          this.$refs.articlesContainer.scrollTop = this.scrollTop;
        })
      }
    },

  },

  async mounted() {
    this.articlesContainerheight = this.$refs.articlesContainer.clientHeight

    // scrollTop cache checker
    if(this.scrollTop !== this.articlesContainerheight && this.scrollTop !== 0) {
      this.$refs.articlesContainer.scrollTop = this.scrollTop
    }

    // if item is not loaded
    if (!this.isItemsLoaded) {
      await this.loadItems({ page: 1, itemHeight: (95 + this.maxView) });

      //init first load scrollTop
      this.$refs.articlesContainer.scrollTop = this.articlesContainerheight
    }
  }
};
</script>

<style scoped>
.edit-button,
.status-button {
  background-size: 64px;
  background-repeat: no-repeat;
  width: 64px;
  height: 64px;
  position: fixed;
  bottom: 15px;
}

.edit-button {
  background-image: url(/img/article-images/edit_button.svg);
  left: 15px;
}

.status-button {
  background-image: url(/img/article-images/status_button.svg);
  right: 15px;
}
</style>

<style scoped>
/*@import "https://fonts.googleapis.com/css2?family=Electrolize&family=Noto+Sans+TC&family=Noto+Sans+JP&family=Noto+Sans+KR&display=swap";*/
.articles-container {
  margin: 59px auto 0;
  width: calc(100% - 10px);
  height: calc(100% - 59px);
  max-width: 1028px;
  overflow-y: scroll;
}

.articles-container::-webkit-scrollbar {
  width: 8px;
  background-color: rgba(255, 255, 255, 0.1);
}

.articles-container::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background-color: rgb(255, 255, 255);
}

.scale-click {
  transition: all 0.5s;
}

.scale-click:active {
  transform: scale(0.7);
}
</style>
