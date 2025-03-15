<template>
  <div class="container">
    <h1>Tauri + Vue + Pinia Persistence Demo</h1>
    <MessageList />
  </div>
</template>

<script setup>
import MessageList from '../components/MessageList.vue';
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}
</style>