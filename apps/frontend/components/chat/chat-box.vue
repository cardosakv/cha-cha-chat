<script lang="ts" setup>
import type { EmojiExt } from "vue3-emoji-picker";

const message = defineModel<string>();
const emit = defineEmits<{
  (e: "send"): any;
  (e: "select-file"): any;
}>();

function addEmoji(emoji: EmojiExt) {
  if (!message.value) {
    message.value = "";
  }

  message.value = message.value + emoji.i;
}
</script>

<template>
  <div class="flex items-end justify-between">
    <ChatBoxIconButton icon="mdiFile" @click="emit('select-file')" />
    <ChatBoxEmojiPicker @select="addEmoji" />
    <ChatBoxInput class="mr-2 ml-2" v-model="message" />
    <ChatBoxIconButton icon="mdiSend" @click="emit('send')" />
  </div>
</template>
