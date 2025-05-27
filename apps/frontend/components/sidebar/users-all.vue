<script setup lang="ts">
const props = defineProps({
  usernames: Array as PropType<string[]>
});
</script>

<template>
  <div class="mt-6 flex min-h-0 flex-col">
    <div class="text-grey-medium mb-2 text-sm font-medium">In the chat</div>
    <div class="custom-scroll flex flex-1 flex-col overflow-y-scroll">
      <UserItem v-for="username of props.usernames" :username="username" />
    </div>
  </div>
</template>
