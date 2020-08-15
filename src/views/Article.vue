<template>
  <div>

    <!-- loading -->
    <p v-if="isItemLoading">取得文章資料中...</p>

    <!-- loaded -->
    <template v-else>

      <div>article result</div>
      <pre style="white-space: pre-wrap" v-text="item"></pre>


      <div>comments result</div>
      <!-- comments loading -->
      <template v-if="isCommentsLoading">
        取得回應資料中..
      </template>
      <!-- comments loaded -->
      <pre v-else style="white-space: pre-wrap" v-text="comments"></pre>

    </template>

  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
  data: () => ({}),
  computed: mapState("article", ["item", "comments", "isItemLoading", "isCommentsLoading", "isItemLoaded", "isCommentsLoaded"]),
  methods: mapActions("article", ["loadItem", "loadComments", "dropItemAndComments"]),
  async mounted() {
    const { id } = this.$route.params
    await this.loadItem({ id })
    await this.loadComments({ id })
  },
  beforeDestroy() {
    this.dropItemAndComments()
  },
}
</script>
