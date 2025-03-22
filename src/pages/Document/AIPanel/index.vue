<template>
  <div v-if="showAIPanel" class="flex-1 h-full rounded-xl bg-document-list"></div>
  <div v-else class="flex-1"></div>
</template>

<script setup lang="ts">
const showAIPanel = ref(false);
</script>

<style scoped></style>
