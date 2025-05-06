<script setup lang="ts">
import { ref, defineProps, computed } from 'vue'
import { useTaskStore } from '@/stores/useTaskStore'
import { useUserStore } from '@/stores/useUserStore'

const taskStore = useTaskStore()
const userStore = useUserStore()
const { getTaskById } = taskStore
const { logHabitEntry, hasLoggedToday } = userStore

const props = defineProps({
  taskId: {
    type: String,
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

function openModal() {
  modalPhrase.value = phrases[Math.floor(Math.random() * phrases.length)]
  document.getElementById('my_modal_1')?.showModal()
}

const handleLogClick = () => {
  if (!task.value || alreadyLoggedToday.value) return

  logHabitEntry(task.value.id, true)
  document.getElementById('my_modal_1')?.close()
}

const handleDismiss = () => {
  document.getElementById('my_modal_1')?.close()
}

const alreadyLoggedToday = computed(() => {
  return task.value ? hasLoggedToday(task.value.id) : false
})
</script>
<template>
  <!-- Open the modal using ID.showModal() method -->
  <div class="flex h-auto w-full flex-row items-end justify-end gap-6">
    <button
      :disabled="alreadyLoggedToday"
      @click="openModal"
      class="btn btn-primary btn-lg rounded-full px-10 text-sm"
    >
      {{ alreadyLoggedToday ? 'Completed!' : 'Log Habit' }}
    </button>
  </div>
  <dialog id="my_modal_1" class="modal !dark:bg-[oklch(0%_0_0/_0.9)] !bg-[oklch(100%_0_0/_0.9)]">
    <div class="modal-box border border-neutral-300 p-10 text-center dark:border-neutral-700">
      <h3 class="text-xl font-bold">{{ modalPhrase }}</h3>
      <p class="py-4 text-sm">
        This app works on the honor system. There’s no leaderboard, no competition — just you
        building the life you want, one small action at a time. Mark habits as complete only if you
        truly did them. Your EXP is a fun bonus, but the real reward is the progress you make.
      </p>
      <div class="flex flex-col gap-4 md:flex-row">
        <button
          @click="handleDismiss"
          class="btn btn-default btn-lg w-full rounded-full px-10 text-sm md:w-auto"
        >
          Go back
        </button>
        <button
          @click="handleLogClick"
          :disabled="alreadyLoggedToday"
          class="btn btn-primary btn-lg w-full flex-grow rounded-full px-10 text-sm md:w-auto"
        >
          Got it &mdash; Mark as done!
        </button>
      </div>
    </div>
  </dialog>
</template>
