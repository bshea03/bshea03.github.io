<script setup lang="ts">
import { type Job } from '@/types'
import { Calendar } from 'lucide-vue-next'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import SkillBadge from '../../SkillBadge.vue'
import BaseCard from '../../BaseCard.vue'

const props = defineProps<{ job: Job }>()

const screenWidth = ref(window.innerWidth)
const expanded = ref(false)

function updateWidth() {
  screenWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWidth)
})

const visibleSkills = computed(() => {
  if (!props.job.skills) return []
  if (expanded.value || screenWidth.value >= 640) return props.job.skills
  return props.job.skills.slice(0, 6)
})

const hiddenCount = computed(() => {
  if (!props.job.skills) return 0
  return props.job.skills.length - visibleSkills.value.length
})
</script>

<template>
  <BaseCard
    hoverScale
    hoverGlow
    scaleMode="inner"
    innerStyles="justify-between min-h-[380px] sm:min-h-[430px]"
  >
    <!-- Header -->
    <div
      class="flex flex-col gap-2 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5 sm:pb-4"
    >
      <div>
        <h3 class="text-lg font-bold sm:text-xl">{{ props.job.company }}</h3>
        <p class="text-xs text-gray-400 sm:text-sm">{{ props.job.description }}</p>
      </div>
      <div class="flex items-center text-xs text-gray-400 sm:text-sm">
        <Calendar class="mr-1 h-4 w-4" />
        {{ props.job.dates }}
      </div>
    </div>

    <!-- Content -->
    <div class="flex flex-col gap-4 px-4 pb-4 sm:flex-row sm:gap-5 sm:px-5">
      <div v-if="props.job.icon" class="flex items-center justify-center sm:min-w-[30%]">
        <img
          :src="props.job.icon"
          alt="Company Logo"
          loading="lazy"
          class="h-24 w-auto object-contain sm:h-[200px]"
        />
      </div>
      <div
        class="max-h-[220px] w-full overflow-y-auto whitespace-pre-wrap sm:max-h-[260px] sm:w-3/5"
      >
        <ul class="flex list-disc flex-col gap-2 pl-5 text-gray-200 sm:gap-3">
          <li v-for="detail in props.job.details" :key="detail.text">
            <span v-html="detail.text"></span>
            <ul v-if="detail.children" class="mt-2 list-disc pl-5">
              <li v-for="child in detail.children" :key="child.text" v-html="child.text"></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <!-- Footer -->
    <div
      v-if="props.job.skills && props.job.skills.length"
      class="flex flex-wrap gap-2 px-4 pb-4 sm:px-5 sm:pb-5"
    >
      <SkillBadge v-for="skill in visibleSkills" :key="skill" :label="skill" />

      <!-- Toggle button (only on mobile) -->
      <button
        v-if="screenWidth < 640 && (hiddenCount > 0 || expanded)"
        @click="expanded = !expanded"
        class="rounded-full bg-gray-700 px-2 py-1 text-xs text-gray-300 transition hover:bg-gray-600"
      >
        {{ expanded ? 'Show less' : `+${hiddenCount} more` }}
      </button>
    </div>
  </BaseCard>
</template>
