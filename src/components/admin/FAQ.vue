<template>
  <div class="faq-admin">
    <div class="header">
      <h1>Gerenciar FAQ</h1>
      <button @click="showNewQuestionModal = true" class="btn-primary">
        <i class="fa-solid fa-plus"></i>
        Nova Pergunta
      </button>
    </div>

    <div class="faq-list">
      <div v-for="question in questions" :key="question.id" class="faq-item">
        <div class="question-header">
          <div class="question-info">
            <h3>{{ question.question }}</h3>
            <span class="category">{{ question.category }}</span>
          </div>
          <div class="actions">
            <button @click="editQuestion(question)" class="btn-icon" title="Editar">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button @click="confirmDelete(question)" class="btn-icon text-red" title="Excluir">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>

        <div class="answer">
          <p>{{ question.answer }}</p>
        </div>
      </div>
    </div>

    <!-- Modal de Pergunta -->
    <div v-if="showNewQuestionModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ editingQuestion ? 'Editar Pergunta' : 'Nova Pergunta' }}</h2>
          <button @click="closeModal" class="btn-icon">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form @submit.prevent="saveQuestion" class="question-form">
          <div class="form-group">
            <label>Categoria</label>
            <select v-model="questionForm.category" required>
              <option value="Geral">Geral</option>
              <option value="Planos">Planos</option>
              <option value="Pagamentos">Pagamentos</option>
              <option value="Suporte">Suporte</option>
            </select>
          </div>

          <div class="form-group">
            <label>Pergunta</label>
            <input v-model="questionForm.question" type="text" required>
          </div>

          <div class="form-group">
            <label>Resposta</label>
            <textarea v-model="questionForm.answer" rows="4" required></textarea>
          </div>

          <div class="form-actions">
            <button type="button" @click="closeModal" class="btn-secondary">Cancelar</button>
            <button type="submit" class="btn-primary" :disabled="saving">
              {{ saving ? 'Salvando...' : 'Salvar' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de Confirmação de Exclusão -->
    <div v-if="showDeleteModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Confirmar Exclusão</h2>
          <button @click="showDeleteModal = false" class="btn-icon">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div class="modal-body">
          <p>Tem certeza que deseja excluir a pergunta:</p>
          <p class="question-to-delete">{{ questionToDelete?.question }}</p>
        </div>

        <div class="form-actions">
          <button @click="showDeleteModal = false" class="btn-secondary">Cancelar</button>
          <button @click="deleteQuestion" class="btn-danger" :disabled="deleting">
            {{ deleting ? 'Excluindo...' : 'Excluir' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { faqService } from '../../services/faq';

export default {
  name: 'FAQAdmin',
  data() {
    return {
      questions: [],
      showNewQuestionModal: false,
      showDeleteModal: false,
      editingQuestion: null,
      questionToDelete: null,
      saving: false,
      deleting: false,
      questionForm: {
        category: 'Geral',
        question: '',
        answer: ''
      }
    }
  },
  async mounted() {
    await this.loadQuestions();
  },
  methods: {
    async loadQuestions() {
      try {
        const response = await faqService.getFAQs();
        this.questions = response.faqs || [];
      } catch (error) {
        console.error('Erro ao carregar perguntas:', error);
        alert('Erro ao carregar perguntas. Por favor, tente novamente.');
      }
    },
    editQuestion(question) {
      this.editingQuestion = question;
      this.questionForm = { ...question };
      this.showNewQuestionModal = true;
    },
    confirmDelete(question) {
      this.questionToDelete = question;
      this.showDeleteModal = true;
    },
    async deleteQuestion() {
      if (!this.questionToDelete) return;

      try {
        this.deleting = true;
        await faqService.deleteFAQ(this.questionToDelete.id);
        await this.loadQuestions();
        this.showDeleteModal = false;
        this.questionToDelete = null;
      } catch (error) {
        console.error('Erro ao excluir pergunta:', error);
        alert('Erro ao excluir pergunta. Por favor, tente novamente.');
      } finally {
        this.deleting = false;
      }
    },
    closeModal() {
      this.showNewQuestionModal = false;
      this.editingQuestion = null;
      this.questionForm = {
        category: 'Geral',
        question: '',
        answer: ''
      };
    },
    async saveQuestion() {
      try {
        this.saving = true;
        if (this.editingQuestion) {
          await faqService.updateFAQ(this.editingQuestion.id, this.questionForm);
        } else {
          await faqService.createFAQ(this.questionForm);
        }

        await this.loadQuestions();
        this.closeModal();
      } catch (error) {
        console.error('Erro ao salvar pergunta:', error);
        alert('Erro ao salvar pergunta. Por favor, tente novamente.');
      } finally {
        this.saving = false;
      }
    }
  }
}
</script>

<style scoped>
.faq-admin {
  padding: 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.question-info {
  flex: 1;
}

.question-info h3 {
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.category {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #e5e7eb;
  color: #4b5563;
  border-radius: 9999px;
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
  transition: color 0.2s;
}

.btn-icon:hover {
  color: #3b82f6;
}

.btn-icon.text-red:hover {
  color: #ef4444;
}

.answer {
  color: #6b7280;
  line-height: 1.6;
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
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  color: #1f2937;
}

.modal-body {
  padding: 1.5rem;
}

.question-to-delete {
  font-weight: 600;
  color: #1f2937;
  margin-top: 0.5rem;
}

.question-form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #4b5563;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-primary,
.btn-secondary,
.btn-danger {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #3b82f6;
  color: white;
  border: none;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-primary:disabled {
  background: #93c5fd;
  cursor: not-allowed;
}

.btn-secondary {
  background: white;
  color: #4b5563;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover {
  background: #f9fafb;
}

.btn-danger {
  background: #ef4444;
  color: white;
  border: none;
}

.btn-danger:hover {
  background: #dc2626;
}

.btn-danger:disabled {
  background: #fca5a5;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .modal-content {
    margin: 1rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .form-actions button {
    width: 100%;
  }
}
</style> 