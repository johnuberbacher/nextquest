<script setup lang="ts">
import { computed, onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/useTaskStore'
import { useUserStore } from '@/stores/useUserStore'
import { useCategoryStore } from '@/stores/useCategoryStore'
import FullScreenLoading from '../components/ui/FullScreenLoading.vue'
import Notification from '../components/ui/Notification.vue'
import { useRoute } from 'vue-router'
import ConfirmModal from '../components/ui/ConfirmModal.vue'
import StreakNotification from '../components/ui/StreakNotification.vue'
import LevelUpNotification from '../components/ui/LevelUpNotification.vue'
import LevelProgressBar from '../components/ui/user/LevelProgressBar.vue'
import InputLabel from '../components/input/InputLabel.vue'
import DeleteHabitModal from '../components/ui/modal/DeleteHabitModal.vue'

const router = useRouter()
const route = useRoute()
const id = computed(() => route.params.id as string)

const userStore = useUserStore()
const categoryStore = useCategoryStore()
const taskStore = useTaskStore()
const { getThisWeekCompletion, getTwoMonthsCompletion } = userStore
const { getCategoryById } = categoryStore
const { getTaskById } = taskStore

const task = computed(() => getTaskById(id.value))
const category = computed(() => getCategoryById(task.value.categoryId))

const yearEntries = computed(() => userStore.getHabitEntriesPastYear(task.value?.id))
const yearLoggedDays = computed(() => {
  return new Set(
    yearEntries.value.map((entry) => {
      return new Date(entry.date).toDateString() // Ensure it's in string format
    }),
  )
})

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const weekEntries = computed(() => userStore.getHabitEntriesThisWeek(task.value?.id))
const streak = computed(() => {
  // Ensure we're only looking at logged days in the current week
  const loggedDays = weekEntries.value.map((entry) => {
    const date = new Date(entry.date)
    return date.getUTCDate() // Get day of the month
  })

  if (loggedDays.length === 0) return 0

  // Sort the logged days in descending order (most recent first)
  loggedDays.sort((a, b) => b - a)

  let currentStreak = 1
  let maxStreak = 1

  // Iterate through the logged days and calculate the streak
  for (let i = 0; i < loggedDays.length - 1; i++) {
    const dayDifference = loggedDays[i] - loggedDays[i + 1]

    // Check if consecutive days (difference of 1 day)
    if (dayDifference === 1) {
      currentStreak++
      maxStreak = Math.max(maxStreak, currentStreak)
    } else {
      // Break in the streak
      currentStreak = 1
    }
  }

  return maxStreak
})

const loggedDays = computed(() => {
  return new Set(
    weekEntries.value.map((entry) => {
      const date = new Date(entry.date)
      return date.getUTCDay()
    }),
  )
})

const labelMap = weekdays.map((day) => {
  return { label: day[0], index: weekdays.indexOf(day) }
})

const activeLabels = (taskData: object) => {
  return taskData.daysOfWeek.map((day) => {
    const index = weekdays.indexOf(day)
    return index !== -1 ? weekdays[index] : day
  })
}

watchEffect(() => {
  const task = getTaskById(id.value)
  if (!id.value || !task) {
    router.replace('/')
  }
})
</script>

<template>
  <FullScreenLoading v-if="!task" />
  <div
    v-else
    class="bg-neutral-100 dark:bg-neutral-800 flex h-full w-full flex-grow flex-col items-start justify-start gap-4 overflow-hidden p-4"
  >
    <div class="flex w-full flex-col items-start justify-start gap-4">
      <div class="relative flex w-full flex-row items-start justify-start gap-4">
        <div class="flex w-full flex-col items-start justify-start gap-1">
          <div class="flex w-full flex-col items-start justify-start gap-2">
            <div class="text-md font-bold">
              {{ task.name || 'error!' }}
            </div>
            <div class="text-neutral-500 dark:text-neutral-400 text-sm font-medium tracking-tight">
              {{ task.description }}
            </div>
            <div
              class="inline-flex w-auto rounded-sm border border-orange-800 bg-orange-700 px-1.5 py-0.5 text-[10px] font-bold text-white"
            >
              {{ category.name }}
            </div>
          </div>
        </div>
        <div
          class="flex aspect-square h-16 items-center justify-center rounded-full border text-center text-white"
          :class="[task.color]"
        >
          <div class="flex aspect-square items-center justify-center text-3xl leading-none">
            {{ task.icon }}
          </div>
        </div>
      </div>
      <div
        class="border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 flex w-full flex-col items-start justify-start gap-1 rounded-xl border bg-white p-4"
      >
        <div class="flex w-full flex-row items-center justify-between gap-2">
          <div class="text-neutral-500 whitespace-nowrap text-xs font-semibold tracking-tight">
            Habit Level: {{ task.level }}
          </div>
          <div class="text-neutral-500 whitespace-nowrap text-xs font-semibold tracking-tight">
            EXP: {{ task.exp }}/100%
          </div>
        </div>
        <progress class="progress progress-success w-full" max="100" :value="task.exp"></progress>
      </div>
    </div>

    <div
      class="border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 flex w-full flex-grow flex-col items-start justify-start gap-4 overflow-y-auto overflow-x-hidden rounded-xl border bg-white px-4 py-4"
    >
      <div class="flex w-full flex-col items-start justify-start gap-3">
        <InputLabel :text="`Repeats: ${task.daysOfWeek.join(', ')}`" />
        <ul class="text- steps w-full justify-between font-semibold">
          <li
            v-for="day in labelMap"
            :key="day.index"
            class="step"
            :class="[
              loggedDays.has(day.index) ? 'step-primary' : '',
              !activeLabels(task).includes(weekdays[day.index]) ? 'inactive' : '',
            ]"
            :data-content="loggedDays.has(day.index) ? '✓' : day.label"
          ></li>
        </ul>
      </div>
      <StreakNotification :streak="streak" />
      <div class="divider -mx-6 my-0 h-0.5"></div>
      <div class="flex w-full flex-row items-end justify-start gap-4">
        <div class="flex w-full flex-col items-start justify-start gap-1">
          <InputLabel text="This week" />
          <div class="text-xl font-semibold">
            {{
              Math.ceil(
                (getThisWeekCompletion(task.id, task.daysOfWeek.length).completed /
                  getThisWeekCompletion(task.id, task.daysOfWeek.length).total) *
                  100,
              )
            }}%
          </div>
          <div class="text-neutral-500 whitespace-nowrap text-xs font-semibold tracking-tight">
            Complete
          </div>
        </div>
        <div class="mb-1 flex w-full flex-col items-end justify-end gap-2">
          <div class="text-neutral-500 whitespace-nowrap text-xs font-medium tracking-tight">
            {{ weekEntries.length }}/{{ task.daysOfWeek.length }}
          </div>
          <LevelProgressBar
            :value="getThisWeekCompletion(task.id, task.daysOfWeek.length).completed"
            :max="getThisWeekCompletion(task.id, task.daysOfWeek.length).total"
            :animate="true"
          />
        </div>
      </div>
      <div class="divider -mx-6 my-0 h-0.5"></div>
      <div class="flex w-full flex-row items-end justify-start gap-4">
        <div class="flex w-full flex-col items-start justify-start gap-1">
          <InputLabel text="Last 2 months" />
          <div class="text-xl font-semibold">
            {{
              Math.ceil(
                (getTwoMonthsCompletion(task.id, task.daysOfWeek.length).completed /
                  getTwoMonthsCompletion(task.id, task.daysOfWeek.length).total) *
                  100,
              )
            }}%
          </div>
          <div class="text-neutral-500 whitespace-nowrap text-xs font-semibold tracking-tight">
            Complete
          </div>
        </div>
        <div class="mb-1 flex w-full flex-col items-end justify-end gap-2">
          <div class="text-neutral-500 whitespace-nowrap text-xs font-medium tracking-tight">
            {{ getTwoMonthsCompletion(task.id, task.daysOfWeek.length).completed }}/{{
              getTwoMonthsCompletion(task.id, task.daysOfWeek.length).total
            }}
          </div>
          <LevelProgressBar
            :value="getTwoMonthsCompletion(task.id, task.daysOfWeek.length).completed"
            :max="getTwoMonthsCompletion(task.id, task.daysOfWeek.length).total"
            :animate="true"
          />
        </div>
      </div>
      <div class="divider -mx-6 my-0 h-0.5"></div>
      <div class="flex w-full flex-col items-start justify-start gap-1">
        <InputLabel text="Past year" />
        <div class="md:gap-0.75 flex flex-row flex-wrap gap-0.5">
          <div
            v-for="n in 365"
            :key="n"
            class="rounded-xs aspect-square h-auto w-3 border sm:w-3"
            :data-tip="
              new Date(Date.now() - (364 - n) * 86400000).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            "
            :class="[
              yearLoggedDays.has(new Date(Date.now() - (364 - n) * 86400000).toDateString())
                ? 'cursor-pointer tooltip bg-orange-600 border-orange-700'
                : ' bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700',
            ]"
          ></div>
        </div>
      </div>
      <div class="divider -mx-6 my-0 h-0.5"></div>
      <div class="flex w-full flex-col items-start justify-start gap-1">
        <InputLabel text="Related categories" />
        <div class="flex flex-row flex-wrap gap-x-2 gap-y-1">
          <div
            v-for="category in category.relatedCategories"
            class="inline-flex w-auto rounded-sm border border-orange-800 bg-orange-700 px-1.5 py-0.5 text-[10px] font-bold text-white"
          >
            {{ category ? getCategoryById(category).name : '' }}
          </div>
        </div>
      </div>
      <div class="divider -mx-6 my-0 h-0.5"></div>
      <div v-if="task?.createdAt" class="flex w-full flex-col items-start justify-start gap-1">
        <InputLabel text="Created" />
        <div class="whitespace-nowrap text-xs font-semibold tracking-tight">
          {{
            new Date(task?.createdAt)
              .toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
              .replace(/(\d+)(?=,)/, (match) => {
                const day = parseInt(match)
                const suffix =
                  day % 10 === 1 && day % 100 !== 11
                    ? 'st'
                    : day % 10 === 2 && day % 100 !== 12
                      ? 'nd'
                      : day % 10 === 3 && day % 100 !== 13
                        ? 'rd'
                        : 'th'
                return day + suffix
              })
          }}
        </div>
      </div>
      <div class="divider -mx-6 my-0 h-0.5"></div>
      <div class="flex w-full flex-col items-start justify-start gap-1">
        <InputLabel text="Delete habit" />
        <DeleteHabitModal :taskId="task.id" />
      </div>
    </div>
    <ConfirmModal :taskId="task.id" :active-days="activeLabels(task)" />
    <LevelUpNotification />
  </div>
</template>
