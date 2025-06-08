<template>
  <div class="home-admin">
    <div class="header">
      <h1>Gerenciar Página Inicial</h1>
    </div>

    <div class="home-form">
      <form @submit.prevent="saveHome" class="form">
        <div class="form-section">
          <h2>Hero Section</h2>
          
          <div class="form-group">
            <label for="hero_title">Título Principal</label>
            <input 
              type="text" 
              id="hero_title" 
              v-model="form.hero.title" 
              required
            >
          </div>

          <div class="form-group">
            <label for="hero_subtitle">Subtítulo</label>
            <input 
              type="text" 
              id="hero_subtitle" 
              v-model="form.hero.subtitle" 
              required
            >
          </div>

          <div class="form-group">
            <label for="hero_image">URL da Imagem de Fundo</label>
            <input 
              type="url" 
              id="hero_image" 
              v-model="form.hero.image" 
              required
            >
          </div>

          <div class="form-group">
            <label for="hero_cta_text">Texto do Botão CTA</label>
            <input 
              type="text" 
              id="hero_cta_text" 
              v-model="form.hero.cta_text" 
              required
            >
          </div>
        </div>

        <div class="form-section">
          <h2>Seção de Recursos</h2>
          
          <div class="features-list">
            <div v-for="(feature, index) in form.features" :key="index" class="feature-item">
              <div class="feature-header">
                <h3>Recurso {{ index + 1 }}</h3>
                <button 
                  type="button" 
                  @click="removeFeature(index)"
                  class="btn-remove"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>

              <div class="form-group">
                <label :for="'feature_title_' + index">Título</label>
                <input 
                  type="text" 
                  :id="'feature_title_' + index"
                  v-model="feature.title"
                  required
                >
              </div>

              <div class="form-group">
                <label :for="'feature_description_' + index">Descrição</label>
                <textarea 
                  :id="'feature_description_' + index"
                  v-model="feature.description"
                  required
                  rows="3"
                ></textarea>
              </div>

              <div class="form-group">
                <label :for="'feature_icon_' + index">Ícone (classe Font Awesome)</label>
                <input 
                  type="text" 
                  :id="'feature_icon_' + index"
                  v-model="feature.icon"
                  placeholder="Ex: fa-check, fa-star, etc."
                  required
                >
              </div>
            </div>

            <button 
              type="button" 
              @click="addFeature"
              class="btn-add-feature"
            >
              <i class="fas fa-plus"></i> Adicionar Recurso
            </button>
          </div>
        </div>

        <div class="form-section">
          <h2>Seção de Chamada para Ação</h2>
          
          <div class="form-group">
            <label for="cta_title">Título</label>
            <input 
              type="text" 
              id="cta_title" 
              v-model="form.cta.title" 
              required
            >
          </div>

          <div class="form-group">
            <label for="cta_description">Descrição</label>
            <textarea 
              id="cta_description" 
              v-model="form.cta.description" 
              required
              rows="3"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="cta_button_text">Texto do Botão</label>
            <input 
              type="text" 
              id="cta_button_text" 
              v-model="form.cta.button_text" 
              required
            >
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-save">
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { homeService } from '../../services/home';

export default {
  name: 'HomeAdmin',
  data() {
    return {
      form: {
        hero: {
          title: '',
          subtitle: '',
          image: '',
          cta_text: ''
        },
        features: [],
        cta: {
          title: '',
          description: '',
          button_text: ''
        }
      }
    }
  },
  async mounted() {
    await this.loadHome();
  },
  methods: {
    async loadHome() {
      try {
        const response = await homeService.getHome();
        this.form = response.home;
      } catch (error) {
        console.error('Erro ao carregar conteúdo da página inicial:', error);
      }
    },
    addFeature() {
      this.form.features.push({
        title: '',
        description: '',
        icon: ''
      });
    },
    removeFeature(index) {
      this.form.features.splice(index, 1);
    },
    async saveHome() {
      try {
        await homeService.updateHome(this.form);
        alert('Conteúdo da página inicial atualizado com sucesso!');
      } catch (error) {
        console.error('Erro ao salvar conteúdo da página inicial:', error);
        alert('Erro ao salvar conteúdo da página inicial. Tente novamente.');
      }
    }
  }
}
</script>

<style scoped>
.home-admin {
  padding: 1rem;
}

.header {
  margin-bottom: 2rem;
}

.home-form {
  max-width: 800px;
  margin: 0 auto;
}

.form-section {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.form-section h2 {
  margin-bottom: 1rem;
  color: #1f2937;
  font-size: 1.25rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.form-group label {
  color: #4b5563;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.feature-item {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.feature-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.btn-remove {
  padding: 0.5rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-add-feature {
  padding: 0.75rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.btn-save {
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.btn-save:hover {
  background: #2563eb;
}
</style> 