<script setup lang="ts">
import { ref, defineProps, computed, watch } from 'vue'
import { useTaskStore } from '@/stores/useTaskStore'
import { useUserStore } from '@/stores/useUserStore'
import LevelProgressBar from './user/LevelProgressBar.vue'
import Notification from './Notification.vue'

const taskStore = useTaskStore()
const userStore = useUserStore()
const { getTaskById, incrementTaskExp } = taskStore
const { user, logHabitEntry, hasLoggedToday } = userStore

const props = defineProps({
  taskId: {
    type: String,
    required: true,
  },
  activeDays: {
    type: Array<string>,
    required: true,
  },
})

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

const randomMessage = levelUpMessages[Math.floor(Math.random() * levelUpMessages.length)]

watch(
  () => userStore.levelUpNotification,
  (val) => {
    const modal = document.getElementById('modal_level_up') as HTMLDialogElement | null
    if (!modal) return

    if (val) {
      modal.showModal()
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
      class="modal-box flex select-none flex-col items-center justify-center gap-4 border border-neutral-300 px-6 py-6 text-center dark:border-neutral-700 md:px-10"
    >
      <div
        class="flex w-20 flex-col items-center justify-center bg-orange-700 text-center text-3xl font-bold text-white sm:w-40 sm:text-5xl"
        style="aspect-ratio: 0.866; clip-path: polygon(-50% 50%, 50% 100%, 150% 50%, 50% 0)"
      >
        100
      </div>

      <h3 class="text-2xl font-bold">Level Up!</h3>
      <div class="flex w-full flex-row items-center justify-between gap-4 px-6">
        <div
          class="flex aspect-square w-12 flex-col items-center justify-center rounded-full bg-neutral-200 text-center text-sm font-bold dark:bg-neutral-700"
        >
          {{ user.level - 1 }}
        </div>
        <LevelProgressBar :value="user.exp" :max="100" :animate="false" class="w-full" />
        <div
          class="flex aspect-square w-12 flex-col items-center justify-center rounded-full bg-neutral-200 text-center text-sm font-bold dark:bg-neutral-700"
        >
          {{ user.level }}
        </div>
      </div>
      <p class="text-sm">
        {{ randomMessage }}
      </p>
      <!--<div
        class="relative w-full rounded-2xl border border-neutral-200 p-4 dark:border-neutral-700 dark:bg-neutral-900"
      >
        <div class="flex flex-row gap-4">
          <div
            class="flex aspect-square h-14 items-center justify-center rounded-full border border-neutral-200 bg-neutral-100 text-center text-white dark:border-neutral-700 dark:bg-neutral-800"
          >
            <div class="-mt-2 flex aspect-square items-center justify-center text-3xl">👑</div>
          </div>
          <div class="-mt-1 flex w-full flex-col items-start justify-center gap-1 text-start">
            <div class="font-bold text-neutral-700 dark:text-white">New Title Earned!</div>
            <div
              class="flex w-auto rounded-sm bg-green-600 px-2 py-1 text-[10px] font-bold uppercase text-white"
            >
              Just Showed Up
            </div>
          </div>
        </div>
      </div>-->
      <button
        @click="handleDismiss"
        class="btn btn-primary btn-lg w-full flex-grow rounded-full px-6 text-sm"
      >
        Continue
      </button>
    </div>
  </dialog>
</template>
