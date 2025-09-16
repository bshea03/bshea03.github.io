<script setup lang="ts">
import BaseCard from "@/components/BaseCard.vue";

defineProps({
  title: { type: String, required: true },
  skills: { type: Array<{ icon: string; name: string }>, required: true },
});
</script>

<template>
  <div class="mb-12">
    <!-- Title -->
    <h3
      class="mb-4 text-center text-xl font-semibold text-white"
      data-aos="fade-right"
      data-aos-delay="100"
      data-aos-once="true"
    >
      {{ title }}
    </h3>

    <!-- Underline -->
    <div
      class="mx-auto mb-8 h-[3px] w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
      data-aos="zoom-in"
      data-aos-delay="300"
      data-aos-once="true"
    ></div>

    <!-- Skills Grid -->
    <div
      class="grid grid-cols-2 justify-items-center gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
    >
      <BaseCard
        hoverScale
        scaleMode="outer"
        v-for="(skill, index) in skills"
        :key="index"
        :delay="100 * index + 100"
      >
        <div class="flex h-32 w-32 flex-col items-center justify-center">
          <i
            :alt="skill.name + 'icon'"
            :class="[
              skill.icon,
              'colored text-5xl text-green-400 transition-transform duration-300 ease-in-out group-hover:scale-110',
            ]"
          ></i>
          <span class="mt-3 block text-center font-medium text-white">{{
            skill.name
          }}</span>
        </div>
      </BaseCard>
    </div>
  </div>
</template>
