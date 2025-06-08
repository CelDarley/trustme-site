import { createApp } from 'vue'
import App from '@/components/App.vue'
import router from './router'
import { api } from './config/api'

// Create Vue app
const app = createApp(App)

// Use plugins
app.use(router)

// Global properties
app.config.globalProperties.$http = api

// Mount app
app.mount('#app')
