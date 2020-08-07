<template>
  <profile :name="item.name" :email="item.email" :color="item.color" :avatarUrl="item.avatarUrl" @update="updateProfile" @back="redirectToArticles" />
</template>

<script>
import { mapState, mapActions/* , mapMutations */ } from "vuex";

export default {
  data: () => ({}),
  computed: {
    ...mapState("profile", ["item"]),
  },
  methods: {
    redirectToArticles() {
      this.$router.push("/articles");
    },
    ...mapActions("profile", ["updateItem"]),
    async updateProfile(form) {
      await this.updateItem(form);
    }
  },
  async mounted() {
  },
};
</script>
