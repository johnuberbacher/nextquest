<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import { RiCheckFill } from '@remixicon/vue'
import { useTaskStore } from '@/stores/useTaskStore'
import Notification from '../components/ui/Notification.vue'
import CalendarWidget from '../components/ui/CalendarWidget.vue'
import DailiesWidget from '../components/ui/DailiesWidget.vue'

const store = useTaskStore()
const { tasks, createTask } = store
</script>
<template>
  <div class="flex w-full flex-col items-start justify-start gap-4 px-6">
    <div class="flex w-full flex-row items-center justify-between">
      <label class="text-lg font-bold dark:text-white">Dailies</label>
      <div class="text-xs font-semibold text-neutral-500">View All</div>
    </div>
    <div class="grid w-full grid-cols-2 flex-wrap gap-6 md:grid-cols-4">
      <RouterLink
        :to="'/habit/' + task.id"
        v-for="task in tasks"
        :key="task.id"
        :class="['w-full rounded-xl pt-10 pb-6 px-4 relative' + ' ' + task.color]"
      >
        <div
          class="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white"
          :class="[index === 2 ? '  shadow-lg ' : '  ']"
        >
          <RiCheckFill
            size="20px"
            :class="[task.state === 'complete' ? ' text-orange-700' : 'text-neutral-300']"
          />
        </div>
        <div class="mb-8 text-5xl text-black">{{ task.icon }}</div>
        <div class="text-2xl text-black">{{ task.progress }}/100</div>
        <div class="text-xs font-semibold text-black">
          {{ task.description }}
        </div>
      </RouterLink>
    </div>
  </div>
</template>
