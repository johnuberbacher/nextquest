<script setup lang="ts">
import { ref, defineProps, computed, watch } from 'vue'
import { useTaskStore } from '@/stores/useTaskStore'
import { useUserStore } from '@/stores/useUserStore'

const taskStore = useTaskStore()
const userStore = useUserStore()
const { getTaskById, incrementTaskExp } = taskStore
const { logHabitEntry, hasLoggedToday, incrementUserExp } = userStore

const props = defineProps({
  taskId: {
    type: String || Number,
    required: true,
  },
  activeDays: {
    type: Array<string>,
    required: true,
  },
})

const modalPhrase = ref('')
const task = computed(() => getTaskById(props.taskId))

const phrases = [
  'Honor System Reminder',
  'This Is For You',
  'Your Journey, Your Rules',
  'No Points for Lying',
  'Just Be Honest',
  'Small Wins Add Up',
]

const weekDays = [
  { label: 'S', index: 0 },
  { label: 'M', index: 1 },
  { label: 'T', index: 2 },
  { label: 'W', index: 3 },
  { label: 'T', index: 4 },
  { label: 'F', index: 5 },
  { label: 'S', index: 6 },
]

function openModal() {
  modalPhrase.value = phrases[Math.floor(Math.random() * phrases.length)]
  ;(document.getElementById('my_modal_1') as HTMLDialogElement)?.showModal()
}

const handleLogClick = async () => {
  if (!task.value || alreadyLoggedToday.value) return

  logHabitEntry(task.value.id, true)
  incrementTaskExp(Number(task.value.id), 30)
  incrementUserExp()
  handleDismiss()
}

const handleDismiss = () => {
  ;(document.getElementById('my_modal_1') as HTMLDialogElement)?.close()
}

const alreadyLoggedToday = computed(() => {
  if (!task.value || alreadyLoggedToday.value) return
  return !isActiveToday.value || hasLoggedToday(task.value.id)
})

// Mapping the numeric day to a string representation (Sun, Mon, Tue, etc.)
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const normalizeDay = (day: string) => day.charAt(0).toUpperCase() + day.slice(1, 3).toLowerCase()

const isActiveToday = computed(() => {
  const todayName = normalizeDay(dayNames[new Date().getDay()])
  return props.activeDays.map(normalizeDay).includes(todayName)
})

const logButtonLabel = computed(() => {
  if (!isActiveToday.value) return 'Not Active Today'
  if (task.value && hasLoggedToday(task.value.id)) return 'Completed!'
  return 'Log Habit'
})
</script>

<template>
  <!-- Open the modal using ID.showModal() method -->
  <div
    :data-tip="
      !isActiveToday
        ? 'This habbit is unavailable today'
        : task && hasLoggedToday(task.id)
          ? 'This task is already finished for the day!'
          : ''
    "
    class="flex h-auto w-full flex-row items-end justify-end gap-4 md:ml-auto md:mr-0 md:w-auto"
    :class="[!isActiveToday || (task && hasLoggedToday(task.id)) ? 'tooltip' : '']"
  >
    <button
      :disabled="alreadyLoggedToday"
      @click="openModal"
      class="btn btn-primary btn-lg w-full rounded-full px-10 text-sm md:w-auto"
    >
      {{ logButtonLabel }}
    </button>
  </div>
  <dialog id="my_modal_1" class="modal !bg-[oklch(100%_0_0/_0.9)] dark:!bg-[oklch(0%_0_0/_0.9)]">
    <div
      class="border-neutral-300 dark:border-neutral-700 modal-box flex max-w-md select-none flex-col gap-4 border p-8 text-center sm:p-10"
    >
      <h3 class="text-md font-bold">{{ modalPhrase + '!' }}</h3>
      <div class="text-neutral-500 text-sm">
        This app works on the honor system. There’s no leaderboard, no competition — just you
        building the life you want, one small action at a time. Mark habits as complete only if you
        truly did them.
      </div>
      <div class="text-neutral-500 text-sm">
        Your EXP is a fun bonus, but the real reward is the progress you make.
      </div>
      <div class="flex flex-col gap-4 md:flex-row md:gap-3">
        <button
          @click="handleDismiss"
          class="btn-default btn btn-lg w-full rounded-full px-8 text-sm md:w-auto"
        >
          Go back
        </button>
        <button
          @click="handleLogClick"
          :disabled="alreadyLoggedToday"
          class="btn btn-primary btn-lg w-full flex-grow rounded-full text-sm md:w-auto"
        >
          Got it &mdash; log as Complete!
        </button>
      </div>
    </div>
  </dialog>
</template>
