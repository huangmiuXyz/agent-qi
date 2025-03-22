<template>
  <div class="w-50 p-2 h-full rounded-xl bg-document-list select-none">
    <UIInput size="small" v-model="search" placeholder="搜索章节" />
    <n-divider />
    <div class="flex flex-col gap-2">
      <template v-if="getNowDocument?.sections.length">
        <div v-for="item in getNowDocument?.sections" :key="item.id">
          <div>{{ item.title }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

const search = ref("");
const { getNowDocument } = storeToRefs(documentStore());
</script>

<style scoped></style>
