<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const step = ref(0)

const handleNext = () => {
  step.value++
  if (step.value >= 3) {
    router.push({ name: 'home' })
  }
}
</script>

<template>
  <div
    class="flex h-full w-full flex-grow flex-col items-center justify-center gap-4 overflow-hidden p-4"
  >
    <div class="flex h-full flex-col flex-wrap items-center justify-center gap-4 text-center">
      <div
        class="h-21 flex aspect-square items-center justify-center rounded-full bg-neutral-200 text-center text-white dark:bg-neutral-600"
      >
        <div class="-mt-1.5 ml-0.5 flex items-center justify-center text-5xl">🦊</div>
      </div>
      <div class="text-center text-lg font-bold dark:text-white" v-if="step === 0">
        Schedule and log your habits everyday with ease.
      </div>
      <div class="text-lg font-bold dark:text-white" v-if="step === 1">
        Build better habits, one day at a time.
      </div>
      <div class="text-lg font-bold dark:text-white" v-if="step === 2">
        Earn points and gain levels.
      </div>
    </div>
    <button
      class="btn btn-primary btn-lg w-full rounded-full px-10 text-sm md:w-auto"
      @click="handleNext"
    >
      Next
    </button>
  </div>
</template>
