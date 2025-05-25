<script setup lang="ts">
const username = ref();
</script>

<template>
  <div
    class="bg-background flex h-full w-full flex-col items-center justify-center gap-40"
  >
    <div class="flex flex-col items-center">
      <p
        class="flex flex-col sm:flex-row items-center text-4xl font-bold text-white mb-2"
      >
        <span class="flex items-center"> Welcome to&nbsp; </span>
        <span class="flex items-center">
          <span class="text-primary">Cha</span>
          <MdiIcon class="text-secondary pt-1 text-xs" icon="mdiMessage" />
          <span class="text-primary">Cha</span>
          <MdiIcon class="text-secondary pt-1 text-xs" icon="mdiMessage" />
          <span class="text-primary">Chat</span></span
        >
      </p>
      <p class="text-xl text-white">where everyone's invited to chit-chat</p>
    </div>

    <div class="flex flex-col items-center">
      <p class="text-grey-light mb-4 text-sm">
        Got something to say? Type a username and jump in.
      </p>
      <AppInput class="mb-4 w-3/4" v-model="username" />
      <AppButton class="w-3/4" label="Join the Chat" />
    </div>
  </div>
</template>
