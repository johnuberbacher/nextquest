<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/ui/Header.vue'
import AppBar from './components/ui/AppBar.vue'
</script>

<template>
  <div
    class="flex h-full w-full flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-900"
  >
    <div
      class="relative m-auto flex h-full w-full flex-col justify-between bg-white shadow-sm dark:bg-neutral-800 md:max-h-[960px] md:max-w-2xl md:overflow-hidden md:rounded-3xl md:border md:border-neutral-200 md:dark:border-neutral-700"
    >
      <Header />
      <RouterView />
      <AppBar />
    </div>
  </div>
</template>
