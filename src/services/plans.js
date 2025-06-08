import api from '../config/api';

export const plansService = {
    async getPlans() {
        try {
            const response = await api.get('/plans');
            if (response.data && response.data.success) {
                return response.data;
            }
            throw new Error('Resposta inválida do servidor');
        } catch (error) {
            console.error('Erro ao buscar planos:', error);
            throw error.response?.data || error;
        }
    }
}; 