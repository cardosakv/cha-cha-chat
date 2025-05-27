<script setup lang="ts">
const props = defineProps({
  datetime: Date
});

const formatted = computed(() => formatDate(props.datetime));
</script>

<template>
  <div class="text-grey-medium text-xs font-bold">{{ formatted }}</div>
</template>
