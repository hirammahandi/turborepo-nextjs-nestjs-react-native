# Práctica del workspace

Notas de trabajo sobre el monorepo con pnpm y Turborepo. Complementan la guía [turborepo tutorial.md](./turborepo%20tutorial.md). Las palabras clave, los comandos y la configuración se quedan en inglés.

1. [Dónde vive una dependencia](#dónde-vive-una-dependencia)
2. [Añadirla con pnpm](#añadirla-con-pnpm)
3. [Instalar en la raíz](#instalar-en-la-raíz)
4. [Just-in-Time Package y Compiled Package](#just-in-time-package-y-compiled-package)
5. [`private`](#private)
6. [Crear un package](#crear-un-package)
7. [Package de TypeScript](#package-de-typescript)
8. [Añadir una app](#añadir-una-app)
9. [ESLint y TypeScript compartidos](#eslint-y-typescript-compartidos)
10. [NestJS](#nestjs)
11. [Next.js](#nextjs)
12. [React con Vite](#react-con-vite)
13. [React Native con Expo](#react-native-con-expo)

---

## Dónde vive una dependencia

La dependencia queda declarada en el `package.json` del package o de la app que la usa. Eso vale para una external dependency y para una internal dependency.

Turborepo no escribe esa línea ni descarga paquetes. Lee el `package.json` y el lockfile de la raíz para armar el Package Graph y ordenar las tasks. Quien escribe la entrada, actualiza `pnpm-lock.yaml` y enlaza el módulo es pnpm.

En la raíz solo viven herramientas del repositorio, como `turbo`, `prettier` o `typescript`. `next`, `react` o `@repo/ui` se declaran en la app o el package que los importa.

pnpm puede guardar los archivos en el almacén de la raíz y enlazarlos. El `node_modules` puede aparecer en la raíz, dentro del package, o en los dos sitios. La guía lo da por bueno mientras los scripts resuelvan los módulos. Lo que importa es que cada package liste en su `package.json` lo que realmente importa.

## Añadirla con pnpm

Desde la raíz del workspace, `--filter` elige el package que recibe la dependencia.

Una external dependency:

```bash
pnpm add zod --filter=web
```

Un Internal Package. `--workspace` lo resuelve dentro del workspace y escribe el protocolo que muestra la guía, `"@repo/math": "workspace:*"`:

```bash
pnpm add @repo/math --filter=web --workspace
```

El mismo patrón sirve para otro package: se cambia el nombre del `--filter`.

```bash
pnpm add typescript --filter=@repo/math
pnpm add @repo/typescript-config --filter=@repo/math --workspace
```

Con pnpm, bun, nub y aube el valor de una internal dependency es `workspace:*`. Con yarn y npm es `"*"`.

Entrar al directorio y ejecutar `pnpm add` también es válido. pnpm detecta el package del workspace y escribe en el `package.json` de ese directorio:

```bash
cd apps/web
pnpm add zod
```

`pnpm install` a solas no añade una librería nueva. Instala lo que ya está declarado en los `package.json` y en el lockfile. Para incorporar una dependencia el comando es `pnpm add`.

La guía **Creating an Internal Package** muestra la línea escrita a mano en `web`:

```json
"@repo/math": "workspace:*"
```

`pnpm add … --filter=web --workspace` es el equivalente de esa línea. Turbo no tiene un comando para hacerlo.

## Instalar en la raíz

El lockfile y la definición del workspace viven en la raíz (`pnpm-lock.yaml` y `pnpm-workspace.yaml`). Turborepo usa ese lockfile para saber, por ejemplo, que `@repo/math` depende de `@repo/typescript-config`.

Cuando el `package.json` ya declara sus dependencias, el comando es uno, en la raíz:

```bash
pnpm install
```

Eso lee los `package.json` del workspace, actualiza el lockfile y enlaza los Internal Packages. Un `pnpm install` dentro de `packages/math` no es el flujo que describe la guía para pnpm.

Un generador de framework asume que la carpeta nueva es un proyecto suelto: instala ahí, crea un lockfile ahí y un `node_modules` ahí. En el workspace esa instalación escribe un segundo lockfile y un árbol de módulos que el lockfile de la raíz no describe. El generador tiene que dejar el `package.json` con las dependencias declaradas. Quien las materializa es el `pnpm install` de la raíz.

## Just-in-Time Package y Compiled Package

La guía documenta dos formas de exportar un Internal Package. El import desde la app es el mismo: `import { add } from "@repo/math/add"`.

### Compiled Package

Es el paso a paso de `@repo/math`. El runtime carga JavaScript ya compilado. `types` apunta al fuente para que TypeScript lea los tipos; `default` es lo que carga la app:

```json
"./add": {
  "types": "./src/add.ts",
  "default": "./dist/add.js"
}
```

`dist/add.js` tiene que existir. El `tsconfig` pone `outDir` en `dist` para que coincida con `exports`. Los scripts del package son `build` (`tsc`) y `dev` (`tsc --watch`).

`turbo build`, con `dependsOn: ["^build"]`, construye `@repo/math` antes que `web`, y `./packages/math/dist` ya está disponible cuando `web` hace el bundle. En el día a día, quien mantiene `dist` al día es `dev` (`tsc --watch`). `turbo build` es el flujo de build.

### Just-in-Time Package

Está en **Structuring a repository**. `exports` apunta al TypeScript y no hay `dist`:

```json
{
  "exports": {
    ".": "./src/constants.ts",
    "./add": "./src/add.ts",
    "./subtract": "./src/subtract.ts"
  }
}
```

Quien compila el `.ts` es la app. No hace falta un `build` previo del package. La guía lo presenta como el patrón simple y pide una versión moderna de Node.js y de TypeScript. Exportar los fuentes y usarlos sin compilar el package, como hace `ui`, es este patrón.

Los dos son válidos. El tutorial de crear `@repo/math` eligió Compiled Packages, y por eso `default` es `dist`.

## `private`

`private: true` no forma parte del patrón Just-in-Time ni del Compiled.

El ejemplo Just-in-Time solo define `exports`. El `package.json` de `@repo/math` en la guía tampoco incluye `private`. El import y el enlace `workspace:*` dependen de `name`, de `exports` y de que el package esté en el workspace.

`private: true` es un campo de npm: impide publicar ese package en el registro. En la guía aparece en el `package.json` de la raíz, porque la raíz no es un package publicable. En un Internal Package evita un `npm publish` accidental, y vale igual para los dos patrones.

## Crear un package

Turborepo no trae un generador de un package de TypeScript ni de utilities. El comando integrado crea un workspace vacío o copia uno que ya existe. Está en la guía [Generating code](https://turborepo.dev/docs/guides/generating-code) y en la referencia de [`turbo generate`](https://turborepo.dev/docs/reference/generate). `turbo gen` es el alias de `turbo generate`.

### Workspace vacío

```bash
turbo gen workspace --name @repo/utils --type package
```

`--type` solo admite `app` o `package`. `--empty` vale `true` por defecto. El resultado es un package con ese `name` en el `package.json` y scripts que hacen `echo`. No escribe `src/`, `tsconfig.json` ni `exports`.

El generador pregunta dos cosas:

- **Where should "@repo/utils" be added?** El directorio. Para un Internal Package, `packages/utils`.
- **Add workspace dependencies to "@repo/utils"?** Si `@repo/utils` debe declarar ya dependencias internas. **n** cuando el package está vacío y todavía no importa a nadie. **Y** abre la lista de packages del workspace (`@repo/ui`, `@repo/typescript-config`, …) y escribe los elegidos con `workspace:`*.

Esas dependencias solo tienen sentido cuando el package nuevo las importa. `@repo/typescript-config` se elige si el `tsconfig` va a extender esa configuración. Si se contestó que no, se añaden después desde la raíz:

```bash
pnpm add @repo/typescript-config --filter=@repo/utils --workspace
```

### Copiar uno que ya existe

```bash
turbo gen workspace --copy @repo/typescript-config --name @repo/utils
```

`--copy` acepta el nombre de un workspace del monorepo o una URL de GitHub con rama y subdirectorio:

```bash
turbo gen workspace --copy https://github.com/vercel/turborepo/tree/main/examples/with-tailwind/packages/tailwind-config
```

Eso clona la estructura de ese package. Sigue sin ser una plantilla oficial de utilities.

### Generador propio

`turbo gen` (equivalente a `turbo gen run`) ejecuta generadores definidos en el repositorio, en `turbo/generators/config.ts` o `config.js`, en la raíz o en cualquier workspace. Si no hay ninguno, el comando ofrece crear uno. Con TypeScript hace falta `@turbo/gen` como `devDependency` para los tipos.

```bash
turbo gen run <generator-name>
```

Un package con `src/`, `tsconfig.json` y `exports` se describe en ese generador, o se parte de `turbo gen workspace` y se completan los archivos.

## Package de TypeScript

`turbo gen workspace` y `tsc --init` no se solapan. El primero crea el package vacío. El segundo solo escribe un `tsconfig.json` de proyecto suelto. El resto, según la guía, se ajusta a mano.

### `tsc --init`

El compilador se instala en el package que lo usa:

```bash
pnpm add typescript --filter=@repo/utils --save-dev
```

`tsc --init` se ejecuta dentro del package, no en la raíz del monorepo:

```bash
pnpm exec tsc --init
```

Desde TypeScript 5.9 ese comando solo genera un `tsconfig.json` mínimo en el directorio actual: `module`, `target`, `strict`, `jsx`, `declaration` y varias opciones comentadas, entre ellas `rootDir` y `outDir`. No crea código, ni `package.json`, ni `exports`.

Ejecutarlo en la raíz crearía un `tsconfig.json` ahí. La guía dice que cada package lleva el suyo y que la raíz normalmente no lo necesita.

### Sustituir el `tsconfig.json`

El archivo de `tsc --init` es el de un proyecto independiente. La guía quiere que el package extienda `@repo/typescript-config/base.json` y solo fije lo que esa base no hereda. `include` y `exclude` no se heredan con `extends`. El archivo generado se sustituye por:

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

Conviene no dejar el `compilerOptions` de `tsc --init`. `jsx: react-jsx` y `types: []` son de un proyecto suelto. En un package de utilidades pisan la configuración compartida.

### Completar el `package.json` y el código

En el `package.json` que creó Turbo, los scripts `echo` pasan a ser los de la guía y se declaran los entrypoints. El código, por ejemplo `packages/utils/src/sum.ts`, no lo crea ningún CLI.

Para el patrón Compiled:

```json
{
  "type": "module",
  "scripts": {
    "dev": "tsc --watch",
    "build": "tsc"
  },
  "exports": {
    "./sum": {
      "types": "./src/sum.ts",
      "default": "./dist/sum.js"
    }
  }
}
```

`outDir` tiene que coincidir con el directorio de `default` en `exports`. `turbo build`, con `dependsOn: ["^build"]`, construye el package antes que la app. Mientras se edita, `dev` (`tsc --watch`) mantiene `dist/` al día. La task `build` del repositorio ya cachea `dist/**`.

Para el patrón Just-in-Time, el `exports` apunta al fuente y no hace falta `build` para usarlo:

```json
{
  "scripts": {
    "check-types": "tsc --noEmit"
  },
  "exports": {
    "./*": "./src/*.ts"
  }
}
```

El import desde otra app, después de `pnpm add @repo/utils --filter=web --workspace`, es `import { sum } from "@repo/utils/sum"`. El detalle de los dos patrones está en [Just-in-Time Package y Compiled Package](#just-in-time-package-y-compiled-package).

## Añadir una app

Las aplicaciones y los servicios van en `apps/`. Cada una es un package propio, con su `package.json`, sus dependencias y sus scripts. `apps/*` ya entra en el workspace. Turborepo no soporta packages anidados (`apps/**`): la app es `apps/api`, no `apps/api/otro-package`.

Una app es un Application Package, un entrypoint del Package Graph. El código compartido va en `packages/` y la app lo consume con `workspace:*`.

Turborepo no trae plantillas de NestJS, Next.js, Vite ni React Native. `turbo gen workspace` crea un workspace vacío o copia uno existente. El generador de cada framework escribe la app, y Turborepo ejecuta el script que se llama igual que la task de `turbo.json`.

`dev` es una task de larga duración: `"cache": false` y `"persistent": true`. Con el script `dev` en la raíz (`turbo run dev`), la app arranca junto al resto. Para una sola: `turbo dev --filter=<nombre>`.

El `name` del `package.json` es el valor de `--filter`.

## ESLint y TypeScript compartidos

Cada app que llega de un CLI trae un ESLint y un TypeScript de proyecto suelto, con otra versión. En este workspace la referencia es la que ya usan `@repo/eslint-config`, `@repo/ui` y la raíz: ESLint `10.9.1` y TypeScript `7.0.2`. `my-app` llegó con ESLint `^9` y TypeScript `^5`. `api` llegó con ESLint `^9.18` y TypeScript `^5.7.3`. `native` llegó con TypeScript `~6.0.3`. Un config hecho para ESLint 10 no se ejecuta con el binario de ESLint 9 de la app.

La práctica de Turborepo es una sola configuración compartida. En cada app, el archivo solo la extiende.

- El `package.json` de la app declara `@repo/eslint-config` y, cuando el preset de TypeScript es el del repo, `@repo/typescript-config`, con `workspace:*`.
- `eslint` y `typescript` se declaran en la app, en la misma versión que el resto del workspace, porque la dependencia se instala donde se usa.
- No se vuelve a declarar `eslint-config-next`, `@eslint/js` ni `typescript-eslint` en la app. Eso vive en `@repo/eslint-config`.
- El `tsconfig` de la app solo añade lo que el preset no trae: `paths`, `include`, `outDir` y las opciones que el framework exige.

`@next/eslint-plugin-next` se actualiza en `@repo/eslint-config` para coincidir con el `next` de las apps (`16.4.5`). No hay una segunda copia en `my-app`.

Hay dos excepciones, y las dos se quedan en la app que las necesita:

- NestJS 11 y `typescript-eslint` `8.72.2` piden TypeScript `<6.1` y no arrancan con el `7.0.2` de la raíz. `apps/api` se queda en `typescript` `5.7.3` y es quien importa `typescript-eslint`, para que pnpm no lo enlace con el TypeScript de la raíz. El `tsconfig` sí es el compartido (`nestjs.json`). El resto del config de lint (`turbo`, Prettier, `@eslint/js`) vive en `@repo/eslint-config/nest`.
- Expo SDK 58 fija TypeScript `~6.0.3` y su propia base, `expo/tsconfig.base`. `apps/native` no extiende `@repo/typescript-config` ni usa `@repo/eslint-config`.

## NestJS

Se crea con el CLI de NestJS, en **standard mode**: su propio `package.json`, `nest-cli.json` y `src/`. Desde la raíz:

```bash
npx @nestjs/cli new api --directory apps/api --skip-git --skip-install --package-manager pnpm
pnpm install
```

- `--directory apps/api` crea la app ahí.
- `--skip-git` no inicializa otro repositorio Git. El monorepo ya es uno.
- `--skip-install` no crea un lockfile dentro de `apps/api`.
- `--package-manager pnpm` es una opción del CLI (`npm`, `yarn`, `pnpm` o `bun`).

`nest generate app` pasa el proyecto al **monorepo mode** de NestJS: un solo `package.json`, un solo `node_modules` y webpack, con las apps bajo `apps/` sin ser packages del package manager. El modelo de Turborepo es el otro: cada app tiene su `package.json`. La app se queda en standard mode.

NestJS genera `build` (`nest build`) y `start:dev` (`nest start --watch`). `build` ya coincide con la task. `dev` se añade para que `turbo run dev` lo encuentre:

```json
{
  "name": "api",
  "scripts": {
    "dev": "nest start --watch",
    "build": "nest build"
  }
}
```

`nest build` escribe en `dist/`. La task `build` cachea `dist/**` y, con `dependsOn: ["^build"]`, construye antes cualquier Internal Package del que `api` dependa.

El config que genera el CLI de Nest (`typescript-eslint`, ESLint 9, un `tsconfig` completo) no se deja en la app. El `base` de `@repo/eslint-config` parsea con Babel y está pensado para React, así que la API no lo importa. Usa el preset `./nest`.

`@repo/eslint-config/nest` reúne `@eslint/js`, Prettier y la regla `turbo/no-undeclared-env-vars`. `typescript-eslint` se importa en la app, no en el package compartido: el package que hace el `import` es el que resuelve TypeScript, y en la raíz está el `7.0.2`, que `typescript-eslint` 8 no soporta. `apps/api` declara `typescript-eslint` `8.72.2` junto a su `typescript` `5.7.3`.

```js
import tseslint from "typescript-eslint";
import { nestConfig } from "@repo/eslint-config/nest";

export default tseslint.config(
  ...nestConfig,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
```

`tsconfigRootDir` es el directorio de la app para que `projectService` encuentre su `tsconfig.json`. `apps/api/tsconfig.json` extiende `@repo/typescript-config/nestjs.json`, que quita `DOM` de `base.json` y añade `experimentalDecorators` y `emitDecoratorMetadata`. En la app solo queda `outDir`. Del `package.json` salen `@eslint/js`, `eslint-plugin-prettier` y el ESLint 9. La app declara `eslint` `10.9.1` y `@repo/eslint-config`.

## Next.js

Desde la raíz, sin dejar que el CLI instale como proyecto suelto:

```bash
pnpm dlx create-next-app@latest apps/my-app --use-pnpm --skip-install
pnpm install
```

`create-next-app` instala al terminar. `--skip-install` deja solo los archivos. `--use-pnpm` fija el package manager. `create-turbo` ya crea así `apps/web` y `apps/docs`. Otra app es el mismo comando con otro directorio.

Los scripts que encajan con las tasks son `dev` (`next dev`) y `build` (`next build`). La salida cacheada de Next.js deja fuera su cache interna:

```json
"outputs": [".next/**", "!.next/cache/**", "!.next/dev/**"]
```

Esos globs son relativos a cada package, así que cubren todas las apps de Next.js. Las variables `NEXT_PUBLIC_*` entran en el hash por Framework Inference.

Si la app importa un Internal Package Just-in-Time, Next.js lo compila declarando el package en `transpilePackages` de su `next.config`. Si el package es Compiled y publica `dist/`, `dependsOn: ["^build"]` lo construye antes.

`create-next-app` escribe su propio `eslint-config-next` y un `tsconfig` con todas las `compilerOptions`. En el workspace eso se sustituye por el config compartido. `apps/my-app/eslint.config.mjs`:

```js
import { nextJsConfig } from "@repo/eslint-config/next-js";

export default nextJsConfig;
```

`apps/my-app/tsconfig.json` extiende `@repo/typescript-config/nextjs.json` y solo añade `paths` e `include` (`next-env.d.ts` y los tipos de `.next`). `eslint` queda en `10.9.1` y `typescript` en `7.0.2`. `eslint-config-next` no se declara en la app: el plugin de Next está en `@repo/eslint-config`. El campo `packageManager` que escribe el CLI tampoco se queda en la app. El del workspace está en la raíz.

## React con Vite

`create vite` no instala. Escribe el proyecto y el `package.json`. El `pnpm install` es el de la raíz.

```bash
pnpm create vite@latest apps/my-app -- --template react-ts
pnpm install
```

Sin `--template`, el asistente pide React y TypeScript.

La guía separa el build de la comprobación de tipos. El starter suele traer `"build": "tsc && vite build"`. Queda así, para que `turbo` pueda ejecutar `build` y `check-types` en paralelo:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "check-types": "tsc --noEmit"
  }
}
```

La salida cacheada es `dist/**` y, en la guía de Vite, también `*.tsbuildinfo`. La task `dev` lleva `"cache": false`, `"persistent": true` y `"dependsOn": ["^build"]`, para que las librerías compiladas existan antes de arrancar Vite. El prefijo de variables es `VITE_*`.

## React Native con Expo

Turborepo no tiene un modo propio para React Native. La app es otro package en `apps/`. La guía de monorepos de Expo usa esa estructura (`apps/*` y `packages/*`).

Expo instala por defecto dependencias de npm y, si toca, CocoaPods. `--no-install` salta las dos. Las de JavaScript las cubre el `pnpm install` de la raíz. CocoaPods es el gestor nativo de iOS y no entra en el lockfile del workspace; se ejecuta dentro de la app cuando haya un `ios/` que instalar.

```bash
pnpm create expo-app --template default@sdk-58 --no-install apps/native
pnpm install
```

A partir del SDK 52, `expo/metro-config` observa el monorepo y resuelve packages entre el `node_modules` de la app y el de la raíz. En versiones anteriores, Metro se configuraba con `watchFolders` en la raíz del repo y `resolver.nodeModulesPaths` apuntando a ambos `node_modules`.

El CLI genera `start`. Para `turbo run dev` el script se llama como la task:

```json
{
  "name": "native",
  "scripts": {
    "dev": "expo start"
  }
}
```

Se lanza con `turbo dev --filter=native`. El prefijo de variables es `EXPO_PUBLIC_*`.

Un package de UI web usa el DOM. La app nativa necesita un Internal Package con componentes que React Native pueda ejecutar. Es el mismo criterio de la guía: un purpose por package, y el código compartido vive en `packages/`.

Expo no entra en los presets de `@repo/eslint-config` ni de `@repo/typescript-config`. `apps/native/tsconfig.json` sigue con `"extends": "expo/tsconfig.base"` y solo añade `paths`. `base.json` del repo usa `NodeNext` y `DOM`, y Metro no compila con eso. El script `lint` se queda en `expo lint`. TypeScript se queda en `~6.0.3`, el rango del SDK 58, mientras Expo no use el `7.0.2` del resto del workspace. El preset `react-internal` asume navegador y el parser de Babel: sirve para `@repo/ui`, no para React Native.
