import { createApp } from 'vue'
import './styles/style.css'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import NotFound from "./components/sys/NotFound.vue";

const app = createApp(App)
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: App},
        { path: '/:pathMatch(.*)*', component: NotFound },
    ]
})

app.use(router)
app.mount('#app')
