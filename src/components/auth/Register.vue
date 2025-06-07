
<template>
  <div class="register">
    <section class="section">
      <div class="container">
        <div class="auth-container">
          <div class="auth-card">
            <div class="auth-header">
              <h1>Criar sua conta</h1>
              <p>Junte-se ao Trust-me e tenha segurança jurídica</p>
            </div>
            
            <form @submit.prevent="register" class="auth-form">
              <div class="form-group">
                <label for="name">Nome Completo</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name" 
                  required 
                  :disabled="loading"
                  placeholder="Seu nome completo"
                />
              </div>
              
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
                <label for="phone">Telefone (opcional)</label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="form.phone" 
                  :disabled="loading"
                  placeholder="(11) 99999-9999"
                />
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="birth_date">Data de Nascimento</label>
                  <input 
                    type="date" 
                    id="birth_date" 
                    v-model="form.birth_date" 
                    :disabled="loading"
                  />
                </div>
                
                <div class="form-group">
                  <label for="gender">Gênero</label>
                  <select id="gender" v-model="form.gender" :disabled="loading">
                    <option value="">Selecionar</option>
                    <option value="male">Masculino</option>
                    <option value="female">Feminino</option>
                    <option value="other">Outro</option>
                  </select>
                </div>
              </div>
              
              <div class="form-group">
                <label for="password">Senha</label>
                <input 
                  type="password" 
                  id="password" 
                  v-model="form.password" 
                  required 
                  :disabled="loading"
                  placeholder="Mínimo 8 caracteres"
                  minlength="8"
                />
              </div>
              
              <div class="form-group">
                <label for="password_confirmation">Confirmar Senha</label>
                <input 
                  type="password" 
                  id="password_confirmation" 
                  v-model="form.password_confirmation" 
                  required 
                  :disabled="loading"
                  placeholder="Confirme sua senha"
                />
              </div>
              
              <button type="submit" class="btn btn-submit" :disabled="loading">
                {{ loading ? 'Criando conta...' : 'Criar Conta' }}
              </button>
            </form>
            
            <div v-if="error" class="error-message">
              {{ error }}
            </div>
            
            <div class="auth-footer">
              <p>Já tem uma conta? <router-link to="/login">Fazer login</router-link></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        birth_date: '',
        gender: '',
        password: '',
        password_confirmation: ''
      },
      loading: false,
      error: ''
    }
  },
  methods: {
    async register() {
      try {
        this.loading = true
        this.error = ''
        
        // Validate password confirmation
        if (this.form.password !== this.form.password_confirmation) {
          this.error = 'As senhas não coincidem'
          return
        }
        
        const response = await axios.post('/register', this.form)
        
        if (response.data.success) {
          // Store token
          localStorage.setItem('auth_token', response.data.token)
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
          
          // Redirect to dashboard
          this.$router.push('/dashboard')
        }
      } catch (error) {
        if (error.response && error.response.data) {
          if (error.response.data.errors) {
            // Handle validation errors
            const errors = error.response.data.errors
            const firstError = Object.values(errors)[0]
            this.error = Array.isArray(firstError) ? firstError[0] : firstError
          } else {
            this.error = error.response.data.message || 'Erro ao criar conta'
          }
        } else {
          this.error = 'Erro de conexão. Tente novamente.'
        }
        console.error('Register error:', error)
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    // Redirect if already logged in
    const token = localStorage.getItem('auth_token')
    if (token) {
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style scoped>
.register {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 2rem 0;
}

.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-card {
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
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

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #374151;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #3b82f6;
}

.form-group input:disabled,
.form-group select:disabled {
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
  
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
