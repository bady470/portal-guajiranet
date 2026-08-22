# Correcciones de CI

## Backend: Java 25 y JaCoCo

El backend compiló las clases con Java 25, pero JaCoCo `0.8.12` no pudo analizar el bytecode y devolvió `Unsupported class file major version 69`. La configuración fue actualizada a JaCoCo `0.8.14`, versión que incorpora soporte oficial para Java 25.

También se actualizó `actions/setup-java` de v4 a v5.

## Frontend: Angular 22 y TypeScript

`npm install` falló porque Angular DevKit `22.1.5` exige TypeScript `>=6.0 <6.1`, mientras el proyecto declaraba TypeScript `~5.9.2`. El frontend fue actualizado a `typescript: ~6.0.0`.

## Frontend: lint

La aplicación base no tenía un target `lint` configurado. Se retiró el script `ng lint` del `package.json`; como el workflow utiliza `npm run lint --if-present`, el CI podrá continuar con pruebas, cobertura y build. Cuando se agregue código funcional al frontend, se debe instalar `angular-eslint`, generar su configuración y volver a incorporar el script `lint`.

## Mobile en Windows

El workflow mobile alcanza el runner, pero `subosito/flutter-action` requiere Bash. En el runner Windows, `bash` está resolviendo al relay de WSL y falla con `execvpe(/bin/bash) failed`. Hay dos opciones válidas:

1. Instalar Git Bash y asegurar que `C:\Program Files\Git\bin` esté en el PATH visible por el runner.
2. Registrar un runner Linux específico para Flutter/mobile, opción recomendada para CI estable.

No se debe ocultar este error usando `continue-on-error`; el pipeline debe fallar si mobile no puede analizarse.
