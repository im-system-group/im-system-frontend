<template>
  <div
    class="articles-less-info"
    @click="!source.isDeleted && redirectToArticle(source.id)"
  >
    <div class="articles-poster">
      <Avatar :src="source.userAvatarUrl" :color="source.userColor" />

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
        <span v-html="source.title"></span>
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
import Avatar from './Avatar'

export default {
  name: 'article-item',

  props: {
    index: { // index of current item
      type: Number
    },
    source: {
      type: Object
    }
  },

  components: {
    Avatar
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
