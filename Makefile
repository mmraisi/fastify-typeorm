#!/usr/bin/make

.PHONY: help
.DEFAULT_GOAL := help




schema: ## generate schema (spec.json )
	@docker-compose run --no-deps --rm schema

install: ## install all deps
	@docker-compose run --no-deps --rm schema
	@sleep 2
	@docker-compose run --no-deps --rm server npm ci --quiet
	@npm install

docs: ## start the doc in foreground
	@docker compose up docs

start: install ## start the project in foreground
	@docker-compose up postgres  docs server

run: install ## start the project in background	
	@docker compose up -d postgres docs server

db: ## create a db
	@docker compose up -d postgres
	@sleep 5

test-unit: ## test all unit
	@docker compose run --no-deps --rm server npm run test:ci

create-db-migration: ## creates a new migration file using TypeORM
	@echo "Enter migration file name: "; \
    read FILENAME; \
    npx typeorm migration:create ./src/database/migrations/$$FILENAME

stop: ## Stop and remove all containers forcefully
	@docker compose down --remove-orphans

clean: stop ## remove running containers, volumes, node_modules & anything else
	@rm -rf node_modules coverage src/openapi.json dist

help: ## help to deplay this
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
