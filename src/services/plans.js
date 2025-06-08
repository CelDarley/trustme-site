import { api } from '../config/api';

export const plansService = {
    async getPlans() {
        try {
            const response = await api.get('/plans');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar planos:', error);
            throw error;
        }
    },

    async createPlan(planData) {
        try {
            const response = await api.post('/plans', planData);
            return response.data;
        } catch (error) {
            console.error('Erro ao criar plano:', error);
            throw error;
        }
    },

    async updatePlan(id, planData) {
        try {
            const response = await api.put(`/plans/${id}`, planData);
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar plano:', error);
            throw error;
        }
    },

    async deletePlan(id) {
        try {
            const response = await api.delete(`/plans/${id}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao excluir plano:', error);
            throw error;
        }
    }
}; 