#!/usr/bin/make

.PHONY: build test help
.DEFAULT_GOAL := help




schema: ## generate schema (spec.json )
	@docker compose run --no-deps --rm schema-tools
	@docker compose run --no-deps --rm schema sh /scripts/openapi.sh


install: ## install all deps
	@docker compose run --no-deps --rm schema-tools
	@docker compose run --no-deps --rm schema
	@npm install --no-fund --no-audit --quiet
	@docker compose run --no-deps --rm server npm ci --no-fund --no-audit --quiet

docs: ## start the doc in foreground
	@docker compose up docs

db: ## create a db
	@docker compose up -d postgres
	@sleep 5

start: install ## start the project in foreground
	@docker compose up postgres docs server

run: install ## start the project in background
	@docker compose up -d postgres docs server

test: db ## run all tests
	@docker compose run --rm -e NODE_ENV=test server npm run test:ci

test-unit: ## run unit tests
	@docker compose run --rm server npm run test:unit

test-integration: ## run integration tests
	@docker compose run --rm -e NODE_ENV=test server npm run test:integration

create-db-migration: ## creates a new migration file using TypeORM
	@echo "Enter migration file name: "; \
    read FILENAME; \
    npx typeorm migration:create ./src/database/migrations/$$FILENAME

stop: ## Stop and remove all containers forcefully
	@docker compose down --remove-orphans

clean: stop ## remove running containers, volumes, node_modules & anything else
	@docker compose rm --force -v
	@rm -rf node_modules coverage src/openapi.json dist

help: ## help to deplay this
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
