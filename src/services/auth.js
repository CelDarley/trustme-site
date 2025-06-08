import api from '../config/api';

export const authService = {
    async login(credentials) {
        try {
            console.log('Tentando login com:', credentials);
            const response = await api.post('/login', credentials);
            console.log('Resposta do servidor:', response.data);
            
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                return response.data;
            }
            throw new Error('Resposta inválida do servidor');
        } catch (error) {
            console.error('Erro detalhado no login:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            });
            
            if (error.response?.status === 401) {
                throw new Error('Email ou senha incorretos');
            }
            
            throw error.response?.data || error;
        }
    },

    async register(userData) {
        try {
            const response = await api.post('/register', userData);
            return response.data;
        } catch (error) {
            console.error('Erro no registro:', error.response?.data || error);
            throw error.response?.data || error;
        }
    },

    async logout() {
        try {
            await api.post('/logout');
            localStorage.removeItem('token');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    },

    async getCurrentUser() {
        try {
            const response = await api.get('/user');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar usuário:', error.response?.data || error);
            throw error.response?.data || error;
        }
    }
}; 