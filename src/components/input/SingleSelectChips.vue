<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Number,
    default: 0,
  },
  label: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const selectedIndex = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    selectedIndex.value = newVal
  },
)

const selectItem = (index) => {
  selectedIndex.value = index
  emit('update:modelValue', index)
}
</script>
<template>
  <div
    class="flex w-full max-w-full snap-x snap-mandatory flex-row items-center gap-2 overflow-x-auto scroll-smooth sm:justify-start"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="[
        'cursor-pointer rounded-lg px-5.5 py-2.5 text-center flex flex-col items-center justify-center',
        selectedIndex === index
          ? 'bg-orange-50 dark:bg-neutral-800 border border-orange-700 shadow-sm'
          : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700',
      ]"
      @click="selectItem(index)"
    >
      <div class="whitespace-nowrap font-medium text-black dark:text-white">
        {{ item }}
      </div>
    </div>
  </div>
</template>
