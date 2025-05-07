<script setup lang="ts">
import { computed } from 'vue'
import { useTaskStore } from '@/stores/useTaskStore'
import { useUserStore } from '@/stores/useUserStore'
import { useCategoryStore } from '@/stores/useCategoryStore'
import DailiesWidget from '../components/ui/DailiesWidget.vue'

const store = useTaskStore()
const userStore = useUserStore()
const categoryStore = useCategoryStore()
const { tasks, createTask, getTasksForToday } = store
const { logHabitEntry, hasLoggedToday } = userStore
const { selectedCategoryId, categories, getCategoryById } = categoryStore

const dailies = computed(() => {
  return getTasksForToday()
})
</script>
<template>
  <div class="flex w-full flex-grow flex-col items-start justify-between gap-6 overflow-hidden p-6">
    <div class="flex h-auto w-full flex-col items-start justify-start gap-2">
      <label class="text-2xl font-bold text-neutral-900 dark:text-white">All Habits</label>
      <div class="text-sm text-neutral-500 dark:text-neutral-500">
        Select any pre-created habbits from the list below, you can choose more than one. Don't
        worry, you'll be able to make custom habits later.
      </div>
    </div>

    <div
      class="flex w-full flex-grow flex-col items-start justify-start gap-6 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700"
    >
      <DailiesWidget :tasks="tasks" class="overflow-y-auto p-6" :gridCols="3" />
    </div>
    <div class="flex h-auto w-full flex-row items-end justify-end gap-6">
      <RouterLink
        to="/add-new-habit"
        class="btn btn-primary btn-lg w-full rounded-full px-10 text-sm md:w-auto"
      >
        Add new
      </RouterLink>
    </div>
  </div>
</template>
