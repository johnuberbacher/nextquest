<script setup>
import { ref, onMounted, nextTick } from 'vue'

const today = new Date()
today.setHours(0, 0, 0, 0)

const dateRange = Array.from({ length: 21 }, (_, i) => {
  const offset = i - 10
  const d = new Date(today)
  d.setDate(today.getDate() + offset)
  return d
})

const isToday = (date) => {
  return date.toDateString() === today.toDateString()
}

// Optional: auto-scroll to center Today
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
  <div
    ref="scrollContainer"
    class="min-h-20 no-scrollbar flex h-full w-full overflow-x-auto overflow-y-visible"
  >
    <div class="flex w-max snap-x snap-mandatory flex-row gap-3">
      <div
        v-for="(date, index) in dateRange"
        :key="index"
        class="flex h-20 w-16 shrink-0 select-none snap-center flex-col items-center justify-center gap-0 rounded-xl px-4 py-3 text-center"
        :class="
          isToday(date)
            ? 'bg-orange-700 border border-orange-700 shadow-sm'
            : 'bg-white border border-neutral-200'
        "
      >
        <div :class="['text-xs font-semibold', isToday(date) ? 'text-white' : 'text-neutral-500']">
          {{ date.toLocaleDateString('en-US', { weekday: 'short' }) }}
        </div>
        <div :class="['font-semibold text-xl', isToday(date) ? 'text-white' : 'text-neutral-500']">
          {{ String(date.getDate()).padStart(2, '0') }}
        </div>
      </div>
    </div>
  </div>
</template>
