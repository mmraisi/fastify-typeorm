#!/usr/bin/make

.PHONY: help
.DEFAULT_GOAL := help




stop: ## Stop and remove all containers forcefully
	@docker compose down --remove-orphans


db: ## create a db
	@docker compose up postgres
	@sleep 5

db-migration: ## creates a new migration file using TypeORM
	@echo "Enter migration file name: "; \
    read FILENAME; \
    npx typeorm migration:create ./src/database/migrations/$$FILENAME

clean: stop ## remove running containers, volumes, node_modules & anything else
	@rm -rf node_modules coverage dist

help: ## help to deplay this
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
