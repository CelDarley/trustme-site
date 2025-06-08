<template>
  <div class="testimonials-admin">
    <div class="header">
      <h1>Gerenciar Depoimentos</h1>
      <button @click="showNewTestimonialModal = true" class="btn-primary">
        <i class="fas fa-plus"></i>
        Novo Depoimento
      </button>
    </div>

    <div class="testimonials-grid">
      <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-card">
        <div class="testimonial-header">
          <div class="author-info">
            <img :src="testimonial.avatar" :alt="testimonial.name" class="avatar">
            <div>
              <h3>{{ testimonial.name }}</h3>
              <span class="role">{{ testimonial.role }}</span>
            </div>
          </div>
          <div class="actions">
            <button @click="editTestimonial(testimonial)" class="btn-icon">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="deleteTestimonial(testimonial.id)" class="btn-icon text-red">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>

        <div class="testimonial-content">
          <p>{{ testimonial.content }}</p>
        </div>
      </div>
    </div>

    <!-- Modal de Depoimento -->
    <div v-if="showNewTestimonialModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ editingTestimonial ? 'Editar Depoimento' : 'Novo Depoimento' }}</h2>
          <button @click="closeModal" class="btn-icon">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <form @submit.prevent="saveTestimonial" class="testimonial-form">
          <div class="form-group">
            <label>Nome</label>
            <input v-model="testimonialForm.name" type="text" required>
          </div>

          <div class="form-group">
            <label>Cargo</label>
            <input v-model="testimonialForm.role" type="text" required>
          </div>

          <div class="form-group">
            <label>Avatar URL</label>
            <input v-model="testimonialForm.avatar" type="url" required>
          </div>

          <div class="form-group">
            <label>Depoimento</label>
            <textarea v-model="testimonialForm.content" rows="4" required></textarea>
          </div>

          <div class="form-actions">
            <button type="button" @click="closeModal" class="btn-secondary">Cancelar</button>
            <button type="submit" class="btn-primary">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { testimonialsService } from '../../services/testimonials';

export default {
  name: 'TestimonialsAdmin',
  data() {
    return {
      testimonials: [],
      showNewTestimonialModal: false,
      editingTestimonial: null,
      testimonialForm: {
        name: '',
        role: '',
        avatar: '',
        content: ''
      }
    }
  },
  async mounted() {
    await this.loadTestimonials();
  },
  methods: {
    async loadTestimonials() {
      try {
        const response = await testimonialsService.getTestimonials();
        this.testimonials = response.data;
      } catch (error) {
        console.error('Erro ao carregar depoimentos:', error);
      }
    },
    editTestimonial(testimonial) {
      this.editingTestimonial = testimonial;
      this.testimonialForm = { ...testimonial };
      this.showNewTestimonialModal = true;
    },
    async deleteTestimonial(id) {
      if (!confirm('Tem certeza que deseja excluir este depoimento?')) return;

      try {
        await testimonialsService.deleteTestimonial(id);
        await this.loadTestimonials();
      } catch (error) {
        console.error('Erro ao excluir depoimento:', error);
      }
    },
    closeModal() {
      this.showNewTestimonialModal = false;
      this.editingTestimonial = null;
      this.testimonialForm = {
        name: '',
        role: '',
        avatar: '',
        content: ''
      };
    },
    async saveTestimonial() {
      try {
        if (this.editingTestimonial) {
          await testimonialsService.updateTestimonial(this.editingTestimonial.id, this.testimonialForm);
        } else {
          await testimonialsService.createTestimonial(this.testimonialForm);
        }

        await this.loadTestimonials();
        this.closeModal();
      } catch (error) {
        console.error('Erro ao salvar depoimento:', error);
      }
    }
  }
}
</script>

<style scoped>
.testimonials-admin {
  padding: 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.testimonial-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.testimonial-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.role {
  color: #6b7280;
  font-size: 0.875rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
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

.testimonial-content {
  color: #4b5563;
  line-height: 1.5;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  width: 100%;
  max-width: 500px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.testimonial-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #4b5563;
}

.form-group input,
.form-group textarea {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
}

.form-group textarea {
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-primary {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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