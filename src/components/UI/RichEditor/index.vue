<template>
  <editor-content id="rich-editor" class="select-none" :editor="editor" />
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Placeholder from "@tiptap/extension-placeholder";
import { Mark } from "@tiptap/core";

const SelectionHighlight = Mark.create({
  name: 'selectedText',
  addAttributes() {
    return {
      class: {
        default: null,
      },
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', HTMLAttributes, 0]
  },
  addCommands() {
    return {
      removeSelection: () => ({ tr, state }) => {
        const { doc, selection } = state;
        if (!selection || !doc) return false;
        
        const { from, to } = selection;
        const marks = state.schema.marks.selectedText;
        
        tr.removeMark(0, doc.content.size, marks);
        return true;
      },
    }
  },
});
const props = defineProps<{
  placeholder?: string;
  disableEnter?: boolean;
}>();
const modelValue = defineModel<string>({ default: "" });
const lineHeight = ref(1.5);
const editor = useEditor({
  content: modelValue.value,
  extensions: [
    Document,
    Paragraph,
    Text,
    SelectionHighlight,
    Placeholder.configure({
      placeholder: props.placeholder || "开始输入...",
    }),
  ],
  editable: true,
  injectCSS: false,
  onUpdate: ({ editor }) => {
    let newText = editor.getText();
    if (props.disableEnter) {
      newText = newText.replace(/\n/g, "");
      if (newText !== editor.getText()) {
        editor.commands.setContent(newText);
      }
    }
    if (newText !== modelValue.value) {
      modelValue.value = newText;
    }
  },
  onSelectionUpdate: ({ editor }) => {
    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to, "");

    // 清除所有已有的选中样式
    editor.chain().focus().removeSelection().run();

    // 只对选中的文本添加样式
    if (text) {
      editor.chain()
        .focus()
        .setMark('selectedText', { class: 'selected-text' })
        .run();
    }
  },
  autofocus: true,
});

watch(modelValue, (newContent) => {
  if (editor.value && editor.value.getText() !== newContent) {
    editor.value.commands.setContent(newContent, false);
  }
});
</script>

<style>
.ProseMirror {
  outline: none !important;
  caret-color: var(--color-caret);
  overflow: auto;
  display: table;
  flex-direction: column;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: inherit;
  width: 100%;
  @apply select-none;
}

.ProseMirror p {
  line-height: v-bind(lineHeight);
  color: var(--color-textColor-selection-richEditor);
}

.ProseMirror ::selection {
  background: var(--color-bg-selection-richEditor);
}

.ProseMirror .selected-text {
  background-color: var(--color-bg-selection-richEditor);
}

.ProseMirror p.is-editor-empty:first-child::before {
  color: var(--color-text-placeholder);
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>
