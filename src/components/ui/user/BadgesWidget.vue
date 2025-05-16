<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps({
  level: {
    type: Number,
    required: true,
  },
})

const badges = [
  { id: 0, name: 'Stonemark Badge', emoji: '🪨', level: 12 },
  { id: 1, name: 'Tideflow Badge', emoji: '💧', level: 21 },
  { id: 2, name: 'Sparkshock Badge', emoji: '⚡', level: 28 },
  { id: 3, name: 'Petalbloom Badge', emoji: '🌸', level: 36 },
  { id: 4, name: 'Mindveil Badge', emoji: '🧠', level: 44 },
  { id: 5, name: 'Nightweb Badge', emoji: '🕸️', level: 50 },
  { id: 6, name: 'Ashflare Badge', emoji: '🔥', level: 58 },
  { id: 7, name: 'Duskmire Badge', emoji: '🌙', level: 70 },
]

const displayBadges = computed(() =>
  badges.map((badge) => ({
    ...badge,
    earned: props.level >= badge.level,
  })),
)
</script>

<template>
  <div
    class="border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 flex w-auto gap-1 rounded-3xl border px-2 py-1.5 text-xs"
  >
    <div
      v-for="badge in displayBadges"
      :key="badge.id"
      :data-tip="badge.earned ? badge.name : null"
      class="tooltip flex aspect-square h-5 w-5 items-center justify-center rounded-full md:h-6 md:w-6"
      :class="
        badge.earned
          ? 'bg-amber-400 text-xs shadow-sm'
          : 'border border-dashed border-neutral-300 dark:border-neutral-600'
      "
    >
      <div
        v-if="badge.earned"
        :class="[
          'emoji-outline aspect-square w-4.5 h-4.5 rounded-full bg-amber-500 inset-shadow-xs text-xs text-center flex items-center justify-center',
        ]"
      >
        {{ badge.emoji }}
      </div>
    </div>
  </div>
</template>
<style>
.emoji-outline {
  position: relative;
  text-shadow: 0px 0.1px 2px oklch(47% 0.157 37.304);
}
.emoji-outline::before {
  position: absolute;
  content: attr(name);
  z-index: -5;
}
</style>
