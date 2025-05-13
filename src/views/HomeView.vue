<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTaskStore } from '@/stores/useTaskStore'
import { useUserStore } from '@/stores/useUserStore'
import { useNotificationStore } from '@/stores/useNotificationStore'
import Notification from '../components/ui/Notification.vue'
import DailiesWidget from '../components/ui/DailiesWidget.vue'
import WeekliesWidget from '../components/ui/WeekliesWidget.vue'
import FullScreenLoading from '../components/ui/FullScreenLoading.vue'
import LevelProgressBar from '../components/ui/user/LevelProgressBar.vue'
import CalendarWidget from '../components/ui/CalendarWidget.vue'

const taskStore = useTaskStore()
const userStore = useUserStore()
const notificationStore = useNotificationStore()
const { tasks, getTasksForToday } = taskStore
const { user, getUserTitle, getExpForNextLevel } = userStore

const selectedDate = ref(new Date())

const handleDateChange = (newDate: Date) => {
  selectedDate.value = newDate
}

function formatCalendarWidgetDate(date: Date) {
  if (!date) return 'Today'

  const today = new Date()
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()

  if (isToday) return 'Today'

  const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)
  const day = date.getDate()

  const getOrdinal = (n) =>
    n > 3 && n < 21 ? `${n}th` : `${n}${['st', 'nd', 'rd'][(n % 10) - 1] || 'th'}`

  return `${dayOfWeek}, ${month} ${getOrdinal(day)}`
}

const dailies = computed(() => {
  const selected = selectedDate.value

  const selectedDay = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(selected)

  return tasks.filter((task) => {
    return task.daysOfWeek?.includes(selectedDay)
  })
})

const userTitle = computed(() => {
  return getUserTitle()
})

// Get the first login toast
const firstLoginToast = notificationStore.toastMessages.find(
  (toast) => toast.id === 'firstLoginToast',
)

// Dismiss the first login toast
const dismissFirstLoginToast = () => {
  notificationStore.dismissToast('firstLoginToast')
}
</script>

<template>
  <FullScreenLoading v-if="!user || !tasks" />
  <main
    v-else
    class="flex h-full w-full flex-grow flex-col items-start justify-between overflow-hidden"
  >
    <div class="flex h-full w-full flex-col items-start justify-start gap-4">
      <div class="flex w-full flex-col items-start justify-start gap-4 px-4 pt-4 md:px-4">
        <div class="flex w-full flex-row items-start justify-start gap-3">
          <div
            class="h-21 flex aspect-square items-center justify-center rounded-full bg-neutral-200 text-center text-white dark:bg-neutral-600"
          >
            <div class="-mt-1.5 ml-0.5 flex items-center justify-center text-5xl">
              {{ user.avatar }}
            </div>
          </div>
          <div class="flex w-full flex-col items-start justify-start gap-1">
            <div class="flex w-full flex-row items-center justify-between gap-2">
              <div class="text-md font-bold dark:text-white">{{ user.name }}</div>
            </div>
            <div class="flex w-full flex-col items-start justify-start gap-0">
              <div class="flex w-full flex-row items-center justify-between gap-2">
                <div class="whitespace-nowrap text-xs font-medium tracking-tight text-neutral-500">
                  Level: {{ user.level }}
                </div>
                <div class="whitespace-nowrap text-xs font-medium tracking-tight text-neutral-500">
                  EXP: {{ Math.round((user.exp / getExpForNextLevel(user.level)) * 100) }}/100%
                </div>
              </div>
              <LevelProgressBar
                :value="user.exp"
                :max="getExpForNextLevel(user.level)"
                :animate="true"
              />
              <div class="items mt-2 flex w-full flex-row items-center justify-between gap-1">
                <div
                  :class="userTitle?.color"
                  class="flex w-auto rounded-sm px-2 py-1 text-[10px] font-bold uppercase"
                >
                  {{ userTitle?.title }}
                </div>
                <div class="flex w-auto gap-1 rounded-sm">
                  <div
                    v-for="(item, index) in 8"
                    :key="index"
                    :class="[
                      'aspect-square h-4 rounded-full border border-dashed ',
                      ' border-neutral-300 dark:border-neutral-600',
                    ]"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Notification
          v-if="firstLoginToast.show"
          @dismiss="dismissFirstLoginToast"
          title="Welcome to NextQuest!"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt."
          icon="🍕"
        />
      </div>

      <div
        class="flex min-h-[80px] w-full flex-col items-start justify-start gap-4 overflow-x-auto overflow-y-hidden"
      >
        <CalendarWidget @update:activeDate="handleDateChange" />
      </div>

      <div class="flex w-full flex-col items-start justify-start gap-4 overflow-hidden px-4">
        <div class="flex w-full flex-row items-center justify-between">
          <div class="text-md font-bold dark:text-white">
            {{ formatCalendarWidgetDate(selectedDate) }}
          </div>
          <RouterLink
            :to="'/habits'"
            class="whitespace-nowrap py-1 text-xs font-medium tracking-tight text-neutral-500"
          >
            View All
          </RouterLink>
        </div>

        <!-- Scrollable DailiesWidget -->
        <div class="w-full overflow-y-auto" style="max-height: 100%">
          <DailiesWidget :tasks="dailies" :selectedDate="selectedDate" :cols="2" :md-cols="2" />
        </div>
      </div>
    </div>
  </main>
</template>

<!--<WeekliesWidget />-->
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
