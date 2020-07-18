<template>
  <login-v24 v-if="$route.query.version == '2.4'" />
  <login-v30 v-else />
</template>
