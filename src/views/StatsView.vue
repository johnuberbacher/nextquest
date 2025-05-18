<script setup lang="ts">
import { computed } from 'vue'
import { useTaskStore } from '@/stores/useTaskStore'
import { useUserStore } from '@/stores/useUserStore'
import { useCategoryStore } from '@/stores/useCategoryStore'
import Achievement from '../components/ui/Achievement.vue'
import InputLabel from '../components/input/InputLabel.vue'
import FullScreenLoading from '../components/ui/FullScreenLoading.vue'
import BadgesWidget from '../components/ui/user/BadgesWidget.vue'
import DeleteAccountModal from '../components/ui/modal/DeleteAccountModal.vue'

const store = useTaskStore()
const userStore = useUserStore()
const categoryStore = useCategoryStore()
const { tasks: rawTasks, createTask, getTasksForToday } = store

const user = computed(() => {
  return userStore.user
})
</script>
<template>
  <FullScreenLoading v-if="!user" />
  <div
    v-else
    class="dark:bg-neutral-900 bg-neutral-100 flex w-full flex-grow flex-col items-start justify-start gap-4 overflow-y-auto overflow-x-hidden"
  >
    <div class="flex w-full flex-grow flex-col gap-4 p-4">
      <div
        class="dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 relative flex w-full flex-col items-center justify-center gap-3 rounded-xl border bg-white py-4 text-center"
      >
        <div class="flex w-full flex-col items-center justify-start gap-4">
          <div class="flex w-full flex-row items-center gap-4 px-4">
            <div
              class="border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 flex aspect-square h-10 items-center justify-center rounded-full border text-center text-white"
            >
              <div
                class="ml-0.5 flex aspect-square items-center justify-center text-xl leading-none"
              >
                {{ user.avatar }}
              </div>
            </div>
            <div class="flex w-full flex-col items-start justify-start gap-0 text-start">
              <InputLabel text="Name" />
              <div class="text-sm font-bold">{{ user.name }}</div>
            </div>
          </div>
          <div class="bg-neutral-200 dark:bg-neutral-700 min-h-[1px] w-full"></div>
          <div class="flex w-full flex-col items-start justify-start gap-0 px-4 text-start">
            <InputLabel text="Started on" />
            <div class="text-sm font-bold">
              {{
                new Date(user.dateCreated)
                  .toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                  .replace(/(\d+)(?=,)/, (match) => {
                    const day = parseInt(match)
                    const suffix =
                      day % 10 === 1 && day % 100 !== 11
                        ? 'st'
                        : day % 10 === 2 && day % 100 !== 12
                          ? 'nd'
                          : day % 10 === 3 && day % 100 !== 13
                            ? 'rd'
                            : 'th'
                    return day + suffix
                  })
              }}
            </div>
          </div>
          <div class="bg-neutral-200 dark:bg-neutral-700 min-h-[1px] w-full"></div>
          <div class="flex w-full flex-col items-start justify-start gap-0 px-4 text-start">
            <InputLabel text="Total time logged" />
            <div class="text-sm font-bold">
              {{ '22hr 30min' }}
            </div>
          </div>
          <div class="bg-neutral-200 dark:bg-neutral-700 min-h-[1px] w-full"></div>
          <div class="flex w-full flex-col items-start justify-start gap-1 px-4 text-start">
            <InputLabel text="Badges earned" />
            <BadgesWidget :level="user.level" />
          </div>
        </div>
      </div>
      <div>
        <DeleteAccountModal />
      </div>
      <Achievement v-for="achivement in user?.achievements" :userData="achivement" />
    </div>
  </div>
</template>
