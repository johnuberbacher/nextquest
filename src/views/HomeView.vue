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

const store = useTaskStore()
const { tasks, createTask } = store
</script>

<template>
  <main
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
                class="flex w-auto select-none rounded-sm bg-green-600 px-1.5 py-0.5 text-[10px] font-bold text-white"
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
                {{ task.name }}
              </div>
            </RouterLink>
          </div>
        </div>
        <div class="flex w-full flex-col items-start justify-start gap-4 px-6">
          <div class="flex w-full flex-row items-center justify-between">
            <label class="text-lg font-bold dark:text-white">Weeklies</label>
            <div class="text-xs font-semibold text-neutral-500">View All</div>
          </div>
          <div class="grid w-full grid-cols-2 flex-wrap gap-6">None</div>
        </div>
        <div class="gap-0.75 flex flex-row flex-wrap py-10">
          <div
            v-for="(item, index) in 300"
            :class="[
              'h-2.5 w-2.5 rounded-xs',
              index === 10 ? 'bg-blue-400' : 'bg-slate-800 border border-slate-700',
            ]"
            :key="index"
          ></div>
        </div>
      </div>
    </div>
  </main>
</template>
