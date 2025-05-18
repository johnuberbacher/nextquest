<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'

const router = useRouter()
const userStore = useUserStore()

const showNotification = ref(false)
const timeout = ref(false)

const achievementTitle = ref('')
const achievementDescription = ref('')
const achievementEmoji = ref('')

const user = computed(() => userStore.user)

// track of previous achievements to detect new ones
let previousAchievements: number[] = []

watch(
  () => user.value.achievements,
  (newAchievements) => {
    const newIds = newAchievements.filter((id) => !previousAchievements.includes(id))

    if (newIds.length > 0) {
      const latestAchievement = newIds[newIds.length - 1]
      const achievement = userStore.getUserAchievement(latestAchievement.achievementId)

      if (achievement) {
        achievementTitle.value = achievement.title
        achievementDescription.value = achievement.description
        achievementEmoji.value = achievement.emoji

        showNotification.value = true
        timeout.value = true

        setTimeout(() => {
          timeout.value = false
        }, 100)

        setTimeout(() => {
          showNotification.value = false
        }, 4000)
      }
    }

    previousAchievements = [...newAchievements]
  },
  { deep: true },
)

const clickAchievementNotification = () => {
  router.push('/stats')
  showNotification.value = false
}
</script>

<template>
  <div
    v-if="showNotification"
    @click="clickAchievementNotification"
    :class="[
      'toast toast-center absolute z-50 w-full max-w-lg cursor-pointer px-4 transition-all duration-700',
      timeout ? 'top-[-20vh]' : 'top-10',
    ]"
  >
    <div
      class="dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 relative flex w-full flex-col items-center justify-center rounded-full border bg-white px-2 py-2 text-center shadow-lg"
    >
      <div class="flex w-full flex-row items-center justify-start gap-3 md:gap-4">
        <div
          class="border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 flex aspect-square h-14 items-center justify-center rounded-full border text-center text-white"
        >
          <div class="flex aspect-square items-center justify-center text-2xl leading-none">
            {{ achievementEmoji }}
          </div>
        </div>
        <div class="flex w-full flex-col items-start justify-start gap-0.5">
          <div class="flex w-full flex-row items-center justify-between gap-3 pr-4">
            <div class="text-start font-bold">{{ achievementTitle }}</div>
          </div>
          <div class="text-neutral-500 dark:text-neutral-400 text-start text-sm tracking-tight">
            {{ achievementDescription }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
