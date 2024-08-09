<script setup lang="ts">
import markdownit from 'markdown-it'
const md = markdownit()
defineProps<{
    rawString: string
}>()
</script>

<template>
<div v-html="md.render(rawString)"></div>
</template>

<style scoped>

</style>