<script setup lang="ts">
const props = defineProps<{
  streak: number
}>()

const streakMessages: Record<number, string[]> = {
  2: [
    "You're on a 2-day streak! Keep it up!",
    "You're on a 2-day streak! Nice job, don't stop!",
    "You're on a 2-day streak! Keep pushing forward!",
  ],
  3: [
    "You're on a 3-day streak! You're doing great!",
    "You're on a 3-day streak! Way to go!",
    "You're on a 3-day streak! Keep the momentum going!",
  ],
  4: [
    "You're on a 4-day streak! Almost there!",
    "You're on a 4-day streak! Just a little more!",
    "You're on a 4-day streak! Great job, you're so close!",
  ],
  5: [
    "You're on a 5-day streak! You're so close!",
    "You're on a 5-day streak! Almost at a week!",
    "You're on a 5-day streak! Keep the streak alive!",
  ],
  7: [
    "You're on a 7-day streak! You've hit the weekly goal!",
    "You're on a 7-day streak! One week strong!",
    "You're on a 7-day streak! Fantastic, you've made it through the week!",
  ],
}

const getRandomMessage = (streak: number) => {
  const messages = streakMessages[streak]
  return messages
    ? messages[Math.floor(Math.random() * messages.length)]
    : `You're on a ${streak}-day streak! Keep up the momentum!`
}
</script>

<template>
  <div v-if="streak >= 3" role="alert" class="alert alert-info w-full shadow-lg">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="h-6 w-6 shrink-0 stroke-current"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
    <span class="font-semibold">
      {{ getRandomMessage(streak) }}
    </span>
  </div>
</template>
