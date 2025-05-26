<template>
  <div class="h-screen w-screen bg-background flex flex-col">
    <div class="flex h-12 border-b-1 border-b-grey-dark items-center pl-4">
      <img class="h-4" src="../assets/images/logo.png" />
    </div>
    <div class="flex flex-1 w-full">
      <div class="flex flex-col flex-1">
        <slot name="main"></slot>
      </div>
      <div class="flex flex-col w-64 border-l-1 border-l-grey-dark">
        <slot name="sidebar"></slot>
      </div>
    </div>
  </div>
</template>
