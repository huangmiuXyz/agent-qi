<template>
  <div
    class="tiptap-container bg-rich-editor overflow-auto max-w-200 flex-1 max-sm:w-full p-4"
  >
    <RichEditor />
  </div>
</template>

<script setup></script>

<style scoped>
.tiptap-container {
  display: flex;
  flex-direction: column;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 1px 40px rgba(0, 0, 0, 0.04);
  height: calc(100vh - 4rem);
}
</style>
