<script setup lang="ts">
import {Options} from "@splidejs/vue-splide";
import {ref} from "vue";
import {GalleryImage} from "../../structures/data.ts";
import GalleryCard from "./GalleryCard.vue";

defineProps<{
    galleryData: GalleryImage[]
}>()


const splideOptions = ref<Options>({
    type: 'loop',
    fixedHeight: "min(60vw, 600px)",
    fixedWidth: "min(80vw, 800px)",
    perPage: 1,
    width: "min(60vw, 1200px)",
    cover: true,
    gap: "32px",
    focus: 'center'
})
</script>

<template>
    <div class="gallery-container">
        <Splide :options="splideOptions">
            <GalleryCard v-for="image in galleryData" :image="image"/>
        </Splide>
    </div>
</template>

<style scoped>
.gallery-container {
    display: flex;
    justify-content: center;
    padding-bottom: 32px;
    padding-top: 32px;
    border-bottom: var(--color-white-200) 1px solid;
    border-top: var(--color-white-200) 1px solid;
}
</style>