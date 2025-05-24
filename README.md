# API Zeus - Desafio Backend 2025.1

## ⚙️ Descrição

A API Zeus é uma aplicação backend construída com Node.js, Express e Sequelize, com foco na gestão de usuários e projetos. Ela também possui autenticação JWT, upload de imagens, relacionamentos 1:N e está containerizada com Docker.

## 🚀 Funcionalidades principais

- Cadastro e autenticação de usuários
- CRUD completo para usuários e projetos
- Upload de imagem
- Autenticação por JWT
- Relacionamento 1:N (um usuário pode ter vários projetos)
- Containerização com Docker

## 🛠️ Bibliotecas utilizadas

| Biblioteca   | Função                                  |
| ------------ | --------------------------------------- |
| express      | Framework para a construção das rotas   |
| sequelize    | ORM para a manipulção do banco de dados |
| mysql2       | Conectar o Sequelize ao MySQL           |
| jsonwebtoken | Gerar tokens JWT para a autenticação    |
| bcryptjs     | Criptografar as senhas com hash         |
| dotenv       | Gerenciar as variáveis do arquivo .env  |
| multer       | Gerenciar o upload de imagens           |

## 📃 Porque foi usado banco relacional (MySQL)

Além da minha prévia experiência com o MySQL, o projeto utiliza banco de dados relacional por se tratar de uma aplicação com entidades bem definidas e relacionamentos estruturados, como:

- Um usuário pode ter muitos projetos
- Cada projeto pertence a um único usuário

Por isso, um banco relacional facilita o uso de chaves estrangeiras, integridade referencial, e consultas SQL.

## 🔐 Autenticação

As rotas protegidas usam middleware com JWT. O token é gerado durante o login, contendo o ID do usuário criptografado, que posteriormente é utilizado para autorizar o acesso à rotas privadas.

## 📬 Entradas das rotas

### **POST** /user

```json
{
  "name": "João Gabriel",
  "user_name": "joaog",
  "email": "joaog@gmail.com",
  "role": "admin",
  "password": "123456"
}
```

### **PUT** /user

```json
{
  "name": "João Gabriel",
  "role": "member",
  "old_password": "123456",
  "new_password": "123",
  "confirm_new_password": "123"
}
```

### **POST** /auth

```json
{
  "user_name": "joaog",
  "email": "joaog@gmail.com",
  "password": "123456"
}
```

### **POST** /projects

```json
{
  "title": "Zeus",
  "description": "Site para gerenciamento de projetos",
  "status": "Em andamento"
}
```

## 📷 Uploads

Imagens são salvas na pasta _uploads_ localmente. A rota espera envio via _form-data_.

## 🐳 Para rodar com Docker:

**1.** Execute:

```code
docker compose up --build
```

**2.** Acesse:

```code
http://localhost:3000
```
