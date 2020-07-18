<template>
  <login-v24 v-if="$route.query.version == '2.4'" @login="doLogin" />
  <login-v30 v-else @login="doLogin" />
</template>

<script>
export default {
  methods: {
    doLogin({ form, resolve, reject }) {
      console.log(form, resolve, reject);
    }
  }
};
</script>
