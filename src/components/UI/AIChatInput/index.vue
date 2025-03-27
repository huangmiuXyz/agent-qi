<template>
  <div>
    <div
      class="relative flex items-center rounded-full shadow-sm transition-all duration-300 focus-within:ring-2 focus-within:ring-opacity-25"
      :style="{
        backgroundColor: 'var(--color-ai-chat-input-bg)',
        boxShadow: 'var(--shadow-ai-chat-input)',
      }"
    >
      <input
        id="ai-chat-input"
        type="text"
        v-model="message"
        class="flex-1 py-3 px-5 rounded-full border-0 focus:outline-none focus:ring-0 bg-transparent"
        :style="{
          color: 'var(--color-ai-chat-input-text)',
        }"
        placeholder="输入你想问的..."
        @keydown.enter="sendMessage"
      />
      <button
        class="flex items-center justify-center w-10 h-10 mr-2 rounded-full transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        :style="{
          backgroundColor: 'var(--color-ai-chat-send-button-bg)',
          color: 'var(--color-ai-chat-send-button-text)',
        }"
        @click="sendMessage"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
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
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const message = ref("");

const sendMessage = () => {
  if (message.value.trim()) {
    console.log("Message sent:", message.value);
    // Emit event or call API here
    message.value = "";
  }
};
</script>

<style scoped>
input::placeholder {
  color: var(--color-ai-chat-input-placeholder);
}
</style>
