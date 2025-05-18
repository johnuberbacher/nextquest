<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { RouterView } from 'vue-router'
import Header from './components/ui/Header.vue'
import AppBar from './components/ui/AppBar.vue'
import IntroWelcome from './components/ui/IntroWelcome.vue'
import AchievementNotification from './components/ui/modal/AchievementNotification.vue'
import { useUserStore } from '@/stores/useUserStore'
import { useTaskStore } from '@/stores/useTaskStore'
import { useNotificationStore } from '@/stores/useNotificationStore'

const userStore = useUserStore()
const taskStore = useTaskStore()
const { loadUserFromLocalStorage } = userStore

const showIntroWelcomeScreen = ref(false)

function updateIntroWelcomeScreen() {
  showIntroWelcomeScreen.value = false
}

const user = computed(() => {
  return userStore.user
})

onMounted(() => {
  userStore.loadUserFromLocalStorage()
  taskStore.loadHabitsFromLocalStorage()
})

watch(
  user,
  (newVal) => {
    if (!newVal) {
      showIntroWelcomeScreen.value = true
    } else {
      showIntroWelcomeScreen.value = false
    }
  },
  { immediate: true },
)
</script>

<template>
  <div
    class="bg-neutral-100 dark:bg-neutral-900 flex h-full max-h-screen w-full select-none flex-col items-center justify-center"
  >
    <div
      class="dark:bg-neutral-800 md:border-neutral-200 md:dark:border-neutral-700 relative m-auto flex h-full w-full flex-col justify-between bg-white shadow md:max-h-[960px] md:max-w-xl md:overflow-hidden md:rounded-3xl md:border"
    >
      <IntroWelcome v-if="!user" @updateIntroWelcomeScreen="updateIntroWelcomeScreen" />

      <Header v-if="user" />
      <AchievementNotification v-if="user" />
      <RouterView v-if="user" />
      <AppBar v-if="user" />
    </div>
  </div>
</template>
