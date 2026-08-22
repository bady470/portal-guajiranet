# Self-hosted runner de GitHub Actions

## Objetivo

El runner debe ejecutar los workflows dentro de la red que puede alcanzar SonarQube Server. No se debe configurar `SONAR_HOST_URL=http://localhost:9000` salvo que SonarQube y el runner estén en el mismo equipo.

## Registro

En GitHub abrir **Settings → Actions → Runners → New self-hosted runner**, seleccionar Linux y copiar los comandos oficiales mostrados por GitHub en el servidor runner. El token de registro es temporal y no debe versionarse.

Durante el registro, agregar las etiquetas:

```text
self-hosted, linux, guajiranet
```

El workflow selecciona el runner con:

```yaml
runs-on: [self-hosted, linux, guajiranet]
```

## Dependencias requeridas

El servidor debe tener Java 25, Maven, Node.js 24, npm, Flutter/Dart y conectividad HTTPS hacia GitHub. También debe resolver y alcanzar la URL de SonarQube configurada en `SONAR_HOST_URL`.

## Ejecución como servicio

Después de validar una ejecución manual, instalar el runner como servicio con el procedimiento oficial de GitHub. El servicio debe iniciar automáticamente y utilizar una cuenta del sistema con permisos mínimos.

## Verificación

En GitHub, el runner debe aparecer online y en verde. En el servidor, validar:

```bash
java -version
mvn -version
node --version
npm --version
flutter --version
curl "$SONAR_HOST_URL/api/system/status"
```

No almacenar tokens de SonarQube, credenciales de GitHub ni archivos `kubeconfig` en el repositorio. Los secretos se administran desde GitHub Actions.
