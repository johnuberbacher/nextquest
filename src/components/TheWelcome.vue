<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import { RiCheckFill } from '@remixicon/vue'
import { useTaskStore } from '@/stores/useTaskStore'
import Notification from './ui/notification.vue'

const store = useTaskStore()
const { tasks, createTask } = store

const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')
</script>

<template>
  <div class="flex w-full flex-col items-start justify-start gap-8 px-6 pb-6 pt-8">
    <div class="flex w-full flex-row items-center justify-start gap-3">
      <div
        class="h-21 flex aspect-square items-center justify-center rounded-full bg-gray-200 text-center text-white dark:bg-gray-600"
      >
        <div class="flex items-center justify-center text-6xl">🦊</div>
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
            <div class="text-xs font-bold text-gray-600 dark:text-gray-300">Level 1</div>
            <div class="text-xs font-bold text-gray-500 dark:text-gray-500">XP: 60/100</div>
          </div>
          <progress className="progress progress-info w-full" value="70" max="100"></progress>
          <div class="items flex w-full flex-row flex-wrap justify-end gap-1 text-end">
            <div
              v-for="(item, index) in 8"
              :key="index"
              :class="[
                'aspect-square h-4 rounded-full border border-dashed',
                ' border-gray-300 dark:border-gray-600',
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
    <div class="flex flex-row gap-3">
      <div
        v-for="(item, index) in 10"
        :class="[
          'select-none rounded-xl px-4 py-3 text-center flex flex-col gap-0',
          index === 2
            ? 'bg-orange-700 border border-orange-700 shadow-sm'
            : ' bg-white border border-gray-200',
        ]"
        :key="index"
      >
        <div :class="['text-xs font-semibold', index === 2 ? 'text-white' : ' text-gray-500']">
          Tue
        </div>
        <div :class="['font-semibold text-xl', index === 2 ? 'text-white' : ' text-gray-500']">
          06
        </div>
      </div>
    </div>
    <div class="flex w-full flex-col items-start justify-start gap-4">
      <div class="flex w-full flex-row items-center justify-between">
        <label class="text-lg font-bold dark:text-white">Dailies</label>
        <div class="text-xs font-semibold text-gray-500">View All</div>
      </div>
      <div class="grid w-full grid-cols-2 flex-wrap gap-6 md:grid-cols-4">
        <RouterLink
          to="/habit/1"
          v-for="task in tasks"
          :key="task.id"
          :class="['w-full rounded-xl pt-10 pb-6 px-4 relative' + ' ' + task.color]"
        >
          <div
            class="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white"
            :class="[index === 2 ? '  shadow-md' : '  ']"
          >
            <RiCheckFill
              size="20px"
              :class="[task.state === 'complete' ? ' text-orange-700' : 'text-gray-300']"
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
    <div class="flex w-full flex-col items-start justify-start gap-4">
      <div class="flex w-full flex-row items-center justify-between">
        <label class="text-lg font-bold dark:text-white">Weeklies</label>
        <div class="text-xs font-semibold text-gray-500">View All</div>
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
</template>
