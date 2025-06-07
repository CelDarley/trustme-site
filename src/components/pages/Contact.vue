
<template>
  <div class="contact">
    <section class="section">
      <div class="container">
        <h1 class="section-title">Entre em Contato</h1>
        <p class="section-subtitle">Tem alguma dúvida? Estamos aqui para ajudar!</p>
        
        <div class="contact-content">
          <div class="contact-form">
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="name">Nome Completo</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name" 
                  required 
                  :disabled="loading"
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
                />
              </div>
              
              <div class="form-group">
                <label for="subject">Assunto</label>
                <input 
                  type="text" 
                  id="subject" 
                  v-model="form.subject" 
                  required 
                  :disabled="loading"
                />
              </div>
              
              <div class="form-group">
                <label for="message">Mensagem</label>
                <textarea 
                  id="message" 
                  v-model="form.message" 
                  rows="6" 
                  required 
                  :disabled="loading"
                ></textarea>
              </div>
              
              <button type="submit" class="btn btn-submit" :disabled="loading">
                {{ loading ? 'Enviando...' : 'Enviar Mensagem' }}
              </button>
            </form>
            
            <div v-if="message" class="message" :class="messageType">
              {{ message }}
            </div>
          </div>
          
          <div class="contact-info">
            <div class="info-card">
              <h3>Informações de Contato</h3>
              
              <div class="info-item">
                <div class="info-icon">📧</div>
                <div>
                  <h4>E-mail</h4>
                  <p>contato@trust-me.com</p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">📱</div>
                <div>
                  <h4>Telefone</h4>
                  <p>(11) 9999-9999</p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">🕒</div>
                <div>
                  <h4>Horário de Atendimento</h4>
                  <p>Segunda a Sexta: 9h às 18h</p>
                </div>
              </div>
            </div>
            
            <div class="info-card">
              <h3>Perguntas Frequentes</h3>
              <p>Antes de entrar em contato, que tal dar uma olhada nas nossas perguntas frequentes? Talvez sua dúvida já esteja respondida lá!</p>
              <router-link to="/faq" class="btn btn-outline">Ver FAQ</router-link>
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
  name: 'Contact',
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      loading: false,
      message: '',
      messageType: ''
    }
  },
  methods: {
    async submitForm() {
      try {
        this.loading = true
        this.message = ''
        
        const response = await axios.post('/contact', this.form)
        
        if (response.data.success) {
          this.message = 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
          this.messageType = 'success'
          this.resetForm()
        }
      } catch (error) {
        this.message = 'Erro ao enviar mensagem. Tente novamente.'
        this.messageType = 'error'
        console.error('Contact form error:', error)
      } finally {
        this.loading = false
      }
    },
    resetForm() {
      this.form = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  }
}
</script>

<style scoped>
.contact {
  background: #f8fafc;
  min-height: 100vh;
}

.contact-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: start;
}

.contact-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
}

.form-group input:disabled,
.form-group textarea:disabled {
  background: #f3f4f6;
  cursor: not-allowed;
}

.btn-submit {
  width: 100%;
  padding: 16px;
  font-size: 1.1rem;
  font-weight: 600;
}

.btn-submit:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.message {
  margin-top: 1rem;
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 500;
}

.message.success {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #10b981;
}

.message.error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #ef4444;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.info-card h3 {
  color: #1f2937;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.info-icon {
  font-size: 1.5rem;
  margin-top: 0.25rem;
}

.info-item h4 {
  color: #374151;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.info-item p {
  color: #6b7280;
  margin: 0;
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
