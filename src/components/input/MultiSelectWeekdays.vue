<script setup lang="ts">
import { ref, computed, defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array as () => string[],
    default: () => ['Sun'],
  },
})

const emit = defineEmits(['update:modelValue'])

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const selectedDays = ref<string[]>([...props.modelValue])

watch(
  () => props.modelValue,
  (val) => {
    selectedDays.value = val.length > 0 ? [...val] : ['Sun']
  },
)

const toggleDay = (day: string) => {
  if (selectedDays.value.includes(day)) {
    if (selectedDays.value.length > 1) {
      selectedDays.value = selectedDays.value.filter((i) => i !== day)
    }
  } else {
    selectedDays.value.push(day)
  }

  // Ensure that the value is always an array of weekday names
  emit('update:modelValue', [...selectedDays.value])
}

const labelText = computed(() => {
  if (selectedDays.value.length === 7) return 'Repeats Everyday'
  if (selectedDays.value.length === 1) return 'Repeats on ' + selectedDays.value[0]
  return (
    'Repeats on ' +
    selectedDays.value.sort((a, b) => weekdays.indexOf(a) - weekdays.indexOf(b)).join(', ')
  )
})
</script>

<template>
  <div
    class="flex w-full max-w-full snap-x snap-mandatory flex-row items-center gap-2 overflow-x-auto scroll-smooth sm:justify-start"
  >
    <div
      v-for="(day, index) in weekdays"
      :key="index"
      :class="[
        'cursor-pointer rounded-lg px-5.5 py-2.5 text-center flex flex-col items-center justify-center',
        selectedDays.includes(day)
          ? 'bg-orange-50 dark:bg-neutral-800 border border-orange-700 shadow-sm'
          : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700',
      ]"
      @click="toggleDay(day)"
    >
      <div class="text-neutral-800 whitespace-nowrap text-xs font-bold dark:text-white">
        {{ day.charAt(0) }}
      </div>
    </div>
  </div>
</template>
