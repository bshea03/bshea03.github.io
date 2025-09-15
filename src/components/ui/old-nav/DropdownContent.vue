<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { cn } from '@/lib/utils'

type Props = {
  open: boolean
  class?: string
  radiusClass?: string
}
const props = withDefaults(defineProps<Props>(), {
  radiusClass: 'rounded-xl',
})

const emit = defineEmits<{ (e: 'close'): void }>()
const isVisible = ref(false)

watch(
  () => props.open,
  (val) => (isVisible.value = val),
  { immediate: true },
)

const onEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
}

const onClickOutside = (e: MouseEvent) => {
  const el = document.getElementById('dropdown-content')
  if (el && !el.contains(e.target as Node)) emit('close')
}

onMounted(() => {
  document.addEventListener('keydown', onEscape)
  document.addEventListener('mousedown', onClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onEscape)
  document.removeEventListener('mousedown', onClickOutside)
})
</script>

<template>
  <transition
    enter-active-class="transition duration-150 ease-out"
    enter-from-class="opacity-0 scale-95 translate-y-2"
    enter-to-class="opacity-100 scale-100 translate-y-0"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 scale-100 translate-y-0"
    leave-to-class="opacity-0 scale-95 translate-y-2"
  >
    <div
      v-if="isVisible"
      id="dropdown-content"
      :class="
        cn(
          // gradient border container
          'dropdown-container relative shadow-[0_0_25px_rgba(139,92,246,0.3)]',
          props.class,
          props.radiusClass,
        )
      "
    >
      <slot />
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.dropdown-container {
  position: absolute;
  top: 100%;
  margin-top: 6px;
  min-width: 300px;
  z-index: 50;
  padding: 1rem;

  /* Background with depth + readability */
  background:
    radial-gradient(circle at top center, rgba(255, 255, 255, 0.05), transparent 70%),
    linear-gradient(135deg, rgba(30, 30, 45, 0.92) 0%, rgba(20, 20, 30, 0.88) 100%),
    linear-gradient(
      to right,
      rgba(59, 130, 246, 0.12),
      rgba(139, 92, 246, 0.12),
      rgba(236, 72, 153, 0.12)
    );

  color: #fff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);

  /* Depth + subtle inner glow */
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.45),
    inset 0 0 12px rgba(255, 255, 255, 0.04);

  border-radius: 1rem;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: rgba(255, 255, 255, 0.02); /* faint haze */
    pointer-events: none;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 2px;
    border-radius: inherit;
    background: linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899);
    background-size: 400% 400%;
    animation: borderGlow 14s ease infinite;

    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;

    z-index: 0;
    pointer-events: none;
  }

  > * {
    position: relative;
    z-index: 1;
  }
}

/* 🌈 Animated border glow */
@keyframes borderGlow {
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
