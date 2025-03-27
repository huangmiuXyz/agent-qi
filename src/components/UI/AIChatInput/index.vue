<template>
  <div class="shadow-ai-chat-input rounded-lg">
    <div
      class="p-2 relative flex items-center rounded-lg shadow-sm transition-all duration-300 focus-within:ring-2 focus-within:ring-opacity-25"
      :style="{
        backgroundColor: 'var(--color-ai-chat-input-bg)',
        boxShadow: 'var(--shadow-ai-chat-input)',
      }"
    >
      <UISelect
        class="w-30"
        placeholder="选择模型"
        v-model="selectedModel"
        no-style
        :options="modalSenderOptions"
        filterable
        :consistent-menu-width="false"
      ></UISelect>

      <UIInput
        no-style
        class="w-100"
        id="ai-chat-input"
        type="text"
        v-model:value="message"
        placeholder="输入你想问的..."
        @keydown.enter="sendMessage"
      />
      <UIButton
        class="flex items-center justify-center min-w-8 h-8 rounded-full transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        :style="{
          backgroundColor: 'var(--color-ai-chat-send-button-bg)',
          color: 'var(--color-ai-chat-send-button-text)',
        }"
        circle
        @click="sendMessage"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </UIButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";

const message = ref("");
const selectedModel = ref("chat");
const { modalSenderOptions } = storeToRefs(settingsStore());
const sendMessage = () => {};
</script>

<style scoped>
input::placeholder {
  color: var(--color-ai-chat-input-placeholder);
}

select option {
  background-color: var(--color-ai-chat-input-bg);
  color: var(--color-ai-chat-input-text);
}

.relative:hover select {
  opacity: 0.8;
}
</style>
