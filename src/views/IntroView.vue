<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useNotificationStore } from '@/stores/useNotificationStore'

const notificationStore = useNotificationStore()

const introWelcomeScreen = computed(() =>
  notificationStore.events.find((event) => event.id === 'introWelcomeScreen'),
)

const { dismissEvent } = useNotificationStore()

const router = useRouter()
const step = ref(0)

const handleNext = () => {
  step.value++
  if (step.value >= 3) {
    dismissEvent('introWelcomeScreen')
    console.log(introWelcomeScreen)
    router.push({ name: 'home' })
  }
}
</script>

<template>
  <div
    class="flex h-full w-full flex-grow flex-col items-center justify-center gap-6 overflow-hidden p-12 md:gap-12"
  >
    <div
      class="flex h-full flex-col flex-wrap items-center justify-center gap-6 text-center md:gap-12"
    >
      <div
        class="h-50 bg-neutral-200 dark:bg-neutral-600 flex aspect-square items-center justify-center rounded-full text-center text-white"
      >
        <div class="-mt-1.5 ml-0.5 flex items-center justify-center text-8xl">🦊</div>
      </div>
      <div class="text-center text-lg font-semibold" v-if="step === 0">
        Schedule and log your habits everyday with ease, build better habits, one day at a time.<br /><br />
        Earn points and gain levels.
      </div>
      <div class="text-md font-bold" v-if="step === 1">Build better habits, one day at a time.</div>
      <div class="text-md font-bold" v-if="step === 2">Earn points and gain levels.</div>
    </div>
    <button
      class="btn btn-primary btn-lg w-full rounded-full px-10 text-sm md:w-auto"
      @click="handleNext"
    >
      Get started
    </button>
  </div>
</template>
