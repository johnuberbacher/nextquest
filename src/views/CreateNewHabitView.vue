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
import FullScreenLoading from '../components/ui/FullScreenLoading.vue'
import TextInput from '../components/input/TextInput.vue'

const router = useRouter()

const taskStore = useTaskStore()
const categoryStore = useCategoryStore()
const { createTask } = taskStore
const { selectedCategoryId, categories, getCategoryById } = categoryStore

// Form fields
const selectedDuration = ref(3) // in minutes
const selectedDays = ref(['Mon']) // at least one day
const selectedTimeOfDay = ref('05:00') // time in HH:mm
const selectedColor = ref('bg-red-200')
const selectedEmoji = ref('')
const taskName = ref('') // Optional: can be static or editable later
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
    !selectedDuration.value ||
    !selectedDays.value.length ||
    !selectedTimeOfDay.value ||
    !selectedColor.value ||
    !selectedEmoji.value ||
    !taskDescription.value
  )
})

const selectedCategory = computed(() => {
  return selectedCategoryId !== undefined ? getCategoryById(selectedCategoryId) : null
})

function handleSelectDescriptionSuggestion(value: string) {
  taskDescription.value = value
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
    class="flex h-full w-full flex-grow flex-col items-start justify-start gap-4 overflow-hidden bg-neutral-50 p-4 py-4 dark:bg-neutral-800"
  >
    <!-- Form -->
    <div class="flex w-full flex-col items-start justify-start gap-4 px-4">
      <div class="relative flex w-full flex-row items-start justify-start gap-4">
        <div class="flex w-full flex-col items-start justify-start gap-1">
          <div class="flex w-full flex-col items-start justify-start gap-2">
            <div class="text-md font-bold dark:text-white">
              {{ 'New ' + selectedCategory.name + ' habit' }}
            </div>
            <div class="text-sm text-neutral-500 dark:text-neutral-500">
              Enter the details of your new habit below. You can choose the time, frequency, and
              other options to customize your habit.
            </div>
            <div
              class="inline-flex w-auto rounded-sm border px-1.5 py-0.5 text-[10px] font-bold text-black dark:border-white dark:text-white"
            >
              {{ selectedCategory.name }}
            </div>
          </div>
        </div>
        <div
          class="md:h-21 mt-1 flex aspect-square h-12 items-center justify-center rounded-full border border-neutral-200 bg-neutral-100 text-center text-white dark:border-neutral-500 dark:bg-neutral-700 md:mt-0"
        >
          <div class="-mt-1 ml-0.5 flex items-center justify-center text-3xl md:text-4xl">
            {{ selectedCategory.icon }}
          </div>
        </div>
      </div>
    </div>
    <!--<div class="flex w-full flex-col items-start justify-start gap-2">
      <div class="text-md font-bold dark:text-white">
        {{ 'New ' + selectedCategory.name + ' habit' }}
      </div>
      <div class="text-sm text-neutral-500 dark:text-neutral-500">
        Enter the details of your new habit below. You can choose the time, frequency, and other
        options to customize your habit.
      </div>
    </div>-->

    <div class="flex w-full flex-grow flex-col overflow-hidden px-4">
      <form
        class="flex w-full flex-grow flex-col items-start justify-start gap-4 overflow-y-auto overflow-x-hidden rounded-xl border border-neutral-200 bg-neutral-50 bg-white px-4 py-4 dark:border-neutral-700 dark:bg-neutral-900"
      >
        <div class="flex w-full flex-col gap-2">
          <label
            class="w-full whitespace-nowrap text-xs font-semibold text-neutral-900 dark:text-neutral-200"
            >Short description</label
          >
          <TextInput
            v-model="taskDescription"
            placeholder="Read a book for 10 minutes every day"
            :suggestions="selectedCategory.suggestions"
            @select="handleSelectDescriptionSuggestion"
            :maxLength="100"
          />
        </div>
        <div class="divider -mx-4 my-0 h-0.5"></div>
        <div class="flex w-full flex-col gap-2">
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
        </div>
        <div class="divider -mx-4 my-0 h-0.5"></div>
        <div class="flex w-full flex-col gap-2">
          <MultiSelectWeekdays v-model="selectedDays" label="Select days of the week" />
        </div>
        <div class="divider -mx-4 my-0 h-0.5"></div>
        <!--<div class="flex w-full flex-col gap-2">
        <TimePicker v-model="selectedTimeOfDay" label="Select time of the day" />
      </div>-->

        <div class="flex w-full flex-col gap-2">
          <ColorPicker v-model="selectedColor" label="Select label color" />
        </div>
        <div class="divider -mx-4 my-0 h-0.5"></div>
        <div class="flex w-full flex-col gap-2">
          <EmojiPicker v-model="selectedEmoji" label="Select emoji icon" />
        </div>

        <div v-if="errors.length" class="space-y-1 text-sm text-red-500">
          <div v-for="(e, i) in errors" :key="i">• {{ e }}</div>
        </div>
      </form>
    </div>
    <div class="flex h-auto w-full flex-col items-end justify-end gap-4 px-4 md:flex-row">
      <!--<button
        :disabled="submitting"
        @click="router.push('/add-new-habit')"
        class="btn btn-default btn-lg w-full rounded-full px-10 text-sm md:w-auto"
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
