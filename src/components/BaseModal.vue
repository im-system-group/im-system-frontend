<template>
  <div class="modal">
    <!-- Modal content -->
    <div class="modal-card blur">
      <div class="modal-border-line top"></div>
        <slot/>
      <div class="modal-border-line bottom"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseModal'
}
</script>

<style>
@import url('./Modal.css');
</style>