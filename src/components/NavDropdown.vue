<script setup lang="ts">
import { ref, type FunctionalComponent } from 'vue'
import { RouterLink } from 'vue-router'

interface Item {
  label: string
  id?: string
  path?: string
  icon?: FunctionalComponent
}

defineProps<{
  label: string
  icon: FunctionalComponent
  to: string
  items?: Item[]
  disabled?: boolean
  exact?: boolean
}>()

const open = ref(false)
</script>

<template>
  <div class="group relative" @mouseenter="!disabled && (open = true)" @mouseleave="open = false">
    <RouterLink
      :to="to"
      class="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition"
      :class="[
        disabled
          ? 'pointer-events-none cursor-not-allowed text-gray-500 opacity-60'
          : 'text-gray-300 hover:bg-white/10 hover:text-white',
        $route.path === to && !disabled ? 'bg-white/10 text-white' : '',
      ]"
    >
      <component :is="icon" class="size-4" />
      {{ label }}
    </RouterLink>

    <!-- Normal dropdown -->
    <transition name="fade-slide">
      <div
        v-if="!disabled && items && open"
        class="absolute left-0 mt-2 w-52 rounded-xl border border-white/10 bg-gray-900/95 p-3 shadow-xl"
      >
        <RouterLink
          v-for="item in items"
          :key="item.id"
          :to="{ path: item.path || to, hash: item.id ? '#' + item.id : '' }"
          class="flex items-center gap-3 rounded-md px-2 py-2 text-sm text-gray-300 transition hover:bg-white/10 hover:text-white"
        >
          <component v-if="item.icon" :is="item.icon" class="size-4" />
          {{ item.label }}
        </RouterLink>
      </div>
    </transition>

    <!-- Disabled tooltip -->
    <div
      v-if="disabled"
      class="absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2 rounded-md bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-gray-300 opacity-0 shadow-md transition group-hover:opacity-100"
    >
      Coming soon!
    </div>
  </div>
</template>
