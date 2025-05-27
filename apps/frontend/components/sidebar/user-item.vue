<script setup lang="ts">
const props = defineProps({
  username: String
});
</script>

<template>
  <div class="bg-background flex max-h-12 min-h-12 items-center rounded-lg p-2 pl-4 hover:brightness-120">
    <UserIcon :username="props.username" />
    <div class="text-grey-light ml-3 text-sm">{{ props.username }}</div>
  </div>
</template>
