<template>
  <div class="flex w-full flex-grow flex-col items-start justify-between gap-6 overflow-hidden p-6">
    <div class="flex h-auto w-full flex-col items-start justify-start gap-2">
      <label class="text-2xl font-bold text-neutral-900 dark:text-white">All Habits</label>
      <div class="text-sm text-neutral-500 dark:text-neutral-500">
        Select any pre-created habbits from the list below, you can choose more than one. Don't
        worry, you'll be able to make custom habits later.
      </div>
    </div>
    <div
      class="flex w-full flex-grow flex-col items-start justify-start gap-6 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700"
    >
      <div class="grid w-full grid-cols-2 flex-wrap gap-6 overflow-y-auto p-6 md:grid-cols-3"></div>
    </div>
  </div>
</template>
