<script setup lang="ts">
import { cn } from '@/lib/utils'
const props = defineProps<{
  hoverGlow?: boolean
  hoverScale?: boolean
  clickable?: boolean
  gradientSpeed?: string
  scaleMode?: 'outer' | 'inner'
  delay?: number
  innerStyles?: string
}>()
</script>

<template>
  <!-- Outer scale mode -->
  <div
    data-aos="fade-up"
    :data-aos-delay="delay ?? 100"
    data-aos-once="true"
    class="relative h-full [animation:gradient_6s_ease_infinite] [background-size:200%_200%] p-[2px]"
  >
    <div
      v-if="props.scaleMode === 'outer'"
      class="relative h-full overflow-visible rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 [background-size:200%_200%] p-[2px] transition-transform duration-300"
      :class="[
        props.hoverScale ? 'hover:scale-[1.02]' : '',
        `[animation:gradient_${props.gradientSpeed || '12s'}_ease_infinite]`,
      ]"
    >
      <!-- Inner card -->
      <div
        class="flex flex-col overflow-visible rounded-2xl bg-slate-900 transition duration-300"
        :class="
          cn(
            [
              props.hoverGlow ? 'hover:shadow-[0_0_20px_rgba(56,189,248,0.5)]' : '',
              props.clickable ? 'cursor-pointer' : '',
              'flex flex-col overflow-visible rounded-2xl bg-slate-900 transition duration-300',
            ],
            innerStyles,
          )
        "
      >
        <slot />
      </div>
    </div>

    <!-- Inner scale mode -->
    <div
      v-else
      class="relative overflow-visible rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 [background-size:200%_200%] p-[2px]"
      :class="[`[animation:gradient_${props.gradientSpeed || '12s'}_ease_infinite]`]"
    >
      <!-- Inner card -->
      <div
        class="flex flex-col overflow-visible rounded-2xl bg-slate-900 transition duration-300"
        :class="
          cn(
            [
              props.hoverScale ? 'hover:scale-[1.02]' : '',
              props.hoverGlow ? 'hover:shadow-[0_0_20px_rgba(56,189,248,0.5)]' : '',
              props.clickable ? 'cursor-pointer' : '',
            ],
            innerStyles,
          )
        "
      >
        <slot />
      </div>
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
</style>
