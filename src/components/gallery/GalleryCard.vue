<script setup lang="ts">
import {GalleryImage} from "../../structures/data.ts";
import FullscreenSlide from "./FullscreenSlide.vue";
import {provide, ref} from "vue";

const props = defineProps<{
    image: GalleryImage,
}>()
const isActive = ref<boolean>(false)
provide('isActive', isActive)
const imageUrl = `${window.location.protocol}//${window.location.host}${props.image.imagePath}`
const style = `background: url("${imageUrl}") center center / cover no-repeat`

</script>

<template>
    <SplideSlide :key="image.title">
        <div class="slide-image" :style="style">
            <div class="show-full-button" @click="isActive = !isActive">
                Нажмите, чтобы раскрыть
            </div>
        </div>
        <div class="tag-container">
            <h4>{{ image.title }}</h4>
            <div class="slide-author" v-if="image.author">by {{ image.author }}</div>
        </div>
        <Teleport to="body">
            <Transition name="show">
                <FullscreenSlide :image="image" v-if="isActive"/>
            </Transition>
        </Teleport>
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

.show-full-button {
    opacity: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-gray-100);
    transition: opacity 100ms;
    display: flex;
    justify-content: center;
    align-items: center;
}

.show-full-button:hover {
    opacity: 0.8;
    width: 100%;
    height: 100%;
}

.show-enter-from, .show-leave-to {
    opacity: 0;
}

.show-leave-active, .show-enter-active {
    transition: opacity 0.3s;
}

.show-enter-to, .show-leave-from {
    opacity: 1;
}
</style>