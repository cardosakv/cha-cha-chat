<script lang="ts" setup>
import type { EmojiExt } from "vue3-emoji-picker";

const text = defineModel<string>();
const emit = defineEmits<{
  (e: "send-text", text: string): any;
  (e: "send-file", imageBase64: string): any;
}>();

const { open, onChange } = useFileDialog({ accept: "image/*", multiple: false, reset: true });

onChange((files) => {
  const file = files?.item(0);
  if (!file) return;

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => emit("send-file", reader.result as string);
});

function addEmoji(emoji: EmojiExt) {
  if (!text.value) {
    text.value = "";
  }

  text.value = text.value + emoji.i;
}

function sendText() {
  if (!text.value) {
    text.value = "";
  }

  emit("send-text", text.value);
  text.value = "";
}
</script>

<template>
  <ChatBoxIconButton icon="mdiFile" @click="open" />
  <ChatBoxEmojiPicker @select="addEmoji" />
  <ChatBoxInput v-model="text" @keydown-enter="sendText" />
  <ChatBoxIconButton icon="mdiSend" @click="sendText" />
</template>
