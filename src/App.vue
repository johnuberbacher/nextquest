<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/ui/Header.vue'
import AppBar from './components/ui/AppBar.vue'
</script>

<template>
  <div
    class="relative m-auto flex h-full w-full flex-col overflow-hidden md:max-h-[1000px] md:max-w-3xl md:rounded-3xl md:border md:border-gray-200 md:dark:border-gray-700"
  >
    <Header />
    <RouterView />
    <AppBar />
  </div>
</template>
