<template>
  <div class="contact-admin">
    <div class="header">
      <h1>Gerenciar Contato</h1>
    </div>

    <form @submit.prevent="saveContact" class="contact-form">
      <div class="form-section">
        <h2>Informações de Contato</h2>
        
        <div class="form-group">
          <label>Endereço</label>
          <input v-model="contactForm.address" type="text" required>
        </div>

        <div class="form-group">
          <label>Telefone</label>
          <input v-model="contactForm.phone" type="tel" required>
        </div>

        <div class="form-group">
          <label>E-mail</label>
          <input v-model="contactForm.email" type="email" required>
        </div>

        <div class="form-group">
          <label>WhatsApp</label>
          <input v-model="contactForm.whatsapp" type="tel" required>
        </div>
      </div>

      <div class="form-section">
        <h2>Horário de Funcionamento</h2>
        
        <div class="schedule-list">
          <div v-for="(schedule, index) in contactForm.schedule" :key="index" class="schedule-item">
            <div class="form-group">
              <label>Dia da Semana</label>
              <select v-model="schedule.day" required>
                <option value="Segunda-feira">Segunda-feira</option>
                <option value="Terça-feira">Terça-feira</option>
                <option value="Quarta-feira">Quarta-feira</option>
                <option value="Quinta-feira">Quinta-feira</option>
                <option value="Sexta-feira">Sexta-feira</option>
                <option value="Sábado">Sábado</option>
                <option value="Domingo">Domingo</option>
              </select>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Abertura</label>
                <input v-model="schedule.open" type="time" required>
              </div>

              <div class="form-group">
                <label>Fechamento</label>
                <input v-model="schedule.close" type="time" required>
              </div>
            </div>

            <div class="form-group">
              <label>Observação</label>
              <input v-model="schedule.observation" type="text">
            </div>

            <button type="button" @click="removeSchedule(index)" class="btn-icon text-red">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>

        <button type="button" @click="addSchedule" class="btn-secondary">
          <i class="fas fa-plus"></i>
          Adicionar Horário
        </button>
      </div>

      <div class="form-section">
        <h2>Redes Sociais</h2>
        
        <div class="social-list">
          <div v-for="(social, index) in contactForm.social_media" :key="index" class="social-item">
            <div class="form-group">
              <label>Rede Social</label>
              <select v-model="social.platform" required>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="twitter">Twitter</option>
                <option value="youtube">YouTube</option>
              </select>
            </div>

            <div class="form-group">
              <label>URL</label>
              <input v-model="social.url" type="url" required>
            </div>

            <button type="button" @click="removeSocial(index)" class="btn-icon text-red">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>

        <button type="button" @click="addSocial" class="btn-secondary">
          <i class="fas fa-plus"></i>
          Adicionar Rede Social
        </button>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-primary">
          <i class="fas fa-save"></i>
          Salvar Alterações
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { contactService } from '../../services/contact';

export default {
  name: 'ContactAdmin',
  data() {
    return {
      contactForm: {
        address: '',
        phone: '',
        email: '',
        whatsapp: '',
        schedule: [],
        social_media: []
      }
    }
  },
  async mounted() {
    await this.loadContact();
  },
  methods: {
    async loadContact() {
      try {
        const response = await contactService.getContact();
        this.contactForm = response.data;
      } catch (error) {
        console.error('Erro ao carregar dados de contato:', error);
      }
    },
    addSchedule() {
      this.contactForm.schedule.push({
        day: 'Segunda-feira',
        open: '09:00',
        close: '18:00',
        observation: ''
      });
    },
    removeSchedule(index) {
      this.contactForm.schedule.splice(index, 1);
    },
    addSocial() {
      this.contactForm.social_media.push({
        platform: 'facebook',
        url: ''
      });
    },
    removeSocial(index) {
      this.contactForm.social_media.splice(index, 1);
    },
    async saveContact() {
      try {
        await contactService.updateContact(this.contactForm);
        alert('Alterações salvas com sucesso!');
      } catch (error) {
        console.error('Erro ao salvar dados de contato:', error);
        alert('Erro ao salvar alterações. Tente novamente.');
      }
    }
  }
}
</script>

<style scoped>
.contact-admin {
  padding: 1rem;
}

.header {
  margin-bottom: 2rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-section {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-section h2 {
  margin-bottom: 1.5rem;
  color: #1f2937;
  font-size: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group label {
  font-weight: 500;
  color: #4b5563;
}

.form-group input,
.form-group select {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
}

.schedule-list,
.social-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.schedule-item,
.social-item {
  background: #f9fafb;
  border-radius: 4px;
  padding: 1rem;
  position: relative;
}

.btn-icon {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #6b7280;
}

.btn-icon:hover {
  color: #3b82f6;
}

.text-red {
  color: #ef4444;
}

.text-red:hover {
  color: #dc2626;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.btn-primary {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
}

.btn-secondary {
  background: #e5e7eb;
  color: #4b5563;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-secondary:hover {
  background: #d1d5db;
}
</style> 