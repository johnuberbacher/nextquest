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
    class="bg-neutral-100 dark:bg-neutral-900 flex h-full max-h-screen w-full select-none flex-col items-center justify-center"
  >
    <div
      class="dark:bg-neutral-800 md:border-neutral-200 md:dark:border-neutral-700 relative m-auto flex h-full w-full flex-col justify-between bg-white shadow-sm md:max-h-[960px] md:max-w-xl md:overflow-hidden md:rounded-3xl md:border"
    >
      <!--<Header v-if="!introWelcomeScreen?.show" />-->
      <Header />
      <RouterView />
      <AppBar />
    </div>
  </div>
</template>
