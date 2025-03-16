<template>
  <div
    class="tiptap-container bg-rich-editor overflow-auto max-w-200 flex-1 max-sm:w-full p-20"
  >
    <RichEditor
      v-model="title"
      placeholder="请输入标题..."
      class="title-input w-full bg-transparent outline-none"
    />
    <div class="divider mb-4"></div>
    <RichEditor class="flex-1" placeholder="请输入内容..." v-model="content" />
  </div>
</template>

<script setup>
const title = ref("");
const content = ref("");
</script>

<style scoped>
.tiptap-container {
  display: flex;
  flex-direction: column;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 1px 40px rgba(0, 0, 0, 0.04);
  height: calc(100vh - 3.6rem);
}

.title-input {
  border: none;
  font-size: 20px;
}

.divider {
  height: 1px;
  opacity: 0.6;
}
</style>
