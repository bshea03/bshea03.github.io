<script setup lang="ts">
const props = defineProps<{
  icon: string
  href?: string
  external?: boolean
}>()
</script>

<template>
  <component
    :is="props.href ? 'a' : 'button'"
    :href="props.href"
    :target="props.external ? '_blank' : undefined"
    :rel="props.external ? 'noopener noreferrer' : undefined"
    class="group relative flex items-center justify-center rounded-lg border border-transparent bg-[rgba(255,255,255,0.05)] [background-image:linear-gradient(#1a1a1a,#1a1a1a),linear-gradient(90deg,#3b82f6,#8b5cf6,#ec4899)] [background-clip:padding-box,border-box] [background-origin:border-box] px-3 py-2 shadow-[inset_0_0_8px_rgba(255,255,255,0.04)] transition-all duration-200 ease-out hover:bg-[rgba(255,255,255,0.08)] hover:shadow-[0_0_6px_rgba(139,92,246,0.35),0_0_12px_rgba(59,130,246,0.25),inset_0_0_6px_rgba(255,255,255,0.05)]"
  >
    <i
      :class="props.icon"
      class="text-muted-foreground group-hover:purple-500 text-2xl transition-all duration-300 group-hover:text-white/70"
    />
  </component>
</template>
