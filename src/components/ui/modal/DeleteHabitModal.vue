<script setup lang="ts">
import { ref, defineProps, computed, watch } from 'vue'
import { useTaskStore } from '@/stores/useTaskStore'

const taskStore = useTaskStore()
const { getTaskById, deleteTask } = taskStore

const props = defineProps({
  taskId: {
    type: String || Number,
    required: true,
  },
})

const modalPhrase = ref('')
const task = computed(() => getTaskById(props.taskId))

function openModal() {
  ;(document.getElementById('modal_delete_habit') as HTMLDialogElement)?.showModal()
}

const handleDismiss = () => {
  ;(document.getElementById('modal_delete_habit') as HTMLDialogElement)?.close()
}
</script>

<template>
  <!-- Open the modal using ID.showModal() method -->
  <button
    @click="openModal"
    class="btn btn-error btn-outline btn-sm w-full min-w-full rounded-full px-10 md:w-auto md:min-w-0"
  >
    Delete habit
  </button>
  <dialog
    id="modal_delete_habit"
    class="modal !bg-[oklch(100%_0_0/_0.9)] dark:!bg-[oklch(0%_0_0/_0.9)]"
  >
    <div
      class="border-neutral-300 dark:border-neutral-700 modal-box flex max-w-md select-none flex-col gap-4 border p-8 text-center sm:p-10"
    >
      <h3 class="text-md font-bold">Delete "{{ task?.name }}" Habit?</h3>
      <div class="text-neutral-500 text-sm">
        <span class="font-semibold">This action is permanent and cannot be undone.</span> You’ll
        lose all progress and data associated with this habit.
      </div>
      <div class="text-neutral-500 text-sm">
        Progress isn’t always about adding—sometimes it’s about letting go.
      </div>
      <div class="flex flex-col gap-4 md:flex-row md:gap-3">
        <button
          @click="task && deleteTask(task.id)"
          class="btn-default btn btn-lg w-full rounded-full text-sm md:w-auto md:flex-1"
        >
          Delete Habit
        </button>
        <button
          @click="handleDismiss"
          class="btn btn-primary btn-lg w-full rounded-full text-sm md:w-auto md:flex-1"
        >
          Cancel
        </button>
      </div>
    </div>
  </dialog>
</template>
