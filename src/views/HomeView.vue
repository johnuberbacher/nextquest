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
import WeekliesWidget from '../components/ui/WeekliesWidget.vue'
import FullScreenLoading from '../components/ui/FullScreenLoading.vue'

const store = useTaskStore()
const { tasks, createTask } = store
</script>

<template>
  <FullScreenLoading v-if="!tasks" />

  <main
    v-else
    class="flex h-full w-full flex-grow flex-col items-start justify-between gap-6 overflow-hidden"
  >
    <div class="flex h-full w-full flex-col items-start justify-start gap-6">
      <div class="flex w-full flex-col items-start justify-start gap-6 px-6 pt-6">
        <div class="flex w-full flex-row items-center justify-start gap-3">
          <div
            class="h-21 flex aspect-square items-center justify-center rounded-full bg-neutral-200 text-center text-white dark:bg-neutral-600"
          >
            <div class="-mt-1.5 ml-0.5 flex items-center justify-center text-5xl">🦊</div>
          </div>
          <div class="flex w-full flex-col items-start justify-start gap-1">
            <div class="flex w-full flex-row items-center justify-between gap-2">
              <div class="font-bold dark:text-white">John Uberbacher</div>
              <div
                class="flex w-auto rounded-sm bg-green-600 px-1.5 py-0.5 text-[10px] font-bold text-white"
              >
                Achiever
              </div>
            </div>
            <div class="flex w-full flex-col items-start justify-start gap-1">
              <div class="flex w-full flex-row items-center justify-between gap-2">
                <div class="text-xs font-bold text-neutral-600 dark:text-neutral-300">Level 1</div>
                <div class="text-xs font-bold text-neutral-500 dark:text-neutral-500">
                  XP: 60/100
                </div>
              </div>
              <progress className="progress progress-info w-full" value="70" max="100"></progress>
              <div class="items flex w-full flex-row flex-wrap justify-end gap-1 text-end">
                <div
                  v-for="(item, index) in 8"
                  :key="index"
                  :class="[
                    'aspect-square h-4 rounded-full border border-dashed',
                    ' border-neutral-300 dark:border-neutral-600',
                  ]"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <Notification
          title="Welcome to NextQuest!"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt."
          icon="🍕"
        />
      </div>

      <div
        class="px flex h-full w-full flex-col items-start justify-start gap-8 md:overflow-y-auto"
      >
        <CalendarWidget />
        <DailiesWidget />
        <WeekliesWidget />
      </div>
    </div>
  </main>
</template>
