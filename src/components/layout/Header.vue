
<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <div class="nav-brand">
          <router-link to="/" class="brand-link">
            <h1>Trust-me</h1>
          </router-link>
        </div>
        
        <div class="nav-menu" :class="{ 'nav-menu-open': menuOpen }">
          <router-link to="/" class="nav-link" @click="closeMenu">Início</router-link>
          <router-link to="/planos" class="nav-link" @click="closeMenu">Planos</router-link>
          <router-link to="/sobre" class="nav-link" @click="closeMenu">Sobre</router-link>
          <router-link to="/faq" class="nav-link" @click="closeMenu">FAQ</router-link>
          <router-link to="/depoimentos" class="nav-link" @click="closeMenu">Depoimentos</router-link>
          <router-link to="/contato" class="nav-link" @click="closeMenu">Contato</router-link>
          
          <div class="nav-auth" v-if="!isAuthenticated">
            <router-link to="/login" class="btn btn-outline" @click="closeMenu">Entrar</router-link>
            <router-link to="/registro" class="btn" @click="closeMenu">Começar Agora</router-link>
          </div>
          
          <div class="nav-auth" v-else>
            <router-link to="/dashboard" class="nav-link" @click="closeMenu">Dashboard</router-link>
            <button @click="logout" class="btn btn-secondary">Sair</button>
          </div>
        </div>
        
        <button class="nav-toggle" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </div>
  </header>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Header',
  data() {
    return {
      menuOpen: false,
      isAuthenticated: false
    }
  },
  mounted() {
    this.checkAuth()
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },
    closeMenu() {
      this.menuOpen = false
    },
    checkAuth() {
      const token = localStorage.getItem('auth_token')
      this.isAuthenticated = !!token
    },
    async logout() {
      try {
        await axios.post('/logout')
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        localStorage.removeItem('auth_token')
        delete axios.defaults.headers.common['Authorization']
        this.isAuthenticated = false
        this.$router.push('/')
      }
    }
  },
  watch: {
    '$route'() {
      this.checkAuth()
      this.closeMenu()
    }
  }
}
</script>

<style scoped>
.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid #e5e7eb;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.nav-brand .brand-link {
  text-decoration: none;
  color: #3b82f6;
}

.nav-brand h1 {
  font-size: 1.8rem;
  font-weight: bold;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #3b82f6;
}

.nav-auth {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.nav-toggle span {
  width: 25px;
  height: 3px;
  background: #374151;
  margin: 3px 0;
  transition: 0.3s;
}

@media (max-width: 768px) {
  .nav-menu {
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    height: calc(100vh - 70px);
    background: white;
    flex-direction: column;
    justify-content: flex-start;
    padding: 2rem;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .nav-menu-open {
    transform: translateX(0);
  }

  .nav-auth {
    flex-direction: column;
    width: 100%;
    margin-top: 2rem;
  }

  .nav-auth .btn {
    width: 100%;
    text-align: center;
  }

  .nav-toggle {
    display: flex;
  }

  .nav-menu-open ~ .nav-toggle span:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
  }

  .nav-menu-open ~ .nav-toggle span:nth-child(2) {
    opacity: 0;
  }

  .nav-menu-open ~ .nav-toggle span:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
  }
}
</style>
