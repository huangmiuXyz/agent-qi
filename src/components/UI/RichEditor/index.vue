<template>
  <editor-content id="rich-editor" class="h-full" :editor="editor" />
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { watch } from "vue";

const modelValue = defineModel<string>({ default: "" });
const editor = useEditor({
  content: modelValue.value,
  extensions: [StarterKit as any],
  onUpdate: ({ editor }) => {
    modelValue.value = editor.getHTML();
  },
});

watch(
  modelValue,
  (newContent) => {
    if (editor.value && editor.value.getHTML() !== newContent) {
      editor.value.commands.setContent(newContent);
    }
  },
  { immediate: true }
);
</script>

<style>
.ProseMirror {
  outline: none !important;
  caret-color: var(--color-caret);
  height: 100%;
  min-height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.ProseMirror ::selection {
  background-color: var(--color-bg-selection-richEditor);
  color: var(--color-textColor-selection-richEditor);
}
</style>
