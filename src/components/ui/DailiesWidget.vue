<script setup lang="ts">
import { computed } from 'vue'
import { RiCheckFill } from '@remixicon/vue'
import { useUserStore } from '@/stores/useUserStore'
import { useCategoryStore } from '@/stores/useCategoryStore'

const props = defineProps<{
  tasks: Array<{
    id: string
    icon: string
    description: string
    color: string
    categoryId: string
  }>
  gridCols?: number
}>()

const userStore = useUserStore()
const categoryStore = useCategoryStore()
const { hasLoggedToday } = userStore
const { getCategoryById } = categoryStore

const gridClass = computed(() => `md:grid-cols-${props.gridCols || 4}`)
</script>

<template>
  <div class="grid w-full grid-cols-2 flex-wrap gap-6" :class="gridClass">
    <RouterLink
      :to="'/habit/' + task.id"
      v-for="task in tasks"
      :key="task.id"
      :class="[
        hasLoggedToday(task.id) ? 'grayscale' : '',
        'w-full rounded-xl pt-10 pb-4 px-4 relative flex flex-col items-start justify-start' +
          ' ' +
          task.color,
      ]"
    >
      <div
        class="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white"
        :class="[hasLoggedToday(task.id) ? 'opacity-50' : 'shadow-lg']"
      >
        <RiCheckFill
          size="20px"
          :class="[hasLoggedToday(task.id) ? 'text-neutral-400' : 'text-orange-700']"
        />
      </div>
      <div class="mb-8 text-5xl text-black">{{ task.icon }}</div>
      <div
        class="mb-2 inline-flex w-auto rounded-sm border px-1.5 py-0.5 text-[10px] font-bold text-black"
      >
        {{ getCategoryById(Number(task.categoryId))?.name || 'Unknown Category' }}
      </div>
      <div class="text-xs font-semibold text-black">
        {{ task.description }}
      </div>
    </RouterLink>
  </div>
</template>
