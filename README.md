<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src="../.github/logo.png" width="200px" />
</h1>

# Rocketseat GoStack - Gympoint

https://rocketseat.com.br/bootcamp

## Description

Back-end, front-end and mobile aplication for the Rocketseat Bootcamp GoStack (Gympoint).

## Prerequisites

- Yarn
- NodeJS
- Docker containers
- Redis
- PostgreSQL

## Features

- JWT Authentication
- Pagination
- Database Postgres
- Queue with Redis for sendind emails.
- Sequelize ORM
- Mail Trap

## Instructions

<a href="./backend">Instructions to BACK-END</a>

### Create docker container Postgres

`docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`

### Create docker container Redis

`docker run --name redis -p 6379:6379 -d -t redis:alpine`

### Installing dependencies

```
cd backend
yarn
```

### Creating Database

Create Database "gympoint"

### Running migrations Database

`yarn sequelize db:migrate`

### Running Seed

`yarn sequelize db:seed:all`

### Setup .env file

Rename the file `.env.example` to `.env` !
Edit the file with your informations!

## Running

`yarn dev`

## Author

- Lindemberg Nunes de Castro

## License

MIT
