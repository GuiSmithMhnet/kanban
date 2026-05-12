dev-up:
	docker compose up kanban-app-dev -d
prod-up:
	docker compose up kanban-app -d --build
down:
	docker compose down
