<script setup lang="ts">

</script>

<template>
    <header>
        <div class="header-container">
            <RouterLink to="/" class="logo-container">
                <img src='/w2sw-logo.png' alt="" width="512" height="512" class="logo">
                <span>W2SW</span>
            </RouterLink>
            <div class="links">
                <RouterLink to="/" class="logo-container">
                    На главную
                </RouterLink>
            </div>
        </div>
    </header>
</template>

<style scoped>
header {
    width: 100%;
    background-color: var(--color-gray-200);
}

.header-container {
    display: flex;
    justify-content: space-between;
    padding: 16px 5vw;
}

.logo-container, .links {
    display: flex;
    align-items: center;
    gap: 16px;
    font-weight: bold;

    color: var(--color-white-100)
}

.logo {
    width: 48px;
    height: auto;
}
</style>