<script setup lang="ts">
import ChatUsername from "./chat-username.vue";

const props = defineProps({
  username: String,
  isOwn: Boolean,
  showUsername: Boolean,
  showIcon: Boolean,
  text: String,
  media: String
});
</script>

<template>
  <div :class="['flex max-w-3/5 items-end gap-3', { 'self-end': props.isOwn, 'self-start': !props.isOwn }]">
    <UserIcon v-if="!props.isOwn && props.showIcon" :username="props.username" />
    <div class="min-h-9 min-w-9 rounded-full brightness-90" v-else></div>
    <div>
      <ChatUsername v-if="props.showUsername" :username="props.username" />
      <ChatMessageText v-if="props.text" :text="props.text" :is-own="props.isOwn" />
      <ChatMessageMedia v-if="props.media" :media="props.media" />
    </div>
  </div>
</template>
