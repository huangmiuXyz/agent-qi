<template>
  <div class="p-2 flex justify-center flex-1">
    <div class="bg-rich-editor tiptap-container flex-none w-[800px] h-full">
      <div class="p-4 h-full">
        <RichEditor />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.tiptap-container {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  box-shadow: 0 1px 40px rgba(0, 0, 0, 0.04);
}
</style>
