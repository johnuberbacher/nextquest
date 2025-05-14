<script setup lang="ts">
import { computed } from 'vue'
import { useTaskStore } from '@/stores/useTaskStore'
import { useUserStore } from '@/stores/useUserStore'
import { useCategoryStore } from '@/stores/useCategoryStore'
import Achievement from '../components/ui/Achievement.vue'

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

const userAchievements = computed(() => {
  const { achievements } = userStore
  return achievements
})

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
      <div class="flex w-full flex-grow flex-col gap-4 p-4">
        <Achievement
          v-for="achivement in userAchievements"
          :title="achivement.title"
          :description="achivement.description"
          :emoji="achivement.emoji"
        />
      </div>
    </div>
  </div>
</template>
