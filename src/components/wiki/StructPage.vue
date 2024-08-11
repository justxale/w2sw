<script setup lang="ts">
import {onMounted, ref} from "vue";
import Markdown from "../sys/Markdown.vue";
import {checkForDataExistence, CollapsableTabMeta, dataMapping, GalleryImage} from "../../structures/data.ts";
import HiddenParagraph from "./CollapsableParagraph.vue";
import {useRouter} from "vue-router";
import Gallery from "../gallery/Gallery.vue";

const props = defineProps<{
    id: string
}>()
const title = ref<string>('')
const description = ref<string>('')
const paragraph = ref<string>('')
const galleryData = ref<GalleryImage[]>([])
const credits = ref<string>('')
let previewUrl = ''

const hasTab = ref<boolean>(false)
const hasGallery = ref<boolean>(false)
const tabData = ref<CollapsableTabMeta>({hidden: false, md: "", title: "", titleOnShown: ""})

onMounted(async () => {
    const router = useRouter()
    if (!checkForDataExistence(props.id)) {
        await router.push({name: "notfound"})
    }

    try {
        const fetchedData = (await dataMapping())[props.id]
        title.value = fetchedData.title
        document.title = `${title.value} | W2SW`
        description.value = fetchedData.mdDescription ? fetchedData.mdDescription : ''
        paragraph.value = fetchedData.mdParagraph ? fetchedData.mdParagraph : ''
        credits.value = fetchedData.mdCredits ? fetchedData.mdCredits : ''
        previewUrl = fetchedData.previewPic

        if (fetchedData.hasTab && fetchedData.tabData) {
            hasTab.value = fetchedData.hasTab
            tabData.value = fetchedData.tabData
        }

        if (fetchedData.hasImages && fetchedData.images && fetchedData.images.length > 0) {
            hasGallery.value = fetchedData.hasImages
            galleryData.value = fetchedData.images
        }
    } catch (e) {
        await router.push({name: "notfound"})
    }
})
</script>

<template>
    <div>
        <h1>{{title}}</h1>
        <div class="title">
            <Markdown class="description-text" :rawString="description"/>
            <img :src="previewUrl" alt=""/>
        </div>
        <Markdown class="paragraph-text" :raw-string="paragraph"/>
        <Gallery v-if="hasGallery" :gallery-data="galleryData"/>
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
    color: var(--color-white-200);
    display: flex;
    justify-content: end;
}

@media screen and (max-width: 970px) {
    .title {
        display: flex;
        flex-direction: column-reverse;
        gap: 32px;
        align-items: center;
    }

    .title img {
        width: 50vw;
        height: 50vw;
        object-fit: cover;
    }

    .credits {
        color: var(--color-white-200);
        display: flex;
        justify-content: center;
    }
}

@media screen and (min-width: 1500px) {
    .title img {
        width: 384px;
        height: 384px;
    }
}

.paragraph-text, .description-text {
    margin-left: 24px;
}
</style>