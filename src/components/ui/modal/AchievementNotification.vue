<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'

const router = useRouter()
const timeout = ref(false)
const userStore = useUserStore()

const clickAchievementNotification = () => {
  router.push('/stats')
  userStore.achievementNotification = false
}

onMounted(() => {
  // userStore.achievementNotification = true

  setTimeout(() => {
    timeout.value = true
    setTimeout(() => {
      userStore.achievementNotification = false
    }, 1000)
  }, 3000)
})
</script>

<template>
  <div
    v-if="userStore.achievementNotification"
    @click="clickAchievementNotification()"
    :class="['transition-all duration-700', timeout ? 'bottom-[-20vh]' : 'bottom-0']"
    to="/stats"
    class="toast toast-center absolute bottom-10 z-20 w-full max-w-lg cursor-pointer px-4"
  >
    <div
      class="dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 relative flex w-full flex-col items-center justify-center rounded-full border bg-white px-2 py-2 text-center shadow-lg"
    >
      <div class="flex w-full flex-row items-center justify-start gap-3 md:gap-4">
        <div
          class="border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 flex aspect-square h-14 items-center justify-center rounded-full border text-center text-white"
        >
          <div class="flex aspect-square items-center justify-center text-2xl leading-none">🦀</div>
        </div>
        <div class="flex w-full flex-col items-start justify-start gap-0.5">
          <div class="flex w-full flex-row items-center justify-between gap-3 pr-4">
            <div class="text-start font-bold">Habit Master</div>
          </div>
          <div class="text-neutral-500 dark:text-neutral-400 text-start text-sm tracking-tight">
            Level 40 achieved. Flex a little.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
