<script setup lang="ts">
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
</script>

<template>
    <HeaderComponent/>
    <RouterView class="page-container"/>
    <FooterComponent/>
</template>

<style scoped>
.page-container {
    margin-left: 10vw;
    margin-right: 10vw;
}
</style>
