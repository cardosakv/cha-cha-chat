<script setup lang="ts">
const props = defineProps({
  username: String
});
</script>

<template>
  <div class="text-grey-medium ml-2 text-sm font-light" v-cloak>{{ props.username }}</div>
</template>
