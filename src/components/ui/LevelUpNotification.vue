<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTaskStore } from '@/stores/useTaskStore'
import { useUserStore } from '@/stores/useUserStore'
import LevelProgressBar from './user/LevelProgressBar.vue'

const taskStore = useTaskStore()
const userStore = useUserStore()
const { getTaskById, incrementTaskExp } = taskStore
const { user, logHabitEntry, hasLoggedToday } = userStore

const levelUpMessages = [
  'Small steps every day lead to great journeys.',
  "You're not just leveling up, you're glowin' up.",
  'Consistency builds champions... and unlocks new gear.',
  "Look at you go! You're a productivity wizard now.",
  'Discipline: because naps don’t grant XP.',
  "You're becoming who you were meant to be—probably someone with a calendar.",
  "Leveling up in real life? Now that's hardcore mode.",
  'Habit formed. Achievement unlocked: Adulting.',
  'Today’s effort is tomorrow’s bragging rights.',
  'Success is 90% showing up, 10% resisting snacks.',
]

const progress = ref(0)
const showNewLevel = ref(false)
const randomMessage = levelUpMessages[Math.floor(Math.random() * levelUpMessages.length)]

watch(
  () => userStore.levelUpNotification,
  async (val) => {
    const modal = document.getElementById('modal_level_up') as HTMLDialogElement | null
    if (!modal) return

    if (val) {
      progress.value = 0
      showNewLevel.value = false
      modal.showModal()

      // Animate progress to 100
      requestAnimationFrame(() => {
        progress.value = 100
      })

      // Wait 1 second and then show updated level
      setTimeout(() => {
        showNewLevel.value = true
      }, 1000)
    } else {
      modal.close()
    }
  },
)

const handleDismiss = () => {
  userStore.levelUpNotification = false
}
</script>

<template>
  <dialog
    id="modal_level_up"
    class="modal !bg-[oklch(100%_0_0/_0.9)] dark:!bg-[oklch(0%_0_0/_0.9)]"
  >
    <div
      class="modal-box flex select-none flex-col items-center justify-center gap-4 border border-neutral-300 px-4 py-4 text-center dark:border-neutral-700 md:px-10"
    >
      <div
        class="flex w-20 flex-col items-center justify-center bg-orange-700 text-center text-3xl font-bold text-white sm:w-40 sm:text-5xl"
        style="aspect-ratio: 0.866; clip-path: polygon(-50% 50%, 50% 100%, 150% 50%, 50% 0)"
      >
        {{ showNewLevel ? user.level : user.level - 1 }}
      </div>

      <h3 class="text-xl font-bold">Level Up</h3>
      <div class="flex w-full flex-row items-center justify-between gap-4 px-4">
        <div
          class="flex aspect-square w-12 flex-col items-center justify-center rounded-full bg-neutral-200 text-center text-sm font-bold dark:bg-neutral-700"
        >
          {{ user.level - 1 }}
        </div>
        <LevelProgressBar :value="progress" :max="100" :animate="true" class="w-full" />
        <div
          class="flex aspect-square w-12 flex-col items-center justify-center rounded-full bg-neutral-200 text-center text-sm font-bold dark:bg-neutral-700"
        >
          {{ user.level }}
        </div>
      </div>
      <p class="text-sm">
        {{ randomMessage }}
      </p>
      <button
        @click="handleDismiss"
        class="btn btn-primary btn-lg w-full flex-grow rounded-full px-4 text-sm"
      >
        Continue
      </button>
    </div>
  </dialog>
</template>
