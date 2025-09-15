<script setup lang="ts">
import type { Award } from '@/types'
import { Award as AwardIcon, Medal } from 'lucide-vue-next'
import BaseCard from '../../BaseCard.vue'

const props = defineProps<{ award: Award }>()

const icon = props.award.icon === 'Medal' ? Medal : AwardIcon
</script>

<template>
  <BaseCard hoverScale hoverGlow scaleMode="outer">
    <div class="flex flex-col p-6">
      <!-- Icon + Title -->
      <div class="mb-4 flex items-center gap-3">
        <div
          class="bg-primary/10 text-primary group-hover:bg-primary/20 flex h-12 w-12 items-center justify-center rounded-xl p-2 transition-colors"
        >
          <component :is="icon" class="h-6 w-6" />
        </div>
        <div>
          <h3 class="text-lg font-semibold">{{ award.title }}</h3>
          <p class="text-sm text-gray-400">{{ award.date }}</p>
        </div>
      </div>

      <!-- Description -->
      <p class="text-sm text-gray-400">{{ award.description }}</p>
    </div>
  </BaseCard>
</template>
