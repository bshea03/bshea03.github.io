<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import BaseCard from '@/components/BaseCard.vue'
import type { Project } from '@/types'

const props = defineProps<{
  project: Project
}>()

defineEmits(['selectProject'])

const MAX_VISIBLE = 3
const isSmallScreen = ref(false)

const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 640
}

onMounted(() => {
  updateScreenSize()
  window.addEventListener('resize', updateScreenSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenSize)
})
</script>

<template>
  <BaseCard
    hoverScale
    hoverGlow
    clickable
    scaleMode="inner"
    @click="$emit('selectProject', project)"
    inner-styles="flex h-[370px] flex-col"
  >
    <!-- Thumbnail -->
    <img
      :src="props.project.image"
      :alt="props.project.title"
      class="h-48 w-full rounded-t-2xl object-cover"
    />

    <!-- Content -->
    <div class="flex flex-1 flex-col p-4">
      <h3 class="mb-2 text-xl font-semibold">{{ props.project.title }}</h3>
      <p class="flex-1 text-sm text-gray-400">{{ props.project.description }}</p>

      <!-- Tech badges -->
      <div class="mt-4 flex flex-wrap gap-2">
        <!-- Small screens: truncate -->
        <template v-if="isSmallScreen">
          <span
            v-for="(tech, i) in props.project.tech.slice(0, MAX_VISIBLE)"
            :key="i"
            class="rounded-lg bg-gray-700 px-2 py-1 text-xs text-gray-200"
          >
            {{ tech }}
          </span>

          <span
            v-if="props.project.tech.length > MAX_VISIBLE"
            class="rounded-lg bg-gray-700 px-2 py-1 text-xs text-gray-200"
          >
            +{{ props.project.tech.length - MAX_VISIBLE }}
          </span>
        </template>

        <!-- Larger screens: show all -->
        <template v-else>
          <span
            v-for="(tech, i) in props.project.tech"
            :key="i"
            class="rounded-lg bg-gray-700 px-2 py-1 text-xs text-gray-200"
          >
            {{ tech }}
          </span>
        </template>
      </div>
    </div>
  </BaseCard>
</template>
