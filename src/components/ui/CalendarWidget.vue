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
  <div
    class="border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 bg-neutral-100 flex w-full border-t"
  >
    <div class="relative w-full overflow-hidden">
      <div
        class="dark:from-neutral-900 dark:to-neutral-900 from-neutral-50 to-neutral-50 pointer-events-none absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-r via-transparent dark:via-transparent"
      ></div>
      <div
        ref="scrollContainer"
        class="no-scrollbar flex h-full w-full overflow-x-auto overflow-y-visible py-4"
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
  </div>
</template>
