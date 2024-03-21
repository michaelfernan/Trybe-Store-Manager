# API de Gerenciamento de Produtos e Vendas

## Descrição
Este projeto, realizado individualmente como parte da avaliação da Trybe, consiste em desenvolver uma API para gerenciamento de produtos e vendas. A API permite listar, cadastrar, atualizar e deletar produtos, além de gerenciar vendas.

## Instruções de Uso

### Iniciando com Docker Compose
- Instale as dependências: `npm install`
- Inicie os containers do compose (`backend` e `db`): `docker-compose up -d`
- Acesse a aplicação em `http://localhost:3001`


## Requisitos do Projeto

### Endpoints
1. **Listar Produtos:** GET `/products` e `/products/:id`
2. **Listar Vendas:** GET `/sales` e `/sales/:id`
3. **Cadastrar Produtos:** POST `/products`
4. **Validações de Cadastro de Produtos:** Implementar validações para o cadastro.
5. **Cadastrar Vendas:** POST `/sales`
6. **Validações de Cadastro de Vendas:** Implementar validações para o cadastro de vendas.
7. **Atualizar Produto:** PUT `/products/:id`
8. **Deletar Produto:** DELETE `/products/:id`

### Banco de Dados
- A API deve interagir com um banco de dados para persistência das informações.
- Criação e manipulação de tabelas para gerenciar produtos e vendas.

## Tecnologias Utilizadas
- Node.js
- Express
- Docker e Docker Compose
- SQL para gerenciamento de banco de dados

## Objetivos de Aprendizado
- Desenvolver uma API RESTful.
- Aplicar operações CRUD.
- Implementar testes automatizados.
- Utilizar Docker para orquestração de containers.

## Notas Adicionais
- Atenção às regras de negócio e validações conforme especificado nos requisitos.
- Este projeto é uma parte importante da avaliação e do aprendizado em desenvolvimento web.

## Contribuições
Este projeto é uma avaliação individual para demonstrar as competências adquiridas. Portanto, contribuições diretas de terceiros não são aplicáveis.

---

⚠️ **Lembrete:** A conformidade com os requisitos e as boas práticas de desenvolvimento são essenciais para o sucesso deste projeto.
