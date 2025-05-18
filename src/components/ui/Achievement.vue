<script setup>
import { ref, onMounted, defineProps, computed } from 'vue'
import { useUserStore } from '@/stores/useUserStore'

const userStore = useUserStore()
const user = computed(() => userStore.user)

const props = defineProps({
  userData: Object,
})

const achievement = userStore.getUserAchievement(props.userData.achievementId)
</script>

<template>
  <div
    class="dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 relative flex w-full flex-col items-center justify-center gap-3 rounded-xl border bg-white px-4 py-3 text-center"
  >
    <div class="flex w-full flex-row items-center justify-start gap-3">
      <div
        class="border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 flex aspect-square h-16 items-center justify-center rounded-full border text-center text-white"
      >
        <div class="flex aspect-square items-center justify-center text-3xl leading-none">
          {{ achievement.emoji }}
        </div>
      </div>
      <div class="flex w-full flex-col items-start justify-start gap-0.5">
        <div class="flex w-full flex-row items-center justify-between gap-2">
          <div class="text-start text-sm font-bold">{{ achievement.title }}</div>
        </div>
        <div class="text-neutral-500 dark:text-neutral-400 mb-1 text-start text-xs">
          {{ achievement.description }}
        </div>
        <div
          class="py-0.1 inline-flex w-auto rounded-sm border border-orange-800 bg-orange-700 px-1.5 text-[10px] font-bold text-white"
        >
          {{
            new Date(userData.date)
              .toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
              .replace(/(\d+)(?=,)/, (match) => {
                const day = parseInt(match)
                const suffix =
                  day % 10 === 1 && day % 100 !== 11
                    ? 'st'
                    : day % 10 === 2 && day % 100 !== 12
                      ? 'nd'
                      : day % 10 === 3 && day % 100 !== 13
                        ? 'rd'
                        : 'th'
                return day + suffix
              })
          }}
        </div>
      </div>
    </div>
  </div>
</template>
