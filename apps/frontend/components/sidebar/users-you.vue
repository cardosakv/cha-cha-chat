<script setup lang="ts">
const props = defineProps({
  username: String
});
</script>

<template>
  <div class="flex flex-col">
    <div class="text-grey-medium mb-2 text-sm font-medium">You</div>
    <UserItem :username="props.username" />
  </div>
</template>
