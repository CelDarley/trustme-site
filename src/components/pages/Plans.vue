
<template>
  <div class="plans">
    <section class="section">
      <div class="container">
        <h1 class="section-title">Escolha o Plano Ideal</h1>
        <p class="section-subtitle">Selecione o plano que melhor atende às suas necessidades de segurança jurídica</p>
        
        <div class="billing-toggle">
          <button 
            :class="{ active: billingCycle === 'monthly' }" 
            @click="billingCycle = 'monthly'"
          >
            Mensal
          </button>
          <button 
            :class="{ active: billingCycle === 'six_months' }" 
            @click="billingCycle = 'six_months'"
          >
            6 Meses
          </button>
          <button 
            :class="{ active: billingCycle === 'yearly' }" 
            @click="billingCycle = 'yearly'"
          >
            Anual
          </button>
        </div>
        
        <div class="plans-grid" v-if="plans.length">
          <div 
            v-for="plan in plans" 
            :key="plan.id" 
            class="plan-card"
            :class="{ featured: plan.name === 'Intermediário' }"
          >
            <div class="plan-header">
              <h3>{{ plan.name }}</h3>
              <p class="plan-description">{{ plan.description }}</p>
              <div class="plan-price">
                <span class="currency">R$</span>
                <span class="amount">{{ getPrice(plan) }}</span>
                <span class="period">/{{ getPeriodText() }}</span>
              </div>
            </div>
            
            <div class="plan-features">
              <ul>
                <li>
                  <span class="check">✓</span>
                  {{ plan.seals_limit ? `${plan.seals_limit} selo${plan.seals_limit > 1 ? 's' : ''}` : 'Selos ilimitados' }}
                </li>
                <li>
                  <span class="check">✓</span>
                  {{ plan.contracts_limit ? `${plan.contracts_limit} contrato${plan.contracts_limit > 1 ? 's' : ''}` : 'Contratos ilimitados' }}
                </li>
                <li>
                  <span class="check">✓</span>
                  Verificação de documentos
                </li>
                <li>
                  <span class="check">✓</span>
                  Suporte técnico
                </li>
                <li v-if="plan.name === 'Plus'">
                  <span class="check">✓</span>
                  Suporte prioritário
                </li>
              </ul>
            </div>
            
            <div class="plan-footer">
              <button 
                @click="selectPlan(plan)" 
                class="btn btn-plan"
                :class="{ 'btn-featured': plan.name === 'Intermediário' }"
              >
                Escolher Plano
              </button>
            </div>
          </div>
        </div>
        
        <div v-else class="loading">
          <p>Carregando planos...</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Plans',
  data() {
    return {
      plans: [],
      billingCycle: 'monthly',
      loading: false
    }
  },
  async mounted() {
    await this.loadPlans()
  },
  methods: {
    async loadPlans() {
      try {
        this.loading = true
        const response = await axios.get('/plans')
        this.plans = response.data.plans
      } catch (error) {
        console.error('Error loading plans:', error)
      } finally {
        this.loading = false
      }
    },
    getPrice(plan) {
      switch (this.billingCycle) {
        case 'monthly':
          return plan.monthly_price.toFixed(2).replace('.', ',')
        case 'six_months':
          return plan.six_months_price.toFixed(2).replace('.', ',')
        case 'yearly':
          return plan.yearly_price.toFixed(2).replace('.', ',')
        default:
          return plan.monthly_price.toFixed(2).replace('.', ',')
      }
    },
    getPeriodText() {
      switch (this.billingCycle) {
        case 'monthly':
          return 'mês'
        case 'six_months':
          return '6 meses'
        case 'yearly':
          return 'ano'
        default:
          return 'mês'
      }
    },
    selectPlan(plan) {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        this.$router.push('/login')
        return
      }
      
      // Store selected plan and billing cycle
      localStorage.setItem('selected_plan', JSON.stringify({
        plan: plan,
        billing_cycle: this.billingCycle
      }))
      
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style scoped>
.plans {
  background: #f8fafc;
  min-height: 100vh;
  padding: 2rem 0;
}

.billing-toggle {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  background: white;
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.billing-toggle button {
  flex: 1;
  padding: 12px 24px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.billing-toggle button.active {
  background: #3b82f6;
  color: white;
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.plan-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
}

.plan-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.plan-card.featured {
  border: 3px solid #3b82f6;
  transform: scale(1.05);
}

.plan-card.featured::before {
  content: 'Mais Popular';
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #3b82f6;
  color: white;
  padding: 6px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.plan-header {
  text-align: center;
  margin-bottom: 2rem;
}

.plan-header h3 {
  font-size: 1.8rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.plan-description {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.plan-price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.25rem;
}

.currency {
  font-size: 1.2rem;
  color: #6b7280;
}

.amount {
  font-size: 3rem;
  font-weight: bold;
  color: #1f2937;
}

.period {
  font-size: 1rem;
  color: #6b7280;
}

.plan-features ul {
  list-style: none;
  margin-bottom: 2rem;
}

.plan-features li {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.check {
  color: #10b981;
  font-weight: bold;
  margin-right: 0.75rem;
  font-size: 1.2rem;
}

.btn-plan {
  width: 100%;
  padding: 16px;
  font-size: 1.1rem;
  font-weight: 600;
}

.btn-featured {
  background: #3b82f6;
  color: white;
}

.loading {
  text-align: center;
  padding: 4rem 0;
  color: #6b7280;
}

@media (max-width: 768px) {
  .plans-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
  
  .plan-card.featured {
    transform: none;
  }
  
  .billing-toggle {
    max-width: 300px;
  }
}
</style>
