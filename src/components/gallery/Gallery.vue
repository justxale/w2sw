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
    fixedWidth: "min(80vw, 800px)",
    perPage: 1,
    width: "min(80vw, 1200px)",
    gap: "32px",
    focus: 'center'
})
</script>

<template>
    <div class="gallery-container">
        <h1>Галерея</h1>
        <Splide :options="splideOptions" style="align-self: center">
            <GalleryCard v-for="image in galleryData" :image="image"/>
        </Splide>
    </div>
</template>

<style scoped>
.gallery-container {
    display: flex;
    flex-direction: column;
    padding-bottom: 32px;
    border-bottom: var(--color-white-200) 1px solid;
    border-top: var(--color-white-200) 1px solid;
}
</style>