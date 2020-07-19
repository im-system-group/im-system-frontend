<template>
  <login-v24 v-if="$route.query.version == '2.4'" @login="doLogin" @logged="redirectToArticles" />
  <login-v30 v-else @login="doLogin" @logged="redirectToArticles" />
</template>

<script>
export default {
  methods: {
    doLogin({ /* form,  */ resolve /* , reject */ }) {
      resolve();
    },
    redirectToArticles() {
      this.$router.push("/articles");
    }
  }
};
</script>
