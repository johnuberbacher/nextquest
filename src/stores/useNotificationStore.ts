import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Event {
  id: string
  show: boolean
}

export interface ToastMessage {
  id: string
  message: string
  show: boolean
}

export const useNotificationStore = defineStore('notification', () => {
  const events = ref<Array<Event>>([
    {
      id: 'introWelcomeScreen',
      show: true,
    },
  ])

  const toastMessages = ref<Array<ToastMessage>>([
    {
      id: 'firstLoginToast',
      message: 'Welcome to the app! This is your first login.',
      show: true,
    },
  ])

  const dismissToast = (id: string) => {
    const toast = toastMessages.value.find((toast) => toast.id === id)
    if (toast) {
      toast.show = false
    }
  }

  const addToast = (message: string) => {
    const newToast: ToastMessage = {
      // Generate a unique ID based on timestamp, LAZY! :(
      id: `toast-${Date.now()}`,
      message,
      show: true,
    }
    toastMessages.value.push(newToast)
  }

  const dismissEvent = (id: string) => {
    const event = events.value.find((event) => event.id === id)
    console.log(event)
    console.log('-')
    if (event) {
      event.show = false
    }
    console.log(event)
  }

  const addEvent = () => {
    const newEvent: Event = {
      // Generate a unique ID based on timestamp, LAZY! :(
      id: `event-${Date.now()}`,
      show: true,
    }
    events.value.push(newEvent)
  }

  return {
    events,
    toastMessages,
    dismissEvent,
    dismissToast,
    addToast,
  }
})
