<template>
  <div class="about-admin">
    <div class="header">
      <h1>Gerenciar Sobre Nós</h1>
    </div>

    <form @submit.prevent="saveAbout" class="about-form">
      <div class="form-section">
        <h2>Seção Principal</h2>
        
        <div class="form-group">
          <label>Título</label>
          <input v-model="aboutForm.title" type="text" required>
        </div>

        <div class="form-group">
          <label>Subtítulo</label>
          <input v-model="aboutForm.subtitle" type="text" required>
        </div>

        <div class="form-group">
          <label>Descrição</label>
          <textarea v-model="aboutForm.description" rows="4" required></textarea>
        </div>

        <div class="form-group">
          <label>Imagem Principal</label>
          <input v-model="aboutForm.main_image" type="url" required>
        </div>
      </div>

      <div class="form-section">
        <h2>Valores</h2>
        
        <div class="values-list">
          <div v-for="(value, index) in aboutForm.values" :key="index" class="value-item">
            <div class="form-group">
              <label>Título</label>
              <input v-model="value.title" type="text" required>
            </div>

            <div class="form-group">
              <label>Descrição</label>
              <textarea v-model="value.description" rows="2" required></textarea>
            </div>

            <div class="form-group">
              <label>Ícone (classe FontAwesome)</label>
              <input v-model="value.icon" type="text" required>
            </div>

            <button type="button" @click="removeValue(index)" class="btn-icon text-red">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>

        <button type="button" @click="addValue" class="btn-secondary">
          <i class="fas fa-plus"></i>
          Adicionar Valor
        </button>
      </div>

      <div class="form-section">
        <h2>Equipe</h2>
        
        <div class="team-list">
          <div v-for="(member, index) in aboutForm.team" :key="index" class="team-item">
            <div class="form-group">
              <label>Nome</label>
              <input v-model="member.name" type="text" required>
            </div>

            <div class="form-group">
              <label>Cargo</label>
              <input v-model="member.role" type="text" required>
            </div>

            <div class="form-group">
              <label>Foto</label>
              <input v-model="member.photo" type="url" required>
            </div>

            <div class="form-group">
              <label>Biografia</label>
              <textarea v-model="member.bio" rows="3" required></textarea>
            </div>

            <button type="button" @click="removeTeamMember(index)" class="btn-icon text-red">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>

        <button type="button" @click="addTeamMember" class="btn-secondary">
          <i class="fas fa-plus"></i>
          Adicionar Membro
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
import { aboutService } from '../../services/about';

export default {
  name: 'AboutAdmin',
  data() {
    return {
      aboutForm: {
        title: '',
        subtitle: '',
        description: '',
        main_image: '',
        values: [],
        team: []
      }
    }
  },
  async mounted() {
    await this.loadAbout();
  },
  methods: {
    async loadAbout() {
      try {
        const response = await aboutService.getAbout();
        this.aboutForm = response.data;
      } catch (error) {
        console.error('Erro ao carregar dados do Sobre Nós:', error);
      }
    },
    addValue() {
      this.aboutForm.values.push({
        title: '',
        description: '',
        icon: ''
      });
    },
    removeValue(index) {
      this.aboutForm.values.splice(index, 1);
    },
    addTeamMember() {
      this.aboutForm.team.push({
        name: '',
        role: '',
        photo: '',
        bio: ''
      });
    },
    removeTeamMember(index) {
      this.aboutForm.team.splice(index, 1);
    },
    async saveAbout() {
      try {
        await aboutService.updateAbout(this.aboutForm);
        alert('Alterações salvas com sucesso!');
      } catch (error) {
        console.error('Erro ao salvar dados do Sobre Nós:', error);
        alert('Erro ao salvar alterações. Tente novamente.');
      }
    }
  }
}
</script>

<style scoped>
.about-admin {
  padding: 1rem;
}

.header {
  margin-bottom: 2rem;
}

.about-form {
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

.values-list,
.team-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.value-item,
.team-item {
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