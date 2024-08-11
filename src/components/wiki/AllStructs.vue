<script setup lang="ts">
import {basicStructureData} from "../../structures/data.ts";

document.title = "Все статьи | W2SW"
</script>

<template>
    <div>
        <h2>Структуры</h2>
        <div class="struct-links">
            <RouterLink :to="`/struct/${link.id}`" v-for="link in basicStructureData">{{ link.title }}</RouterLink>
        </div>
    </div>

</template>

<style scoped>
.struct-links {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>