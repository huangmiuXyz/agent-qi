<template>
  <div class="grow shrink-0 p-2 h-full rounded-xl bg-document-list select-none">
    <UIInput size="small" v-model="search" placeholder="搜索章节" />
    <n-divider />
    <div class="flex flex-col gap-2">
      <template v-if="getNowDocument?.sections.length">
        <div v-for="item in getNowDocument?.sections" :key="item.id">
          <UIInput size="small" v-model="item.title" placeholder="章节标题" />
        </div>
      </template>
      <div v-else class="flex justify-center">
        <UIButton size="small" text @click="addSection('')">
          添加章节
        </UIButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

const search = ref("");
const { getNowDocument } = storeToRefs(documentStore());
const { addSection } = documentStore();
</script>

<style scoped></style>
