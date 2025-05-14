<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/useTaskStore'
import { useUserStore } from '@/stores/useUserStore'
import { useNotificationStore } from '@/stores/useNotificationStore'
import Notification from '../components/ui/Notification.vue'
import DailiesWidget from '../components/ui/DailiesWidget.vue'
import WeekliesWidget from '../components/ui/WeekliesWidget.vue'
import FullScreenLoading from '../components/ui/FullScreenLoading.vue'
import LevelProgressBar from '../components/ui/user/LevelProgressBar.vue'
import CalendarWidget from '../components/ui/CalendarWidget.vue'

const router = useRouter()
const taskStore = useTaskStore()
const userStore = useUserStore()
const notificationStore = useNotificationStore()
const { tasks, getTasksForToday } = taskStore
const { user, getUserTitle, getExpForNextLevel, loadUserFromLocalStorage } = userStore

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

onMounted(() => {
  userStore.loadUserFromLocalStorage()
})
</script>

<template>
  <FullScreenLoading v-if="!user || !tasks" />
  <main
    v-else
    class="flex h-full w-full flex-grow flex-col items-start justify-between overflow-hidden"
  >
    <div class="flex h-full w-full flex-col items-start justify-start gap-4">
      <div class="flex w-full flex-col items-start justify-start gap-4 px-4 pt-4">
        <div class="flex w-full flex-col items-start justify-start gap-0">
          <div class="flex w-full flex-row items-center justify-start gap-3">
            <div
              class="border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 flex aspect-square h-16 items-center justify-center rounded-full border text-center text-white"
            >
              <div class="flex aspect-square items-center justify-center text-3xl leading-none">
                {{ user.avatar }}
              </div>
            </div>
            <div class="flex w-full flex-col items-start justify-start gap-1">
              <div class="flex w-full flex-row items-center justify-between gap-2">
                <div class="text-md font-bold dark:text-white">{{ user.name }}</div>
              </div>
              <div class="flex w-full flex-col items-start justify-start gap-0">
                <div class="flex w-full flex-row items-center justify-between gap-2">
                  <div
                    class="text-neutral-500 whitespace-nowrap text-xs font-medium tracking-tight"
                  >
                    Level: {{ user.level }}
                  </div>
                  <div
                    class="text-neutral-500 whitespace-nowrap text-xs font-medium tracking-tight"
                  >
                    EXP: {{ Math.round((user.exp / getExpForNextLevel(user.level)) * 100) }}/100%
                  </div>
                </div>
                <LevelProgressBar
                  :value="user.exp"
                  :max="getExpForNextLevel(user.level)"
                  :animate="true"
                />
              </div>
            </div>
          </div>
          <div class="items mt-2 flex w-full flex-row items-center justify-between gap-1">
            <div
              class="gap-0.75 border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 flex w-auto rounded-3xl border bg-white px-2.5 py-1.5 text-xs"
            >
              <div
                v-for="(item, index) in 8"
                :data-tip="
                  'Unlocked on ' +
                  new Date(Date.now() - (364 - index) * 86400000).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                "
                :key="index"
                :class="[
                  'aspect-square h-5 rounded-full flex items-center justify-center text-xs',
                  index === 99
                    ? 'bg-amber-400 shadow-sm tooltip text-xs'
                    : 'border border-dashed border-neutral-300 dark:border-neutral-600',
                ]"
              >
                <div
                  v-if="index === 99"
                  :class="[
                    'aspect-square h-3.5 rounded-full   bg-amber-500 inset-shadow-sm  text-xs',
                  ]"
                >
                  💧
                </div>
              </div>
            </div>

            <div
              :class="userTitle?.color"
              class="flex w-auto rounded-sm border px-2 py-1 text-[10px] font-bold uppercase"
            >
              {{ userTitle?.title }}
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
      <CalendarWidget @update:activeDate="handleDateChange" />

      <div class="flex w-full flex-col items-start justify-start gap-4 overflow-hidden px-4">
        <div class="flex w-full flex-row items-center justify-between">
          <div class="text-md font-bold dark:text-white">
            {{ formatCalendarWidgetDate(selectedDate) }}
          </div>
          <RouterLink
            :to="'/habits'"
            class="text-neutral-500 whitespace-nowrap py-1 text-xs font-medium tracking-tight"
          >
            View All
          </RouterLink>
        </div>

        <!-- Scrollable DailiesWidget -->
        <div class="w-full overflow-y-auto" style="max-height: 100%">
          <div
            v-if="dailies.length === 0"
            class="border-neutral-300 dark:bg-neutral-900 dark:border-neutral-700 flex select-none flex-col items-center justify-center gap-4 rounded-xl border bg-white p-8 text-center sm:p-10"
          >
            <div class="text-md font-bold">You don’t have any habits yet!</div>
            <div class="text-neutral-500 text-sm">Nothing here yet... but greatness awaits!</div>
            <div class="text-neutral-500 text-sm">Hit the button to start your first habit.</div>
            <button
              @click="router.push('/add-new-habit')"
              class="btn btn-primary btn-lg w-full rounded-full px-10 text-sm md:w-auto"
            >
              Add New Habit
            </button>
          </div>
          <DailiesWidget
            v-if="dailies"
            :tasks="dailies"
            :selectedDate="selectedDate"
            :cols="2"
            :md-cols="2"
          />
        </div>
      </div>
    </div>
  </main>
</template>
