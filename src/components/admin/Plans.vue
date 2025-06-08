<template>
  <div class="plans-admin">
    <div class="header">
      <h1>Gerenciar Planos</h1>
      <button @click="showNewPlanModal = true" class="btn-primary">
        <i class="fas fa-plus"></i>
        Novo Plano
      </button>
    </div>

    <div class="plans-grid">
      <div v-for="plan in plans" :key="plan.id" class="plan-card">
        <div class="plan-header">
          <h3>{{ plan.name }}</h3>
          <div class="actions">
            <button @click="editPlan(plan)" class="btn-icon">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="deletePlan(plan.id)" class="btn-icon text-red">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>

        <div class="plan-details">
          <div class="price">
            <span class="currency">R$</span>
            <span class="amount">{{ plan.monthly_price }}</span>
            <span class="period">/mês</span>
          </div>

          <ul class="features">
            <li v-for="feature in plan.features" :key="feature">
              <i class="fas fa-check"></i>
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Modal de Plano -->
    <div v-if="showNewPlanModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ editingPlan ? 'Editar Plano' : 'Novo Plano' }}</h2>
          <button @click="closeModal" class="btn-icon">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <form @submit.prevent="savePlan" class="plan-form">
          <div class="form-group">
            <label>Nome do Plano</label>
            <input v-model="planForm.name" type="text" required>
          </div>

          <div class="form-group">
            <label>Preço Mensal</label>
            <input v-model="planForm.monthly_price" type="number" step="0.01" required>
          </div>

          <div class="form-group">
            <label>Funcionalidades</label>
            <div class="features-list">
              <div v-for="(feature, index) in planForm.features" :key="index" class="feature-item">
                <input v-model="planForm.features[index]" type="text">
                <button type="button" @click="removeFeature(index)" class="btn-icon text-red">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
            <button type="button" @click="addFeature" class="btn-secondary">
              <i class="fas fa-plus"></i>
              Adicionar Funcionalidade
            </button>
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
import { plansService } from '../../services/plans';

export default {
  name: 'PlansAdmin',
  data() {
    return {
      plans: [],
      showNewPlanModal: false,
      editingPlan: null,
      planForm: {
        name: '',
        monthly_price: '',
        features: ['']
      }
    }
  },
  async mounted() {
    await this.loadPlans();
  },
  methods: {
    async loadPlans() {
      try {
        const response = await plansService.getPlans();
        this.plans = response.data;
      } catch (error) {
        console.error('Erro ao carregar planos:', error);
      }
    },
    editPlan(plan) {
      this.editingPlan = plan;
      this.planForm = {
        name: plan.name,
        monthly_price: plan.monthly_price,
        features: [...plan.features]
      };
      this.showNewPlanModal = true;
    },
    async deletePlan(id) {
      if (!confirm('Tem certeza que deseja excluir este plano?')) return;

      try {
        await plansService.deletePlan(id);
        await this.loadPlans();
      } catch (error) {
        console.error('Erro ao excluir plano:', error);
      }
    },
    addFeature() {
      this.planForm.features.push('');
    },
    removeFeature(index) {
      this.planForm.features.splice(index, 1);
    },
    closeModal() {
      this.showNewPlanModal = false;
      this.editingPlan = null;
      this.planForm = {
        name: '',
        monthly_price: '',
        features: ['']
      };
    },
    async savePlan() {
      try {
        const planData = {
          ...this.planForm,
          features: this.planForm.features.filter(f => f.trim() !== '')
        };

        if (this.editingPlan) {
          await plansService.updatePlan(this.editingPlan.id, planData);
        } else {
          await plansService.createPlan(planData);
        }

        await this.loadPlans();
        this.closeModal();
      } catch (error) {
        console.error('Erro ao salvar plano:', error);
      }
    }
  }
}
</script>

<style scoped>
.plans-admin {
  padding: 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.plan-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.plan-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
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

.plan-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #3b82f6;
}

.currency {
  font-size: 1rem;
  margin-right: 0.25rem;
}

.period {
  font-size: 0.875rem;
  color: #6b7280;
}

.features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #4b5563;
}

.features i {
  color: #10b981;
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

.plan-form {
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

.form-group input {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature-item {
  display: flex;
  gap: 0.5rem;
}

.feature-item input {
  flex: 1;
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