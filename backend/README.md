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

## Installing

### Create docker container Postgres

`docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`

### Create docker container Redis

`docker run --name redis -p 6379:6379 -d -t redis:alpine`

### Installing dependencies

```
cd backend
npm i
```

### Creating Database

Create Database "meetapp"

### Running migrations Database

`adonis migration:run`

### Running Seed

`adonis seed`

### Setup .env file

Rename the file `.env.example` to `.env` !
Edit the file with your informations!

## Running

`adonis serve --dev`

## Author

- Lindemberg Nunes de Castro

## License

MIT
kend MeetApp

https://rocketseat.com.br/bootcamp

## Description

Adonis API aplication for the Rocketseat Bootcamp GoStack MeetApp application.

## Features

- JWT Authentication
- Pagination
- Database Postgres
- Queue with Redis for sendind emails.

## Installing

### Create docker container Postgres

`docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`

### Create docker container Redis

`docker run --name redis -p 6379:6379 -d -t redis:alpine`

### Installing dependencies

```
cd backend
npm i
```

### Creating Database

Create Database "meetapp"

### Running migrations Database

`adonis migration:run`

### Running Seed

`adonis seed`

### Setup .env file

Rename the file `.env.example` to `.env` !
Edit the file with your informations!

## Running

`adonis serve --dev`

## Author

- Lindemberg Nunes de Castro

## License

MIT
