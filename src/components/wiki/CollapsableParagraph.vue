<script setup lang="ts">
import Markdown from "../sys/Markdown.vue";
import {ref} from "vue";
import {CollapsableTabMeta} from "../../structures/data.ts";

const props = defineProps<{
    tabData: CollapsableTabMeta
}>()
const className = "collapsable-paragraph" + (props.tabData.hidden ? ' hidden' : '')
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
.collapsable-paragraph {
    border-top: 1px solid var(--color-white-200);
    padding-top: 32px;
    display: flex;
    flex-direction: column;
}

.collapsable-paragraph button {
    align-self: center;
    width: 60vw;
    margin-bottom: 32px;
}

.collapsable-paragraph.hidden button {
    opacity: 0;
}
</style>