# API Terminal

API REST em Node.js com TypeScript, Express, TypeORM e PostgreSQL para gerenciamento de `buses`.

## Stack

- Node.js
- TypeScript
- Express
- TypeORM
- PostgreSQL
- Celebrate/Joi para validacao de requisicoes

## Requisitos

- Node.js instalado
- PostgreSQL disponivel
- npm

## Banco de dados

O projeto esta configurado em [src/shared/typeorm/data-source.ts](/home/flobster23/UNICENTRO/TypeScript-Workspace/TrabalhoFinal/api-terminal/src/shared/typeorm/data-source.ts:1) com estes valores:

- `host`: `localhost`
- `port`: `5433`
- `username`: `postgres`
- `password`: `docker`
- `database`: `api-terminal`

Se voce for usar Docker, um exemplo compativel com a configuracao atual e:

```bash
docker run --name postgres-api-terminal -e POSTGRES_PASSWORD=docker -p 5433:5432 -d postgres
```

Depois crie o banco:

```bash
docker exec -it postgres-api-terminal psql -U postgres
```

```sql
CREATE DATABASE "api-terminal";
```

Observacao: se voce ja tem um container rodando na porta `5432`, manter este projeto em `5433` evita conflito.

## Instalacao

```bash
npm install
```

## Executando migrations

O projeto usa migration para criar a tabela `buses`.

```bash
npm run migration:run
```

## Rodando a aplicacao

```bash
npm run dev
```

Servidor padrao:

- `http://localhost:3333`

## Rotas

### Health check

- `GET /`

Resposta:

```json
{
  "message": "Hello Dev!"
}
```

### Listar buses

- `GET /buses`

### Buscar bus por id

- `GET /buses/:id`

O `id` deve ser um UUID valido.

### Criar bus

- `POST /buses`

Body:

```json
{
  "plate": "ABC-1234",
  "model": "Marcopolo G7",
  "brand": "Mercedes-Benz",
  "year": 2020,
  "passenger_capacity": 46,
  "current_mileage": 120000,
  "last_maintenance_date": "2026-04-01"
}
```

### Atualizar bus

- `PUT /buses/:id`

Body:

```json
{
  "plate": "ABC-1234",
  "model": "Marcopolo G8",
  "brand": "Mercedes-Benz",
  "year": 2021,
  "passenger_capacity": 48,
  "current_mileage": 125000,
  "last_maintenance_date": "2026-04-15"
}
```

### Remover bus

- `DELETE /buses/:id`

## Validacoes

As rotas usam `celebrate` com `Joi` para validar:

- `params.id` como UUID nas rotas com `/:id`
- campos obrigatorios no `POST /buses`
- formato dos campos no `PUT /buses/:id`

Se a requisicao for invalida, a API responde com erro antes de chegar ao controller.

## Estrutura

```text
src/
  modules/
    buses/
      controllers/
      routes/
      services/
      typeorm/
        entities/
  shared/
    errors/
    http/
    routes/
    typeorm/
      migrations/
```

## Observacoes

- A tabela criada pela migration se chama `buses`.
- O projeto esta com `synchronize: false`, entao as alteracoes de schema devem ser feitas via migration.
- A migration atual cria a extensao `uuid` implicitamente via `uuid_generate_v4()` apenas se o banco ja estiver preparado para isso. Se houver erro de extensao, sera necessario habilitar `uuid-ossp` no PostgreSQL.
