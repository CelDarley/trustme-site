
<template>
  <div class="about">
    <section class="section">
      <div class="container">
        <h1 class="section-title">Sobre o Trust-me</h1>
        <p class="section-subtitle">Conheça nossa missão de proporcionar segurança jurídica para relacionamentos contratuais</p>
        
        <div class="about-content">
          <div class="about-text">
            <h2>Nossa Missão</h2>
            <p>O Trust-me foi criado com o objetivo de oferecer segurança jurídica para pessoas que desejam estabelecer relacionamentos contratuais seguros, especialmente em serviços íntimos e relações ocasionais.</p>
            
            <h2>Como Funciona</h2>
            <p>Nossa plataforma utiliza tecnologia avançada para verificar a autenticidade de documentos através de órgãos oficiais, garantindo que todas as informações sejam verdadeiras e confiáveis.</p>
            
            <h2>Segurança e Privacidade</h2>
            <p>Levamos a segurança e privacidade dos nossos usuários muito a sério. Todos os dados são criptografados e armazenados de forma segura, seguindo as melhores práticas de proteção de dados.</p>
            
            <h2>Validade Jurídica</h2>
            <p>Todos os contratos criados em nossa plataforma têm validade jurídica completa, sendo reconhecidos legalmente e podendo ser utilizados em processos judiciais se necessário.</p>
          </div>
          
          <div class="about-image">
            <img src="https://lh3.googleusercontent.com/IAUU-KyelQAlI7O6zRjkS3U3CammvUCnikAqHgQoD3_arYe2KhCUCsM9dihteCM74wbO4KeYBmoyGXy1tja2aVut7s7ihahyMnCzM7zMcZDcdMkqO6fiZfvlXo_lwo3XedlbUWbc=s0" alt="Escritório moderno representando confiança" />
          </div>
        </div>
        
        <div class="values">
          <h2 class="section-title">Nossos Valores</h2>
          <div class="grid grid-3">
            <div class="card value-card">
              <div class="value-icon">🔒</div>
              <h3>Segurança</h3>
              <p>Proteção total dos dados e informações dos nossos usuários</p>
            </div>
            
            <div class="card value-card">
              <div class="value-icon">⚖️</div>
              <h3>Legalidade</h3>
              <p>Todos os processos seguem rigorosamente a legislação brasileira</p>
            </div>
            
            <div class="card value-card">
              <div class="value-icon">🤝</div>
              <h3>Confiança</h3>
              <p>Construímos relacionamentos baseados na transparência e honestidade</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.about {
  background: white;
  min-height: 100vh;
}

.about-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
  align-items: start;
}

.about-text h2 {
  color: #1f2937;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  margin-top: 2rem;
}

.about-text h2:first-child {
  margin-top: 0;
}

.about-text p {
  color: #6b7280;
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.about-image img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.values {
  margin-top: 4rem;
}

.value-card {
  text-align: center;
}

.value-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.value-card h3 {
  color: #1f2937;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.value-card p {
  color: #6b7280;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .about-text h2 {
    font-size: 1.5rem;
  }
}
</style>
