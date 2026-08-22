# Paso 3 — Docker y SonarQube Server

## Objetivo

Levantar el stack de calidad de código de forma independiente y ejecutar backend y frontend en contenedores reproducibles.

## Requisitos

Se requiere Docker Engine con Docker Compose v2. El servidor que aloje SonarQube debe tener persistencia para PostgreSQL, datos, extensiones y logs de SonarQube.

## Levantar SonarQube

Desde `infra/sonarqube`:

```bash
cp .env.example .env
# Editar .env y establecer una contraseña fuerte
sudo sysctl -w vm.max_map_count=262144
docker compose up -d
docker compose logs -f sonarqube
```

Abrir `http://localhost:9000` o la URL del servidor. El primer acceso usa `admin/admin` y obliga a cambiar la contraseña.

La base de datos de SonarQube es exclusiva para SonarQube. No debe mezclarse con la base de datos de la aplicación.

## Levantar las aplicaciones

Desde `infra/docker`:

```bash
docker compose -f docker-compose.dev.yml build
docker compose -f docker-compose.dev.yml up -d
docker compose -f docker-compose.dev.yml ps
```

El backend queda disponible en `http://localhost:8080/api/v1/health` y el frontend en `http://localhost:4200`.

## Validación inicial

```bash
curl http://localhost:8080/api/v1/health
curl -I http://localhost:4200
```

La configuración de Nginx sirve la aplicación Angular y redirige las solicitudes `/api/` al servicio `backend` dentro de la red Docker.

## Pendiente para el siguiente paso

Configurar los proyectos de SonarQube, crear tokens de análisis por proyecto, registrar el self-hosted runner y añadir los workflows de GitHub Actions con filtros `paths`.
