<script setup lang="ts">
import { type Job } from '@/types'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import SkillBadge from './SkillBadge.vue'
import { Calendar } from 'lucide-vue-next'

const props = defineProps<{
  job: Job
}>()
</script>

<template>
  <!-- Gradient border wrapper -->
  <div
    class="relative [animation:gradient_12s_ease_infinite] rounded-2xl [background-size:200%_200%] p-[2px]"
  >
    <div class="rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 p-[1px]">
      <!-- Inner card -->
      <Card
        class="group relative w-full rounded-2xl bg-slate-900 py-4 text-white shadow-lg transition duration-300 ease-out hover:scale-[1.01] hover:shadow-[0_0_12px_rgba(56,189,248,0.5)]"
      >
        <!-- Header -->
        <CardHeader class="flex items-start justify-between">
          <div>
            <CardTitle class="text-xl font-bold">
              {{ props.job.company }}
            </CardTitle>
            <CardDescription class="text-sm text-gray-400">
              {{ props.job.description }}
            </CardDescription>
          </div>
          <div class="flex items-center text-sm text-gray-400">
            <Calendar class="mr-1 h-4 w-4" />
            {{ props.job.dates }}
          </div>
        </CardHeader>

        <!-- Content -->
        <CardContent class="flex h-full justify-between gap-5">
          <div v-if="props.job.icon" class="flex min-w-1/3 items-center justify-center">
            <img
              :src="props.job.icon"
              alt="Company Logo"
              class="mb-4 h-[200px] w-auto object-contain"
            />
          </div>
          <div class="max-h-[260px] w-3/5 overflow-y-auto whitespace-pre-wrap">
            <ul class="flex list-disc flex-col gap-3 pl-5 text-gray-200">
              <li v-for="detail in props.job.details" :key="detail.text">
                {{ detail.text }}
                <ul v-if="detail.children" class="mt-2 list-disc pl-5">
                  <li v-for="child in detail.children" :key="child.text">
                    {{ child.text }}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </CardContent>

        <!-- Footer / Skills -->
        <CardFooter
          v-if="props.job.skills && props.job.skills.length"
          class="flex h-full flex-col items-start justify-end"
        >
          <div class="flex flex-wrap gap-2 pt-4">
            <SkillBadge v-for="skill in props.job.skills" :key="skill" :label="skill" />
          </div>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>

<style scoped>
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

[animation\:gradient_12s_ease_infinite] {
  animation: gradient 12s ease infinite;
}
</style>
