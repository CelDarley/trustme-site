import api from '../config/api';

export const testimonialsService = {
    async getTestimonials() {
        try {
            const response = await api.get('/testimonials');
            if (response.data && response.data.success) {
                return response.data;
            }
            throw new Error('Resposta inválida do servidor');
        } catch (error) {
            console.error('Erro ao buscar depoimentos:', error);
            throw error.response?.data || error;
        }
    }
}; 