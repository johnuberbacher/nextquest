<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/ui/Header.vue'
import AppBar from './components/ui/AppBar.vue'
import { useNotificationStore } from '@/stores/useNotificationStore'

const notificationStore = useNotificationStore()

const introWelcomeScreen = computed(() =>
  notificationStore.events.find((event) => event.id === 'introWelcomeScreen'),
)
</script>

<template>
  <div
    class="flex h-full max-h-screen w-full select-none flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-900"
  >
    <div
      class="relative m-auto flex h-full w-full flex-col justify-between bg-white shadow-sm dark:bg-neutral-800 md:max-h-[960px] md:max-w-xl md:overflow-hidden md:rounded-3xl md:border md:border-neutral-200 md:dark:border-neutral-700"
    >
      <!--<Header v-if="!introWelcomeScreen?.show" />-->
      <Header />
      <RouterView />
      <AppBar />
    </div>
  </div>
</template>
