<script setup>
import { computed, defineEmits, defineProps } from 'vue'
import Suggestion from './Suggestion.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  suggestions: {
    type: Array,
    default: undefined,
  },
  class: {
    type: String,
    default: '',
  },
  maxLength: {
    type: Number,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'select'])

const updateValue = (event) => {
  let newValue = event.target.value
  if (props.maxLength !== null && newValue.length > props.maxLength) {
    newValue = newValue.slice(0, props.maxLength)
  }
  emit('update:modelValue', newValue)
}

const handleSelectDescriptionSuggestion = (value) => {
  emit('select', value)
}

const inputLength = computed(() => props.modelValue.length)
</script>

<template>
  <div class="relative w-full">
    <input
      type="text"
      :placeholder="placeholder"
      :class="`input w-full ${props.class} ${' pr-17' ?? maxLength}`"
      :value="modelValue"
      @input="updateValue"
    />
    <div
      v-if="maxLength !== null"
      class="absolute bottom-0 right-0 top-0 z-10 flex items-center justify-center pr-3 text-xs opacity-50"
    >
      {{ inputLength }}/{{ maxLength }}
    </div>
  </div>
  <Suggestion
    v-if="suggestions"
    :suggestions="suggestions"
    @select="handleSelectDescriptionSuggestion"
  />
</template>
