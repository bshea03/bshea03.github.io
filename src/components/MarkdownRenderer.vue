<script setup lang="ts">
import { computed } from 'vue'
import { marked, Renderer, type Token, type Tokens } from 'marked'

const renderer = new Renderer()

renderer.heading = function ({ tokens, depth }) {
  // reconstruct the raw text for slug generation
  const rawText = tokens.map((t: Token) => ('raw' in t ? t.raw : '')).join('')

  // build a GitHub-style slug
  const slug = rawText
    .toLowerCase()
    .trim()
    .replace(/[^\w]+/g, '-') // non-word chars → dashes
    .replace(/^-+|-+$/g, '') // trim leading/trailing dashes

  // render the inline tokens back to HTML
  // `this.parseInline` is a helper on the Renderer instance
  const content = this.parser.parseInline(tokens)

  return `<h${depth} id="${slug}">${content}</h${depth}>`
}

renderer.codespan = function (code: Tokens.Codespan): string {
  // auto-detect or pick a default:
  return `<tt class="bg-stone-800">${code.text.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c]!)}</tt>`
}

marked.use({
  renderer,
  gfm: true,
  breaks: false,
})

// Props
const { content } = defineProps({
  content: {
    type: String,
    required: true,
  },
})

// Compile markdown to HTML
const compiledMarkdown = computed(() => marked(content))
</script>

<template>
  <div
    v-html="compiledMarkdown"
    class="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none list-inside list-disc break-words"
  ></div>
</template>

<style lang="css">
.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  scroll-margin-top: 6rem; /* equals Tailwind’s top-24 */
}
</style>
