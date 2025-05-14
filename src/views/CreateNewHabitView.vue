<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/useTaskStore'
import { useCategoryStore } from '@/stores/useCategoryStore'
import SingleSelectChips from '../components/input/SingleSelectChips.vue'
import MultiSelectWeekdays from '../components/input/MultiSelectWeekdays.vue'
import TimePicker from '../components/input/TimePicker.vue'
import ColorPicker from '../components/input/ColorPicker.vue'
import EmojiPicker from '../components/input/EmojiPicker.vue'
import InputLabel from '../components/input/InputLabel.vue'
import FullScreenLoading from '../components/ui/FullScreenLoading.vue'
import TextInput from '../components/input/TextInput.vue'
import Suggestion from '../components/input/Suggestion.vue'

const router = useRouter()

const taskStore = useTaskStore()
const categoryStore = useCategoryStore()
const { createTask } = taskStore
const { selectedCategoryId, categories, getCategoryById } = categoryStore

// Form fields
const selectedDuration = ref(1) // in minutes
const selectedDays = ref(['Mon']) // at least one day
const selectedTimeOfDay = ref('05:00') // time in HH:mm
const selectedColor = ref('border-red-200 dark:border-red-300 bg-red-100 dark:bg-red-200')
const selectedEmoji = ref('🐼')
const taskName = ref('')
const taskDescription = ref('') // Optional: can be static or editable later

const submitting = ref(false)
const errors = ref<string[]>([])

const handleSubmit = async () => {
  console.log('clicked')
  submitting.value = true
  errors.value = []

  if (!selectedDays.value.length) {
    errors.value.push('At least one day must be selected.')
  }

  if (!selectedTimeOfDay.value) {
    errors.value.push('Time of day is required.')
  }

  if (errors.value.length === 0) {
    const newTask = await createTask({
      name: taskName.value,
      description: taskDescription.value,
      icon: selectedEmoji.value,
      progress: 0,
      state: 'pending',
      durationMinutes: selectedDuration.value,
      daysOfWeek: selectedDays.value,
      timeOfDay: selectedTimeOfDay.value,
      color: selectedColor.value,
      categoryId: selectedCategoryId,
      startDate: null,
      endDate: null,
    })

    await new Promise((r) => setTimeout(r, 1000))
    if (newTask) {
      submitting.value = false
      console.log('newTask')
      console.log(newTask)
      router.push('/habit/' + newTask.id)
    } else {
      errors.value.push('Failed to create task. Please try again.')
    }
  }
}

const fieldValidation = computed(() => {
  if (submitting.value) {
    return true
  }

  if (errors.value.length > 0) {
    return true
  }

  return (
    !taskName.value ||
    !selectedDuration.value ||
    !selectedDays.value.length ||
    !selectedTimeOfDay.value ||
    !selectedColor.value ||
    !selectedEmoji.value
  )
})

const selectedCategory = computed(() => {
  return selectedCategoryId !== undefined ? getCategoryById(selectedCategoryId) : null
})

function handleSelectDescriptionSuggestion(value: string) {
  taskName.value = value
}

onMounted(() => {
  if (!selectedCategory.value?.name) {
    router.push('/')
  }
})

watchEffect(() => {
  if (!selectedCategory.value?.name) {
    router.push('/')
  }
})

watchEffect(() => {
  if (selectedCategory.value?.icon && selectedEmoji.value === '😀') {
    selectedEmoji.value = selectedCategory.value.icon
  }
})
</script>

