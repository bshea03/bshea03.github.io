<script setup lang="ts">
import MarkdownRenderer from '@/components/MarkdownRenderer.vue'
import { useRoute } from 'vue-router'
import { ref, watchEffect } from 'vue'

const markdown = ref('')
const route = useRoute()

watchEffect(async () => {
  const version = route.params.version

  if (typeof version === 'string') {
    try {
      const file = await import(`@/assets/readme/${version}.md?raw`)
      markdown.value = file.default
    } catch (err) {
      markdown.value = 'File not found.'
      console.log(err)
    }
  }
})
</script>

<template>
  <section id="readme" class="relative bg-gradient-to-b from-slate-800 to-slate-950 pt-24 pb-16">
    <div class="absolute inset-0 bg-[url('/patterns/diagonal.svg')] bg-repeat opacity-10"></div>
    <div id="content" class="relative mx-auto flex max-w-5xl flex-col px-6">
      <MarkdownRenderer :content="markdown" />
    </div>
  </section>
</template>
