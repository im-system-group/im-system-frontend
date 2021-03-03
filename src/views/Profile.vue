<template>
  <profile
    v-if="item"
    :name="item.name"
    :email="item.email"
    :color="item.color"
    :avatarUrl="item.avatarUrl"
    @update="updateProfile"
    @back="redirectToArticles"
    @logout="logoutBtn"
  />
</template>

<script>
import { mapState, mapActions /* , mapMutations */ } from "vuex";

export default {
  data: () => ({}),
  computed: {
    ...mapState("profile", {
      item: (state) => state.item,
      isItemLoaded: (state) => state.isItemLoaded,
    }),
  },
  methods: {
    redirectToArticles() {
      this.$router.push("/articles");
    },
    ...mapActions("profile", {
      updateItem: "updateItem",
      loadItem: "loadItem",
      logout: "logout",
    }),
    async updateProfile(form) {
      try {
        await this.updateItem(form);
        alert(this.$t("profile.update.success"));
        this.$router.push("/articles");
      } catch (err) {
        alert(this.$t("profile.update.fail"));
      }
    },
    async logoutBtn() {
      try {
        await this.logout();
        alert(this.$t("profile.logout.success"));
        this.$router.push("/");
      } catch (err) {
        alert(this.$t("profile.logout.fail"));
      }
    },
  },
  async updated() {
    console.log("load updated");
    console.log(this.isItemLoaded);
    if (!this.isItemLoaded) {
      console.log("load Profile");
      await this.loadItem();
      console.log("load Profile Complte");
    }

    if (!this.item) {
      this.$router.push("/");
    }
  },
  mounted() {
    console.log("load mounted");
    this.$forceUpdate();
  },
};
</script>
