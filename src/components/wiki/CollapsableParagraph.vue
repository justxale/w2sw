<script setup lang="ts">
import Markdown from "../sys/Markdown.vue";
import {ref} from "vue";
import {CollapsableTabMeta} from "../../structures/data.ts";

const props = defineProps<{
    tabData: CollapsableTabMeta
}>()
const className = "collapsable-paragraph" + (props.tabData.hidden ? 'hidden' : '')
const isRevealed = ref<boolean>(false)
const buttonTitle = ref<string>(props.tabData.title)

function revealTab() {
    isRevealed.value = !isRevealed.value
    if (isRevealed.value) buttonTitle.value = props.tabData.titleOnShown
    else buttonTitle.value = props.tabData.title
}
</script>

<template>
    <div :class='className'>
        <button @click="revealTab">{{ buttonTitle }}</button>
        <Markdown v-if="isRevealed" :raw-string="tabData.md"/>
    </div>
</template>

<style scoped>
.collapsable-paragraph.hidden button {
    opacity: 0;
    padding: 12px;
}

.collapsable-paragraph button {
    padding: 12px;
}
</style>