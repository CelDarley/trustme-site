import { api } from '../config/api';

export const faqService = {
  async getFAQs() {
    try {
      const response = await api.get('/faqs');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar FAQs:', error);
      throw error;
    }
  },

  async createFAQ(faqData) {
    try {
      const response = await api.post('/admin/faqs', faqData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar FAQ:', error);
      throw error;
    }
  },

  async updateFAQ(id, faqData) {
    try {
      const response = await api.put(`/admin/faqs/${id}`, faqData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar FAQ:', error);
      throw error;
    }
  },

  async deleteFAQ(id) {
    try {
      const response = await api.delete(`/admin/faqs/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir FAQ:', error);
      throw error;
    }
  }
}; 