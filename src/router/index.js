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
import AdminDashboard from '../components/admin/Dashboard.vue'
import AdminHome from '../components/admin/Home.vue'
import AdminPlans from '../components/admin/Plans.vue'
import AdminTestimonials from '../components/admin/Testimonials.vue'
import AdminAbout from '../components/admin/About.vue'
import AdminContact from '../components/admin/Contact.vue'
import AdminFAQ from '../components/admin/FAQ.vue'

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
    },
    {
        path: '/admin',
        name: 'AdminDashboard',
        component: AdminDashboard,
        meta: { requiresAuth: true, requiresAdmin: true },
        children: [
            {
                path: 'home',
                name: 'AdminHome',
                component: AdminHome
            },
            {
                path: 'plans',
                name: 'AdminPlans',
                component: AdminPlans
            },
            {
                path: 'testimonials',
                name: 'AdminTestimonials',
                component: AdminTestimonials
            },
            {
                path: 'about',
                name: 'AdminAbout',
                component: AdminAbout
            },
            {
                path: 'contact',
                name: 'AdminContact',
                component: AdminContact
            },
            {
                path: 'faq',
                name: 'AdminFAQ',
                component: AdminFAQ
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('auth_token')
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token) {
            next('/login')
        } else if (to.matched.some(record => record.meta.requiresAdmin) && !user.is_admin) {
            next('/dashboard')
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
