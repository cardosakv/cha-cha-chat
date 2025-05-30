<script setup lang="ts">
import { timestamp } from "@vueuse/core";

const props = defineProps({
  username: String,
  timestamp: Number
});

const formattedDate = computed(() => formatHoverDate(props.timestamp));
</script>

<template>
  <div class="text-grey-medium mt-3 text-xs font-bold" :title="formattedDate">
    {{ props.username }} has joined the chat.
  </div>
</template>
