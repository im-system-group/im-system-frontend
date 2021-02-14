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
      try {
        await this.updateItem(form);
        alert(this.$t('profile.update.success'));
        this.$router.push("/articles");
      } catch (err) {
        alert(this.$t('profile.update.fail'));
      }
    },
  },
  async updated() {
    if (!this.isItemLoaded) {
      await this.loadItem();
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