<template>
  <FullScreenLoading v-if="!selectedCategory?.name" />
  <div
    v-else
    class="bg-neutral-50 dark:bg-neutral-800 flex h-full w-full flex-grow flex-col items-start justify-start gap-4 overflow-hidden p-4 py-4"
  >
    <!-- Form -->
    <div class="flex w-full flex-col items-start justify-start gap-4">
      <div class="relative flex w-full flex-row items-start justify-start gap-4">
        <div class="flex w-full flex-col items-start justify-start gap-1">
          <div class="flex w-full flex-col items-start justify-start gap-2">
            <div class="text-md font-bold">
              {{ 'New ' + selectedCategory.name + ' habit' }}
            </div>
            <div class="text-neutral-500 dark:text-neutral-400 text-sm font-medium tracking-tight">
              Enter the details of your new habit below. You can choose the time, frequency, and
              other options to customize your habit.
            </div>
            <div
              class="inline-flex w-auto rounded-sm border border-orange-800 bg-orange-700 px-1.5 py-0.5 text-[10px] font-bold text-white"
            >
              {{ selectedCategory.name }}
            </div>
          </div>
        </div>

        <div
          class="border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 flex aspect-square h-16 items-center justify-center rounded-full border bg-white text-center text-white"
        >
          <div class="flex aspect-square items-center justify-center text-3xl leading-none">
            {{ selectedCategory.icon }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-full flex-grow flex-col overflow-hidden">
      <form
        class="border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 flex w-full flex-grow flex-col items-start justify-start gap-4 overflow-y-auto overflow-x-hidden rounded-xl border bg-white py-4"
      >
        <div class="fieldset flex w-full flex-col px-4">
          <div class="fieldset-legend pt-0">Habit</div>
          <TextInput
            v-model="taskName"
            @select="handleSelectDescriptionSuggestion"
            :maxLength="100"
            placeholder="..."
          />
          <p class="text-neutral-500 dark:text-neutral-500 text-xs">
            What’s the habit you want to track? Be specific and actionable.
          </p>
          <Suggestion
            :suggestions="selectedCategory.suggestions"
            @select="handleSelectDescriptionSuggestion"
          />
        </div>
        <div class="bg-neutral-200 dark:bg-neutral-700 min-h-[1px] w-full"></div>
        <div class="fieldset flex w-full flex-col px-4">
          <div class="fieldset-legend pt-0">Short Description</div>
          <TextInput
            v-model="taskDescription"
            @select="handleSelectDescriptionSuggestion"
            :maxLength="200"
            placeholder="..."
          />
          <p class="text-neutral-500 dark:text-neutral-500 text-xs">
            Any more detail or context for this habit (optional).
          </p>
        </div>
        <div class="bg-neutral-200 dark:bg-neutral-700 min-h-[1px] w-full"></div>
        <div class="fieldset flex w-full flex-col px-4">
          <div class="fieldset-legend pt-0">Duration</div>
          <SingleSelectChips
            v-model="selectedDuration"
            :items="[
              '1 min',
              '3 mins',
              '5 mins',
              '10 mins',
              '20 mins',
              '30 mins',
              '40 mins',
              '50 mins',
              '60 mins',
            ]"
            label="Duration (minutes)"
          />
          <p class="text-neutral-500 dark:text-neutral-500 text-xs">
            How long do you usually spend on this habit?
          </p>
        </div>
        <div class="bg-neutral-200 dark:bg-neutral-700 min-h-[1px] w-full"></div>
        <div class="fieldset flex w-full flex-col px-4">
          <div class="fieldset-legend pt-0">Repeat Days</div>
          <MultiSelectWeekdays v-model="selectedDays" />
          <p class="text-neutral-500 dark:text-neutral-500 text-xs">
            On which days does this habbit occur?
          </p>
        </div>
        <div class="bg-neutral-200 dark:bg-neutral-700 min-h-[1px] w-full"></div>
        <!--<div class="flex w-full flex-col gap-2">
        <TimePicker v-model="selectedTimeOfDay" label="Select time of the day" />
      </div>-->

        <div class="fieldset flex w-full flex-col px-4">
          <ColorPicker v-model="selectedColor" label="Label color" />
          <p class="text-neutral-500 dark:text-neutral-500 text-xs">
            This color will appear on the dashboard to help visually group your habits.
          </p>
        </div>
        <div class="bg-neutral-200 dark:bg-neutral-700 min-h-[1px] w-full"></div>
        <div class="fieldset flex w-full flex-col px-4">
          <EmojiPicker v-model="selectedEmoji" label="Emoji icon" />
          <p class="text-neutral-500 dark:text-neutral-500 text-xs">
            Pick an emoji to quickly recognize this habit at a glance.
          </p>
        </div>

        <div v-if="errors.length" class="space-y-1 text-sm text-red-500">
          <div v-for="(e, i) in errors" :key="i">• {{ e }}</div>
        </div>
      </form>
    </div>
    <div class="flex h-auto w-full flex-col items-end justify-end gap-4 md:flex-row">
      <!--<button
        :disabled="submitting"
        @click="router.push('/add-new-habit')"
        class="btn-default btn btn-lg w-full rounded-full px-10 text-sm md:w-auto"
      >
        Go back
      </button>-->
      <button
        @click="handleSubmit"
        :disabled="fieldValidation"
        class="btn btn-primary btn-lg w-full rounded-full px-10 text-sm md:w-auto"
      >
        {{ submitting ? 'Saving...' : 'Save habit' }}
      </button>
    </div>
  </div>
</template>
