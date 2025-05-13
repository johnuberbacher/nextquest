<script setup>
import { ref, onMounted, nextTick, watch, defineEmits } from 'vue'

const emit = defineEmits(['update:activeDate'])

const today = new Date()
today.setHours(0, 0, 0, 0)

const dateRange = Array.from({ length: 21 }, (_, i) => {
  const offset = i - 10
  const d = new Date(today)
  d.setDate(today.getDate() + offset)
  return d
})

const activeDate = ref(new Date(today))

const isSameDay = (date1, date2) => {
  return date1.toDateString() === date2.toDateString()
}

const handleDateClick = (date) => {
  activeDate.value = new Date(date)
  emit('update:activeDate', activeDate.value)
}

// Optional: auto-scroll to center Today on mount
const scrollContainer = ref(null)

onMounted(async () => {
  await nextTick()
  const container = scrollContainer.value
  if (container) {
    const todayCard = container.querySelector('.snap-center.bg-orange-700')
    if (todayCard) {
      const offsetLeft =
        todayCard.offsetLeft - container.offsetWidth / 2 + todayCard.offsetWidth / 2
      container.scrollLeft = offsetLeft
    }
  }
})
</script>

<template>
  <div class="relative w-full">
    <div
      class="pointer-events-none absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-r from-white via-transparent to-white dark:from-neutral-800 dark:via-transparent dark:to-neutral-800"
    ></div>
    <div
      ref="scrollContainer"
      class="min-h-20 no-scrollbar flex h-full w-full overflow-x-auto overflow-y-visible"
    >
      <div class="flex w-max snap-x snap-mandatory flex-row gap-3">
        <button
          v-for="(date, index) in dateRange"
          :key="index"
          @click="handleDateClick(date)"
          class="btn flex h-20 w-16 shrink-0 cursor-pointer snap-center flex-col items-center justify-center gap-0 rounded-xl px-4 py-3 text-center"
          :class="
            isSameDay(date, activeDate)
              ? 'bg-orange-700 border border-orange-700 shadow-sm'
              : 'bg-white border border-neutral-200'
          "
        >
          <div
            :class="[
              'text-xs font-semibold',
              isSameDay(date, activeDate) ? 'text-white' : 'text-neutral-500',
            ]"
          >
            {{ date.toLocaleDateString('en-US', { weekday: 'short' }) }}
          </div>
          <div
            :class="[
              'font-semibold text-xl',
              isSameDay(date, activeDate) ? 'text-white' : 'text-neutral-500',
            ]"
          >
            {{ String(date.getDate()).padStart(2, '0') }}
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
