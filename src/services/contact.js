import { api } from '../config/api';

export const contactService = {
  async getContact() {
    try {
      const response = await api.get('/contact');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados de contato:', error);
      throw error;
    }
  },

  async updateContact(contactData) {
    try {
      const response = await api.put('/contact', contactData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar dados de contato:', error);
      throw error;
    }
  }
}; 