<script setup lang="ts">
import {GalleryImage} from "../../structures/data.ts";
import {inject, onMounted, onUnmounted, provide, ref} from "vue";

defineProps<{
    image: GalleryImage
}>()
const isActive = inject('isActive', ref(false))
let isReady = false
provide('isActive', isActive)

function handleClick(event: MouseEvent) {
    if (isReady && !(document.getElementById('fullscreened-slide-img')!.contains(event.target as Element))) {
        isActive.value = false
    }
    isReady = true
}

function handleEscape(event: KeyboardEvent) {
    if (isReady && (event.key === "Escape" || event.key === "Esc")) {
        isActive.value = false
    }
    isReady = true
}

onMounted(() => {
    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleEscape);
})
onUnmounted(() => {
    window.removeEventListener("click", handleClick);
    window.removeEventListener("keydown", handleEscape);
})

</script>

<template>
    <div class="fullscreened-slide">
        <div class="slide-bg">
            <img :src="image.imagePath" alt="" id="fullscreened-slide-img"/>
        </div>
    </div>
</template>

<style scoped>
.fullscreened-slide {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background-color: var(--color-gray-200-50);
}

.slide-bg {
    margin: 5vh 10vw;
    display: flex;
    align-items: center;
    height: 80vh;
    justify-content: center;
}

#fullscreened-slide-img {
    max-height: 80vh;
    max-width: 80vw;
    height: auto;
    width: auto;
}

</style>