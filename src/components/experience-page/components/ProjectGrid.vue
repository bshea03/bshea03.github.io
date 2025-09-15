<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import ProjectCard from './ProjectCard.vue'
import type { Project } from '@/types'

const props = defineProps<{ projects: Project[] }>()

const projectRefs = ref<HTMLElement[]>([])
const visibleStates = ref<boolean[]>([])

const initVisibleStates = async () => {
  await nextTick()
  const initialVisibleCount = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1

  visibleStates.value = props.projects.map((_, i) => i < initialVisibleCount)

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = projectRefs.value.indexOf(entry.target as HTMLElement)
          if (index !== -1) visibleStates.value[index] = true
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 },
  )

  projectRefs.value.forEach((el, i) => {
    if (el && i >= initialVisibleCount) observer.observe(el)
  })
}

onMounted(initVisibleStates)

// 🔑 Re-run whenever projects change
watch(
  () => props.projects,
  () => {
    initVisibleStates()
  },
  { immediate: true },
)
</script>

<template>
  <div class="grid max-w-6xl items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
    <div
      v-for="(project, index) in projects"
      :key="index"
      :ref="(el) => (projectRefs[index] = el as HTMLElement)"
      :class="[
        visibleStates[index] ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        'h-full transition-all duration-700',
      ]"
    >
      <ProjectCard
        :project="project"
        @selectProject="$emit('selectProject', project)"
        class="h-full"
      />
    </div>
  </div>
</template>
