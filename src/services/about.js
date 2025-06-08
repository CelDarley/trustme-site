import { api } from '../config/api';

export const aboutService = {
  async getSections() {
    try {
      const response = await api.get('/about/sections');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar seções:', error);
      throw error;
    }
  },

  async createSection(sectionData) {
    try {
      const response = await api.post('/about/sections', sectionData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar seção:', error);
      throw error;
    }
  },

  async updateSection(id, sectionData) {
    try {
      const response = await api.put(`/about/sections/${id}`, sectionData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar seção:', error);
      throw error;
    }
  },

  async deleteSection(id) {
    try {
      const response = await api.delete(`/about/sections/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir seção:', error);
      throw error;
    }
  },

  async getAbout() {
    try {
      const response = await api.get('/about');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados do Sobre Nós:', error);
      throw error;
    }
  },

  async updateAbout(aboutData) {
    try {
      const response = await api.put('/about', aboutData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar dados do Sobre Nós:', error);
      throw error;
    }
  }
}; 