# Trust Me Site - Frontend

Este é o frontend da aplicação Trust Me, desenvolvido em Vue 3 com Vite.

## Requisitos

- Node.js >= 16
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/CelDarley/trustme-site.git
cd trustme-site
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto:
```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME="Trust Me"
```

## Executando o projeto

Para desenvolvimento:
```bash
npm run dev
```

O servidor de desenvolvimento estará disponível em `http://localhost:3000`

Para build de produção:
```bash
npm run build
```

Para preview da build de produção:
```bash
npm run preview
```

## Estrutura do Projeto

- `src/` - Código fonte da aplicação
  - `components/` - Componentes Vue
    - `auth/` - Componentes de autenticação
    - `dashboard/` - Componentes do dashboard
    - `layout/` - Componentes de layout
    - `pages/` - Páginas da aplicação
  - `router/` - Configuração das rotas
  - `assets/` - Assets estáticos (CSS, imagens)
- `public/` - Arquivos públicos
- `index.html` - Template HTML principal

## Funcionalidades

- **Autenticação**: Login e registro de usuários
- **Dashboard**: Painel do usuário autenticado
- **Páginas públicas**: Home, Planos, Sobre, Contato, FAQ, Depoimentos
- **Roteamento**: Navegação SPA com Vue Router
- **Proteção de rotas**: Rotas protegidas por autenticação

## Configuração da API

O frontend está configurado para consumir a API do backend em `http://localhost:8000/api`.

Para alterar a URL da API, modifique o arquivo `.env`:
```env
VITE_API_URL=https://sua-api.com/api
```

## Desenvolvimento

### Estrutura de Componentes

- `App.vue` - Componente principal
- `auth/Login.vue` - Página de login
- `auth/Register.vue` - Página de registro
- `dashboard/Dashboard.vue` - Dashboard do usuário
- `pages/` - Páginas públicas da aplicação

### Roteamento

O roteamento é configurado em `src/router/index.js` e inclui:
- Rotas públicas (Home, Sobre, Contato, etc.)
- Rotas de autenticação (Login, Registro)
- Rotas protegidas (Dashboard)

### Autenticação

A autenticação é gerenciada através de:
- Token JWT armazenado no localStorage
- Interceptadores Axios para incluir o token nas requisições
- Guards de navegação para proteger rotas

## Produção

Para deploy em produção:

1. Configure as variáveis de ambiente de produção
2. Execute o build:
```bash
npm run build
```
3. Sirva os arquivos da pasta `dist/` através de um servidor web

### Exemplo com Nginx:
```nginx
server {
    listen 80;
    server_name seu-dominio.com;
    root /path/to/trustme-site/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```
