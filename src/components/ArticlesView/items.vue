<template>
  <div
    class="articles-less-info"
    @click="!source.isDeleted && redirectToArticle(source.id)"
  >
    <div class="articles-poster">
      <div
        class="articles-poster-avatar"
        :style="`background-image: url(${source.userAvatarUrl}); border-color: ${source.userColor}; color: ${source.userColor};`"
      />
      <div
        class="articles-poster-name"
        :title="source.userName"
        v-text="source.userName"
        :style="`color: ${source.userColor};`"
      />
    </div>

    <div class="articles-top-border" />

    <div class="articles-title">
      <!--<div
        class="articles-title-image"
        v-if="source.imageUrl !== null"
        :style="`background-image: url('${source.imageUrl}');`"
      ></div>-->
      <div class="articles-title-text">
        <span v-if="source.imageUrl !== null">🖼️</span>
        {{ source.title }}
      </div>
    </div>

    <div :class="{ 'articles-likes': true, active: source.isLiked }">
      <div
        class="articles-like-thumb-container"
        @click.stop="likeArticle(source.id)"
      >
        <span class="mdi mdi-thumb-up"></span>
      </div>
      <div class="articles-likes-count" v-text="source.likesCount" />
    </div>
  
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: 'item-component',
  props: {
    index: { // index of current item
      type: Number
    },
    source: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    ...mapActions("articles", ["likeItem"]),
  
    redirectToArticle(id) {
      this.$router.push("/article/" + id);
    },
  
    likeArticle(id) {
      this.likeItem({ id })
    }
  
  }
}
</script>
