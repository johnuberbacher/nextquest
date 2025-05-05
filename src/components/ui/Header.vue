<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <header
    class="sticky left-0 right-0 top-0 z-50 flex flex-col gap-3 border-b border-gray-100 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800"
  >
    <!--<img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />-->
    <div class="flex flex-row items-center justify-between">
      <RouterLink to="/" class="font-bold">NextQuest</RouterLink>
      <nav class="flex flex-row items-center justify-between gap-4">
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/add-new-habit">add</RouterLink>
      </nav>
    </div>
  </header>
</template>
