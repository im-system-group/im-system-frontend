<template>

  <!-- The Modal -->
  <div class="modal">
    <!-- Modal content -->
    <div class="modal-card blur">
      <div class="modal-border-line top"></div>

      <div class="modal-card-container">
        <h2>刪除留言</h2>
        <p>確定要刪除這則留言嗎？</p>
      </div>

      <div class="modal-actions">
        <button class="modal-button action">確認</button>
        <button class="modal-button" @click="viewModal = false">取消</button>
      </div>

      <div class="modal-border-line bottom"></div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Modal'
}
</script>