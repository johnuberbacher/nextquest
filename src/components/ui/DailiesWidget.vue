<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import { RiCheckFill } from '@remixicon/vue'
import { useTaskStore } from '@/stores/useTaskStore'
import { useUserStore } from '@/stores/useUserStore'
import { useCategoryStore } from '@/stores/useCategoryStore'
import Notification from '../components/ui/Notification.vue'
import CalendarWidget from '../components/ui/CalendarWidget.vue'
import DailiesWidget from '../components/ui/DailiesWidget.vue'

const store = useTaskStore()
const userStore = useUserStore()
const categoryStore = useCategoryStore()
const { tasks, createTask } = store
const { logHabitEntry, hasLoggedToday } = userStore
const { selectedCategoryId, categories, getCategoryById } = categoryStore
</script>
<template>
  <div class="flex w-full flex-col items-start justify-start gap-4 px-6">
    <div class="flex w-full flex-row items-center justify-between">
      <label class="text-lg font-bold dark:text-white">Dailies</label>
      <RouterLink
        :to="'/habits'"
        class="py-1 text-xs font-semibold text-neutral-500 hover:text-neutral-400"
      >
        View All</RouterLink
      >
    </div>
    <div class="grid w-full grid-cols-2 flex-wrap gap-6 md:grid-cols-4">
      <RouterLink
        :to="'/habit/' + task.id"
        v-for="task in tasks"
        :key="task.id"
        :class="[
          hasLoggedToday(task.id) ? 'grayscale' : '',
          'w-full rounded-xl pt-10 pb-4 px-4 relative flex flex-col items-start justify-star' +
            ' ' +
            task.color,
        ]"
      >
        <div
          class="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white"
          :class="[hasLoggedToday(task.id) ? 'opacity-50' : 'shadow-lg ']"
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
          {{ getCategoryById(task.categoryId).name }}
        </div>
        <div class="text-xs font-semibold text-black">
          {{ task.description }}
        </div>
      </RouterLink>
    </div>
  </div>
</template>
