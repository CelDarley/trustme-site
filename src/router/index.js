
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/pages/Home.vue'
import Plans from '../components/pages/Plans.vue'
import About from '../components/pages/About.vue'
import Contact from '../components/pages/Contact.vue'
import FAQ from '../components/pages/FAQ.vue'
import Testimonials from '../components/pages/Testimonials.vue'
import Login from '../components/auth/Login.vue'
import Register from '../components/auth/Register.vue'
import Dashboard from '../components/dashboard/Dashboard.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/planos',
        name: 'Plans',
        component: Plans
    },
    {
        path: '/sobre',
        name: 'About',
        component: About
    },
    {
        path: '/contato',
        name: 'Contact',
        component: Contact
    },
    {
        path: '/faq',
        name: 'FAQ',
        component: FAQ
    },
    {
        path: '/depoimentos',
        name: 'Testimonials',
        component: Testimonials
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/registro',
        name: 'Register',
        component: Register
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('auth_token')
    
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token) {
            next('/login')
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
