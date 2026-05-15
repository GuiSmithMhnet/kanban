# Inicialização
dev-up:
	docker compose up kanban-app-dev -d && docker exec -it kanban-app-dev npm run migrate && docker logs -f kanban-app-dev
prod-up:
	docker compose up kanban-app -d --build && docker exec -it kanban-app npm run migrate && docker logs -f kanban-app
down:
	docker compose down

# Migração
dev-migrate:
	docker exec -it kanban-app-dev npm run migrate
prod-migrate:
	docker exec -it kanban-app npm run migrate

# DB
psql:
	docker exec -it kanban-db psql -U kanban -d kanban
