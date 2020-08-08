<template>
  <profile
    v-if="item"
    :name="item.name"
    :email="item.email"
    :color="item.color"
    :avatarUrl="item.avatarUrl"
    @update="updateProfile"
    @back="redirectToArticles"
  />
</template>

<script>
import { mapState, mapActions /* , mapMutations */ } from "vuex";

export default {
  data: () => ({}),
  computed: {
    ...mapState("profile", ["item", "isItemLoaded"]),
  },
  methods: {
    redirectToArticles() {
      this.$router.push("/articles");
    },
    ...mapActions("profile", ["updateItem", "loadItem"]),
    async updateProfile(form) {
      await this.updateItem(form);
    },
  },
  updated() {
    if (!this.isItemLoaded) {
      this.loadItem();
    }

    if (!this.item) {
      this.$router.push("/");
    }
  },
  async mounted() {
    this.$forceUpdate();
  },
};
</script>
