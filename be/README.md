# db

## create db with root user

CREATE DATABASE ymfl_db;

## create user with root user

CREATE ROLE ymfluser WITH LOGIN PASSWORD 'user@ymfl';

## create case insensitive extension with ymfluser

CREATE EXTENSION IF NOT EXISTS citext;

## Migration

### create migration

migrate create -seq -ext .sql -dir ./migrations create_users_table
migrate -path ./migrations -database postgres://ymfluser:ymfluserpa55wordl@localhost/ymfl_db force 1
