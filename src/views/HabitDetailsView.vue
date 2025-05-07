<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/useTaskStore'
import { useUserStore } from '@/stores/useUserStore'
import { useCategoryStore } from '@/stores/useCategoryStore'
import SingleSelectChips from '@/components/input/SingleSelectChips.vue'
import MultiSelectWeekdays from '@/components/input/MultiSelectWeekdays.vue'
import TimePicker from '@/components/input/TimePicker.vue'
import ColorPicker from '@/components/input/ColorPicker.vue'
import EmojiPicker from '@/components/input/EmojiPicker.vue'
import FullScreenLoading from '@/components/ui/FullScreenLoading.vue'
import Notification from '@/components/ui/Notification.vue'
import { useRoute } from 'vue-router'
import { RiCheckFill } from '@remixicon/vue'
import ConfirmModal from '@/components/ui/ConfirmModal.vue'
import StreakNotification from '@/components/ui/StreakNotification.vue'

const route = useRoute()
const id = computed(() => route.params.id as string)

const userStore = useUserStore()
const categoryStore = useCategoryStore()
const taskStore = useTaskStore()
const {
  user,
  logHabitEntry,
  hasLoggedToday,
  getHabitEntriesThisWeek,
  getHabitEntriesPastYear,
  getStreak,
  getThisWeekCompletion,
} = userStore
const { selectedCategoryId, categories, getCategoryById } = categoryStore
const { getTaskById } = taskStore

const task = computed(() => getTaskById(id.value))
const category = computed(() => getCategoryById(task.value.categoryId))

const router = useRouter()

const weekEntries = computed(() => userStore.getHabitEntriesThisWeek(task.value?.id))
const streak = computed(() => userStore.getStreak(weekEntries.value))
const loggedDays = computed(() => {
  return new Set(weekEntries.value.map((entry) => new Date(entry.date).getDay()))
})

const yearEntries = computed(() => userStore.getHabitEntriesPastYear(task.value?.id))

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const labelMap = weekdays.map((day) => {
  return { label: day[0], index: weekdays.indexOf(day) }
})

const activeLabels = (taskData: object) => {
  return taskData.daysOfWeek.map((day) => {
    const index = weekdays.indexOf(day)
    return index !== -1 ? weekdays[index] : day
  })
}

const weekDays = [
  { label: 'S', index: 0 },
  { label: 'M', index: 1 },
  { label: 'T', index: 2 },
  { label: 'W', index: 3 },
  { label: 'T', index: 4 },
  { label: 'F', index: 5 },
  { label: 'S', index: 6 },
]

onMounted(() => {
  if (!route.params.id || route.params.id === '') {
    router.push('/')
  }
})

watchEffect(() => {
  if (!route.params.id || route.params.id === '') {
    router.push('/')
  }
})
</script>

