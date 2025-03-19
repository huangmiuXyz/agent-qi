<template>
  <div class="flex gap-2 flex-col">
    <div v-for="item in aiFunction" :key="item.options.command">
      <NSpace>
        <span>{{ item.options.name }}</span>
        <span>{{ item.options.description }}</span>
        <UIButton type="primary" @click="handleClick(item.options, item.fn)">{{
          item.options.name
        }}</UIButton>
      </NSpace>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAllAIFuntion } from "@/decorators/AIFunctionDecorators";
const aiFunction = getAllAIFuntion();
const handleClick = (item: AIFOptions, fn: Function) => {
  fn("general");
};
</script>

<style scoped></style>
