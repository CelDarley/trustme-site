<template>
  <div class="testimonials">
    <section class="section">
      <div class="container">
        <h1 class="section-title">Depoimentos</h1>
        <p class="section-subtitle">Veja o que nossos usuários dizem sobre o Trust-me</p>
        
        <div v-if="testimonials.length" class="testimonials-grid">
          <div 
            v-for="testimonial in testimonials" 
            :key="testimonial.id" 
            class="testimonial-card"
          >
            <div class="testimonial-content">
              <div class="stars">
                <span v-for="n in testimonial.rating" :key="n" class="star">★</span>
              </div>
              <p class="testimonial-text">"{{ testimonial.content }}"</p>
            </div>
            
            <div class="testimonial-author">
              <div class="author-info">
                <h4>{{ testimonial.name }}</h4>
                <p v-if="testimonial.occupation">{{ testimonial.occupation }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else class="loading">
          <p v-if="error" class="error-message">{{ error }}</p>
          <p v-else>Carregando depoimentos...</p>
        </div>
        
        <div class="cta-section">
          <div class="cta-card">
            <h2>Faça parte da nossa comunidade</h2>
            <p>Junte-se a centenas de usuários que já confiam no Trust-me para suas necessidades de segurança jurídica.</p>
            <router-link to="/registro" class="btn btn-large">Começar Agora</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { testimonialsService } from '../../services/testimonials'

export default {
  name: 'Testimonials',
  data() {
    return {
      testimonials: [],
      loading: false,
      error: ''
    }
  },
  async mounted() {
    await this.loadTestimonials()
  },
  methods: {
    async loadTestimonials() {
      try {
        this.loading = true
        this.error = ''
        const response = await testimonialsService.getTestimonials()
        if (response.testimonials && Array.isArray(response.testimonials)) {
          this.testimonials = response.testimonials
        } else {
          throw new Error('Formato de resposta inválido')
        }
      } catch (error) {
        console.error('Error loading testimonials:', error)
        this.error = error.message || 'Erro ao carregar depoimentos. Tente novamente mais tarde.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.testimonials {
  background: #f8fafc;
  min-height: 100vh;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.testimonial-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.testimonial-content {
  margin-bottom: 1.5rem;
}

.stars {
  margin-bottom: 1rem;
}

.star {
  color: #fbbf24;
  font-size: 1.2rem;
  margin-right: 0.25rem;
}

.testimonial-text {
  color: #374151;
  font-size: 1.1rem;
  line-height: 1.7;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-info h4 {
  color: #1f2937;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.author-info p {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0;
}

.loading {
  text-align: center;
  padding: 4rem 0;
  color: #6b7280;
}

.cta-section {
  margin-top: 4rem;
}

.cta-card {
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  color: white;
  padding: 3rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
}

.cta-card h2 {
  font-size: 2.2rem;
  margin-bottom: 1rem;
}

.cta-card p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.btn-large {
  padding: 16px 32px;
  font-size: 1.1rem;
  background: white;
  color: #3b82f6;
}

.btn-large:hover {
  background: #f8fafc;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-card {
    padding: 2rem;
  }
  
  .cta-card h2 {
    font-size: 1.8rem;
  }
  
  .cta-card p {
    font-size: 1rem;
  }
}
</style>
