<script setup lang="ts">
import { computed } from 'vue'
import { RiCheckFill } from '@remixicon/vue'
import { useTaskStore } from '@/stores/useTaskStore'
import { useUserStore } from '@/stores/useUserStore'
import Notification from '../components/ui/Notification.vue'
import DailiesWidget from '../components/ui/DailiesWidget.vue'
import WeekliesWidget from '../components/ui/WeekliesWidget.vue'
import FullScreenLoading from '../components/ui/FullScreenLoading.vue'
import LevelProgressBar from '../components/ui/user/LevelProgressBar.vue'

const taskStore = useTaskStore()
const userStore = useUserStore()
const { tasks, createTask, getTasksForToday } = taskStore
const { user, getAchievementTitle, getExpForNextLevel } = userStore

const dailies = computed(() => {
  return getTasksForToday()
})

const getAchievements = computed(() => {
  return getAchievementTitle()
})
</script>

<template>
  <FullScreenLoading v-if="!tasks" />

  <main
    v-else
    class="flex h-full w-full flex-grow flex-col items-start justify-between gap-6 overflow-hidden"
  >
    <div class="flex h-full w-full flex-col items-start justify-start gap-6">
      <div class="flex w-full flex-col items-start justify-start gap-6 px-4 pt-6 md:px-6">
        <div class="flex w-full flex-row items-center justify-start gap-3">
          <div
            class="h-21 flex aspect-square items-center justify-center rounded-full bg-neutral-200 text-center text-white dark:bg-neutral-600"
          >
            <div class="-mt-1.5 ml-0.5 flex items-center justify-center text-5xl">
              {{ user.avatar }}
            </div>
          </div>
          <div class="flex w-full flex-col items-start justify-start gap-1">
            <div class="flex w-full flex-row items-center justify-between gap-2">
              <div class="font-bold dark:text-white">{{ user.name }}</div>
              <div
                class="flex w-auto rounded-sm bg-green-600 px-2 py-1 text-[10px] font-bold uppercase text-white"
              >
                {{ getAchievements }}
              </div>
            </div>

            <!--<div
        class="relative w-full rounded-2xl border border-neutral-200 p-4 dark:border-neutral-700 dark:bg-neutral-900"
      >
        <div class="flex flex-row gap-4">
          <div
            class="flex aspect-square h-14 items-center justify-center rounded-full border border-neutral-200 bg-neutral-100 text-center text-white dark:border-neutral-700 dark:bg-neutral-800"
          >
            <div class="-mt-2 flex aspect-square items-center justify-center text-3xl">👑</div>
          </div>
          <div class="-mt-1 flex w-full flex-col items-start justify-center gap-1 text-start">
            <div class="font-bold text-neutral-700 dark:text-white">New Title Earned!</div>
            <div
              class="flex w-auto rounded-sm bg-green-600 px-2 py-1 text-[10px] font-bold uppercase text-white"
            >
              Just Showed Up
            </div>
          </div>
        </div>
      </div>-->
            <div class="flex w-full flex-col items-start justify-start gap-1">
              <div class="flex w-full flex-row items-center justify-between gap-2">
                <div class="text-xs font-bold text-neutral-600 dark:text-neutral-300">
                  Level {{ user.level }}
                </div>
                <div class="text-xs font-bold text-neutral-500 dark:text-neutral-500">
                  {{ user.exp }}/{{ getExpForNextLevel(user.level) }}
                </div>
              </div>
              <LevelProgressBar
                :value="user.exp"
                :max="getExpForNextLevel(user.level)"
                :animate="true"
              />
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
          title="Welcome to Next Quest!"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt."
          icon="🍕"
        />
      </div>

      <div class="px flex h-full w-full flex-col items-start justify-start gap-8 overflow-y-auto">
        <CalendarWidget />

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
          <DailiesWidget :tasks="dailies" />
        </div>
        <WeekliesWidget />
      </div>
    </div>
  </main>
</template>
