<template>
  <editor-content id="rich-editor" :editor="editor" />
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

watch(modelValue, (newContent) => {
  if (editor.value && editor.value.getHTML() !== newContent) {
    editor.value.commands.setContent(newContent);
  }
});
</script>

<style lang="scss">
.ProseMirror {
  outline: none !important;
  min-height: 200px;
  caret-color: var(--color-caret);
}
</style>
