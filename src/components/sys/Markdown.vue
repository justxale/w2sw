<script setup lang="ts">
import markdownit from 'markdown-it'
import markdownitFootnote from 'markdown-it-footnote'
const md = markdownit({
    linkify: true,
    html: true,
})
md.use(markdownitFootnote)
defineProps<{
    rawString: string
}>()
</script>

<template>
<div v-html="md.render(rawString)"></div>
</template>

<style scoped>

</style>