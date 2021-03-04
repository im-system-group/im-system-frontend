<template>
  <div>
    <pre style="white-space: pre-wrap">{{ JSON.stringify(item) }}</pre>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({}),
  computed: mapState("profile", ["item", "isItemLoading", "isItemLoaded"]),
  methods: mapActions("profile", ["loadItem"]),
  async mounted() {
    if (!this.isItemLoaded) {
      await this.loadItem();
    }
  },
};
</script>
