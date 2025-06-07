
<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Trust-me</h3>
          <p>Segurança jurídica para seus relacionamentos contratuais e serviços íntimos.</p>
        </div>
        
        <div class="footer-section">
          <h4>Links Rápidos</h4>
          <ul>
            <li><router-link to="/planos">Planos</router-link></li>
            <li><router-link to="/sobre">Sobre Nós</router-link></li>
            <li><router-link to="/faq">FAQ</router-link></li>
            <li><router-link to="/contato">Contato</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Contato</h4>
          <p>Email: contato@trust-me.com</p>
          <p>Telefone: (11) 9999-9999</p>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Trust-me. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer {
  background: #1f2937;
  color: white;
  padding: 3rem 0 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3 {
  color: #3b82f6;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.footer-section h4 {
  color: #e5e7eb;
  margin-bottom: 1rem;
}

.footer-section p {
  color: #9ca3af;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section ul li a {
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section ul li a:hover {
  color: #3b82f6;
}

.footer-bottom {
  border-top: 1px solid #374151;
  padding-top: 1rem;
  text-align: center;
}

.footer-bottom p {
  color: #9ca3af;
}

@media (max-width: 768px) {
  .footer {
    padding: 2rem 0 1rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
