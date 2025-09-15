<script lang="ts" setup>
const props = defineProps<{
  underlineStyles?: string
}>()
</script>

<template>
  <h2
    class="text-3xl font-bold text-white drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] transition-all duration-300 sm:text-4xl"
    data-aos="fade-up"
    data-aos-duration="600"
    data-aos-once="true"
  >
    <slot></slot>
  </h2>

  <div
    :class="[
      'mx-auto my-4 h-1 w-12 origin-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-[0_0_12px_rgba(59,130,246,0.6),0_0_20px_rgba(168,85,247,0.5)] transition-all duration-700 sm:my-6 sm:w-16 md:my-8 md:w-20',
      props.underlineStyles,
    ]"
    data-aos="zoom-in"
    data-aos-delay="400"
    data-aos-once="true"
  ></div>
</template>
