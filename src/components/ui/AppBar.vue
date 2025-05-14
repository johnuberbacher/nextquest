<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
</script>
<template>
  <div
    class="border-neutral-200 dark:dark:border-neutral-700 dark:bg-neutral-900 dock dock-md relative min-h-[64px] border-t bg-white"
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
      to="/stats"
      :class="{
        'dock-active': route.path === '/stats',
      }"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-[1.2em]">
        <path
          fill="currentColor"
          d="M12 6.99999C16.4183 6.99999 20 10.5817 20 15C20 19.4183 16.4183 23 12 23C7.58172 23 4 19.4183 4 15C4 10.5817 7.58172 6.99999 12 6.99999ZM12 8.99999C8.68629 8.99999 6 11.6863 6 15C6 18.3137 8.68629 21 12 21C15.3137 21 18 18.3137 18 15C18 11.6863 15.3137 8.99999 12 8.99999ZM12 10.5L13.3225 13.1797L16.2798 13.6094L14.1399 15.6953L14.645 18.6406L12 17.25L9.35497 18.6406L9.86012 15.6953L7.72025 13.6094L10.6775 13.1797L12 10.5ZM18 1.99999V4.99999L16.6366 6.13755C15.5305 5.5577 14.3025 5.17884 13.0011 5.04948L13 1.99899L18 1.99999ZM11 1.99899L10.9997 5.04939C9.6984 5.17863 8.47046 5.55735 7.36441 6.13703L6 4.99999V1.99999L11 1.99899Z"
        ></path>
      </svg>

      <span class="dock-label">Stats</span>
    </RouterLink>
  </div>
</template>
