<template>
  <div
    class="border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 flex w-auto gap-1 rounded-3xl border px-2.5 py-1.5 text-xs"
  >
    <div
      v-for="(item, index) in 8"
      :data-tip="
        'Unlocked on ' +
        new Date(Date.now() - (364 - index) * 86400000).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      "
      :key="index"
      :class="[
        'aspect-square h-5 rounded-full flex items-center justify-center text-xs',
        index === 99
          ? 'bg-amber-400 shadow-sm tooltip text-xs'
          : 'border border-dashed border-neutral-300 dark:border-neutral-600',
      ]"
    >
      <div
        v-if="index === 99"
        :class="['aspect-square h-3.5 rounded-full   bg-amber-500 inset-shadow-sm  text-xs']"
      >
        💧
      </div>
    </div>
  </div>
</template>
