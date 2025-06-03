<script setup lang="ts">
const sidebarShown = ref(false);

function toggleSidebar() {
  sidebarShown.value = !sidebarShown.value;
}
</script>

<template>
  <div class="bg-background flex h-screen w-screen flex-col">
    <div class="border-b-grey-dark flex h-12 items-center justify-between border-b-2 pr-4 pl-4">
      <img class="h-4" src="../assets/images/logo.png" />
      <div class="h-7 min-h-0 w-7 cursor-pointer rounded-sm p-1 lg:hidden" @click="toggleSidebar">
        <MdiIcon class="text-grey-medium h-full w-full hover:brightness-120 active:brightness-110" icon="mdiMenu" />
      </div>
    </div>
    <div class="flex min-h-0 w-full flex-1">
      <div class="flex min-h-0 min-w-0 flex-1 flex-col justify-end p-4">
        <slot name="main"></slot>
      </div>
      <div class="border-l-grey-dark z-50 hidden min-h-0 w-56 min-w-0 flex-col border-l-2 p-4 lg:flex">
        <slot name="sidebar"></slot>
      </div>
      <div
        class="border-l-grey-dark bg-background fixed top-12 right-0 z-50 flex h-full w-56 transform flex-col border-l-2 p-4 duration-300 ease-in-out"
        v-show="true"
        :class="{ 'translate-x-0': sidebarShown, 'translate-x-full': !sidebarShown }"
      >
        <slot name="sidebar"></slot>
      </div>
    </div>
  </div>
</template>
