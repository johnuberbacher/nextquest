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
  <div class="h-full w-full p-6">
    <DailiesWidget :tasks="tasks" />
  </div>
</template>
