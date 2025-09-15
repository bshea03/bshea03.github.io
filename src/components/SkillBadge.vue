<script setup lang="ts">
const props = defineProps<{
  label: string
  url?: string
}>()

const nav = () => (props.url ? window.open(props.url) : null)
</script>

<template>
  <span
    @click="nav"
    class="rounded-full bg-gray-700/80 px-3 py-1 text-xs text-white transition-colors hover:bg-gray-600"
  >
    {{ props.label }}
  </span>
</template>
