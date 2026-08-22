# Portal Guajiranet

Monorepo modular para una plataforma compuesta por backend Java/Spring Boot, frontend Angular y aplicación mobile Flutter/Dart.

## Estructura inicial

- `apps/backend`: API y servicios Spring Boot con Maven.
- `apps/frontend`: aplicación web Angular.
- `apps/mobile`: aplicación Flutter/Dart.
- `infra`: Docker Compose, SonarQube y configuración de infraestructura.
- `.github/workflows`: pipelines de integración y despliegue continuo.
- `docs`: documentación técnica y operativa.

## Estrategia de ramas

- `main`: código estable.
- `develop`: integración del trabajo del equipo.
- `feature/*`: desarrollo de funcionalidades.
- `fix/*`: correcciones.

## Próximos pasos

1. Crear la estructura completa de carpetas.
2. Generar las aplicaciones base.
3. Configurar Docker Compose.
4. Levantar SonarQube Server.
5. Configurar el self-hosted runner.
6. Incorporar los workflows de GitHub Actions con filtros por rutas.
7. Validar cobertura, Quality Gate y despliegue local.
