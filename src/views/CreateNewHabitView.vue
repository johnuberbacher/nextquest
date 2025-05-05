<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/useTaskStore'
import { useCategoryStore } from '@/stores/useCategoryStore'
import SingleSelectChips from '@/components/input/SingleSelectChips.vue'
import MultiSelectWeekdays from '@/components/input/MultiSelectWeekdays.vue'
import TimePicker from '@/components/input/TimePicker.vue'
import ColorPicker from '@/components/input/ColorPicker.vue'
import EmojiPicker from '@/components/input/EmojiPicker.vue'
import FullScreenLoading from '@/components/ui/FullScreenLoading.vue'

const router = useRouter()

const taskStore = useTaskStore()
const categoryStore = useCategoryStore()
const { createTask } = taskStore
const { selectedCategoryId, categories, getCategoryById } = categoryStore

// Form fields
const selectedDuration = ref(3) // in minutes
const selectedDays = ref([1]) // at least one day
const selectedTimeOfDay = ref('05:00') // time in HH:mm
const selectedColor = ref('bg-red-200')
const selectedEmoji = ref('😀')
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
      startDate: null,
      endDate: null,
    })

    await new Promise((r) => setTimeout(r, 1000)) // Simulate a delay for the loading state
    if (newTask) {
      submitting.value = false
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
  return getCategoryById(selectedCategoryId)
})

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
    class="flex h-full w-full flex-grow flex-col items-start justify-start gap-6 overflow-hidden p-6"
  >
    <!-- Form -->
    <div class="flex w-full flex-col items-start justify-start gap-2">
      <div class="text-2xl font-bold text-neutral-900 dark:text-white">
        {{ 'New ' + selectedCategory.name + ' habit' }}
      </div>
      <div class="text-sm text-neutral-500 dark:text-neutral-500">
        Enter the details of your new habit below. You can choose the time, frequency, and other
        options to customize your habit.
      </div>
    </div>

    <form
      class="flex h-full w-full flex-col items-start justify-start gap-6 overflow-y-auto rounded-xl border border-neutral-200 bg-neutral-900 p-6 dark:border-neutral-700"
    >
      <fieldset class="flex w-full flex-col gap-1">
        <label class="text-sm font-semibold dark:text-white">Short description</label>
        <input
          type="text"
          placeholder="Read a book for 10 minutes every day"
          class="input w-full"
          v-model="taskDescription"
        />
      </fieldset>

      <fieldset class="flex w-full flex-col gap-1">
        <SingleSelectChips
          v-model="selectedDuration"
          :items="[1, 3, 5, 10, 15, 20, 30, 60]"
          label="Duration (minutes)"
        />
      </fieldset>

      <fieldset class="flex w-full flex-col gap-1">
        <MultiSelectWeekdays v-model="selectedDays" label="Select days of the week" />
      </fieldset>

      <fieldset class="flex w-full flex-col gap-1">
        <TimePicker v-model="selectedTimeOfDay" label="Select time of the day" />
      </fieldset>

      <fieldset class="flex w-full flex-col gap-1">
        <ColorPicker v-model="selectedColor" label="Select label color" />
      </fieldset>

      <fieldset class="flex w-full flex-col gap-1">
        <EmojiPicker v-model="selectedEmoji" label="Select custom icon" />
      </fieldset>

      <div v-if="errors.length" class="space-y-1 text-sm text-red-500">
        <div v-for="(e, i) in errors" :key="i">• {{ e }}</div>
      </div>
    </form>

    <button
      @click="handleSubmit"
      :disabled="fieldValidation"
      class="btn btn-primary w-full rounded-full"
    >
      Create new habit
    </button>
  </div>
</template>
