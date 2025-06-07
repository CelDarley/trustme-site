
<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1>Segurança Jurídica para Seus Relacionamentos</h1>
            <p>Estabeleça conexões seguras e formalize contratos com garantias de veracidade. A plataforma que oferece proteção legal para serviços íntimos e relacionamentos contratuais.</p>
            <div class="hero-buttons">
              <router-link to="/registro" class="btn btn-large">Começar Agora</router-link>
              <router-link to="/planos" class="btn btn-outline btn-large">Ver Planos</router-link>
            </div>
          </div>
          <div class="hero-image">
            <img src="https://live.staticflickr.com/4586/26955459619_3177e75226_b.jpg" alt="Conexão segura entre pessoas" />
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="section features">
      <div class="container">
        <h2 class="section-title">Por que escolher o Trust-me?</h2>
        <p class="section-subtitle">Nossa plataforma oferece as ferramentas necessárias para estabelecer relacionamentos seguros e juridicamente válidos.</p>
        
        <div class="grid grid-3">
          <div class="card feature-card">
            <div class="feature-icon">🔒</div>
            <h3>Conexão Segura</h3>
            <p>Estabeleça conexões entre duas pessoas com garantias de veracidade das informações de identificação.</p>
          </div>
          
          <div class="card feature-card">
            <div class="feature-icon">📋</div>
            <h3>Contratos Válidos</h3>
            <p>Ferramenta completa para formação de contratos e cláusulas com validação jurídica da plataforma.</p>
          </div>
          
          <div class="card feature-card">
            <div class="feature-icon">✅</div>
            <h3>Selos de Veracidade</h3>
            <p>Sistema de verificação que confere informações com órgãos oficiais, garantindo autenticidade.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How it Works Section -->
    <section class="section how-it-works">
      <div class="container">
        <h2 class="section-title">Como Funciona</h2>
        <p class="section-subtitle">Processo simples e seguro em apenas alguns passos</p>
        
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <h3>Cadastre-se</h3>
            <p>Crie sua conta e escolha o plano ideal para suas necessidades</p>
          </div>
          
          <div class="step">
            <div class="step-number">2</div>
            <h3>Verifique sua Identidade</h3>
            <p>Envie seus documentos para verificação e obtenha seu selo de veracidade</p>
          </div>
          
          <div class="step">
            <div class="step-number">3</div>
            <h3>Crie Contratos</h3>
            <p>Utilize nossa ferramenta para criar contratos seguros e juridicamente válidos</p>
          </div>
          
          <div class="step">
            <div class="step-number">4</div>
            <h3>Conecte-se com Segurança</h3>
            <p>Estabeleça relacionamentos contratuais com total proteção legal</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section cta">
      <div class="container">
        <div class="cta-content">
          <h2>Pronto para começar?</h2>
          <p>Junte-se a milhares de usuários que já confiam no Trust-me para suas necessidades de segurança jurídica.</p>
          <router-link to="/registro" class="btn btn-large">Criar Conta Gratuita</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 100px 0;
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-text h1 {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.hero-text p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-large {
  padding: 16px 32px;
  font-size: 1.1rem;
}

.hero-image img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.features {
  background: #f8fafc;
}

.feature-card {
  text-align: center;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1f2937;
}

.how-it-works {
  background: white;
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.step {
  text-align: center;
  padding: 2rem;
}

.step-number {
  width: 60px;
  height: 60px;
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 auto 1rem;
}

.step h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #1f2937;
}

.cta {
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  color: white;
  text-align: center;
}

.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .hero {
    padding: 60px 0;
  }
  
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .hero-text h1 {
    font-size: 2.5rem;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .steps {
    grid-template-columns: 1fr;
  }
  
  .cta-content h2 {
    font-size: 2rem;
  }
}
</style>
