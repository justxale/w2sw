import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        {
            name: 'md-parser',
            transform(code, id) {
                if (id.slice(-3) === ".md") {
                    return `export default ${JSON.stringify(code)}`
                }
            }
        }
    ],
})
