<template>
  <div class="bg-background flex h-screen w-screen flex-col">
    <div class="border-b-grey-dark flex h-12 items-center border-b-1 pl-4">
      <img class="h-4" src="../assets/images/logo.png" />
    </div>
    <div class="flex min-h-0 w-full flex-1">
      <div class="flex min-h-0 flex-1 flex-col justify-end p-4">
        <slot name="main"></slot>
      </div>
      <div class="border-l-grey-dark flex min-h-0 w-64 flex-col border-l-1 p-4">
        <slot name="sidebar"></slot>
      </div>
    </div>
  </div>
</template>
