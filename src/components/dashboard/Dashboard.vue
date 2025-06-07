
<template>
  <div class="dashboard">
    <section class="section">
      <div class="container">
        <div class="dashboard-header">
          <h1>Dashboard</h1>
          <p v-if="user">Bem-vindo, {{ user.name }}!</p>
        </div>
        
        <!-- Subscription Status -->
        <div class="subscription-status" v-if="subscription">
          <div class="status-card">
            <h3>Plano Atual: {{ subscription.plan.name }}</h3>
            <p>Status: <span class="status-badge" :class="subscription.status">{{ getStatusText(subscription.status) }}</span></p>
            <p>Válido até: {{ formatDate(subscription.ends_at) }}</p>
            <p>Ciclo: {{ getBillingCycleText(subscription.billing_cycle) }}</p>
          </div>
        </div>
        
        <!-- No Subscription -->
        <div class="no-subscription" v-else>
          <div class="status-card">
            <h3>Nenhum plano ativo</h3>
            <p>Escolha um plano para começar a usar o Trust-me</p>
            <router-link to="/planos" class="btn">Ver Planos</router-link>
          </div>
        </div>
        
        <!-- Quick Actions -->
        <div class="quick-actions">
          <h2>Ações Rápidas</h2>
          <div class="actions-grid">
            <div class="action-card" @click="showCreateContract = true" v-if="canCreateContracts">
              <div class="action-icon">📋</div>
              <h3>Criar Contrato</h3>
              <p>Crie um novo contrato seguro</p>
            </div>
            
            <div class="action-card" @click="showCreateSeal = true" v-if="canCreateSeals">
              <div class="action-icon">✅</div>
              <h3>Solicitar Selo</h3>
              <p>Verifique um documento</p>
            </div>
            
            <div class="action-card" @click="activeTab = 'contracts'">
              <div class="action-icon">📄</div>
              <h3>Meus Contratos</h3>
              <p>{{ contracts.length }} contrato{{ contracts.length !== 1 ? 's' : '' }}</p>
            </div>
            
            <div class="action-card" @click="activeTab = 'seals'">
              <div class="action-icon">🔒</div>
              <h3>Meus Selos</h3>
              <p>{{ seals.length }} selo{{ seals.length !== 1 ? 's' : '' }}</p>
            </div>
          </div>
        </div>
        
        <!-- Tabs -->
        <div class="dashboard-tabs">
          <div class="tab-buttons">
            <button 
              :class="{ active: activeTab === 'contracts' }" 
              @click="activeTab = 'contracts'"
            >
              Contratos
            </button>
            <button 
              :class="{ active: activeTab === 'seals' }" 
              @click="activeTab = 'seals'"
            >
              Selos
            </button>
            <button 
              :class="{ active: activeTab === 'subscription' }" 
              @click="activeTab = 'subscription'"
            >
              Assinatura
            </button>
          </div>
          
          <!-- Contracts Tab -->
          <div v-if="activeTab === 'contracts'" class="tab-content">
            <div class="tab-header">
              <h3>Meus Contratos</h3>
              <button 
                @click="showCreateContract = true" 
                class="btn btn-small"
                v-if="canCreateContracts"
              >
                Novo Contrato
              </button>
            </div>
            
            <div v-if="contracts.length" class="items-list">
              <div v-for="contract in contracts" :key="contract.id" class="item-card">
                <div class="item-info">
                  <h4>{{ contract.title }}</h4>
                  <p>Status: <span class="status-badge" :class="contract.status">{{ getContractStatusText(contract.status) }}</span></p>
                  <p>Criado em: {{ formatDate(contract.created_at) }}</p>
                </div>
                <div class="item-actions">
                  <button @click="viewContract(contract)" class="btn btn-small btn-outline">Ver</button>
                </div>
              </div>
            </div>
            
            <div v-else class="empty-state">
              <p>Nenhum contrato criado ainda</p>
              <button 
                @click="showCreateContract = true" 
                class="btn"
                v-if="canCreateContracts"
              >
                Criar Primeiro Contrato
              </button>
            </div>
          </div>
          
          <!-- Seals Tab -->
          <div v-if="activeTab === 'seals'" class="tab-content">
            <div class="tab-header">
              <h3>Meus Selos</h3>
              <button 
                @click="showCreateSeal = true" 
                class="btn btn-small"
                v-if="canCreateSeals"
              >
                Novo Selo
              </button>
            </div>
            
            <div v-if="seals.length" class="items-list">
              <div v-for="seal in seals" :key="seal.id" class="item-card">
                <div class="item-info">
                  <h4>{{ seal.document_type }}: {{ seal.document_number }}</h4>
                  <p>Status: <span class="status-badge" :class="seal.verification_status">{{ getSealStatusText(seal.verification_status) }}</span></p>
                  <p>Solicitado em: {{ formatDate(seal.created_at) }}</p>
                </div>
              </div>
            </div>
            
            <div v-else class="empty-state">
              <p>Nenhum selo solicitado ainda</p>
              <button 
                @click="showCreateSeal = true" 
                class="btn"
                v-if="canCreateSeals"
              >
                Solicitar Primeiro Selo
              </button>
            </div>
          </div>
          
          <!-- Subscription Tab -->
          <div v-if="activeTab === 'subscription'" class="tab-content">
            <div class="subscription-details">
              <h3>Detalhes da Assinatura</h3>
              
              <div v-if="subscription" class="subscription-info">
                <div class="info-grid">
                  <div class="info-item">
                    <label>Plano:</label>
                    <span>{{ subscription.plan.name }}</span>
                  </div>
                  <div class="info-item">
                    <label>Status:</label>
                    <span class="status-badge" :class="subscription.status">{{ getStatusText(subscription.status) }}</span>
                  </div>
                  <div class="info-item">
                    <label>Valor:</label>
                    <span>R$ {{ subscription.amount.replace('.', ',') }}</span>
                  </div>
                  <div class="info-item">
                    <label>Ciclo:</label>
                    <span>{{ getBillingCycleText(subscription.billing_cycle) }}</span>
                  </div>
                  <div class="info-item">
                    <label>Início:</label>
                    <span>{{ formatDate(subscription.starts_at) }}</span>
                  </div>
                  <div class="info-item">
                    <label>Fim:</label>
                    <span>{{ formatDate(subscription.ends_at) }}</span>
                  </div>
                </div>
                
                <div class="subscription-actions">
                  <router-link to="/planos" class="btn btn-outline">Alterar Plano</router-link>
                  <button @click="cancelSubscription" class="btn btn-secondary">Cancelar Assinatura</button>
                </div>
              </div>
              
              <div v-else class="no-subscription-details">
                <p>Você não possui uma assinatura ativa</p>
                <router-link to="/planos" class="btn">Escolher Plano</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Create Contract Modal -->
    <div v-if="showCreateContract" class="modal-overlay" @click="showCreateContract = false">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>Criar Novo Contrato</h3>
          <button @click="showCreateContract = false" class="close-btn">&times;</button>
        </div>
        
        <form @submit.prevent="createContract" class="modal-form">
          <div class="form-group">
            <label>Título do Contrato</label>
            <input type="text" v-model="contractForm.title" required />
          </div>
          
          <div class="form-group">
            <label>Conteúdo</label>
            <textarea v-model="contractForm.content" rows="6" required></textarea>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label>Nome Parte A</label>
              <input type="text" v-model="contractForm.party_a_name" required />
            </div>
            <div class="form-group">
              <label>Email Parte A</label>
              <input type="email" v-model="contractForm.party_a_email" required />
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label>Nome Parte B</label>
              <input type="text" v-model="contractForm.party_b_name" required />
            </div>
            <div class="form-group">
              <label>Email Parte B</label>
              <input type="email" v-model="contractForm.party_b_email" required />
            </div>
          </div>
          
          <div class="modal-actions">
            <button type="button" @click="showCreateContract = false" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn" :disabled="contractLoading">
              {{ contractLoading ? 'Criando...' : 'Criar Contrato' }}
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <!-- Create Seal Modal -->
    <div v-if="showCreateSeal" class="modal-overlay" @click="showCreateSeal = false">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>Solicitar Novo Selo</h3>
          <button @click="showCreateSeal = false" class="close-btn">&times;</button>
        </div>
        
        <form @submit.prevent="createSeal" class="modal-form">
          <div class="form-group">
            <label>Tipo de Documento</label>
            <select v-model="sealForm.document_type" required>
              <option value="">Selecionar</option>
              <option value="CPF">CPF</option>
              <option value="RG">RG</option>
              <option value="CNH">CNH</option>
              <option value="Passport">Passaporte</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Número do Documento</label>
            <input type="text" v-model="sealForm.document_number" required />
          </div>
          
          <div class="modal-actions">
            <button type="button" @click="showCreateSeal = false" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn" :disabled="sealLoading">
              {{ sealLoading ? 'Solicitando...' : 'Solicitar Selo' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Dashboard',
  data() {
    return {
      user: null,
      subscription: null,
      contracts: [],
      seals: [],
      activeTab: 'contracts',
      showCreateContract: false,
      showCreateSeal: false,
      contractForm: {
        title: '',
        content: '',
        party_a_name: '',
        party_a_email: '',
        party_b_name: '',
        party_b_email: ''
      },
      sealForm: {
        document_type: '',
        document_number: ''
      },
      contractLoading: false,
      sealLoading: false
    }
  },
  computed: {
    canCreateContracts() {
      return this.subscription && (
        !this.subscription.plan.contracts_limit || 
        this.contracts.length < this.subscription.plan.contracts_limit
      )
    },
    canCreateSeals() {
      return this.subscription && (
        !this.subscription.plan.seals_limit || 
        this.seals.length < this.subscription.plan.seals_limit
      )
    }
  },
  async mounted() {
    await this.loadDashboardData()
  },
  methods: {
    async loadDashboardData() {
      try {
        // Load user data
        const userResponse = await axios.get('/user')
        this.user = userResponse.data.user
        
        // Load subscription
        const subscriptionResponse = await axios.get('/subscriptions')
        if (subscriptionResponse.data.subscriptions.length > 0) {
          this.subscription = subscriptionResponse.data.subscriptions[0]
        }
        
        // Load contracts
        const contractsResponse = await axios.get('/contracts')
        this.contracts = contractsResponse.data.contracts
        
        // Load seals
        const sealsResponse = await axios.get('/seals')
        this.seals = sealsResponse.data.seals
        
      } catch (error) {
        console.error('Error loading dashboard data:', error)
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('auth_token')
          this.$router.push('/login')
        }
      }
    },
    async createContract() {
      try {
        this.contractLoading = true
        const response = await axios.post('/contracts', this.contractForm)
        
        if (response.data.success) {
          this.contracts.unshift(response.data.contract)
          this.showCreateContract = false
          this.resetContractForm()
        }
      } catch (error) {
        console.error('Error creating contract:', error)
        alert('Erro ao criar contrato')
      } finally {
        this.contractLoading = false
      }
    },
    async createSeal() {
      try {
        this.sealLoading = true
        const response = await axios.post('/seals', this.sealForm)
        
        if (response.data.success) {
          this.seals.unshift(response.data.seal)
          this.showCreateSeal = false
          this.resetSealForm()
        }
      } catch (error) {
        console.error('Error creating seal:', error)
        alert('Erro ao solicitar selo')
      } finally {
        this.sealLoading = false
      }
    },
    async cancelSubscription() {
      if (confirm('Tem certeza que deseja cancelar sua assinatura?')) {
        try {
          await axios.patch(`/subscriptions/${this.subscription.id}/cancel`)
          this.subscription.status = 'cancelled'
        } catch (error) {
          console.error('Error cancelling subscription:', error)
          alert('Erro ao cancelar assinatura')
        }
      }
    },
    viewContract(contract) {
      // Implementation for viewing contract details
      alert(`Ver contrato: ${contract.title}`)
    },
    resetContractForm() {
      this.contractForm = {
        title: '',
        content: '',
        party_a_name: '',
        party_a_email: '',
        party_b_name: '',
        party_b_email: ''
      }
    },
    resetSealForm() {
      this.sealForm = {
        document_type: '',
        document_number: ''
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('pt-BR')
    },
    getStatusText(status) {
      const statusMap = {
        active: 'Ativo',
        cancelled: 'Cancelado',
        expired: 'Expirado'
      }
      return statusMap[status] || status
    },
    getBillingCycleText(cycle) {
      const cycleMap = {
        monthly: 'Mensal',
        six_months: '6 Meses',
        yearly: 'Anual'
      }
      return cycleMap[cycle] || cycle
    },
    getContractStatusText(status) {
      const statusMap = {
        draft: 'Rascunho',
        pending: 'Pendente',
        signed: 'Assinado',
        cancelled: 'Cancelado'
      }
      return statusMap[status] || status
    },
    getSealStatusText(status) {
      const statusMap = {
        pending: 'Pendente',
        verified: 'Verificado',
        rejected: 'Rejeitado'
      }
      return statusMap[status] || status
    }
  }
}
</script>

<style scoped>
.dashboard {
  background: #f8fafc;
  min-height: 100vh;
  padding: 2rem 0;
}

.dashboard-header {
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  color: #1f2937;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subscription-status,
.no-subscription {
  margin-bottom: 3rem;
}

.status-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.status-card h3 {
  color: #1f2937;
  margin-bottom: 1rem;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.status-badge.active {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.cancelled,
.status-badge.rejected {
  background: #fee2e2;
  color: #991b1b;
}

.status-badge.pending {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.verified,
.status-badge.signed {
  background: #dbeafe;
  color: #1e40af;
}

.quick-actions {
  margin-bottom: 3rem;
}

.quick-actions h2 {
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.action-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.action-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.action-card h3 {
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.action-card p {
  color: #6b7280;
}

.dashboard-tabs {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.tab-buttons {
  display: flex;
  border-bottom: 1px solid #e5e7eb;
}

.tab-buttons button {
  flex: 1;
  padding: 1rem 2rem;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  color: #6b7280;
  transition: all 0.3s ease;
}

.tab-buttons button.active {
  color: #3b82f6;
  background: #eff6ff;
  border-bottom: 3px solid #3b82f6;
}

.tab-content {
  padding: 2rem;
}

.tab-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.tab-header h3 {
  color: #1f2937;
  margin: 0;
}

.btn-small {
  padding: 8px 16px;
  font-size: 0.9rem;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.item-info h4 {
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.item-info p {
  color: #6b7280;
  margin: 0.25rem 0;
  font-size: 0.9rem;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}

.subscription-info {
  background: #f8fafc;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-item label {
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
}

.subscription-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.modal-overlay {
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

.modal {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  color: #1f2937;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #6b7280;
}

.modal-form {
  padding: 2rem;
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
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #3b82f6;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .dashboard {
    padding: 1rem 0;
  }
  
  .dashboard-header h1 {
    font-size: 2rem;
  }
  
  .actions-grid {
    grid-template-columns: 1fr;
  }
  
  .tab-buttons {
    flex-direction: column;
  }
  
  .tab-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .item-card {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .subscription-actions {
    flex-direction: column;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .modal-actions {
    flex-direction: column;
  }
}
</style>
