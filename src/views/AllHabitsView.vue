<script setup lang="ts">
import { computed } from 'vue'
import { useTaskStore } from '@/stores/useTaskStore'
import { RouterLink } from 'vue-router'
import DailiesWidget from '../components/ui/DailiesWidget.vue'

const taskStore = useTaskStore()

const tasks = computed(() => {
  const { tasks } = taskStore
  return tasks
})
</script>
<template>
  <div
    class="bg-neutral-50 dark:bg-neutral-800 flex h-full w-full flex-grow flex-col items-start justify-start gap-4 overflow-hidden p-4"
  >
    <div
      v-if="!tasks.length"
      class="border-neutral-200 dark:bg-neutral-900 dark:border-neutral-700 flex w-full flex-grow select-none flex-col items-center justify-center gap-4 rounded-xl border bg-white p-8 text-center sm:p-10"
    >
      <div class="text-md font-bold">You don’t have any habits yet!</div>
      <div class="text-neutral-500 dark:text-neutral-400 mb-1 text-sm">
        Your journey starts here—let’s build something great. Click below to add a new habit.
      </div>
      <RouterLink
        :to="'/add-new-habit'"
        class="btn btn-primary btn-lg w-full rounded-full px-10 text-sm md:w-auto"
      >
        Add New Habit
      </RouterLink>
    </div>
    <div
      v-if="tasks.length"
      class="border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 flex w-full flex-grow flex-col items-start justify-start gap-4 overflow-y-auto overflow-x-hidden rounded-xl border bg-white"
    >
      <DailiesWidget :tasks="tasks" class="overflow-y-auto p-4" :cols="1" :md-cols="2" />
    </div>
    <div v-if="tasks.length" class="flex h-auto w-full flex-row items-end justify-end gap-4">
      <RouterLink
        to="/add-new-habit"
        class="btn btn-primary btn-lg w-full rounded-full px-10 text-sm md:w-auto"
      >
        Add new habit
      </RouterLink>
    </div>
  </div>
</template>
