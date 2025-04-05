# 🍽️ KitchenSync

**KitchenSync** é uma aplicação web moderna e em tempo real desenvolvida para restaurantes, permitindo o controle ágil e visual dos pedidos internos enviados por garçons ou responsáveis pela reposição de itens no fogão. O objetivo é otimizar o fluxo de trabalho entre o salão e a cozinha, com foco em responsividade, interatividade e usabilidade profissional.

---

## 🚀 Tecnologias Utilizadas

### 🔧 Backend (.NET 8 - ASP.NET Core)
- ASP.NET Core 8 (REST API)
- Entity Framework Core (Code-First / SQL Server)
- SignalR (comunicação em tempo real)
- Arquitetura Domain-Driven Design (DDD)
- Princípios SOLID
- Swagger para documentação da API

### 🎨 Frontend (React + Bootstrap)
- React com Vite
- Bootstrap 5 + React Bootstrap
- SignalR Client
- JavaScript ES6+
- CSS3

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
├── frontend                       → React App (painel da cozinha)
```

---

## ⚙️ Funcionalidades Implementadas

### ✅ Cadastro de Produtos
- Nome, descrição, categoria
- Tempo de preparo configurável
- Disponibilidade para pedidos

### ✅ Painel da Cozinha (frontend)
- Visualização em tempo real dos pedidos recebidos
- Cards coloridos por prioridade (Alta, Média, Baixa)
- Contador regressivo com barra de progresso
- Finalização de pedidos com feedback visual e som

### ✅ Comunicação em Tempo Real
- Pedidos enviados são instantaneamente exibidos no painel da cozinha via **SignalR**
- Alertas sonoros ao receber novos pedidos
- Timer que atualiza a cada segundo

### ✅ Integração RESTful
- API documentada com Swagger (`https://localhost:5000`)
- Totalmente testável via POST/GET em `/api/produto` e `/api/pedido`

---

## 📸 Demonstração

![image](https://github.com/user-attachments/assets/47c44f51-bad5-44d8-8325-3680a814202c)

![image](https://github.com/user-attachments/assets/7e374fd2-aee9-4f84-9bcd-14a334800fe5)

![image](https://github.com/user-attachments/assets/76222a2e-1bdf-4a8e-8cb2-42c9962fb263)

![image](https://github.com/user-attachments/assets/146b43ec-1e8b-43c4-99bf-d2123bfb3935)


---

## 🛠️ Como Rodar Localmente

### Pré-requisitos:
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

A API estará disponível em: `https://localhost:5000`

---

### 🎯 Frontend

```bash
cd frontend
npm install
npm run dev
```

A interface estará disponível em: `http://localhost:3000`

---

## ✨ Possibilidades Futuras

- Login e controle de acesso (cozinha / garçom / gerente)
- Painel administrativo com histórico e métricas
- Deploy na nuvem (Azure, Vercel, Railway)
- Internacionalização (i18n)
- Progressive Web App (PWA)

---

## 🤝 Autor

**José Henrique**  
👨‍💻 Engenheiro da Computação, pós graduado em Arquitetura de software.
=
---

> Ocellaris
