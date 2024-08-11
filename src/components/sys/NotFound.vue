<script setup lang="ts">
document.title = 'Страница не найдена :< | W2SW'
</script>

<template>
<div class="error-container">
    Страница не найдена :[
    <RouterLink to="/">На главную</RouterLink>
</div>
</template>

<style scoped>
.error-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: center;
    align-items: center;
}
</style>