<script setup lang="ts">
import { ref, computed } from 'vue'
import TextInput from '../input/TextInput.vue'
import { useUserStore } from '@/stores/useUserStore'
import { emojiList } from '@/data/emojiList.js'

const userStore = useUserStore()
const { user, createUser } = userStore

const emit = defineEmits(['updateIntroWelcomeScreen'])

const userName = ref('')
const userAvatar = ref(emojiList[Math.floor(Math.random() * emojiList.length)])
const step = ref(0)

const handleNext = () => {
  step.value++
  if (step.value >= 2) {
    createUser(userName.value, userAvatar.value)
    emit('updateIntroWelcomeScreen')
  }
}

const randomizeEmoji = () => {
  if (step.value === 1) {
    userAvatar.value = emojiList[Math.floor(Math.random() * emojiList.length)]
  }
}
</script>

<template>
  <div
    class="flex h-full w-full flex-grow flex-col items-center justify-center gap-6 overflow-hidden p-6"
  >
    <div class="flex h-full w-full max-w-xs flex-col flex-wrap items-center justify-center gap-6">
      <div
        @click="randomizeEmoji"
        :class="step === 1 ? 'cursor-pointer' : ''"
        class="h-50 bg-neutral-200 dark:bg-neutral-600 relative flex aspect-square items-center justify-center rounded-full text-center text-white"
      >
        <button
          v-if="step === 1"
          @click="randomizeEmoji"
          class="aspect-sqaure btn btn-primary absolute right-0 top-0 h-14 w-14 cursor-pointer rounded-full p-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2V4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 9.25022 5.38734 6.82447 7.50024 5.38451L7.5 8H9.5V2L3.5 2V4L5.99918 3.99989C3.57075 5.82434 2 8.72873 2 12Z"
            ></path>
          </svg>
        </button>
        <div class="-mt-1.5 ml-0.5 flex items-center justify-center text-8xl">
          {{ step === 0 ? '🦊' : userAvatar }}
        </div>
      </div>
      <div class="text-3xl font-bold"><span class="text-orange-600">Next</span>Quest</div>
      <div
        class="flex w-full flex-col items-center justify-center gap-6 text-center"
        v-if="step === 1"
      >
        <div class="font-light">
          To get started, all you need to do is enter a name. What would you like to be called?
        </div>
        <TextInput :maxLength="50" placeholder="Peter Parker" class="w-full" v-model="userName" />
      </div>
      <div
        v-if="step === 0"
        class="flex w-full flex-col items-center justify-center gap-6 text-center"
      >
        <div class="font-light">
          Schedule, track and log your habits everyday with ease, building better habits one day at
          a time.<br /><br />
          Earn experience points and gain levels, badges, achievements and more.
        </div>
      </div>
      <button
        :disabled="step === 1 ? !userName : undefined"
        class="btn btn-primary btn-lg w-full rounded-full text-sm"
        @click="handleNext"
      >
        {{ step === 0 ? 'Continue' : 'Get Started' }}
      </button>
    </div>
  </div>
</template>
