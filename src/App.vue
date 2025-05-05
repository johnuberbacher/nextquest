<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div
    class="h-full w-full max-w-3xl overflow-hidden md:m-auto md:my-16 md:rounded-3xl md:border md:border-gray-200 md:dark:border-gray-700"
  >
    <header
      class="sticky left-0 right-0 top-0 z-50 flex flex-col gap-3 bg-white px-6 py-4 dark:bg-gray-800 md:border-b md:border-gray-100 md:dark:border-gray-700"
    >
      <!--<img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />-->

      <div class="flex flex-row items-center justify-between">
        <RouterLink to="/" class="font-bold">NextQuest</RouterLink>
        <nav class="flex flex-row items-center justify-between gap-4">
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/add-new-habit">add</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
    <div class="dock dock-md relative">
      <RouterLink to="/">
        <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt">
            <polyline
              points="1 11 12 2 23 11"
              fill="none"
              stroke="currentColor"
              stroke-miterlimit="10"
              stroke-width="2"
            ></polyline>
            <path
              d="m5,13v7c0,1.105.895,2,2,2h10c1.105,0,2-.895,2-2v-7"
              fill="none"
              stroke="currentColor"
              stroke-linecap="square"
              stroke-miterlimit="10"
              stroke-width="2"
            ></path>
            <line
              x1="12"
              y1="22"
              x2="12"
              y2="18"
              fill="none"
              stroke="currentColor"
              stroke-linecap="square"
              stroke-miterlimit="10"
              stroke-width="2"
            ></line>
          </g>
        </svg>
        <span class="dock-label">Home</span>
      </RouterLink>

      <RouterLink to="/add-new-habit" class="dock-active">
        <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt">
            <polyline
              points="3 14 9 14 9 17 15 17 15 14 21 14"
              fill="none"
              stroke="currentColor"
              stroke-miterlimit="10"
              stroke-width="2"
            ></polyline>
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="2"
              ry="2"
              fill="none"
              stroke="currentColor"
              stroke-linecap="square"
              stroke-miterlimit="10"
              stroke-width="2"
            ></rect>
          </g>
        </svg>
        <span class="dock-label">Inbox</span>
      </RouterLink>

      <RouterLink to="/create-new-habit">
        <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt">
            <circle
              cx="12"
              cy="12"
              r="3"
              fill="none"
              stroke="currentColor"
              stroke-linecap="square"
              stroke-miterlimit="10"
              stroke-width="2"
            ></circle>
            <path
              d="m22,13.25v-2.5l-2.318-.966c-.167-.581-.395-1.135-.682-1.654l.954-2.318-1.768-1.768-2.318.954c-.518-.287-1.073-.515-1.654-.682l-.966-2.318h-2.5l-.966,2.318c-.581.167-1.135.395-1.654.682l-2.318-.954-1.768,1.768.954,2.318c-.287.518-.515,1.073-.682,1.654l-2.318.966v2.5l2.318.966c.167.581.395,1.135.682,1.654l-.954,2.318,1.768,1.768,2.318-.954c.518.287,1.073.515,1.654.682l.966,2.318h2.5l.966-2.318c.581-.167,1.135-.395,1.654-.682l2.318.954,1.768-1.768-.954-2.318c.287-.518.515-1.073.682-1.654l2.318-.966Z"
              fill="none"
              stroke="currentColor"
              stroke-linecap="square"
              stroke-miterlimit="10"
              stroke-width="2"
            ></path>
          </g>
        </svg>
        <span class="dock-label">Settings</span>
      </RouterLink>
    </div>
  </div>
</template>
