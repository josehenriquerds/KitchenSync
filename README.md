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

![image](https://github.com/user-attachments/assets/2bedfcc3-a127-4ae9-9590-2c2518b0640f)
![image](https://github.com/user-attachments/assets/039cdffb-8e69-4d4a-840f-1a8fae7d99a6)
![image](https://github.com/user-attachments/assets/984a55fb-113f-42f2-b601-554399eafeb5)
![image](https://github.com/user-attachments/assets/cd1c18d0-797f-4456-9481-6b04df1a8eef)
![image](https://github.com/user-attachments/assets/32806ab9-c858-4409-a6b9-cb7862311dc9)
![image](https://github.com/user-attachments/assets/3db7e12f-be81-473f-9112-9167d2963e2b)

## 📸 Demonstração Visual - Mobile
![image](https://github.com/user-attachments/assets/4b48de2b-7658-4ef0-860f-569544433914)
![image](https://github.com/user-attachments/assets/701a1818-c118-478c-a513-bfc5d6318870)
![image](https://github.com/user-attachments/assets/f167cbd0-5f7a-4491-9bc6-270d8d37b6da)
![image](https://github.com/user-attachments/assets/33ddcb74-63c7-476f-87bc-ca69d5382132)



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
