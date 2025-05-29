<script setup lang="ts">
import EmojiPicker, { type EmojiExt } from "vue3-emoji-picker";

const emit = defineEmits<{
  (e: "select", emoji: EmojiExt): any;
}>();

const isPickerShown = ref(false);

function togglePicker() {
  isPickerShown.value = !isPickerShown.value;
}

function selectEmoji(emoji: EmojiExt) {
  isPickerShown.value = false;
  emit("select", emoji);
}
</script>

<template>
  <div class="relative">
    <ChatBoxIconButton icon="mdiEmoticon" @click="togglePicker" />
    <ClientOnly>
      <EmojiPicker
        class="absolute bottom-full left-0 z-10 mb-2"
        v-if="isPickerShown"
        theme="dark"
        :native="true"
        :disable-skin-tones="true"
        @select="selectEmoji"
      />
    </ClientOnly>
  </div>
</template>
