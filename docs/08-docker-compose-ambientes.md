# Docker Compose por ambiente

## Archivos

| Ambiente | Compose | Variables | Característica |
|---|---|---|---|
| DEV | `infra/docker/docker-compose.dev.yml` | `.env.dev.example` | Construye imágenes localmente y usa puertos 8080/4200. |
| QA | `infra/docker/docker-compose.qa.yml` | `.env.qa.example` | Consume imágenes versionadas y usa puertos 8081/4201. |
| PROD | `infra/docker/docker-compose.prod.yml` | `.env.prod.example` | Consume tags inmutables, expone 80 y usa reinicio `always`. |

## DEV

```powershell
cd infra/docker
Copy-Item .env.dev.example .env
docker compose -f docker-compose.dev.yml --env-file .env up -d --build
docker compose -f docker-compose.dev.yml ps
```

## QA

El servidor QA debe tener un archivo `.env` creado a partir de `.env.qa.example`. Las imágenes deben existir en el registry antes de ejecutar el despliegue.

```powershell
cd infra/docker
Copy-Item .env.qa.example .env
docker login ghcr.io
docker compose -f docker-compose.qa.yml --env-file .env pull
docker compose -f docker-compose.qa.yml --env-file .env up -d --remove-orphans
docker compose -f docker-compose.qa.yml --env-file .env ps
```

## PROD

PROD debe usar tags inmutables, no `latest`. El despliegue debe ejecutarse después de una aprobación de GitHub Environment y de un backup operativo.

```powershell
cd infra/docker
Copy-Item .env.prod.example .env
docker login ghcr.io
docker compose -f docker-compose.prod.yml --env-file .env pull
docker compose -f docker-compose.prod.yml --env-file .env up -d --remove-orphans
docker compose -f docker-compose.prod.yml --env-file .env ps
```

## Validación

Cada servicio incluye un health check. Antes de promover una versión, comprobar:

```powershell
docker compose -f docker-compose.<ambiente>.yml --env-file .env ps
Invoke-WebRequest http://localhost:<puerto-backend>/api/v1/health
Invoke-WebRequest http://localhost:<puerto-frontend>/
```

Los valores reales de credenciales, tokens, contraseñas y certificados no deben versionarse. En CI/CD deben proceder de GitHub Environment secrets o de un almacén seguro del servidor.
