<template>
  <div
    class="articles-poster-avatar"
    :style="`background-image: url(${placeholderImg}); border-color: ${color}; color: ${color};`"
    ref="articleAvatar"
    v-bind="$attrs"
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
    color: String
  },

  data() {
    return {
      placeholderImg: '/img/def_picture.jpg'
    }
  },

  methods: {
    avatarLoader(url) {
      let image = new Image();
      // this will occur when the image is successfully loaded
      // no matter if seconds past
      image.src = url;
      //image.crossOrigin = "Anonymous";

      image.onload = () => {
        /*
        let canvas = document.createElement('canvas')

        let width = image.width
        let height = image.height
        const maxHeight = 200
        const maxWidth = 200

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height *= maxWidth / width))
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width *= maxHeight / height))
            height = maxHeight
          }
        }
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0, width, height)

        console.log(canvas.toDataURL('image/jpeg', 0.7))*/

        this.$refs.articleAvatar.style.backgroundImage = "url('" + url + "')";
      }
    }
  },

  mounted() {
    this.avatarLoader(this.src)
  }
}
</script>