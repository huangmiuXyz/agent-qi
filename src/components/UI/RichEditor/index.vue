<template>
  <editor-content id="rich-editor" class="h-full" :editor="editor" />
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

const modelValue = defineModel<string>({ default: "" });

const editor = useEditor({
  content: modelValue.value,
  extensions: [Document, Paragraph, Text],
  editable: true,
  injectCSS: false,
  onUpdate: ({ editor }) => {
    const newText = editor.getText();
    if (newText !== modelValue.value) {
      modelValue.value = newText;
    }
  },
});

watch(modelValue, (newContent) => {
  if (editor.value && editor.value.getText() !== newContent) {
    editor.value.commands.setContent(newContent, false); // `false` 避免历史记录变更
  }
});
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
  white-space: pre-wrap;
  word-break: break-word;
  font-family: inherit;
}

.ProseMirror p {
  margin: 0;
  line-height: 1.8;
}
</style>
