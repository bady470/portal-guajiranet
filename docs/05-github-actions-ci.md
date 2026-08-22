# Paso 5 — GitHub Actions y SonarQube

## Workflows

El monorepo utiliza un workflow por aplicación. Cada workflow escucha únicamente los cambios de su carpeta y del propio archivo de workflow.

| Workflow | Rutas que lo activan | Validaciones |
|---|---|---|
| `ci-backend.yml` | `apps/backend/**` | Maven, pruebas, JaCoCo y SonarQube |
| `ci-frontend.yml` | `apps/frontend/**` | npm, lint, pruebas, cobertura, build y SonarQube |
| `ci-mobile.yml` | `apps/mobile/**` | Flutter pub get, formato, análisis y pruebas |

Todos usan `fetch-depth: 0` para conservar la historia completa de Git. Los jobs apuntan a un runner con etiquetas `self-hosted`, `linux` y `guajiranet`.

## Secrets y variables

En **Settings → Secrets and variables → Actions** deben existir:

- `SONAR_TOKEN_BACKEND`: token de análisis del proyecto backend.
- `SONAR_TOKEN_FRONTEND`: token de análisis del proyecto frontend.
- `SONAR_HOST_URL`: URL accesible desde el runner, por ejemplo `http://sonar.guajiranet.local:9000`.

Los tokens se guardan como secrets. La URL se guarda como repository variable.

## Self-hosted runner

El runner debe vivir en una máquina Linux que tenga acceso de red al servidor SonarQube. Debe contar con Java 25, Maven, Node.js 24, npm y, para mobile, Flutter/Dart. En **Settings → Actions → Runners** debe aparecer online y con las etiquetas esperadas.

## Nota sobre paths y branch protection

Un workflow omitido por `paths` no produce un check. Por tanto, no se debe hacer obligatorio un check específico si existen pull requests que pueden no activar ese workflow. Antes de activar branch protection, se debe implementar un job neutral de skip o centralizar la detección de cambios con `dorny/paths-filter`.
