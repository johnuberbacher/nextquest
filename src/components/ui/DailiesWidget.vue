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
  cols?: number
  mdCols?: number
  selectedDate: Date
}>()

const userStore = useUserStore()
const categoryStore = useCategoryStore()
const { hasLoggedToday, hasLoggedOnDate } = userStore
const { getCategoryById } = categoryStore

const gridClass = computed(() => [
  `grid-cols-${props.cols ?? 2}`,
  `sm:grid-cols-${props.mdCols ?? 4}`,
])
</script>

<template>
  <div class="grid w-full flex-wrap gap-4 pb-4" :class="gridClass">
    <RouterLink
      :to="'/habit/' + task.id"
      v-for="task in tasks"
      :key="task.id"
      :class="[
        hasLoggedOnDate(task.id, selectedDate) || hasLoggedToday(task.id) ? 'grayscale' : '',
        'btn btn-ghost h-full text-start w-full rounded-xl pt-4 pb-4 px-4 gap-2 relative flex flex-col items-start justify-between ' +
          ' ' +
          task.color,
      ]"
    >
      <div
        class="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white"
        :class="[
          hasLoggedOnDate(task.id, selectedDate) || hasLoggedToday(task.id)
            ? 'opacity-50'
            : 'shadow',
        ]"
      >
        <RiCheckFill
          size="20px"
          :class="[
            hasLoggedOnDate(task.id, selectedDate) || hasLoggedToday(task.id)
              ? 'text-neutral-400'
              : 'text-orange-700',
          ]"
        />
      </div>
      <div class="mb-8 text-5xl text-black">{{ task.icon }}</div>

      <div class="text-sm font-semibold text-black">
        {{ task.name }}
      </div>
      <div class="text-neutral-500 text-xs font-medium tracking-tight">
        {{ task.description }}
      </div>
      <div
        class="inline-flex w-auto rounded-sm border border-orange-800 bg-orange-700 px-1.5 py-0.5 text-[10px] font-bold text-white"
      >
        {{ getCategoryById(Number(task.categoryId))?.name || 'Unknown Category' }}
      </div>
    </RouterLink>
  </div>
</template>
