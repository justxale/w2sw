<script setup lang="ts">
import {onMounted, ref} from "vue";
import Markdown from "../sys/Markdown.vue";
import {checkForDataExistence, CollapsableTabMeta, dataMapping} from "../../structures/data.ts";
import HiddenParagraph from "./CollapsableParagraph.vue";
import {useRouter} from "vue-router";

const props = defineProps<{
    id: string
}>()
const title = ref<string>('')
const description = ref<string>('')
const paragraph = ref<string>('')
const credits = ref<string>('')
let imgUrl = ''

const hasTab = ref<boolean>(false)
const tabData = ref<CollapsableTabMeta>({hidden: false, md: "", title: "", titleOnShown: ""})

onMounted(async () => {
    if (!checkForDataExistence(props.id)) {
        const router = useRouter()
        await router.push({name: "notfound"})
    }

    const fetchedData = (await dataMapping())[props.id]

    title.value = fetchedData.title
    description.value = fetchedData.mdDescription ? fetchedData.mdDescription : ''
    paragraph.value = fetchedData.mdParagraph ? fetchedData.mdParagraph : ''
    credits.value = fetchedData.mdCredits ? fetchedData.mdCredits : ''
    imgUrl = fetchedData.previewPic

    if (fetchedData.hasTab && fetchedData.tabData) {
        hasTab.value = fetchedData.hasTab
        tabData.value = fetchedData.tabData
    }
})
</script>

<template>
    <div>
        <h1>{{title}}</h1>
        <div class="title">
            <Markdown class="description-text" :rawString="description"/>
            <img :src="imgUrl" alt=""/>
        </div>
        <Markdown class="paragraph-text" :raw-string="paragraph"/>
        <HiddenParagraph v-if="hasTab" :tab-data="tabData"/>
        <div class="credits">
            <Markdown :raw-string="credits"/>
        </div>
    </div>
</template>

<style scoped>
.title {
    display: flex;
    gap: 32px;
}

.title img {
    width: 256px;
    height: 256px;
    object-fit: cover;
}

.credits {
    font-size: 16px;
    color: var(--color-white-200);
    display: flex;
    justify-content: end;
}

@media (min-width: 1500px) {
    .title img {
        width: 384px;
        height: 384px;
    }
}

.paragraph-text, .description-text {
    margin-left: 24px;
}
</style>