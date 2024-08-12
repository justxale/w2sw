<script setup lang="ts">
import {GalleryImage} from "../../structures/data.ts";

const props = defineProps<{
    image: GalleryImage
}>()
const imageUrl = `${window.location.protocol}//${window.location.host}${props.image.imagePath}`
const style = `background: url("${imageUrl}") center center / cover no-repeat`
</script>

<template>
    <SplideSlide :key="image.title">
        <div class="slide-image" :style="style">
            <span></span>
        </div>
        <div class="tag-container">
            <h4>{{ image.title }}</h4>
            <div class="slide-author" v-if="image.author">by {{ image.author }}</div>
        </div>
    </SplideSlide>
</template>

<style scoped>
.tag-container {
    background-color: var(--color-gray-200);
    border-top: 4px solid var(--color-white-200);
    opacity: 0.8;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 64px;
}

h4 {
    margin: 0;
}

.slide-image {
    height: min(60vw, 600px);
    width: min(80vw, 800px);
}

.slide-author {
    align-self: flex-end;
    margin: 8px;
}
</style>