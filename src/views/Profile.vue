<template>
  <profile @back="redirectToArticles" />
</template>

<script>
// import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data: () => ({}),
  computed: {},
  methods: {
    redirectToArticles() {
      this.$router.push("/articles");
    },
  },
  async mounted() {
  },
};
</script>
