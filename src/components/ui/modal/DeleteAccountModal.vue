<script setup lang="ts">
import { ref, defineProps, computed, watch } from 'vue'
import { useUserStore } from '@/stores/useUserStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const { deleteUser } = userStore

function deleteAccount() {
  deleteUser()
  router.push({ name: 'home' })
}

function openModal() {
  ;(document.getElementById('modal_delete_account') as HTMLDialogElement)?.showModal()
}

const handleDismiss = () => {
  ;(document.getElementById('modal_delete_account') as HTMLDialogElement)?.close()
}
</script>

<template>
  <!-- Open the modal using ID.showModal() method -->
  <button
    @click="openModal"
    class="btn btn-error btn-outline btn-sm w-full min-w-full rounded-full px-10 md:w-auto md:min-w-0"
  >
    Delete account history
  </button>
  <dialog
    id="modal_delete_account"
    class="modal !bg-[oklch(100%_0_0/_0.9)] dark:!bg-[oklch(0%_0_0/_0.9)]"
  >
    <div
      class="border-neutral-300 dark:border-neutral-700 modal-box flex max-w-md select-none flex-col gap-4 border p-8 text-center sm:p-10"
    >
      <h3 class="text-md font-bold">Erase Your Account?</h3>
      <div class="text-neutral-500 text-sm">
        <span class="font-semibold">This action is permanent and cannot be undone.</span> All of
        your stats, habits, and progress data will be permanently deleted.
      </div>
      <div class="flex flex-col gap-4 md:flex-row md:gap-3">
        <button
          @click="deleteAccount"
          class="btn-default btn btn-lg w-full rounded-full text-sm md:w-auto md:flex-1"
        >
          Yes, Erase Account
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
