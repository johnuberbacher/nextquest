<script setup lang="ts">
import { computed } from 'vue'
import { useTaskStore } from '@/stores/useTaskStore'
import { useUserStore } from '@/stores/useUserStore'
import { useCategoryStore } from '@/stores/useCategoryStore'
import DailiesWidget from '../components/ui/DailiesWidget.vue'

const store = useTaskStore()
const userStore = useUserStore()
const categoryStore = useCategoryStore()
const { tasks: rawTasks, createTask, getTasksForToday } = store

const tasks = computed(() =>
  rawTasks.map((task) => ({
    ...task,
    categoryId: String(task.categoryId),
  })),
)
const { logHabitEntry, hasLoggedToday } = userStore
const { selectedCategoryId, categories, getCategoryById } = categoryStore

const dailies = computed(() => {
  return getTasksForToday()
})
</script>
<template>
  <div
    class="bg-neutral-50 dark:bg-neutral-800 flex h-full w-full flex-grow flex-col items-start justify-start gap-4 overflow-hidden p-4"
  >
    <div
      class="border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 flex w-full flex-grow flex-col items-start justify-start gap-4 overflow-y-auto overflow-x-hidden rounded-xl border bg-white"
    >
      <DailiesWidget :tasks="tasks" class="overflow-y-auto p-4" :cols="1" :md-cols="2" />
    </div>
    <div class="flex h-auto w-full flex-row items-end justify-end gap-4">
      <RouterLink
        to="/add-new-habit"
        class="btn btn-primary btn-lg w-full rounded-full px-10 text-sm md:w-auto"
      >
        Add new habit
      </RouterLink>
    </div>
  </div>
</template>
