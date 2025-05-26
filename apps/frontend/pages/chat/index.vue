<script setup lang="ts">
useHead({ title: "Cha-Cha-Chat" });
definePageMeta({ middleware: "auth", layout: "chat" });
</script>

<template>
  <div class="bg-background flex-1 h-screen flex flex-col items-center justify-center gap-10">
    <span class="text-white">INITIAL CHAT</span>
  </div>
</template>
