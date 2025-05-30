<script setup lang="ts">
const props = defineProps({
  timestamp: Number
});

const formatted = computed(() => formatDividerDate(props.timestamp));
</script>

<template>
  <div class="text-grey-medium mt-3 text-xs font-bold">{{ formatted }}</div>
</template>
