<template>
  <div class="max-sm:p-0 flex-1 bg-pages rounded-tl-2xl flex p-3 pb-0 gap-4">
    <DocumentList />
    <div
      v-if="nowDocumentIndex && nowSectionIndex"
      class="tiptap-container bg-rich-editor overflow-auto max-w-200 flex-5/6 max-sm:w-full max-sm:h-full p-10 max-sm:px-5"
    >
      <UIRichEditor
        v-model="document[nowDocumentIndex].sections[nowSectionIndex].title"
        placeholder="请输入标题..."
        class="title-input w-full bg-transparent outline-none"
        :disableEnter="true"
      />
      <div class="divider mb-4"></div>
      <UIRichEditor
        class="flex-1 flex"
        placeholder="请输入内容..."
        v-model="document[nowDocumentIndex].sections[nowSectionIndex].content"
      />
      <DocumentAIPanel />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
const { document, nowDocumentIndex, nowSectionIndex } =
  storeToRefs(documentStore());
</script>

<style scoped>
.tiptap-container {
  display: flex;
  flex-direction: column;
  border-radius: 12px 12px 0 0;
  box-shadow: var(--shadow-paper);
  height: calc(100vh - 3.4rem);
}

@media (max-width: 640px) {
  .tiptap-container {
    height: calc(100vh - 2.6rem);
    border-radius: 0;
    box-shadow: none;
    padding-top: 0;
  }
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
