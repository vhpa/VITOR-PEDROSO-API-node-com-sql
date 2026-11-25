# API REST com Node.js e MySQL

**Aluno:** Vitor Hugo Pedroso de Almeida
**Turma:** 3 NDN
**Disciplina:** Programação Web III (PW3)

API REST em Node.js + Express com MySQL, usando SQL direto via `mysql2` (sem ORM) e queries parametrizadas (`?`) contra SQL Injection.

## Pré-requisitos

- Node.js 18+
- MySQL 8+ em execução

## Instalação e execução

1. Clone o repositório e entre na pasta:
   ```bash
   git clone https://github.com/VHPA/vitor-almeida-API-node-com-sql.git
   cd vitor-almeida-API-node-com-sql
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie o banco e a tabela executando o script `schema.sql`:
   ```bash
   mysql -u SEU_USUARIO -p < schema.sql
   ```
4. Crie o arquivo `.env` a partir do modelo e preencha com suas credenciais:
   ```bash
   cp .env.example .env
   ```
5. Inicie o servidor:
   ```bash
   npm start
   ```
   O servidor sobe em `http://localhost:3000`.

## Rotas

| Método | Rota            | Descrição                         | Respostas        |
|--------|-----------------|-----------------------------------|------------------|
| POST   | `/usuarios`     | Cria usuário (`nome`, `email`)    | 201, 400, 409, 500 |
| GET    | `/usuarios`     | Lista todos os usuários           | 200, 500         |
| PUT    | `/usuarios/:id` | Atualiza `nome` e `email`         | 200, 400, 404, 409, 500 |
| DELETE | `/usuarios/:id` | Remove o usuário                  | 200, 404, 500    |

## Exemplos (curl)

```bash
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nome":"Maria","email":"maria@email.com"}'

curl http://localhost:3000/usuarios

curl -X PUT http://localhost:3000/usuarios/1 \
  -H "Content-Type: application/json" \
  -d '{"nome":"Maria Silva","email":"maria.silva@email.com"}'

curl -X DELETE http://localhost:3000/usuarios/1
```