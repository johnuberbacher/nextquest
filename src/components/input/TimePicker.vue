<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    default: '05:00',
  },
  label: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <fieldset class="w-full gap-1 flex flex-col">
    <label v-if="label" class="text-sm dark:text-white font-semibold">
      {{ label }}
    </label>
    <div
      class="w-full flex flex-row gap-1 items-center justify-between overflow-x-auto scroll-smooth"
    >
      <input
        type="time"
        class="input w-full border border-gray-300 dark:border-gray-700 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </fieldset>
</template>
