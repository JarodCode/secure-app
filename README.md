# Secure App

Application web sécurisée avec authentification JWT, Angular 20, Express.js et PostgreSQL.

## Démarrage rapide

### Environnement de développement

```bash
docker compose -f docker-compose.dev.yml up -d
```

Accès:
- Base de données: `localhost:5432`
- Adminer: `http://localhost:8080`

### Environnement de production

```bash
docker compose -f docker-compose.prod.yml up --build -d
```

Accès:
- Frontend: `https://localhost:8443`
- Backend API: `https://localhost:4000`
- Adminer: `http://localhost:8081`

## Identifiants

**Admin:** `admin` / `admin`  
**User:** `user1` / `user1`

## Arrêt

```bash
# Développement
docker compose -f docker-compose.dev.yml down

# Production
docker compose -f docker-compose.prod.yml down
```

## Technologies

- Frontend: Angular 20 + Nginx
- Backend: Node.js 22 + Express + TypeScript
- Database: PostgreSQL 16
- Security: JWT, HTTPS, HTTP-only cookies