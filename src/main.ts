import { createApp } from 'vue'
import {createRouter, createWebHistory} from "vue-router";
import VueSplide from '@splidejs/vue-splide';

import App from './App.vue'
import AllStructs from "./components/wiki/AllStructs.vue";
import NotFound from "./components/sys/NotFound.vue";
import StructPage from "./components/wiki/StructPage.vue";

import './styles/style.css'
import './styles/colors.css'

const app = createApp(App)
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: AllStructs},
        { path: '/struct', component: AllStructs },
        { path: '/struct/:id', component: StructPage, props: true },
        { path: '/:pathMatch(.*)*', component: NotFound },
    ]
})
app.use(VueSplide)
app.use(router)
app.mount('#app')
