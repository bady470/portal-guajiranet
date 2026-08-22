# Publicación de imágenes Docker en GHCR

El workflow `.github/workflows/build-publish-images.yml` construye y publica las imágenes del backend y frontend en GitHub Container Registry. Usa el `GITHUB_TOKEN` automático del workflow con permiso `packages: write`, por lo que no se debe crear un token adicional para publicar desde GitHub Actions.

## Imágenes

```text
ghcr.io/bady470/portal-guajiranet-backend:<tag>
ghcr.io/bady470/portal-guajiranet-frontend:<tag>
```

Cada ejecución publica un tag basado en el commit:

```text
sha-<7 caracteres del commit>
```

Las ejecuciones sobre `develop` publican también el tag `develop`. Las ejecuciones sobre tags Git como `v0.1.0-rc.1` publican ese mismo tag y pueden ser consumidas por QA.

## Activación

El workflow se activa cuando cambian `apps/backend/**`, `apps/frontend/**` o el propio workflow, siempre que el push sea sobre `develop` o un tag `v*.*.*`. También puede ejecutarse manualmente con `workflow_dispatch` e indicar un tag adicional.

## Acceso desde QA

El servidor QA necesita Docker login contra GHCR. Para consumir imágenes privadas se requiere un token con permiso `read:packages`; ese valor debe introducirse de forma interactiva o gestionarse mediante el secreto del servidor, nunca versionarse.

```bash
docker login ghcr.io
docker compose -f docker-compose.qa.yml --env-file .env pull
docker compose -f docker-compose.qa.yml --env-file .env up -d --remove-orphans
```

El archivo `.env.qa.example` debe apuntar a tags que realmente existan en GHCR, por ejemplo `v0.1.0-rc.1`. Antes de usar un tag, verificar que la ejecución de `Build and publish Docker images` terminó correctamente.
