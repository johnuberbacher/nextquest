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
const { user, logHabitEntry, hasLoggedToday } = userStore
const { selectedCategoryId, categories, getCategoryById } = categoryStore
const { getTaskById } = taskStore

const task = computed(() => getTaskById(id.value))
const category = computed(() => getCategoryById(task.value.categoryId))
const taskColor = computed(() => task.value?.color || 'bg-red-200')

const router = useRouter()

// Form fields
const selectedDuration = ref(3) // in minutes
const selectedDays = ref([1]) // at least one day
const selectedTimeOfDay = ref('05:00') // time in HH:mm
const selectedColor = ref('bg-red-50')
const selectedEmoji = ref('😀')
const taskName = ref('')
const taskDescription = ref('')

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
    <div class="flex w-full flex-row items-center justify-start gap-3">
      <div
        class="h-21 flex aspect-square items-center justify-center rounded-full text-center text-white"
        :class="[taskColor]"
      >
        <div class="-mt-1 ml-0.5 flex items-center justify-center text-4xl">
          {{ task.icon }}
        </div>
      </div>
      <div class="flex w-full flex-col items-start justify-start gap-2">
        <div class="text-2xl font-bold text-neutral-900 dark:text-white">
          {{ category.name + ' habit' }}
        </div>
        <div class="text-sm text-neutral-500 dark:text-neutral-500">
          {{ task.description || 'error!' }}
        </div>
      </div>
    </div>

    <div
      class="flex w-full flex-col items-start justify-start gap-8 overflow-y-auto rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900"
    >
      <Notification
        title="Welcome to NextQuest!"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt."
        icon="🍕"
      />
      <div class="flex w-full flex-row items-end justify-start gap-6">
        <div class="flex flex-col">
          <div class="mb-1 w-full whitespace-nowrap text-xs font-semibold text-neutral-400">
            This week
          </div>
          <div class="text-xl font-semibold">62%</div>
          <div class="text-xs font-semibold text-neutral-600">Complete</div>
        </div>
        <div class="mb-1 flex w-full flex-col items-end justify-end gap-2">
          <div class="text-xs font-semibold text-neutral-400">3/7</div>
          <progress className="progress progress-info w-full" value="70" max="100"></progress>
        </div>
      </div>
      <div class="flex w-full flex-row items-end justify-start gap-6">
        <div class="flex flex-col">
          <div class="mb-1 w-full whitespace-nowrap text-xs font-semibold text-neutral-400">
            Last 2 months
          </div>
          <div class="text-xl font-semibold">48%</div>
          <div class="text-xs font-semibold text-neutral-600">Complete</div>
        </div>
        <div class="mb-1 flex w-full flex-col items-end justify-end gap-2">
          <div class="text-xs font-semibold text-neutral-400">18/34</div>
          <progress className="progress progress-info w-full" value="70" max="100"></progress>
        </div>
      </div>
      <div class="w-full">
        <ul class="steps w-full justify-between text-sm font-semibold">
          <li data-content="M" class="step"></li>
          <li data-content="T" class="step"></li>
          <li data-content="✓" class="step step-primary"></li>
          <li data-content="✓" class="step step-primary"></li>
          <li data-content="F" class="step"></li>
          <li data-content="S" class="step"></li>
          <li data-content="S" class="step"></li>
        </ul>
      </div>
      <!--<div role="alert" class="alert alert-info w-full shadow-lg">
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
          >You're on a 2 day streak! <br />Make sure you keep up the momentum.</span
        >
      </div>-->
      <fieldset class="flex w-full flex-col gap-1">
        <label class="text-sm font-semibold dark:text-white">Short description</label>
        <div class="">{{ taskDescription || 'error!' }}</div>
      </fieldset>

      <fieldset class="flex w-full flex-col gap-1">
        <label class="text-sm font-semibold dark:text-white">Duration</label>
        <div class="">{{ taskDuration || 'error!' }}</div>
      </fieldset>

      <fieldset class="flex w-full flex-col gap-1">
        <label class="text-sm font-semibold dark:text-white">Repeats every</label>
        <div class="">{{ taskDuration || 'error!' }}</div>
      </fieldset>

      <fieldset class="flex w-full flex-col gap-1">
        <label class="text-sm font-semibold dark:text-white">Frequency/Time of Day</label>
        <div class="">{{ taskDuration || 'error!' }}</div>
      </fieldset>

      <fieldset class="flex w-full flex-col gap-1">
        <label class="text-sm font-semibold dark:text-white">Created</label>
        <div class="">{{ taskDuration || 'error!' }}</div>
      </fieldset>
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
