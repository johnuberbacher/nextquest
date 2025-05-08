<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
const route = useRoute()
</script>
<template>
  <div
    class="dock dock-md relative min-h-[64px] border-t border-neutral-200 bg-white dark:dark:border-neutral-700 dark:bg-neutral-900"
  >
    <RouterLink
      to="/"
      :class="{
        'dock-active': route.path === '/',
      }"
    >
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

    <!--<RouterLink
      to="/stats"
      :class="{
        'dock-active': route.path === '/stats',
      }"
    >
      <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M13.0049 16.9409V19.0027H18.0049V21.0027H6.00488V19.0027H11.0049V16.9409C7.05857 16.4488 4.00488 13.0824 4.00488 9.00275V3.00275H20.0049V9.00275C20.0049 13.0824 16.9512 16.4488 13.0049 16.9409ZM6.00488 5.00275V9.00275C6.00488 12.3165 8.69117 15.0027 12.0049 15.0027C15.3186 15.0027 18.0049 12.3165 18.0049 9.00275V5.00275H6.00488ZM1.00488 5.00275H3.00488V9.00275H1.00488V5.00275ZM21.0049 5.00275H23.0049V9.00275H21.0049V5.00275Z"
        ></path>
      </svg>
      <span class="dock-label">Stats</span>
    </RouterLink>-->

    <RouterLink
      to="/habits"
      :class="{
        'dock-active':
          route.path === '/habits' ||
          route.path === '/create-new-habit' ||
          route.path === '/add-new-habit' ||
          route.name === 'habit-details',
      }"
    >
      <svg
        class="size-[1.2em]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M8.00008 6V9H5.00008V6H8.00008ZM3.00008 4V11H10.0001V4H3.00008ZM13.0001 4H21.0001V6H13.0001V4ZM13.0001 11H21.0001V13H13.0001V11ZM13.0001 18H21.0001V20H13.0001V18ZM10.7072 16.2071L9.29297 14.7929L6.00008 18.0858L4.20718 16.2929L2.79297 17.7071L6.00008 20.9142L10.7072 16.2071Z"
        ></path>
      </svg>
      <span class="dock-label">Habits</span>
    </RouterLink>

    <RouterLink
      to="/profile"
      :class="{
        'dock-active': route.path === '/profile',
      }"
    >
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
      <span class="dock-label">Profile</span>
    </RouterLink>
  </div>
</template>
