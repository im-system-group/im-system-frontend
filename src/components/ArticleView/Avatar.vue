<template>
  <img v-if="!loaded" :src="src" @load="onImgLoad" style="display: none;"/>

  <div
    :class="avatarClass"
    :style="`background-image: url(${placeholderImg}); border-color: ${color}; color: ${color};`"
    ref="articleAvatar"
  />
</template>



<script>
export default {
  name: 'Avatar',
  
  props: {
    src: {
      type: String,
      required: true
    },
    color: String,
    type: String
  },

  data() {
    return {
      loaded: false,
      avatarClass: '',
      placeholderImg: '/img/def_picture.jpg'
    }
  },

  methods: {
    onImgLoad() {
      this.loaded = true
      this.placeholderImg = this.src
    }
  },

  mounted() {
    // component type checker
    if(this.type === 'poster') {
      this.avatarClass = this.$style['article-poster-avatar'];
    } else if (this.type === 'comment') {
      this.avatarClass = this.$style['article-commenter-avatar'];
    }
  }
}
</script>

<style module>
.article-poster-avatar {
  width: 64px;
  height: 64px;
  margin: 15px auto 2px;
  border-radius: 64px;
  border-width: 2.5px;
  border-color: #fff;
  border-style: solid;
  background-size: 100%;
}

.article-commenter-avatar {
  width: 64px;
  height: 64px;
  border-radius: 64px;
  border-width: 2.5px;
  border-color: #fff;
  border-style: solid;
  background-size: cover;
  background-position: center;
}
</style>