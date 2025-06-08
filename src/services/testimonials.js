import { api } from '../config/api';

export const testimonialsService = {
    async getTestimonials() {
        try {
            const response = await api.get('/testimonials');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar depoimentos:', error);
            throw error;
        }
    },

    async createTestimonial(testimonialData) {
        try {
            const response = await api.post('/testimonials', testimonialData);
            return response.data;
        } catch (error) {
            console.error('Erro ao criar depoimento:', error);
            throw error;
        }
    },

    async updateTestimonial(id, testimonialData) {
        try {
            const response = await api.put(`/testimonials/${id}`, testimonialData);
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar depoimento:', error);
            throw error;
        }
    },

    async deleteTestimonial(id) {
        try {
            const response = await api.delete(`/testimonials/${id}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao excluir depoimento:', error);
            throw error;
        }
    }
}; 