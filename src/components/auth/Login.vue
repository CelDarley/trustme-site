<template>
  <div class="login">
    <section class="section">
      <div class="container">
        <div class="auth-container">
          <div class="auth-card">
            <div class="auth-header">
              <h1>Entrar na sua conta</h1>
              <p>Acesse sua conta do Trust-me</p>
            </div>
            
            <form @submit.prevent="login" class="auth-form">
              <div class="form-group">
                <label for="email">E-mail</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email" 
                  required 
                  :disabled="loading"
                  placeholder="seu@email.com"
                />
              </div>
              
              <div class="form-group">
                <label for="password">Senha</label>
                <input 
                  type="password" 
                  id="password" 
                  v-model="form.password" 
                  required 
                  :disabled="loading"
                  placeholder="Sua senha"
                />
              </div>
              
              <button type="submit" class="btn btn-submit" :disabled="loading">
                {{ loading ? 'Entrando...' : 'Entrar' }}
              </button>
            </form>
            
            <div v-if="error" class="error-message">
              {{ error }}
            </div>
            
            <div class="auth-footer">
              <p>Não tem uma conta? <router-link to="/registro">Criar conta</router-link></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { authService } from '../../services/auth'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      loading: false,
      error: ''
    }
  },
  methods: {
    async login() {
      try {
        this.loading = true
        this.error = ''
        
        console.log('Iniciando login com:', this.form)
        const response = await authService.login(this.form)
        console.log('Login bem sucedido:', response)
        
        // Salvar token e dados do usuário
        localStorage.setItem('auth_token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
        
        // Redirecionar baseado no tipo de usuário
        if (response.user.is_admin) {
          this.$router.push('/admin')
        } else {
          this.$router.push('/dashboard')
        }
      } catch (error) {
        console.error('Erro detalhado no login:', error)
        if (error.message) {
          this.error = error.message
        } else if (error.error) {
          this.error = error.error
        } else if (error.response?.data?.message) {
          this.error = error.response.data.message
        } else {
          this.error = 'Erro ao fazer login. Verifique suas credenciais e tente novamente.'
        }
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    // Redirect if already logged in
    const token = localStorage.getItem('token')
    if (token) {
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style scoped>
.login {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.auth-card {
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-header h1 {
  color: #1f2937;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.auth-header p {
  color: #6b7280;
  font-size: 1rem;
}

.auth-form {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #374151;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #3b82f6;
}

.form-group input:disabled {
  background: #f3f4f6;
  cursor: not-allowed;
}

.btn-submit {
  width: 100%;
  padding: 16px;
  font-size: 1.1rem;
  font-weight: 600;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-submit:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-2px);
}

.btn-submit:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

.error-message {
  background: #fee2e2;
  color: #991b1b;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid #ef4444;
  text-align: center;
}

.auth-footer {
  text-align: center;
}

.auth-footer p {
  color: #6b7280;
}

.auth-footer a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
}

.auth-footer a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .auth-card {
    padding: 2rem;
    margin: 1rem;
  }
  
  .auth-header h1 {
    font-size: 1.8rem;
  }
}
</style>
