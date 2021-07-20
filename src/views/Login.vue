<template>
  <!--<login-v24
    v-if="$route.query.version == '2.4'"
    @login="doLogin"
    @logged="redirectToArticles"
  />-->
  <login-v30
    @login="doLogin"
    @logged="redirectToArticles"
  />
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("profile", ["item"]),
  },
  methods: {
    ...mapActions("profile", ["login"]),
    async doLogin({ form, resolve, reject }) {
      await this.login(form);

      if (this.item) {
        resolve(this.item);
      } else {
        reject();
      }
    },
    redirectToArticles() {
      this.$router.push("/articles");
    },
  },
};
</script>
