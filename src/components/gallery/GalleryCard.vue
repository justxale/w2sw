<script setup lang="ts">
import {GalleryImage} from "../../structures/data.ts";

defineProps<{
    image: GalleryImage
}>()
</script>

<template>
    <SplideSlide :key="image.title" class="slide-container">

        <img :src="image.imagePath" :alt="image.title" loading="lazy"/>
        <div class="tag-container">
            <div class="slide-title">{{ image.title }}</div>
            <div class="slide-author">by {{ image.author }}</div>
        </div>

    </SplideSlide>
</template>

<style scoped>
.tag-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: var(--color-gray-200);
    opacity: 0.8;
    padding-top: 16px;
}

.slide-container {
    display: flex;
    align-items: flex-end;
}

.slide-title {
    align-self: center;
}

.slide-author {
    align-self: flex-end;
    margin: 8px;
}
</style>