import { createApp } from 'vue'
import router from './router'
import axios from 'axios'
import App from './components/App.vue'

// Configure axios
axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Accept'] = 'application/json'

// Add auth token to requests
const token = localStorage.getItem('auth_token')
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// Create Vue app
const app = createApp(App)
app.use(router)
app.config.globalProperties.$http = axios

app.mount('#app')
