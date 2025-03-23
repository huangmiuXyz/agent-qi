<template>
  <editor-content class="select-none" :editor="editor" />
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Placeholder from "@tiptap/extension-placeholder";
const props = defineProps<{
  placeholder?: string;
  disableEnter?: boolean;
  id: string;
}>();
const selectionTxt = ref<string>("");
const modelValue = defineModel<string | Object>({ default: "" });
const lineHeight = ref(1.8);
const { setAiSelectionBarPosition } = useAISelectionBar();
const editor = useEditor({
  content: modelValue.value,
  extensions: [
    Document,
    Paragraph,
    Text,
    Placeholder.configure({
      placeholder: props.placeholder || "开始输入...",
    }),
  ],
  editable: true,
  injectCSS: false,
  onSelectionUpdate: ({ editor }) => {
    selectionTxt.value = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to
    );
    const selection = window.getSelection();
    if (selectionTxt.value) {
      const range = selection!.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      console.log(rect.top);

      setAiSelectionBarPosition({
        y: rect.top - 50,
        x: rect.left,
      });
    } else {
      setAiSelectionBarPosition({
        y: 0,
        x: 0,
      });
    }
  },
  onUpdate: ({ editor }) => {
    let newText = editor.getText();
    const newJSON = editor.getJSON();
    if (props.disableEnter) {
      newText = newText.replace(/\n/g, "");
      if (newText !== editor.getText()) {
        editor.commands.setContent(newText);
      }
      if (newText !== modelValue.value) {
        modelValue.value = newText;
      }
      return;
    }
    if (newJSON !== modelValue.value) {
      modelValue.value = newJSON;
    }
  },
  autofocus: true,
});

watch(modelValue, (newContent) => {
  if (
    editor.value &&
    editor.value.getJSON() !== newContent &&
    props.disableEnter
  ) {
    editor.value.commands.setContent(newContent, false);
    return;
  }
  if (editor.value && editor.value.getText() !== newContent) {
    editor.value.commands.setContent(newContent, false);
  }
});
</script>

<style>
.ProseMirror {
  @apply select-none;
  outline: none !important;
  caret-color: var(--color-caret);
  overflow: auto;
  display: table;
  flex-direction: column;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: inherit;
  width: 100%;
}

.ProseMirror p {
  line-height: v-bind(lineHeight);
  color: var(--color-textColor-selection-richEditor);
}

.ProseMirror ::selection {
  background: var(--color-bg-selection-richEditor);
}

.ProseMirror p.is-editor-empty:first-child::before {
  color: var(--color-text-placeholder);
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>
