# 🍽️ KitchenSync

**KitchenSync** é uma aplicação web moderna e em tempo real desenvolvida para restaurantes, permitindo o controle ágil e visual dos pedidos internos enviados por garçons ou responsáveis pela reposição de itens no fogão. O objetivo é otimizar o fluxo de trabalho entre o salão e a cozinha, com foco em responsividade, interatividade e usabilidade profissional.

---

## ✨ Telas da aplicação

- Tela inicial com botões grandes e acessíveis para o fluxo de uso
- Tela de Pedido Rápido com cards visuais, animações e toque longo
- Painel da Cozinha com cards responsivos e atualização via SignalR
- Tela de Cadastro de Produto com exclusão e feedback via Toast animado

---

## 🚀 Tecnologias Utilizadas

### 🔧 Backend (.NET 8 - ASP.NET Core)
- ASP.NET Core 8 (REST API)
- Entity Framework Core (Code-First / SQL Server)
- SignalR (comunicação em tempo real)
- Arquitetura Domain-Driven Design (DDD)
- Princípios SOLID
- Swagger para documentação da API
- Assíncrono/Await com Task no ciclo de vida dos pedidos

### 🎨 Frontend (React + Bootstrap)
- React com Vite
- Bootstrap 5 + React Bootstrap
- SignalR Client (WebSocket auto reconectável)
- JavaScript ES6+
- Framer Motion (animações)
- Toastify (toasts modernos com feedbacks)
- CSS3 moderno com laranja como cor predominante (`#fca311`)

---

## 🧠 Arquitetura do Projeto

A aplicação segue os padrões recomendados de uma arquitetura em camadas com DDD:

```
KitchenSync
│
├── src
│   ├── KitchenSync.API            → API REST (Controllers, Hubs, Startup)
│   ├── KitchenSync.Application    → Casos de uso e DTOs
│   ├── KitchenSync.Domain         → Entidades, Enums e Regras de Domínio
│   └── KitchenSync.Infrastructure → DbContext, Repositórios e Migrations
├── frontend                       → React App (telas e componentes visuais)
```

---

## ⚙️ Funcionalidades Implementadas

### ✅ Cadastro de Produtos
- Nome, tempo de preparo e prioridade (alta/média/baixa)
- Exclusão com botão e toast

### ✅ Painel da Cozinha
- Visualização em tempo real dos pedidos recebidos
- Cards com cor por prioridade
- Contador regressivo com barra de progresso
- Finalização de pedidos com clique
- Destaque visual em tela cheia quando um novo pedido chega

### ✅ Pedido Rápido
- Cards dos produtos com toque longo para solicitar
- Toast de confirmação visual e sinal sonoro
- Bloqueio temporário até liberação da cozinha (SignalR)

### ✅ Comunicação em Tempo Real (SignalR)
- Pedido criado → evento transmitido
- Cozinha escuta e mostra novo card automaticamente
- Finalização na cozinha libera o card no Pedido Rápido

### ✅ Integração RESTful
- `GET/POST` produtos: `/api/produto`
- `POST` pedidos: `/api/pedido`
- `POST` conclusão: `/api/pedido/concluir`

---

## 📸 Demonstração Visual

![demo1](https://github.com/user-attachments/assets/47c44f51-bad5-44d8-8325-3680a814202c)
![demo2](https://github.com/user-attachments/assets/7e374fd2-aee9-4f84-9bcd-14a334800fe5)
![demo3](https://github.com/user-attachments/assets/76222a2e-1bdf-4a8e-8cb2-42c9962fb263)
![demo4](https://github.com/user-attachments/assets/146b43ec-1e8b-43c4-99bf-d2123bfb3935)

---

## 🛠️ Como Rodar Localmente

### Requisitos:
- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download)
- [Node.js 18+](https://nodejs.org/)
- SQL Server (ou LocalDB)
- Git

### 🔧 Backend
```bash
cd src/KitchenSync.API
dotnet ef database update
dotnet run
```
> A API estará disponível em: `https://localhost:5000`

### 🎯 Frontend
```bash
cd frontend
npm install
npm run dev
```
> A interface estará disponível em: `http://localhost:3000`

---

> Ocellaris
