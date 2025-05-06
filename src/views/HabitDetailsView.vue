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

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
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
    class="flex h-full w-full flex-grow flex-col items-start justify-start gap-6 overflow-hidden p-6"
  >
    <div class="relative flex w-full flex-row items-center justify-start gap-3">
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
        class="h-21 flex aspect-square items-center justify-center rounded-full text-center text-white"
        :class="[task.color]"
      >
        <div class="-mt-1 ml-0.5 flex items-center justify-center text-4xl">
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
      class="flex w-full flex-grow flex-col items-start justify-start gap-8 overflow-y-auto rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900"
    >
      <div class="flex w-full flex-row items-end justify-start gap-6">
        <div class="flex flex-col">
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
      <div class="w-full">
        <ul class="steps w-full justify-between text-sm font-semibold">
          <li
            v-for="day in weekDays"
            :key="day.index"
            class="step"
            :class="{ 'step-primary': loggedDays.has(day.index) }"
            :data-content="loggedDays.has(day.index) ? '✓' : day.label"
          ></li>
        </ul>
      </div>
      <div v-if="streak >= 2" role="alert" class="alert alert-info w-full shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="h-6 w-6 shrink-0 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span class="font-semibold"
          >You're on a {{ streak }} day streak! <br />Make sure you keep up the momentum.</span
        >
      </div>

      <div class="flex flex-row items-center justify-start gap-2">
        <i class="ri-speed-up-fill text-4xl"></i>
        <div class="flex flex-col">
          <div class="w-full whitespace-nowrap text-xs font-semibold text-neutral-400">
            Completion rate
          </div>
          <div class="text-xl font-semibold">{{ `95%` }}</div>
        </div>
      </div>
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
