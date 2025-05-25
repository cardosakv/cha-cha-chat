<script setup lang="ts">
import multiavatar from "@multiavatar/multiavatar/esm";

const username = ref("");
const avatarSvg = computed(() => multiavatar(username.value));
</script>

<template>
  <div
    class="bg-background flex h-full w-full flex-col items-center justify-center gap-10"
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

    <div class="h-32 w-32 brightness-90" v-html="avatarSvg"></div>

    <div class="flex flex-col items-center">
      <p class="text-grey-light mb-4 text-sm">
        Got something to say? Type a username and jump in.
      </p>
      <AppInput class="mb-4 w-3/4" v-model="username" />
      <AppButton class="w-3/4" label="Join the Chat" />
    </div>
  </div>
</template>
