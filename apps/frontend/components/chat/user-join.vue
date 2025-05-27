<script setup lang="ts">
const props = defineProps({
  username: String
});
</script>

<template>
  <div class="text-grey-medium text-xs font-bold">{{ props.username }} has joined the chat.</div>
</template>