<template>
  <FullScreenLoading v-if="!task" />
  <div
    v-else
    class="flex h-full w-full flex-grow flex-col items-start justify-start gap-6 overflow-hidden px-4 py-6 md:px-6"
  >
    <div class="relative flex w-full flex-row items-start justify-start gap-3 md:items-center">
      <div
        class="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-white"
        :class="[hasLoggedToday(task.id) ? 'opacity-50' : 'shadow-lg ']"
      >
        <RiCheckFill
          size="20px"
          :class="[hasLoggedToday(task.id) ? 'text-neutral-400 ' : 'text-orange-700']"
        />
      </div>
      <div
        class="md:h-21 mt-1 flex aspect-square h-12 items-center justify-center rounded-full text-center text-white md:mt-0"
        :class="[task.color]"
      >
        <div class="-mt-1 ml-0.5 flex items-center justify-center text-3xl md:text-4xl">
          {{ task.icon }}
        </div>
      </div>
      <div class="flex w-full flex-col items-start justify-start gap-1">
        <div class="flex w-full flex-col items-start justify-start gap-0">
          <div class="text-xl font-bold text-neutral-900 dark:text-white">
            {{ category.name + ' habit' }}
          </div>
          <div class="text-sm text-neutral-500 dark:text-neutral-500">
            {{ task.description || 'error!' }}
          </div>
        </div>
        <div class="flex w-full flex-col items-start justify-start gap-1">
          <div class="flex w-full flex-row items-center justify-between gap-2">
            <div class="text-xs font-bold text-neutral-600 dark:text-neutral-300">
              Level: {{ task.level }}
            </div>
            <div class="text-xs font-bold text-neutral-500 dark:text-neutral-500">
              {{ task.exp }}/100
            </div>
          </div>
          <progress class="progress progress-success w-full" max="100" :value="task.exp"></progress>
        </div>
      </div>
    </div>

    <div
      class="flex w-full flex-grow flex-col items-start justify-start gap-8 overflow-y-auto rounded-xl border border-neutral-200 bg-white px-6 pb-6 pt-10 dark:border-neutral-700 dark:bg-neutral-900"
    >
      <div class="w-full text-center text-lg font-semibold text-neutral-500 dark:text-white">
        {{ task.description || 'error!' }}
      </div>
      <div class="divider my-0"></div>
      <div class="w-full">
        <ul class="steps w-full justify-between text-sm font-semibold">
          <li
            v-for="day in labelMap"
            :key="day.index"
            class="step"
            :class="[
              loggedDays.has(day.index) ? 'step-primary' : '',
              !activeLabels(task).includes(weekdays[day.index]) ? '' : '',
            ]"
            :data-content="loggedDays.has(day.index) ? '✓' : day.label"
          ></li>
        </ul>
      </div>
      <StreakNotification :streak="streak" />
      <div class="flex w-full flex-row items-end justify-start gap-6">
        <div class="flex flex-col items-start justify-start">
          <div class="mb-1 w-full whitespace-nowrap text-xs font-semibold text-neutral-400">
            This week
          </div>
          <div class="text-xl font-semibold">
            {{ Math.ceil((weekEntries.length / task.daysOfWeek.length) * 100) }}%
          </div>
          <div class="text-xs font-semibold text-neutral-600">Complete</div>
        </div>
        <div class="mb-1 flex w-full flex-col items-end justify-end gap-2">
          <div class="text-xs font-semibold text-neutral-400">
            {{ weekEntries.length }}/{{ task.daysOfWeek.length }}
          </div>
          <progress
            class="progress progress-info w-full"
            :value="weekEntries.length"
            :max="task.daysOfWeek.length"
          ></progress>
        </div>
      </div>
      <div class="flex w-full flex-row items-end justify-start gap-6">
        <div class="flex flex-col">
          <div class="mb-1 w-full whitespace-nowrap text-xs font-semibold text-neutral-400">
            Last 2 months
          </div>
          <div class="text-xl font-semibold">{{ '100' }}%</div>
          <div class="text-xs font-semibold text-neutral-600">Complete</div>
        </div>
        <div class="mb-1 flex w-full flex-col items-end justify-end gap-2">
          <div class="text-xs font-semibold text-neutral-400">{{ '100' }}/{{ '100' }}</div>
          <progress class="progress progress-info w-full" :value="'100'" max="100"></progress>
        </div>
      </div>

      <!--<div class="flex flex-row items-center justify-start gap-2">
        <i class="ri-speed-up-fill text-4xl"></i>
        <div class="flex flex-col">
          <div class="w-full whitespace-nowrap text-xs font-semibold text-neutral-400">
            Completion rate
          </div>
          <div class="text-xl font-semibold">{{ `95%` }}</div>
        </div>
      </div>-->
    </div>
    <ConfirmModal :taskId="task.id" />
    <!--<button
      @click="handleSubmit"
      :disabled="fieldValidation"
      class="btn btn-outline btn-error btn-sm ml-auto mr-0 rounded-full"
    >
      Delete this habit
    </button>-->
  </div>
</template>
