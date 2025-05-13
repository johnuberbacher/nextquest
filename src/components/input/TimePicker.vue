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
  <fieldset class="flex w-full flex-col gap-2">
    <label v-if="label" class="text-sm font-semibold dark:text-white">
      {{ label }}
    </label>
    <div
      class="flex w-full flex-row items-center justify-between gap-1 overflow-x-auto scroll-smooth"
    >
      <input
        type="time"
        class="input w-full rounded border border-neutral-300 bg-white px-2 py-1 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
      />
    </div>
  </fieldset>
</template>
