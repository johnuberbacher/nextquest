<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <header
    class="sticky left-0 right-0 top-0 z-50 flex flex-col gap-3 border-b border-neutral-200 bg-white px-6 py-4 dark:border-neutral-700 dark:bg-neutral-900"
  >
    <!--<img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />-->
    <div class="flex flex-row items-center justify-between">
      <RouterLink to="/" class="font-bold">Next Quest</RouterLink>
      <nav class="flex flex-row items-center justify-between gap-4">
        <RouterLink
          to="/add-new-habit"
          class="flex aspect-square h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 hover:bg-neutral-100 hover:text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
          ><i class="ri-add-fill"></i
        ></RouterLink>
      </nav>
    </div>
  </header>
</template>
