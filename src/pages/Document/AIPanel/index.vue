<template>
  <div
    v-if="showAIPanel"
    class="flex-1/4 h-full rounded-xl bg-document-list"
  ></div>
  <div v-else class="flex-1/4"></div>
</template>

<script setup lang="ts">
const showAIPanel = ref(false);
</script>

<style scoped></style>
