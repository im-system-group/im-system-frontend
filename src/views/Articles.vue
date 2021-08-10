<template>
  <div class="background-main">

    <div class="articles-container" ref="articlesContainer" @scroll="scrollTopChecker">
      <articles-item v-for="(article, index) in items" :key="index" :source="article" />
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

<style>
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
</style>

<style>
.articles-less-info {
  width: 100%;
  height: 95px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 15px;
  position: relative;
}

.articles-poster {
  margin-left: 5px;
  width: 81px;
  height: 95px;
}

.articles-poster-avatar {
  width: 64px;
  height: 64px;
  margin: 15px auto 2px;
  border-radius: 64px;
  border-width: 2.5px;
  border-color: #fff;
  border-style: solid;
  background-size: cover;
  background-position: center;
}

.articles-poster-name {
  color: #fff;
  text-align: center;
  font-size: 12.5px;
  font-family: "Electrolize", "Noto Sans TC", "Noto Sans JP", "Noto Sans KR",
    "Roboto";
  width: 81px;
  height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.articles-title {
  cursor: pointer;
  font-size: 23px;
  letter-spacing: 0.25px;
  font-family: "Noto Sans TC", "Noto Sans JP", "Noto Sans KR", "Roboto";
  margin-left: 6px;
  width: calc(100% - 106px - 141px);
  line-height: 95px;
  height: 95px;
  padding-left: 19.5px;
  line-height: 95px;
  color: rgb(255, 255, 255);
  text-shadow: 0px 4px rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.2);
}

.articles-title .articles-title-image {
  width: 80px;
  height: 95px;
  margin-right: 10px;
  display: inline-block;
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center;
}

.articles-title .articles-title-text {
  width: calc(100% - 90px);
  height: 95px;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.articles-title:hover,
.articles-title:hover + .articles-likes {
  background-color: rgba(255, 255, 255, 0.4);
}

.articles-likes {
  cursor: pointer;
  width: 141px;
  height: 95px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 7.5px;
  background-color: rgba(255, 255, 255, 0.2);
}

.articles-likes.active .articles-like-thumb-container {
  background-color: rgb(140, 228, 230);
  color: #111;
}

.articles-like-thumb-container {
  width: 38px;
  height: 38px;
  border-radius: 38px;
  background-color: rgba(81, 128, 144, 0.6);
  margin-left: 0.5px;
  margin-right: 6px;
  transition: all .12s;
  box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.5);
  cursor: pointer;
  font-size: 16px;
  color: rgb(140, 228, 230);
  display: flex;
  align-items: center;
  justify-content: center;
}

.articles-like-thumb-container:active {
  transform: scale(0.8);
}

.articles-likes-count {
  font-size: 18.5px;
  font-family: "Electrolize", "Noto Sans TC", "Noto Sans JP", "Noto Sans KR",
    "Roboto";
  color: rgb(140, 228, 230);
  text-shadow: 0px 4px rgba(140, 228, 230, 0.2);
}

.articles-top-border {
  width: calc(100% - 106px - 1px);
  position: absolute;
  top: 0;
  left: 93px;
  border-top: #77c6ce solid 2px;
}

.articles-top-border::before {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  left: -10px;
  width: 2px;
  border-top: #77c6ce solid 2px;
}

.articles-top-border::after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  left: calc(100% + 7px);
  width: 2px;
  border-top: #77c6ce solid 2px;
}

@media screen and (max-width: 1028px) {
  .articles-container::-webkit-scrollbar {
    width: 0px;
  }
}
</style>