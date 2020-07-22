<template>
  <main>
    <div class="articles-container" ref="articlesContainer">
      <div
        class="article-less-info"
        v-for="article in $props.articles"
        :key="article.id"
        @click="$emit('ahead', article.id)"
      >
        <div class="article-poster">
          <div class="article-poster-avatar" :style="`background-image: url(${article.posterAvatarUrl}); border-color: ${article.posterAvatarBorderColor};`" />
          <div class="article-poster-name" :title="article.posterName" v-html="article.posterName" />
        </div>

        <div class="article-top-border" />

        <div class="article-title" v-html="article.title" />

        <div class="article-likes">
          <div class="article-like-thumb-container" />
          <div class="article-likes-count" v-text="article.likesCount" />
        </div>
      </div>
    </div>
    <div class="scale-click back-button" />
    <div class="scale-click status-button" />
  </main>
</template>

<script>
export default {
  data: () => ({
    handleArticleContainerScroll: null
  }),
  name: "articles-view",
  props: {
    scrollTop: Number,
    articles: Array
  },
  updated() {
    this.$refs.articlesContainer.scrollTop = this.$props.scrollTop;
  },
  mounted() {
    this.handleArticleContainerScroll = () => {
      this.$emit("scroll", this.$refs.articlesContainer.scrollTop);
    };

    this.$refs.articlesContainer.addEventListener(
      "scroll",
      this.handleArticleContainerScroll
    );
  },
  beforeDestroy() {
    this.$refs.articlesContainer.removeEventListener(
      "scroll",
      this.handleArticleContainerScroll
    );
  }
};
</script>

<style>
.back-button,
.status-button {
  background-size: 64px;
  background-repeat: no-repeat;
  width: 64px;
  height: 64px;
  position: fixed;
  bottom: 15px;
}

.back-button {
  background-image: url(/img/article-images/back_button.png);
  left: 15px;
}

.status-button {
  background-image: url(/img/article-images/status_button.png);
  right: 15px;
}
</style>

<style scoped>
@import "https://fonts.googleapis.com/css2?family=Electrolize&family=Noto+Sans+TC&display=swap";

main {
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url(/img/article-images/background.svg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #153048;
}

svg,
img {
  user-select: none;
  position: absolute;
  top: 0;
  left: 0;
}
</style>

<style scoped>
.scale-click {
  transition: all 0.5s;
}

.scale-click:active {
  transform: scale(0.7);
}

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

.article-less-info {
  width: 100%;
  height: 95px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 15px;
  position: relative;
}

.article-poster {
  margin-left: 5px;
  width: 81px;
  height: 95px;
}

.article-poster-avatar {
  width: 64px;
  height: 64px;
  margin: 15px auto 2px;
  border-radius: 64px;
  border-width: 2.5px;
  border-color: #fff;
  border-style: solid;
}

.article-poster-name {
  color: #fff;
  text-align: center;
  font-size: 12.5px;
  font-family: Electrolize;
  width: 81px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.article-title {
  cursor: pointer;
  font-size: 23px;
  letter-spacing: 0.25px;
  font-family: "Noto Sans TC";
  margin-left: 6px;
  width: calc(100% - 106px - 141px);
  height: 95px;
  padding-left: 19.5px;
  line-height: 95px;
  color: rgb(255, 255, 255);
  text-shadow: 0px 4px rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.2);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.article-title:hover,
.article-title:hover + .article-likes {
  background-color: rgba(255, 255, 255, 0.4);
}

.article-likes {
  cursor: pointer;
  width: 141px;
  height: 95px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 7.5px;
  background-color: rgba(255, 255, 255, 0.2);
}

.article-like-thumb-container {
  width: 38px;
  height: 38px;
  border-radius: 38px;
  background-color: rgba(81, 128, 144, 0.6);
  margin-left: 0.5px;
  margin-right: 6px;
  transition: all 0.5s;
  box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.5);
}

.article-like-thumb-container:active {
  transform: scale(0.7);
}

.article-likes-count {
  font-size: 18.5px;
  font-family: Electrolize;
  color: rgb(140, 228, 230);
  text-shadow: 0px 4px rgba(140, 228, 230, 0.2);
}

.article-top-border {
  width: calc(100% - 106px - 1px);
  position: absolute;
  top: 0;
  left: 93px;
  border-top: #77c6ce solid 2px;
}

.article-top-border::before {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  left: -10px;
  width: 2px;
  border-top: #77c6ce solid 2px;
}

.article-top-border::after {
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