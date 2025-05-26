<script setup lang="ts">
useHead({ title: "Cha-Cha-Chat" });
definePageMeta({ middleware: "auth" });
</script>

<template>
  <div
    class="bg-background flex h-full w-full flex-col items-center justify-center gap-10"
  >
    <span>THIS IS THE CHAT</span>
  </div>
</template>
