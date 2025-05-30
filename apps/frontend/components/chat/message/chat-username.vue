<script setup lang="ts">
const props = defineProps({
  username: String
});
</script>

<template>
  <div class="text-grey-medium mt-2 mb-1 ml-2 text-xs font-light" v-cloak>{{ props.username }}</div>
</template>
