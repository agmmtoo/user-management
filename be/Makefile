include .envrc

.PHONY: run/api
run/api:
	@echo "Starting Server..."
	go run ./cmd/api -port=${PORT} -dburl=${DB_URL} -jwt-secret=${JWT_SECRET}

.PHONY: run/psql
run/psql:
	@echo "Starting PSQL..."
	psql ${DB_URL}

.PHONY: run/migrate
run/migrate:
	@echo "Running Migrations..."
	migrate -path ./migrations -database ${DB_URL} up