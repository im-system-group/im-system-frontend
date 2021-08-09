<template>
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
      avatarClass: '',
      placeholderImg: '/img/def_picture.jpg'
    }
  },

  methods: {
    avatarLoader(url) {
      let image = new Image();
      image.src = url;
      image.onload = () => {
        this.$refs.articleAvatar.style.backgroundImage = "url('" + url + "')";
      }
    }
  },

  mounted() {
    this.avatarLoader(this.src)

    // component type checker
    if(this.type === 'poster') {
      this.avatarClass = 'article-poster-avatar'
    } else if (this.type === 'comment') {
      this.avatarClass = 'article-commenter-avatar'
    }
  }
}
</script>