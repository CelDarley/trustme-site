<template>
  <div class="faq">
    <section class="section">
      <div class="container">
        <h1 class="section-title">Perguntas Frequentes</h1>
        <p class="section-subtitle">Encontre respostas para as dúvidas mais comuns sobre o Trust-me</p>
        
        <div class="faq-content">
          <div v-if="faqs.length" class="faq-list">
            <div 
              v-for="faq in faqs" 
              :key="faq.id" 
              class="faq-item"
              :class="{ active: activeFaq === faq.id }"
            >
              <button 
                class="faq-question" 
                @click="toggleFaq(faq.id)"
              >
                <span>{{ faq.question }}</span>
                <span class="faq-icon">{{ activeFaq === faq.id ? '−' : '+' }}</span>
              </button>
              
              <div class="faq-answer" v-show="activeFaq === faq.id">
                <p>{{ faq.answer }}</p>
              </div>
            </div>
          </div>
          
          <div v-else class="loading">
            <p>Carregando perguntas frequentes...</p>
          </div>
          
          <div class="faq-contact">
            <div class="contact-card">
              <h3>Não encontrou sua resposta?</h3>
              <p>Nossa equipe está pronta para ajudar você com qualquer dúvida específica.</p>
              <router-link to="/contato" class="btn">Entre em Contato</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { faqService } from '@/services/faq'

export default {
  name: 'FAQ',
  data() {
    return {
      faqs: [],
      activeFaq: null,
      loading: false
    }
  },
  async mounted() {
    await this.loadFaqs()
  },
  methods: {
    async loadFaqs() {
      try {
        this.loading = true
        const response = await faqService.getFAQs()
        this.faqs = response.faqs || []
      } catch (error) {
        console.error('Erro ao carregar FAQs:', error)
      } finally {
        this.loading = false
      }
    },
    toggleFaq(faqId) {
      this.activeFaq = this.activeFaq === faqId ? null : faqId
    }
  }
}
</script>

<style scoped>
.faq {
  background: #f8fafc;
  min-height: 100vh;
}

.faq-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: start;
}

.faq-list {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.faq-item {
  border-bottom: 1px solid #e5e7eb;
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-question {
  width: 100%;
  padding: 1.5rem 2rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  transition: background-color 0.3s ease;
}

.faq-question:hover {
  background: #f9fafb;
}

.faq-item.active .faq-question {
  background: #eff6ff;
  color: #3b82f6;
}

.faq-icon {
  font-size: 1.5rem;
  font-weight: bold;
  color: #3b82f6;
}

.faq-answer {
  padding: 0 2rem 1.5rem;
  color: #6b7280;
  line-height: 1.7;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.faq-contact {
  position: sticky;
  top: 2rem;
}

.contact-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.contact-card h3 {
  color: #1f2937;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.contact-card p {
  color: #6b7280;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.loading {
  text-align: center;
  padding: 4rem 0;
  color: #6b7280;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .faq-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .faq-question {
    padding: 1rem 1.5rem;
  }
}
</style>
