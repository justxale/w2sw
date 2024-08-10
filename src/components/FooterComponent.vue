<script setup lang="ts">
type FooterLink = {
    title: string,
    link: string,
}
type FooterColumn = {
    title: string,
    links: FooterLink[]
}

const links: FooterColumn[] = [
    {
        title: 'Resources',
        links: [
            {title: "GitHub", link: "https://github.com/justxale/w2sw"},
            {title: "Руководство", link: "https://github.com/justxale/w2sw/docs"},
        ]
    }
]
</script>

<template>
    <footer>
        <div class="footer-container">
            <div class="footer-content">
                <div class="footer-logo-container">
                    <img src="/w2sw-logo-full.png" class="footer-logo" alt=""/>
                    <div class="footer-note">
                        W2SW является проектом с <a href="https://github.com/justxale/w2sw" target="_blank">открытым исходым кодом</a>.<br/>
                        &copy; justxale
                    </div>
                </div>
                <div class="footer-columns">
                    <div v-for="linkColumn in links" class="footer-column">
                        <h4>{{ linkColumn.title }}</h4>
                        <a v-for="link in linkColumn.links" :href="link.link">{{ link.title }}</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-warning">
            W2SW НЕ ЯВЛЯЕТСЯ ОФИЦИАЛЬНЫМ ПРОЕКТОМ УМ И НИКАК НЕ СВЯЗАН С АДМИНИСТРАЦИЕЙ СЕРВЕРА.
        </div>
    </footer>
</template>

<style scoped>
footer {
    max-height: 40vh;
    background: radial-gradient(circle at 100% 150%, var(--color-brand-green) 0%, transparent 500px), radial-gradient(circle at 80% 170%, var(--color-brand-purple) 0%, transparent 500px), var(--color-gray-200);
    display: flex;
    flex-direction: column;

    margin-top: 128px;
    font-size: 16px;
}

.footer-container {
    padding: 2vh 5vw;
}

.footer-logo-container {
    width: min-content;
}

.footer-logo {
    height: 128px;
    width: auto;
}

.footer-note {
    font-size: 16px;
    margin-left: 32px;
    margin-top: 16px;
}

.footer-columns {
    margin-top: 32px;
}

.footer-column {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.footer-column h4 {
    margin: 0;
}

.footer-column a {
    color: var(--color-white-100)
}

.footer-content {
    display: flex;
    margin-bottom: 96px;
    gap: 256px;
}



.footer-warning {
    color: var(--color-white-200);
    align-self: center;
    margin-bottom: 16px;
}
</style>