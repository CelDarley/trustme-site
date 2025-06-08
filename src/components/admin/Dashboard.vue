<template>
  <div class="dashboard">
    <aside class="sidebar">
      <div class="logo">
        <h1>TrustMe</h1>
      </div>
      
      <nav class="menu">
        <router-link to="/admin/home" class="menu-item">
          <i class="fas fa-home"></i>
          <span>Página Inicial</span>
        </router-link>
        
        <router-link to="/admin/plans" class="menu-item">
          <i class="fas fa-box"></i>
          <span>Planos</span>
        </router-link>
        
        <router-link to="/admin/testimonials" class="menu-item">
          <i class="fas fa-comments"></i>
          <span>Depoimentos</span>
        </router-link>
        
        <router-link to="/admin/about" class="menu-item">
          <i class="fas fa-info-circle"></i>
          <span>Sobre Nós</span>
        </router-link>
        
        <router-link to="/admin/contact" class="menu-item">
          <i class="fas fa-address-card"></i>
          <span>Contato</span>
        </router-link>
        
        <router-link to="/admin/faq" class="menu-item">
          <i class="fas fa-question-circle"></i>
          <span>FAQ</span>
        </router-link>
      </nav>
    </aside>

    <main class="content">
      <header class="header">
        <div class="user-info">
          <span>Bem-vindo, {{ user?.name }}</span>
        </div>
        <button @click="logout" class="btn-logout">
          <i class="fas fa-sign-out-alt"></i>
          Sair
        </button>
      </header>

      <div class="page-content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import { authService } from '../../services/auth';

export default {
  name: 'Dashboard',
  data() {
    return {
      user: null
    }
  },
  async mounted() {
    await this.loadUser();
  },
  methods: {
    async loadUser() {
      try {
        const response = await authService.getCurrentUser();
        this.user = response.user;
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        this.$router.push('/login');
      }
    },
    async logout() {
      try {
        await authService.logout();
        this.$router.push('/login');
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    }
  }
}
</script>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background: #1f2937;
  color: white;
  padding: 1.5rem;
}

.logo {
  margin-bottom: 2rem;
  text-align: center;
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: bold;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #e5e7eb;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background: #374151;
}

.menu-item.router-link-active {
  background: #3b82f6;
  color: white;
}

.content {
  flex: 1;
  background: #f3f4f6;
}

.header {
  background: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.user-info {
  color: #4b5563;
}

.btn-logout {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.page-content {
  padding: 2rem;
}
</style> 