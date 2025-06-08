import api from '../config/api';

export const homeService = {
  async getHome() {
    try {
      const response = await api.get('/home');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar conteúdo da página inicial:', error);
      throw error;
    }
  },

  async updateHome(homeData) {
    try {
      const response = await api.put('/home', homeData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar conteúdo da página inicial:', error);
      throw error;
    }
  }
}; 