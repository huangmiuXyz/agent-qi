<template>
  <div
    class="flex-1/6 max-w-50 min-w-50 p-2 h-full rounded-xl bg-document-list select-none"
  >
    <UIInput size="small" v-model="search" placeholder="搜索章节" />
    <n-divider />
    <div
      class="flex flex-col gap-2"
      v-if="document[nowDocumentIndex].sections.length"
    >
      <div v-for="item in getNowDocument?.sections" :key="item.id">
        <UIInput
          size="small"
          v-model:value="
            document[nowDocumentIndex].sections[nowSectionIndex!].title
          "
          placeholder="章节标题"
        />
      </div>
    </div>
    <n-divider v-if="getNowDocument?.sections.length" />
    <div class="flex justify-center">
      <UIButton size="small" text @click="newSection()"> 添加章节 </UIButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

const search = ref("");
const { getNowDocument, nowDocumentIndex, nowSectionIndex, document } =
  storeToRefs(documentStore());
const { addSection } = documentStore();
const newSection = () => {
  addSection("新章节");
};
</script>

<style scoped></style>
