<template>
  <div
    class="articles-poster-avatar"
    :style="`background-image: url(${placeholderImg}); border-color: ${color}; color: ${color};`"
    :data-src="src"
    :ref="`articleAvatar-${id}`"
  />

  <img :src="src" @load="onImgLoad" style="display: none;"/>
</template>



<script>
export default {
  name: 'Avatar',

  props: {
    id: String,
    src: {
      type: String,
      required: true
    },
    color: String
  },

  data() {
    return {
      placeholderImg: '/img/def_picture.jpg'
    }
  },

  methods: {
    /*
    async avatarLoader(url) {
      let image = await new Image();
      // this will occur when the image is successfully loaded
      // no matter if seconds past
      image.src = url;
      //image.crossOrigin = "Anonymous";

      let articleIdSelc = `articleAvatar-${this.id}`
      image.onload = () => {
        this.$refs[articleIdSelc].style.backgroundImage = "url('" + url + "')";
      }
    }*/
    
    onImgLoad() {
      this.placeholderImg = this.src
    }
  },

  async created() {
    //await this.avatarLoader(this.src)
  }
}
</script>