<script setup lang="ts">
defineProps({
  value: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
  animate: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <progress
    class="progress progress-info w-full"
    :class="{ 'with-animation': animate }"
    :value="value"
    :max="max"
  ></progress>
</template>

<style scoped>
/* Default: no animation */
::-webkit-progress-value {
  transition: none;
}

/* Only animate when class is applied */
.with-animation::-webkit-progress-value {
  transition: width 2s ease-in;
}
</style>
