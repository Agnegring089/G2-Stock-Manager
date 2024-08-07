# Nome do Projeto
Sample Stock Manager
## Descrição
Este é um sistema de gerenciamento de materiais dividido em duas partes principais: frontend e backend. O backend gerencia as operações de dados com PostgreSQL, enquanto o frontend fornece a interface do usuário.

## Tecnologias Utilizadas
- **Backend**: TypeScript, Node.js com Nodemon, PostgreSQL
- **Frontend**: [Tecnologias específicas do frontend]

## Estrutura do Projeto
- `/backend`: Contém todos os arquivos relacionados ao servidor e operações de banco de dados.
- `/frontend`: Contém todos os arquivos relacionados à interface do usuário.

## Banco de Dados
O projeto utiliza PostgreSQL. Aqui estão as tabelas principais definidas:

### Tabela `usuario`
Armazena informações dos usuários, incluindo login, email, CPF, senha e cargo.

### Tabela `materiais`
Gerencia os materiais com informações sobre nome, tipo, quantidade e última movimentação.

### Tabela `movimentacoes`
Registra as movimentações feitas pelos usuários.

### Tabela `movimentacao_materiais`
Associa materiais a suas respectivas movimentações.

## Instalação
Descreva os passos para configurar o ambiente de desenvolvimento:

1. Clone o repositório: `git clone URL_DO_REPOSITORIO`
2. Instale as dependências:
   - Backend: `cd backend && npm install`
   - Frontend: `cd frontend && npm install`
3. Configuração adicional (ex: configurar o banco de dados, variáveis de ambiente).

## Uso
Instruções básicas de como rodar o projeto:
1. Iniciar o backend: `cd backend && npm start`
2. Iniciar o frontend: `cd frontend && npm start`
