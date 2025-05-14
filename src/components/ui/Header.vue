<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <header
    class="border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 sticky left-0 right-0 top-0 z-50 flex flex-col gap-3 border-b bg-white px-4 py-3"
  >
    <!--<img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />-->
    <div class="flex flex-row items-center justify-between">
      <RouterLink to="/" class="font-bold"
        ><span class="text-orange-600">Next</span>Quest</RouterLink
      >
    </div>
  </header>
</template>
