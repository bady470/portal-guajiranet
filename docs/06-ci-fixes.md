# Correcciones de CI

## Backend: Java 25 y JaCoCo

El backend compiló las clases con Java 25, pero JaCoCo `0.8.12` no pudo analizar el bytecode y devolvió `Unsupported class file major version 69`. La configuración fue actualizada a JaCoCo `0.8.14`, versión que incorpora soporte oficial para Java 25.

También se actualizó `actions/setup-java` de v4 a v5.

## Frontend: Angular 22 y TypeScript

`npm install` falló porque Angular DevKit `22.1.5` exige TypeScript `>=6.0 <6.1`, mientras el proyecto declaraba TypeScript `~5.9.2`. El frontend fue actualizado a `typescript: ~6.0.0`.

## Frontend: lint

La aplicación base no tenía un target `lint` configurado. Se retiró el script `ng lint` del `package.json`; como el workflow utiliza `npm run lint --if-present`, el CI podrá continuar con pruebas, cobertura y build. Cuando se agregue código funcional al frontend, se debe instalar `angular-eslint`, generar su configuración y volver a incorporar el script `lint`.

## Mobile en Windows

El workflow mobile no debe depender de `subosito/flutter-action` en este runner Windows porque esa acción invoca Bash. La configuración fue reemplazada por una instalación nativa mediante PowerShell: clona Flutter stable en `RUNNER_TOOL_CACHE`, añade `bin` a `GITHUB_PATH` y ejecuta `flutter.bat`.

El frontend también reemplaza `SonarSource/sonarqube-scan-action`, que invoca Bash, por `npx --yes @sonar/scan`, compatible con el shell PowerShell del runner Windows. El backend conserva el scanner Maven, que ya funciona nativamente en Windows.

No se debe ocultar ningún error con `continue-on-error`; el pipeline debe fallar si un módulo no puede analizarse.
