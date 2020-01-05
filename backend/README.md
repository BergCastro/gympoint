<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src="../.github/logo.png" width="200px" />
</h1>

# Rocketseat GoStack - back-end Gympoint

https://rocketseat.com.br/bootcamp

## Description

Node API aplication for the Rocketseat Bootcamp GoStack Gympoint application.

## Features

- JWT Authentication
- Pagination
- Database Postgres
- Queue with Redis for sendind emails.
- Sequelize ORM
- Mail Trap

## Installing

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

- Console 1
  `yarn dev`

- Console 2
  `yarn queue`

## Author

- Lindemberg Nunes de Castro

## License

MIT
