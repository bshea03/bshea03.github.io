<script setup lang="ts">
import { Palette } from 'lucide-vue-next'
import ProjectGrid from './components/ProjectGrid.vue'
import ProjectModal from './components/ProjectModal.vue'
import SectionHeader from '../SectionHeader.vue'
import { ref } from 'vue'
import SectionDivider from '../SectionDivider.vue'
import { useExperience } from '@/stores/experience'
import type { Project } from '@/types'

const { projects } = useExperience()
const selectedProject = ref<Project | null>(null)

const openProject = (project: Project) => {
  selectedProject.value = project
}
</script>

<template>
  <section
    id="portfolio"
    class="relative bg-gradient-to-br from-slate-900 to-indigo-950 pt-16 pb-24"
  >
    <div
      class="absolute inset-0 bg-[url('/patterns/constellation.svg')] bg-[length:400px_400px] bg-repeat opacity-40"
    ></div>

    <SectionDivider class="-top-17 w-full" />
    <div class="relative z-10 flex flex-col items-center">
      <SectionHeader>
        <div
          class="flex w-full flex-col items-center sm:flex-row sm:items-center sm:justify-center"
        >
          <Palette class="mr-0 mb-2 size-10 sm:mr-4 sm:mb-0 sm:size-12" />
          <div class="text-center sm:text-left">
            My <span class="text-blue-400">Portfolio</span>
          </div>
        </div>
      </SectionHeader>
      <div class="mt-2 flex justify-center px-4">
        <ProjectGrid :projects="projects" @select-project="openProject" />
      </div>
    </div>
    <ProjectModal
      v-if="selectedProject"
      :project="selectedProject"
      @close="selectedProject = null"
    />
  </section>
</template>
