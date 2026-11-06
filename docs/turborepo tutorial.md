# Turborepo Tutorial: Crafting your repository

Traducción al español de la guía oficial [Crafting your repository](https://turborepo.dev/docs/crafting-your-repository). Las palabras clave, los nombres de configuración, los comandos y los ejemplos de código se mantienen en inglés.

El documento sigue las secciones del menú de la guía:

1. [Overview](#overview)
2. [Structuring a repository](#structuring-a-repository)
3. [Managing dependencies](#managing-dependencies)
4. [Creating an Internal Package](#creating-an-internal-package)
5. [Configuring tasks](#configuring-tasks)
6. [Running tasks](#running-tasks)
7. [Caching](#caching)
8. [Developing applications](#developing-applications)
9. [Using environment variables](#using-environment-variables)
10. [Constructing CI](#constructing-ci)
11. [Understanding your repository](#understanding-your-repository)
12. [Upgrading](#upgrading)

---

## Overview

Fuente: https://turborepo.dev/docs/crafting-your-repository

Arquitectar un monorepo es un proceso cuidadoso. A través de estas guías aprenderás a diseñar y construir un monorepo que haga más rápido a cada equipo, sin importar el tamaño.

Las guías de esta sección te llevan a construir un Workspace de varios packages, habitualmente llamado monorepo. Están pensadas para leerse en orden, porque cada una se apoya en el conocimiento de las anteriores, pero puedes leerlas en cualquier orden o saltar a las páginas de tu caso de uso.

Cuando hayas leído toda esta sección, deberías entender bien cómo diseñar y construir un monorepo con Turborepo.

> Turborepo también puede usarse para acelerar Workspaces de un solo package. Consulta la sección de single-package workspace para más información.

### From zero to `turbo`

#### 1. Structuring a repository

Diseña la estructura de directorios de tu monorepo.

#### 2. Managing dependencies

Usar dependencies para compartir código.

#### 3. Creating an internal package

Crea un package dentro de tu repositorio.

#### 4. Configuring tasks

Diseña los patrones de tus tasks.

#### 5. Running tasks

Ejecuta las tasks tan rápido como sea posible.

#### 6. Caching

No hagas el mismo trabajo dos veces.

#### 7. Developing apps

Ejecuta muchas apps en paralelo.

#### 8. Using environment variables

Ten en cuenta las variables de tu entorno.

#### 9. Constructing CI

Publica tus aplicaciones.

#### 10. Upgrading

Actualizar tu versión de Turborepo.

#### 11. Understanding your repository

Entender tu codebase con Turborepo.

### More guides

También hay más guías centradas en herramientas concretas, casos de uso y otros temas.

---

## Structuring a repository

Fuente: https://turborepo.dev/docs/crafting-your-repository/structuring-a-repository

`turbo` está construido sobre Workspaces, una funcionalidad de los package managers del ecosistema JavaScript que permite agrupar varios packages en un solo repositorio.

Seguir estas convenciones es importante porque te permite:

- Apoyarte en esas convenciones para todo el tooling del repositorio.
- Adoptar Turborepo de forma rápida e incremental en un repositorio que ya existe.

En esta guía se recorre cómo configurar un Workspace de varios packages (monorepo) para dejar sentada la base de `turbo`.

### Getting started

Configurar a mano la estructura de un Workspace puede ser tedioso. Si eres nuevo en monorepos, se recomienda usar `create-turbo` para empezar de inmediato con una estructura de Workspace válida.

#### pnpm

```bash
pnpm dlx create-turbo@latest
```

#### yarn

```bash
yarn dlx create-turbo@latest
```

#### npm

```bash
npx create-turbo@latest
```

#### bun

```bash
bunx create-turbo@latest
```

#### nub

```bash
nubx create-turbo@latest
```

#### aube

```bash
aubx create-turbo@latest
```

Después puedes revisar el repositorio buscando las características que describe esta guía.

### Anatomy of a workspace

En JavaScript, un Workspace puede ser un solo package o una colección de packages. En estas guías el foco es un Workspace de varios packages, a menudo llamado monorepo.

Abajo se destacan los elementos estructurales de `create-turbo` que lo convierten en un Workspace válido.

#### pnpm

- `package.json`
- `pnpm-lock.yaml`
- `pnpm-workspace.yaml`
- `turbo.json`
- `apps/`
  - `docs/`
    - `package.json`
  - `web/`
    - `package.json`
- `packages/`
  - `ui/`
    - `package.json`

#### yarn

- `package.json`
- `yarn.lock`
- `turbo.json`
- `apps/`
  - `docs/`
    - `package.json`
  - `web/`
    - `package.json`
- `packages/`
  - `ui/`
    - `package.json`

#### npm

- `package.json`
- `package-lock.json`
- `turbo.json`
- `apps/`
  - `docs/`
    - `package.json`
  - `web/`
    - `package.json`
- `packages/`
  - `ui/`
    - `package.json`

#### bun

- `package.json`
- `bun.lock`
- `turbo.json`
- `apps/`
  - `docs/`
    - `package.json`
  - `web/`
    - `package.json`
- `packages/`
  - `ui/`
    - `package.json`

#### nub

- `package.json`
- `nub.lock`
- `turbo.json`
- `apps/`
  - `docs/`
    - `package.json`
  - `web/`
    - `package.json`
- `packages/`
  - `ui/`
    - `package.json`

#### aube

- `package.json`
- `aube-lock.yaml`
- `turbo.json`
- `apps/`
  - `docs/`
    - `package.json`
  - `web/`
    - `package.json`
- `packages/`
  - `ui/`
    - `package.json`

### Minimum requirements

- Packages tal como los describe tu package manager.
- Un lockfile del package manager.
- `package.json` en la raíz.
- `turbo.json` en la raíz.
- `package.json` en cada package.

### Specifying packages in a monorepo

#### 1. Declaring directories for packages

Primero, el package manager tiene que describir dónde están tus packages. Se recomienda empezar separando los packages en `apps/` para aplicaciones y servicios, y `packages/` para todo lo demás, como librerías y tooling.

#### pnpm

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

#### yarn

```json
{
  "workspaces": ["apps/*", "packages/*"]
}
```

#### npm

```json
{
  "workspaces": ["apps/*", "packages/*"]
}
```

#### bun

```json
{
  "workspaces": ["apps/*", "packages/*"]
}
```

#### nub

```json
{
  "workspaces": ["apps/*", "packages/*"]
}
```

#### aube

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

Con esta configuración, cada directorio que tenga un `package.json` dentro de `apps` o `packages` se considera un package.

> Turborepo no soporta packages anidados como `apps/**` o `packages/**`, por el comportamiento ambiguo entre los package managers del ecosistema JavaScript. Una estructura que ponga un package en `apps/a` y otro en `apps/a/b` produce un error.
>
> Si quieres agrupar packages por directorio, puedes hacerlo con globs como `packages/*` y `packages/group/*`, y no crear un archivo `packages/group/package.json`.

#### 2. `package.json` in each package

En el directorio del package tiene que haber un `package.json` para que el package sea descubrible por el package manager y por `turbo`. Los requisitos del `package.json` de un package están más abajo.

### Root `package.json`

El `package.json` de la raíz es la base del Workspace. Este es un ejemplo habitual de lo que encontrarías en un `package.json` raíz:

#### pnpm

```json
{
  "private": true,
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint"
  },
  "devDependencies": {
    "turbo": "latest"
  },
  "devEngines": {
    "packageManager": {
      "name": "pnpm",
      "version": "9.0.0"
    }
  }
}
```

#### yarn

```json
{
  "private": true,
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint"
  },
  "devDependencies": {
    "turbo": "latest"
  },
  "devEngines": {
    "packageManager": {
      "name": "yarn",
      "version": "1.22.19"
    }
  },
  "workspaces": ["apps/*", "packages/*"]
}
```

#### npm

```json
{
  "private": true,
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint"
  },
  "devDependencies": {
    "turbo": "latest"
  },
  "devEngines": {
    "packageManager": {
      "name": "npm",
      "version": "10.0.0"
    }
  },
  "workspaces": ["apps/*", "packages/*"]
}
```

#### bun

```json
{
  "private": true,
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint"
  },
  "devDependencies": {
    "turbo": "latest"
  },
  "devEngines": {
    "packageManager": {
      "name": "bun",
      "version": "1.2.0"
    }
  },
  "workspaces": ["apps/*", "packages/*"]
}
```

#### nub

```json
{
  "private": true,
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint"
  },
  "devDependencies": {
    "turbo": "latest"
  },
  "devEngines": {
    "packageManager": {
      "name": "nub",
      "version": "0.8.3"
    }
  },
  "workspaces": ["apps/*", "packages/*"]
}
```

#### aube

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

### Root `turbo.json`

`turbo.json` se usa para configurar el comportamiento de `turbo`. Para saber cómo configurar las tasks, visita la página Configuring tasks.

### Package manager lockfile

Un lockfile es clave para un comportamiento reproducible, tanto del package manager como de `turbo`. Además, Turborepo usa el lockfile para entender las dependencies entre tus Internal Packages dentro del Workspace.

> Si no hay un lockfile cuando ejecutas `turbo`, puedes ver un comportamiento impredecible.

### Anatomy of a package

Conviene empezar a pensar el diseño de un package como una unidad propia dentro del Workspace. A alto nivel, cada package es casi como su propio "project" pequeño, con su `package.json`, su configuración de tooling y su código fuente. Esta idea tiene límites, pero es un buen modelo mental para empezar.

Además, un package tiene entrypoints concretos que otros packages del Workspace pueden usar para acceder a él, definidos por `exports`.

### `package.json` for a package

#### `name`

El campo `name` identifica el package. Tiene que ser único dentro del Workspace.

> Es una buena práctica usar un prefijo de namespace en los Internal Packages para evitar conflictos con otros packages del registro de npm. Por ejemplo, si tu organización se llama `acme`, podrías nombrar tus packages `@acme/package-name`.
>
> En la documentación y los ejemplos se usa `@repo` porque es un namespace sin uso y no reclamable en el registro de npm. Puedes conservarlo o usar tu propio prefijo.

#### `scripts`

El campo `scripts` define scripts que se pueden ejecutar en el contexto del package. Turborepo usa el nombre de esos scripts para identificar qué scripts ejecutar (si hay alguno) en un package. Se habla más de estos scripts en la página Running Tasks.

#### `exports`

El campo `exports` especifica los entrypoints para otros packages que quieran usar el package. Cuando quieras usar código de un package en otro, importarás desde ese entrypoint.

Por ejemplo, si tuvieras un package `@repo/math`, podrías tener este campo `exports`:

```json
{
  "exports": {
    ".": "./src/constants.ts",
    "./add": "./src/add.ts",
    "./subtract": "./src/subtract.ts"
  }
}
```

Este ejemplo usa el patrón Just-in-Time Package por simplicidad. Exporta TypeScript directamente, pero puedes elegir el patrón Compiled Package.

> El campo `exports` de este ejemplo requiere versiones modernas de Node.js y TypeScript.

Esto permite importar las funciones `add` y `subtract` del package `@repo/math` así:

```ts
import { GRAVITATIONAL_CONSTANT, SPEED_OF_LIGHT } from "@repo/math";
import { add } from "@repo/math/add";
import { subtract } from "@repo/math/subtract";
```

Usar `exports` de esta forma aporta tres beneficios importantes:

- Evitar barrel files: los barrel files son archivos que reexportan otros archivos del mismo package y crean un único entrypoint para todo el package. Pueden parecer cómodos, pero son difíciles de manejar para compiladores y bundlers, y pueden llevar rápido a problemas de rendimiento.
- Funcionalidades más potentes: `exports` también tiene otras capacidades frente al campo `main`, como Conditional Exports. En general se recomienda usar `exports` en lugar de `main` siempre que sea posible, porque es la opción más moderna.
- Autocompletado del IDE: al especificar los entrypoints del package con `exports`, el editor puede ofrecer autocompletado de los exports del package.

#### `imports` (opcional)

El campo `imports` permite crear subpaths hacia otros módulos dentro del package. Puedes pensarlos como "shortcuts" para escribir rutas de import más simples y más resistentes a refactors que mueven archivos. Para aprender cómo, visita la página de TypeScript.

> Puede que conozcas mejor la opción `compilerOptions#paths` de TypeScript, que persigue un objetivo parecido. Desde TypeScript 5.4, TypeScript puede inferir subpaths a partir de `imports`, y eso lo convierte en una opción mejor porque trabajas con las convenciones de Node.js. Para más información, visita la guía de TypeScript.

### Source code

Por supuesto, querrás código fuente en el package. Lo habitual es usar un directorio `src` para el código fuente y compilar a un directorio `dist` (que también debe estar dentro del package), aunque no es un requisito.

### Common pitfalls

- Si usas TypeScript, lo más probable es que no necesites un `tsconfig.json` en la raíz del Workspace. Los packages deben especificar su propia configuración de forma independiente, normalmente partiendo de un `tsconfig.json` compartido que viva en otro package del Workspace. Para más información, visita la guía de TypeScript.
- Conviene evitar acceder a archivos a través de los límites de un package. Si te encuentras escribiendo `../` para ir de un package a otro, lo más probable es que puedas replantear el enfoque: instalar el package donde se necesita e importarlo en el código.

### Next steps

Con el Workspace configurado, ya puedes usar el package manager para instalar dependencies en tus packages.

---

## Managing dependencies

Fuente: https://turborepo.dev/docs/crafting-your-repository/managing-dependencies

- Las external dependencies vienen del registro de npm y permiten aprovechar código del ecosistema para construir aplicaciones y librerías más rápido.
- Las internal dependencies permiten compartir funcionalidad dentro del repositorio y mejoran de forma notable la descubribilidad y la usabilidad del código compartido. Cómo construir un Internal Package se trata en la guía siguiente.

#### pnpm

```json
{
  "dependencies": {
    "next": "latest",
    "@repo/ui": "workspace:*"
  }
}
```

`next` es una external dependency. `@repo/ui` es una internal dependency.

#### yarn

```json
{
  "dependencies": {
    "next": "latest",
    "@repo/ui": "*"
  }
}
```

#### npm

```json
{
  "dependencies": {
    "next": "latest",
    "@repo/ui": "*"
  }
}
```

#### bun

```json
{
  "dependencies": {
    "next": "latest",
    "@repo/ui": "workspace:*"
  }
}
```

#### nub

```json
{
  "dependencies": {
    "next": "latest",
    "@repo/ui": "workspace:*"
  }
}
```

#### aube

```json
{
  "dependencies": {
    "next": "latest",
    "@repo/ui": "workspace:*"
  }
}
```

### Best practices for dependency installation

#### Install dependencies where they're used

Cuando instalas una dependency en el repositorio, debes instalarla directamente en el package que la usa. El `package.json` de ese package tendrá cada dependency que el package necesita. Esto vale tanto para external dependencies como para internal dependencies.

> El package manager puede elegir una ubicación de `node_modules` distinta de la del package.

Para instalar dependencies rápido en varios packages, puedes usar el package manager:

#### pnpm

```bash
pnpm add jest --save-dev --recursive --filter=web --filter=@repo/ui --filter=docs
```

#### yarn

Yarn 1:

```bash
yarn workspace web add jest --dev
yarn workspace @repo/ui add jest --dev
```

Yarn 2+:

```bash
yarn workspaces foreach -R --from '{web,@repo/ui}' add jest --dev
```

#### npm

```bash
npm install jest --workspace=web --workspace=@repo/ui --save-dev
```

#### bun

```bash
cd apps/web && bun install jest --dev
cd packages/ui && bun install jest --dev
```

#### nub

```bash
cd apps/web && nub add jest --save-dev
cd packages/ui && nub add jest --save-dev
```

#### aube

```bash
cd apps/web && aube add jest --save-dev
cd packages/ui && aube add jest --save-dev
```

Esta práctica tiene varios beneficios:

- Más claridad: es más fácil entender de qué depende un package cuando sus dependencies están listadas en su `package.json`. Quien trabaja en el repositorio ve de un vistazo qué dependencies se usan dentro del package.
- Más flexibilidad: en un monorepo a escala, no siempre es realista esperar que cada package use la misma versión de una external dependency. Cuando hay muchos equipos en el mismo codebase, hay prioridades, plazos y necesidades distintas. Instalar las dependencies en el package que las usa permite que el equipo de `ui` suba a la última versión de TypeScript, mientras el equipo de `web` prioriza sacar funcionalidades nuevas y actualiza TypeScript más tarde. Si aun así quieres mantener las versiones sincronizadas, también puedes hacerlo.
- Mejor capacidad de caching: si instalas demasiadas dependencies en la raíz del repositorio, cambiarás la raíz del Workspace cada vez que añadas, actualices o borres una dependency, y eso produce cache misses innecesarios.
- Podar dependencies que no se usan: para quien usa Docker, la funcionalidad de pruning de Turborepo puede quitar de las imágenes de Docker las dependencies que no se usan y crear imágenes más ligeras. Cuando las dependencies están instaladas en los packages a los que pertenecen, Turborepo puede leer el lockfile y eliminar las dependencies que no se usan en los packages que necesitas.

#### Few dependencies in the root

Si sigues el principio anterior e instalas las dependencies en el package donde se usan, acabarás de forma natural con pocas dependencies en la raíz del Workspace.

Las únicas dependencies que pertenecen a la raíz del Workspace son herramientas para gestionar el repositorio. Las dependencies para construir aplicaciones y librerías se instalan en sus packages. Algunos ejemplos de dependencies que tiene sentido instalar en la raíz son `turbo`, `husky` o `lint-staged`.

### Managing dependencies

#### Turborepo does not manage dependencies

Turborepo no participa en la gestión de las dependencies: ese trabajo queda en el package manager que elijas.

Al package manager le corresponde descargar la versión correcta de una external dependency, hacer el symlinking y resolver los módulos. Las recomendaciones de esta página son buenas prácticas para gestionar dependencies en un Workspace, y Turborepo no las impone.

#### Module resolution differs amongst package managers

Los package managers tienen algoritmos distintos de resolución de módulos, y eso produce diferencias de comportamiento difíciles de predecir.

En la documentación de Turborepo, muchas recomendaciones se hacen según el comportamiento esperado de los package managers. La cobertura de cómo manejar dependencies es best effort, y puede que tengas que adaptar el comportamiento documentado a tu package manager o a las necesidades del repositorio.

Si encuentras un problema en la documentación que parezca incorrecto de forma universal para todos los package managers, o para uno concreto, se pide avisar con un GitHub Issue para poder mejorarla.

#### `node_modules` locations

Según el package manager, su versión, su configuración y el lugar donde instales las dependencies en el Workspace, puedes ver `node_modules` y las dependencies que contiene en distintas ubicaciones del Workspace. Las dependencies pueden estar en el `node_modules` de la raíz, en el `node_modules` de los packages, o en ambos.

Mientras tus scripts y tus tasks encuentren las dependencies que necesitan, el package manager está funcionando correctamente.

> Referenciar `node_modules` en el código:
>
> Las ubicaciones concretas de `node_modules` dentro del Workspace no forman parte de la API pública de los package managers. Referenciar `node_modules` directamente (como `node ./node_modules/a-package/dist/index.js`) puede ser frágil, porque la ubicación de la dependency en disco puede cambiar con otros cambios de dependencies en el Workspace.
>
> En su lugar, apóyate en las convenciones del ecosistema de Node.js para acceder a los módulos de las dependencies siempre que sea posible.

#### Keeping dependencies on the same version

Algunas personas que mantienen monorepos prefieren, por norma, mantener las dependencies en la misma versión en todos los packages. Hay varias formas de conseguirlo.

##### Using purpose-built tooling

Herramientas como `syncpack`, `manypkg` y `sherif` sirven específicamente para esto.

##### Using your package manager

Puedes usar el package manager para actualizar versiones de dependencies en un solo comando.

#### pnpm

```bash
pnpm up --recursive typescript@latest
```

Consulta la documentación de pnpm.

#### yarn

Yarn 1:

```bash
yarn upgrade-interactive --latest
```

Consulta la documentación de Yarn 1.

Yarn 2+:

```bash
yarn upgrade typescript@latest --upgrade
```

Consulta la documentación de Yarn 2+.

#### npm

```bash
npm install typescript@latest --workspaces
```

Consulta la documentación de npm.

#### bun

```bash
bun update typescript --latest
```

Consulta la documentación de Bun.

#### nub

```bash
nub update typescript --latest
```

Consulta la documentación de nub.

#### aube

```bash
aube update typescript --latest
```

Consulta la documentación de aube.

##### pnpm catalogs

En pnpm v9.5+ puedes usar catalogs para definir rangos de versión de dependencies como constantes reutilizables. Así las dependencies se mantienen en la misma versión, porque referencias el mismo valor en todo el Workspace.

Para saber más, visita la documentación de pnpm catalogs.

##### Using an IDE

El tooling de refactor del IDE puede buscar y reemplazar la versión de una dependency en todos los `package.json` del repositorio a la vez. Prueba una regex como `"next": ".*"` sobre los archivos `package.json` para encontrar todas las apariciones del package `next` y sustituirlas por la versión que quieras. Cuando termines, ejecuta el comando de instalación del package manager para actualizar el lockfile.

### Next steps

Ahora que sabes cómo gestionar dependencies de forma efectiva en un Workspace, el siguiente paso es crear un Internal Package para usarlo como dependency en el monorepo.

---

## Creating an Internal Package

Fuente: https://turborepo.dev/docs/crafting-your-repository/creating-an-internal-package

Los Internal Packages son los bloques de construcción del Workspace: una forma potente de compartir código y funcionalidad en el repositorio. Turborepo entiende automáticamente las relaciones entre Internal Packages usando las dependencies de `package.json`, y crea un Package Graph por debajo para optimizar los workflows del repositorio.

Vamos a crear el primer Internal Package para compartir utilidades matemáticas en el repositorio, siguiendo la sección Anatomy of a package y el patrón Compiled Packages. En los pasos de abajo se asume que has creado un repositorio nuevo con `create-turbo`, o que usas un repositorio con una estructura parecida.

### 1. Create an empty directory

Necesitas un directorio para el package. Vamos a crear uno en `./packages/math`.

- `package.json`
- `turbo.json`
- `apps/`
- `packages/`
  - `math/`
  - `ui/`
    - `package.json`
  - `eslint-config/`
    - `package.json`
  - `typescript-config/`
    - `package.json`

### 2. Add a `package.json`

Después, crea el `package.json` del package. Al añadir este archivo cumples los dos requisitos de un Internal Package y lo haces descubrible para Turborepo y para el resto del Workspace.

> El campo `name` del `package.json` determina cómo se puede importar el package en el Workspace. El nombre que elijas aquí (por ejemplo `@repo/math`) es exactamente cómo lo importarán los demás packages (por ejemplo `import { add } from '@repo/math/add'`).

#### pnpm, yarn, bun, nub y aube

```json
{
  "name": "@repo/math",
  "type": "module",
  "scripts": {
    "dev": "tsc --watch",
    "build": "tsc"
  },
  "exports": {
    "./add": {
      "types": "./src/add.ts",
      "default": "./dist/add.js"
    },
    "./subtract": {
      "types": "./src/subtract.ts",
      "default": "./dist/subtract.js"
    }
  },
  "devDependencies": {
    "@repo/typescript-config": "workspace:*",
    "typescript": "latest"
  }
}
```

#### npm

```json
{
  "name": "@repo/math",
  "type": "module",
  "scripts": {
    "dev": "tsc --watch",
    "build": "tsc"
  },
  "exports": {
    "./add": {
      "types": "./src/add.ts",
      "default": "./dist/add.js"
    },
    "./subtract": {
      "types": "./src/subtract.ts",
      "default": "./dist/subtract.js"
    }
  },
  "devDependencies": {
    "@repo/typescript-config": "*",
    "typescript": "latest"
  }
}
```

Desglose de este `package.json`:

- `name`: es el campo más crítico para que el package sea descubrible. El valor `@repo/math` se convierte en el identificador exacto que se usa en los `import` de todo el Workspace. Si cambias este nombre, tienes que actualizar todos los `import`.
- `scripts`: los scripts `dev` y `build` compilan el package con el compilador de TypeScript. El script `dev` observa los cambios del código fuente y recompila el package automáticamente.
- `devDependencies`: `typescript` y `@repo/typescript-config` son `devDependencies` para poder usar esos packages dentro de `@repo/math`. En un package real lo normal es tener más `devDependencies` y `dependencies`, pero de momento se puede mantener simple.
- `exports`: define varios entrypoints del package para poder usarlo en otros packages (`import { add } from '@repo/math/add'`).

Este `package.json` declara como dependency un Internal Package, `@repo/typescript-config`. Turborepo reconocerá `@repo/math` como dependiente de `@repo/typescript-config` para ordenar las tasks.

### 3. Add a `tsconfig.json`

Especifica la configuración de TypeScript de este package añadiendo un `tsconfig.json` en la raíz del package. TypeScript tiene una clave `extends`, que permite usar una configuración base en todo el repositorio y sobrescribir opciones cuando haga falta.

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

Aquí has hecho cuatro cosas importantes:

- La configuración `@repo/typescript-config/base.json`, que vive en `./packages/typescript-config`, ya tiene toda la configuración que necesitas, así que extiendes desde ella.
- La clave `outDir` de `compilerOptions` le dice a TypeScript dónde poner la salida compilada. Coincide con el directorio indicado en `exports` del `package.json`.
- La clave `rootDir` de `compilerOptions` hace que la salida de `outDir` use la misma estructura que el directorio `src`.
- Las claves `include` y `exclude` no se heredan de la configuración base, según la especificación de TypeScript, así que las incluyes aquí.

> Hay mucho más que aprender sobre la configuración de TypeScript, pero este es un buen punto de partida. Si quieres profundizar, visita la documentación oficial de TypeScript o la guía de TypeScript.

### 4. Add a `src` directory with source code

Ya puedes escribir código para el package. Crea dos archivos dentro de un directorio `src`:

#### `add.ts`

```ts
export const add = (a: number, b: number) => a + b;
```

#### `subtract.ts`

```ts
export const subtract = (a: number, b: number) => a - b;
```

Estos archivos se corresponden con las salidas que creará `tsc` cuando ejecutes `turbo build` dentro de un momento.

### 5. Add the package to an application

Ya puedes usar el package nuevo en una aplicación. Vamos a añadirlo a la aplicación `web`.

#### pnpm

```diff
  "dependencies": {
+   "@repo/math": "workspace:*",
    "next": "latest",
    "react": "latest",
    "react-dom": "latest"
  },
```

#### yarn

```diff
  "dependencies": {
+   "@repo/math": "*",
    "next": "latest",
    "react": "latest",
    "react-dom": "latest"
  },
```

#### npm

```diff
  "dependencies": {
+   "@repo/math": "*",
    "next": "latest",
    "react": "latest",
    "react-dom": "latest"
  },
```

#### bun, nub y aube

```diff
  "dependencies": {
+   "@repo/math": "workspace:*",
    "next": "latest",
    "react": "latest",
    "react-dom": "latest"
  },
```

> Acabas de cambiar las dependencies del repositorio. Ejecuta el comando de instalación de tu package manager para actualizar el lockfile.

`@repo/math` ya está disponible en la aplicación `web` y puedes usarlo en el código:

```tsx
import { add } from "@repo/math/add";

function Page() {
  return <div>{add(1, 2)}</div>;
}

export default Page;
```

### 6. Edit `turbo.json`

Añade los artifacts de la librería nueva `@repo/math` a `outputs` de la task `build` en `turbo.json`. Así Turborepo cachea sus salidas de build y puede restaurarlas al instante cuando vuelvas a ejecutar builds.

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "!.next/dev/**", "dist/**"]
    }
  }
}
```

### 7. Run `turbo build`

Si tienes `turbo` instalado de forma global, ejecuta `turbo build` en la terminal, en la raíz del Workspace. También puedes ejecutar el script `build` del `package.json` con el package manager, que usará `turbo run build`.

El package `@repo/math` se construye antes que la aplicación `web`, para que el código de runtime de `./packages/math/dist` esté disponible para `web` cuando haga el bundle.

> Puedes volver a ejecutar `turbo build` para ver cómo la aplicación `web` se reconstruye en milisegundos. Esto se trata en detalle en la guía de Caching.

### Best practices for Internal Packages

#### One "purpose" per package

Al crear Internal Packages, se recomienda que cada package tenga un único "purpose". No es una ciencia estricta ni una regla fija: es una buena práctica que depende del repositorio, de la escala, de la organización, de lo que necesitan los equipos y de más factores. Esta estrategia tiene varias ventajas:

- Más fácil de entender: a medida que el repositorio escala, quien trabaja en él encuentra antes el código que necesita.
- Menos dependencies por package: usar menos dependencies por package permite que Turborepo haga prune de las dependencies del Package Graph con más eficacia.

Algunos ejemplos:

- `@repo/ui`: un package con todos los componentes de UI compartidos.
- `@repo/tool-specific-config`: un package para gestionar la configuración de una herramienta concreta.
- `@repo/graphs`: una librería de dominio para crear y manipular datos gráficos.

#### Application Packages do not contain shared code

Al crear Application Packages, conviene no poner código compartido en esos packages. En su lugar, crea un package aparte para el código compartido y haz que los application packages dependan de ese package.

Además, los Application Packages no están pensados para instalarse en otros packages. Hay que pensarlos como un entrypoint del Package Graph.

> Hay excepciones poco frecuentes a esta regla.

### Next steps

Con un Internal Package nuevo en su sitio, puedes empezar a configurar tasks.

---

## Configuring tasks

Fuente: https://turborepo.dev/docs/crafting-your-repository/configuring-tasks

Una task es un script que ejecuta Turborepo. Puedes expresar relaciones entre tasks en la configuración de `turbo.json` y en el Package Graph.

Turborepo siempre paraleliza todo el trabajo que puede, para que todo se ejecute tan rápido como sea posible. Esto es más rápido que ejecutar las tasks de una en una, y forma parte de lo que hace que Turborepo sea tan rápido.

Por ejemplo, `yarn workspaces run lint && yarn workspaces run build && yarn workspaces run test` se vería como una ejecución secuencial. La página oficial muestra un diagrama de esa ejecución.

Para hacer el mismo trabajo más rápido con Turborepo, puedes usar `turbo run lint build test`. La página oficial muestra el diagrama de esa ejecución en paralelo.

### Getting started

El archivo `turbo.json` de la raíz es donde registras las tasks que ejecutará Turborepo. Cuando las tasks estén definidas, podrás ejecutar una o varias con `turbo run`.

- Si empiezas de cero, se recomienda crear un repositorio nuevo con `create-turbo` y editar `turbo.json` para probar los fragmentos de esta guía.
- Si adoptas Turborepo en un repositorio que ya existe, crea un archivo `turbo.json` en la raíz. Lo usarás para conocer el resto de opciones de configuración de esta guía.

Estructura mínima:

- `turbo.json`
- `package.json`
- `apps/`
- `packages/`

### Defining tasks

Cada clave del objeto `tasks` es una task que puede ejecutar `turbo run`. Turborepo busca en tus packages scripts del `package.json` que tengan el mismo nombre que la task.

Para definir una task, usa el objeto `tasks` de `turbo.json`. Por ejemplo, una task básica sin dependencies y sin outputs llamada `build` podría verse así:

```json
{
  "tasks": {
    "build": {}
  }
}
```

Ese ejemplo es incorrecto.

Si en este punto ejecutas `turbo run build`, Turborepo ejecutará todos los scripts `build` de tus packages en paralelo y no cacheará ninguna salida de archivos. Esto lleva rápido a errores. Faltan algunas piezas importantes para que funcione como esperarías.

#### Running tasks in the right order

La clave `dependsOn` especifica las tasks que tienen que terminar antes de que empiece otra task. Por ejemplo, en la mayoría de los casos quieres que el script `build` de tus librerías termine antes de que se ejecute el script `build` de la aplicación. Para eso usarías este `turbo.json`:

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"]
    }
  }
}
```

Ahora tienes el orden de build que esperarías: se construyen las dependencies antes que los dependientes.

Pero cuidado. En este punto no has marcado las salidas del build para caching. Para hacerlo, pasa a la sección Specifying `outputs`.

##### Depending on tasks in dependencies with `^`

La microsyntax `^` le dice a Turborepo que ejecute la task en las dependencies directas antes que en el package objetivo. Si tu aplicación depende de una librería llamada `ui` y la librería tiene una task `build`, el script `build` de `ui` se ejecuta primero. Cuando termina con éxito, se ejecuta la task `build` de la aplicación.

Es un patrón importante porque garantiza que la task `build` de la aplicación tenga todas las dependencies necesarias para compilar. El mismo concepto se aplica cuando el grafo de dependencies crece hacia una estructura más compleja, con muchos niveles de dependencies de tasks.

##### Depending on tasks in the same package

A veces necesitas que dos tasks del mismo package se ejecuten en un orden concreto. Por ejemplo, puede que necesites ejecutar una task `build` en tu librería antes de una task `test` en la misma librería. Para eso, indica el script en `dependsOn` como un string plano, sin `^`.

```json
{
  "tasks": {
    "test": {
      "dependsOn": ["build"]
    }
  }
}
```

##### Depending on a specific task in a specific package

También puedes indicar que se dependa de una task concreta de un package concreto. En el ejemplo de abajo, la task `build` de `utils` tiene que ejecutarse antes que cualquier task `lint`.

```json
{
  "tasks": {
    "lint": {
      "dependsOn": ["utils#build"]
    }
  }
}
```

También puedes ser más específico con la task dependiente y limitarla a un package:

```json
{
  "tasks": {
    "web#lint": {
      "dependsOn": ["utils#build"]
    }
  }
}
```

Con esta configuración, la task `lint` del package `web` solo puede ejecutarse después de que termine la task `build` del package `utils`.

##### No dependencies

Algunas tasks pueden no tener dependencies. Por ejemplo, una task para encontrar erratas en archivos Markdown probablemente no necesita saber el estado de las demás tasks. En ese caso puedes omitir la clave `dependsOn` o pasar un array vacío.

```json
{
  "tasks": {
    "spell-check": {
      "dependsOn": []
    }
  }
}
```

### Specifying `outputs`

> Turborepo cachea los outputs de tus tasks para que no hagas el mismo trabajo dos veces. Esto se trata en profundidad en la guía de Caching, pero primero hay que dejar las tasks bien configuradas.

La clave `outputs` le dice a Turborepo qué archivos y directorios debe cachear cuando la task termina con éxito. Sin esta clave, Turborepo no cachea ningún archivo. Un cache hit en ejecuciones posteriores no restaurará ninguna salida de archivos.

Abajo hay algunos ejemplos de outputs para herramientas habituales.

#### Next.js

```json
{
  "tasks": {
    "build": {
      "outputs": [".next/**", "!.next/cache/**", "!.next/dev/**"]
    }
  }
}
```

#### Vite

```json
{
  "tasks": {
    "build": {
      "outputs": ["dist/**"]
    }
  }
}
```

#### tsc

```json
{
  "tasks": {
    "build": {
      "outputs": ["dist/**"]
    }
  }
}
```

Los globs son relativos al package, así que `dist/**` cubre el `dist` que produce cada package. Para construir patrones de glob de la clave `outputs`, consulta la especificación de globbing.

### Specifying `inputs`

La clave `inputs` especifica los archivos que quieres incluir en el hash de la task para el caching. Por defecto, Turborepo incluye todos los archivos del package que Git tiene bajo seguimiento. Puedes ser más específico sobre qué archivos entran en el hash usando `inputs`.

Por ejemplo, una task para encontrar erratas en archivos Markdown podría definirse así:

```json
{
  "tasks": {
    "spell-check": {
      "inputs": ["**/*.md", "**/*.mdx"]
    }
  }
}
```

Ahora, solo los cambios en archivos Markdown harán que la task `spell-check` haga cache miss.

> Esta funcionalidad deja fuera todo el comportamiento por defecto de `inputs` de Turborepo, incluido el seguimiento de los cambios del control de código fuente. Eso significa que tu archivo `.gitignore` deja de respetarse, y tienes que asegurarte de que tus globs no capturen esos archivos.
>
> Para recuperar el comportamiento por defecto, usa la microsyntax `$TURBO_DEFAULT$`.

#### Restoring defaults with `$TURBO_DEFAULT$`

El comportamiento por defecto de `inputs` suele ser el que quieres para tus tasks. Aun así, puedes subir la proporción de cache hits de ciertas tasks afinando `inputs` para ignorar cambios en archivos que se sabe que no afectan a la salida de la task.

Por eso puedes usar la microsyntax `$TURBO_DEFAULT$` para afinar el comportamiento por defecto de `inputs`:

```json
{
  "tasks": {
    "build": {
      "inputs": ["$TURBO_DEFAULT$", "!README.md"]
    }
  }
}
```

En esta definición, Turborepo usa el comportamiento por defecto de `inputs` para la task `build`, pero ignora los cambios del archivo `README.md`. Si cambia `README.md`, la task sigue haciendo cache hit.

#### Deferred hashing

Algunas tasks necesitan hacer hash de archivos que crea otra task en la misma ejecución. Usa `inputs` estructurados con `mode: "jit"` o `mode: "dependencyOutputs"` para aplazar el hashing hasta que las dependencies de la task hayan terminado.

### Registering Root Tasks

También puedes ejecutar scripts del `package.json` de la raíz del Workspace con `turbo`. Por ejemplo, puede que quieras una task `lint:root` para los archivos del directorio raíz del Workspace, además de la task `lint` de cada package.

#### `turbo.json`

```json
{
  "tasks": {
    "lint": {
      "dependsOn": ["^lint"]
    },
    "//#lint:root": {}
  }
}
```

#### `package.json`

```json
{
  "scripts": {
    "lint": "turbo run lint lint:root",
    "lint:root": "eslint ."
  }
}
```

Con la Root Task registrada, puedes usar `turbo run lint:root` desde la raíz, o `turbo run //#lint:root` en cualquiera de los workspaces, para ejecutar la task. También puedes ejecutar `turbo run lint lint:root` para lanzar todas las tasks de lint.

#### When to use Root Tasks

- Lint y formato de la raíz del Workspace: puede haber código en la raíz que quieras revisar y formatear. Por ejemplo, ejecutar ESLint o Prettier en el directorio raíz.
- Migración incremental: mientras migras a Turborepo, puede haber un paso intermedio con scripts que todavía no has movido a packages. En ese caso puedes crear una Root Task para empezar la migración y repartir las tasks hacia los packages más adelante.
- Scripts sin ámbito de package: puede haber scripts que no tienen sentido en el contexto de packages concretos. Esos scripts pueden registrarse como Root Tasks para seguir ejecutándolos con `turbo` por caching, paralelización y workflow.

### Advanced use cases

#### Using Package Configurations

Las Package Configurations son archivos `turbo.json` colocados directamente en un package. Permiten que un package defina un comportamiento concreto para sus propias tasks sin afectar al resto del repositorio.

En monorepos grandes con muchos equipos, esto da a los equipos más control sobre sus tasks. Para saber más, visita la documentación de Package Configurations.

#### Composing configurations

Las Package Configurations se pueden componer para tener más control con menos configuración:

- Extender desde otros packages: crea packages de configuración compartida de los que varios packages puedan extender, y así compartir configuraciones de `turbo.json`.
- Añadir a configuraciones extendidas: usa la microsyntax `$TURBO_EXTENDS$` para añadir valores a arrays heredados como `outputs` y `env`, en lugar de reemplazarlos.

#### Long-running tasks with runtime dependencies

Puede que tengas una task de larga duración que necesite que otra task esté siempre en ejecución al mismo tiempo. Para eso, usa la clave `with`.

```json
{
  "tasks": {
    "dev": {
      "with": ["api#dev"],
      "persistent": true,
      "cache": false
    }
  }
}
```

Una task de larga duración nunca termina, así que no puedes depender de ella. En su lugar, la palabra clave `with` ejecuta la task `api#dev` siempre que se ejecuta la task `web#dev`.

#### Performing side-effects

Algunas tasks deben ejecutarse siempre, pase lo que pase, como un script de despliegue después de un build cacheado. Para esas tasks, añade `"cache": false` a la definición.

```json
{
  "tasks": {
    "deploy": {
      "dependsOn": ["^build"],
      "cache": false
    },
    "build": {
      "outputs": ["dist/**"]
    }
  }
}
```

#### Dependent tasks that can be run in parallel

Algunas tasks pueden ejecutarse en paralelo aunque dependan de otros packages. Un ejemplo son los type checkers, porque un type checker no necesita esperar a las salidas de las dependencies para ejecutarse con éxito.

Por eso puede tentarte definir la task `check-types` así:

```json
{
  "tasks": {
    "check-types": {}
  }
}
```

Ese ejemplo es incorrecto.

Esto ejecuta las tasks en paralelo, pero no tiene en cuenta los cambios de código fuente en las dependencies. Eso significa que puedes:

1. Hacer un cambio que rompe la interfaz de tu package `ui`.
2. Ejecutar `turbo check-types` y obtener un cache hit en un application package que depende de `ui`.

Eso es incorrecto: el application package mostrará un cache hit correcto en apariencia, aunque no se haya actualizado para usar la interfaz nueva. Revisar a mano los errores de TypeScript de ese application package en el editor probablemente revelará errores.

Por eso se hace un cambio pequeño en la definición de `check-types`:

```json
{
  "tasks": {
    "check-types": {
      "dependsOn": ["^check-types"]
    }
  }
}
```

Esto funciona, pero podría ser más rápido.

Si vuelves a probar cambios que rompen el package `ui`, verás que el comportamiento de caching ahora es correcto. Sin embargo, las tasks ya no se ejecutan en paralelo.

Para cumplir los dos requisitos (corrección y paralelismo), puedes introducir Transit Nodes en el Task Graph:

```json
{
  "tasks": {
    "transit": {
      "dependsOn": ["^transit"]
    },
    "check-types": {
      "dependsOn": ["transit"]
    }
  }
}
```

Estos Transit Nodes crean una relación entre las dependencies de packages usando una task que no hace nada, porque no coincide con ningún script de ningún `package.json`. Gracias a eso, las tasks pueden ejecutarse en paralelo y a la vez enterarse de los cambios de sus internal dependencies.

> En este ejemplo se usa el nombre `transit`, pero puedes llamar a la task como quieras, siempre que no sea ya un script del Workspace.

### Next steps

Hay más opciones en la documentación de Configuring `turbo.json`, que se irán viendo en las guías siguientes. De momento, puedes empezar a ejecutar algunas tasks para ver cómo funcionan las bases.

---

## Running tasks

Fuente: https://turborepo.dev/docs/crafting-your-repository/running-tasks

Turborepo optimiza los workflows de desarrollo del repositorio paralelizando y cacheando tasks de forma automática. Cuando una task está registrada en `turbo.json`, tienes un conjunto de herramientas nuevo para ejecutar los scripts del repositorio:

- Usa `scripts` en `package.json` para las tasks que necesitas ejecutar a menudo.
- Usa `turbo` global para ejecutar rápido tasks personalizadas bajo demanda.
- Filtra tasks por directorios, nombres de package, cambios del control de código fuente y más.

Ejecutar tasks a través de `turbo` es potente porque obtienes un único modelo para ejecutar workflows en todo el repositorio, tanto en desarrollo como en los pipelines de CI.

### Using `scripts` in `package.json`

Para las tasks que ejecutas con frecuencia, puedes escribir los comandos de `turbo` directamente en el `package.json` de la raíz.

```jsonc
// ./package.json
{
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint"
  }
}
```

> `turbo` es un alias de `turbo run`, pero se recomienda usar `turbo run` en `package.json` y en los workflows de CI para evitar colisiones con posibles subcomandos de `turbo` que puedan añadirse en el futuro.

Estos scripts se ejecutan después con el package manager.

#### pnpm

```bash
pnpm dev
```

#### yarn

```bash
yarn dev
```

#### npm

```bash
npm run dev
```

#### bun

```bash
bun run dev
```

#### nub

```bash
nub run dev
```

#### aube

```bash
aube run dev
```

> Solo quieres escribir comandos de `turbo` en el `package.json` de la raíz. Escribir comandos de `turbo` en el `package.json` de los packages puede llevar a llamar a `turbo` de forma recursiva.

### Using global `turbo`

Instalar `turbo` de forma global permite ejecutar comandos directamente desde la terminal. Mejora la experiencia de desarrollo local porque es más fácil ejecutar exactamente lo que necesitas, cuando lo necesitas.

Además, `turbo` global es útil en los pipelines de CI: te da el máximo control sobre qué tasks ejecutar en cada punto del pipeline.

#### Automatic Package Scoping

Cuando estás en el directorio de un package, `turbo` limita automáticamente los comandos al Package Graph de ese package. Puedes escribir comandos rápido sin tener que escribir filters para el package.

```bash
cd apps/docs
turbo build
```

En el ejemplo de arriba, `turbo build` ejecuta la task `build` del package `docs` usando la task `build` registrada en `turbo.json`.

> Usar un filter anula el Automatic Package Scoping.

#### Customizing behavior

En la documentación del subcomando `run` hay muchas flags útiles para adaptar el comportamiento de `turbo run` a lo que necesitas. Cuando ejecutas `turbo` global, puedes ir más rápido con workflows como estos:

- Variaciones de tus comandos más habituales: el script `build` de `package.json` tiene más utilidad cuando es `turbo build`, pero en un momento dado puede interesarte solo un package concreto. Puedes filtrar rápido el package que te interesa con `turbo build --filter=@repo/ui`.
- Comandos puntuales: comandos como `turbo build --dry` no se necesitan a menudo, así que lo normal es no crear un script en `package.json` para ellos. Puedes ejecutarlos directamente en la terminal cuando hagan falta.
- Sobrescribir la configuración de `turbo.json`: algunas flags de la CLI tienen un equivalente en `turbo.json` que puedes sobrescribir. Por ejemplo, puede que tengas un comando `turbo build` configurado con `"outputLogs": "full"` en `turbo.json`, pero en ese momento solo te interesan los errores. Con `turbo` global puedes usar `turbo lint --output-logs=errors-only` para mostrar solo los errores.

### Running multiple tasks

`turbo` puede ejecutar varias tasks y paralelizar siempre que sea posible.

```bash
turbo run build test lint check-types
```

Este comando ejecuta todas las tasks y detecta automáticamente dónde puede lanzar un script tan pronto como sea posible, según tus definiciones de tasks.

> Orden de las tasks:
>
> `turbo test lint` ejecuta las tasks exactamente igual que `turbo lint test`.
>
> Si quieres que una task bloquee la ejecución de otra, expresa esa relación en la configuración de las tasks.

### Using filters

El caching hace que el repositorio siga siendo rápido porque no se repite el mismo trabajo. Además, puedes filtrar tasks para ejecutar solo un subconjunto del Task Graph.

Hay muchos casos de uso avanzados de filtrado en la referencia de la API de `--filter`. Abajo se tratan los más habituales.

#### Filtering by package

Filtrar por package es una forma simple de ejecutar tasks solo en los packages en los que estás trabajando.

```bash
turbo build --filter=@acme/web
```

También puedes filtrar a una task concreta del package directamente en el comando de la CLI, sin usar `--filter`:

```bash
# Ejecuta la task `build` del package `web`
turbo run web#build

# Ejecuta la task `build` del package `web` y la task `lint` del package `docs`
turbo run web#build docs#lint
```

#### Filtering by directory

El repositorio puede tener una estructura de directorios donde los packages relacionados están agrupados. En ese caso puedes capturar el glob de ese directorio para centrar `turbo` en esos packages.

```bash
turbo lint --filter="./packages/utilities/*"
```

#### Filtering to include dependents

Cuando trabajas en un package concreto, puede que quieras ejecutar tasks para ese package y sus dependents. La microsyntax `...` es útil cuando haces cambios en un package y quieres asegurarte de que no rompen a ninguno de sus dependents.

```bash
turbo build --filter=...ui
```

#### Filtering to include dependencies

Para limitar el alcance a un package y sus dependencies, añade `...` al nombre del package. Esto ejecuta la task del package indicado y de todos los packages de los que depende.

```bash
turbo dev --filter=web...
```

#### Filtering by source control changes

Usar filters para ejecutar tasks según los cambios del control de código fuente es una buena forma de lanzar tasks solo en los packages afectados por tus cambios. Los filters de control de código fuente tienen que ir entre `[]`.

- Comparar con el commit anterior: `turbo build --filter=[HEAD^1]`
- Comparar con la rama main: `turbo build --filter=[main...my-feature]`
- Comparar commits concretos usando SHAs: `turbo build --filter=[a1b2c3d...e4f5g6h]`
- Comparar commits concretos usando nombres de rama: `turbo build --filter=[your-feature...my-feature]`

> En general puedes confiar en el caching para mantener el repositorio rápido. Cuando usas Remote Caching, puedes contar con cache hits en los packages que no han cambiado.

#### Combining filters

Para más precisión, puedes combinar filters y afinar los entrypoints del Task Graph.

```bash
turbo build --filter=...ui --filter={./packages/*} --filter=[HEAD^1]
```

Varios filters se combinan como una unión: el Task Graph incluirá las tasks que coincidan con cualquiera de los filters. Para un uso avanzado de los filters, consulta la referencia de la API de `--filter`.

### Next steps

Cuando empieces a ejecutar tasks en el repositorio, puede que notes que se vuelven más rápidas. A continuación se explora el caching y cómo `turbo` hace que no repitas el mismo trabajo.

---

## Caching

Fuente: https://turborepo.dev/docs/crafting-your-repository/caching

Turborepo usa caching para acelerar los builds y asegurar que no hagas el mismo trabajo dos veces. Cuando una task es cacheable, Turborepo restaura los resultados de la task desde la cache usando un fingerprint de la primera vez que se ejecutó.

La página oficial muestra un ejemplo de terminal con un cache hit **FULL TURBO**. El tiempo total para restaurar esas tasks desde la cache es de 80 milisegundos.

El caching de Turborepo produce un ahorro de tiempo importante en local, y es todavía más potente cuando Remote Caching está activado, porque comparte una cache entre todo el equipo y CI.

En esta página aprenderás:

- Cómo conseguir tu primer cache de Turborepo.
- Cómo activar Remote Caching.
- Qué usa Turborepo como inputs y outputs de un hash.
- Cómo diagnosticar problemas de caching.

> Turborepo asume que tus tasks son deterministas. Si una task puede producir outputs distintos a partir del conjunto de inputs que Turborepo conoce, el caching puede no funcionar como se espera.

### Hit your first Turborepo cache

Puedes probar el comportamiento de caching de Turborepo en tres pasos.

#### 1. Create a new Turborepo project

Usa `npx create-turbo@latest` y sigue las indicaciones para crear un Turborepo nuevo.

```bash
npx create-turbo@latest
```

#### 2. Run a build for the first time

Si tienes `turbo` instalado de forma global, ejecuta `turbo build` en el repositorio.

Como alternativa, puedes ejecutar el script `build` de `package.json` con el package manager.

#### pnpm

```bash
pnpm run build
```

#### yarn

```bash
yarn build
```

#### npm

```bash
npm run build
```

#### bun

```bash
bun run build
```

#### nub

```bash
nub run build
```

#### aube

```bash
aube run build
```

Esto produce un cache miss, porque nunca habías ejecutado `turbo` con este conjunto de inputs en este repositorio. Los inputs se convierten en un hash que se busca en la cache del sistema de archivos local o en la Remote Cache.

#### 3. Hit the cache

Vuelve a ejecutar `turbo build`. Verás un mensaje como el del ejemplo de la documentación.

Como el fingerprint de los inputs ya está en la cache, no hay razón para reconstruir las aplicaciones desde cero. Puedes restaurar los resultados del build anterior desde la cache, y ahorrar recursos y tiempo.

### Remote Caching

Turborepo guarda los resultados de las tasks en el directorio `.turbo/cache` de tu máquina. Puedes hacer que toda la organización vaya todavía más rápido compartiendo esa cache con tus compañeros y con CI.

Para saber más sobre Remote Caching y sus beneficios, visita la página de Remote Caching.

#### Enabling Remote Cache

Primero, autentícate con tu proveedor de Remote Cache:

```bash
npx turbo login
```

Después, vincula el repositorio de tu máquina a Remote Cache:

```bash
npx turbo link
```

Ahora, cuando ejecutes una task, Turborepo enviará automáticamente los outputs de la task a Remote Cache. Si ejecutas la misma task en otra máquina que también esté autenticada en tu Remote Cache, hará cache hit la primera vez que ejecute la task.

Para conectar las máquinas de CI a Remote Cache, visita la guía Constructing CI.

> Por defecto, Turborepo usa Vercel Remote Cache sin configuración. Si quieres usar otra Remote Cache, visita la documentación de la Remote Caching API.

### Git Worktree Cache Sharing

Cuando trabajas con Git worktrees, Turborepo comparte automáticamente la cache del sistema de archivos local entre el worktree principal y cualquier worktree enlazado. Esto permite:

- Cache hits entre ramas: el trabajo hecho en una rama está disponible cuando cambias a otra rama en un worktree distinto.
- Menos uso de disco: evita entradas de cache duplicadas entre worktrees.
- Iteración más rápida: cambiar entre feature branches se beneficia de la cache que ya existe.

#### How it works

Los Git worktrees permiten tener varios directorios de trabajo unidos al mismo repositorio, cada uno con una rama distinta. Cuando creas un worktree enlazado con `git worktree add`, Turborepo detecta esa configuración y redirige automáticamente la cache al directorio `.turbo/cache` del worktree principal.

```bash
# Crea un worktree enlazado para una feature branch
git worktree add ../my-feature feature-branch

# Ejecuta turbo en el worktree enlazado: la cache se comparte con el worktree principal
cd ../my-feature
turbo build
```

Cuando el uso compartido de la cache del worktree está activo, verás un mensaje en la salida:

```text
• Remote caching enabled, using shared worktree cache
```

> Si defines un `cacheDir` explícito en `turbo.json`, el uso compartido de la cache entre worktrees se desactiva y cada worktree usará su propio directorio de cache, el que hayas indicado.

> Outputs que contienen rutas absolutas:
>
> Los artifacts de la cache se restauran sin reescribir su contenido. Si el output de una task contiene la ruta absoluta de su worktree, compartir ese artifact puede restaurar un output que apunta a otro checkout. Define un `cacheDir` explícito, como `.turbo/cache`, para mantener la cache local aislada en cada worktree.

#### With Remote Caching

El uso compartido de la cache entre Git worktrees funciona junto con Remote Caching. Cuando ambos están activados:

- La cache local se comparte entre los worktrees de la misma máquina.
- La cache remota se comparte entre todas las máquinas y CI.

Eso significa que una task construida en un worktree puede restaurarse al instante desde la cache local compartida en otro worktree, sin una petición de red. Si la cache local no tiene el artifact, Turborepo recurre a Remote Cache como de costumbre.

### What gets cached?

Turborepo cachea dos tipos de outputs: Task outputs y Logs.

#### Task outputs

Turborepo cachea las salidas de archivos de una task que están definidas en la clave `outputs` de `turbo.json`. Cuando hay un cache hit, Turborepo restaura los archivos desde la cache.

La clave `outputs` es opcional. Consulta la referencia de la API para ver cómo se comporta Turborepo en ese caso.

> Proporcionar salidas de archivos:
>
> Si no declaras salidas de archivos para una task, Turborepo no las cachea. Puede estar bien para algunas tasks (como los linters), pero muchas tasks producen archivos que querrás cachear.
>
> Si te encuentras errores porque faltan archivos cuando hay un cache hit, asegúrate de haber definido los outputs de la task.

#### Logs

Turborepo siempre captura las salidas de terminal de tus tasks y restaura esos logs en la terminal desde la primera vez que se ejecutó la task.

Puedes configurar el nivel de detalle de los logs que se reproducen con la flag `--output-logs` o con la opción de configuración `outputLogs`.

### Task inputs

Turborepo hace hash de los inputs y crea un "fingerprint" de la ejecución de la task. Cuando los "fingerprints" coinciden, ejecutar la task produce un cache hit.

Por debajo, Turborepo crea dos hashes: un global hash y un task hash. Si cambia cualquiera de los dos, la task hace cache miss.

#### Global hash inputs

| Input | Ejemplo |
| --- | --- |
| Definición de task resuelta a partir del `turbo.json` raíz y del `turbo.json` del package | Cambiar `outputs` en el `turbo.json` raíz o en una Package Configuration |
| Cambios del lockfile que afectan a la raíz del Workspace | Actualizar dependencies en el `package.json` raíz hace que todas las tasks hagan cache miss |
| Archivos fuente de internal packages usados por la raíz del Workspace | Si el `package.json` raíz depende de `@repo/tooling`, cambiar `packages/tooling/src/index.ts` hace que todas las tasks hagan cache miss |
| Contenido de los archivos de `globalDependencies` | Cambiar `./.env` cuando está listado en `globalDependencies` hace que todas las tasks hagan cache miss |
| Valores de las variables listadas en `globalEnv` | Cambiar el valor de `GITHUB_TOKEN` cuando está listado en `globalEnv` |
| Valores de flags que afectan al runtime de la task | Usar flags que cambian el comportamiento, como `--cache-dir`, `--framework-inference` o `--env-mode` |
| Argumentos arbitrarios que se pasan a través | `turbo build -- --arg=value` hace que todas las tasks hagan cache miss si se compara con `turbo build` o con `turbo build -- --arg=diff` (incluidas las dependencies de `build` que no recibieron `--arg=value`) |

##### Root workspace dependencies

Turborepo incluye en el global hash los archivos fuente de cada internal workspace package del que depende el `package.json` raíz, de forma directa o transitiva. Así las entradas de cache siguen siendo correctas cuando los scripts o el tooling de la raíz usan esos packages.

Por ejemplo, si el package raíz depende de `@repo/tooling`, cambiar un archivo fuente de `@repo/tooling` hace que cada task cacheable haga cache miss. Un cambio en un internal package que queda fuera de ese cierre de dependencies de la raíz solo cambia los hashes del package y de la task que correspondan.

Al comparar revisiones de Git, `turbo query affected --packages` informa de este resultado de todo el repositorio con la razón `RootInternalDepChanged`. Consulta Understanding affected-package reasons para los tipos de razón del diagnóstico.

#### Package hash inputs

| Input | Ejemplo |
| --- | --- |
| Cambios de Package Configuration | Cambiar el `turbo.json` de un package |
| Cambios del lockfile que afectan al package | Actualizar dependencies en el `package.json` de un package |
| Cambios del `package.json` del package | Actualizar el campo `name` del `package.json` de un package |
| Cambios de archivos | Por defecto, todos los archivos bajo control de código fuente del directorio del package. Se configura con `inputs` |

### Troubleshooting

#### Using dry runs

Turborepo tiene una flag `--dry` para ver qué pasaría si ejecutaras una task, sin ejecutarla de verdad. Es útil para depurar problemas de caching cuando no tienes claro qué tasks se están ejecutando.

Para más detalle, visita la referencia de la API de `--dry`.

#### Using Run Summaries

Turborepo tiene una flag `--summarize` para obtener una visión de todos los inputs, outputs y más de una task. Comparar dos summaries muestra por qué los hashes de dos tasks son distintos. Sirve para:

- Depurar inputs: una task de Turborepo tiene muchos inputs. Si una task hace cache miss cuando esperas un cache hit, un Run Summary permite ver qué inputs son distintos y no te lo esperabas.
- Depurar outputs: si los cache hits no restauran los archivos que esperas, un Run Summary ayuda a entender qué outputs se están restaurando desde la cache.

> Visor de summaries:
>
> No hay un visor de UI nativo de Turborepo para Run Summaries, pero hay varias herramientas de la comunidad:
>
> - https://turbo.nullvoxpopuli.com — visor de UI en la web para Run Summaries.
> - `turborepo-summary` — genera informes legibles a partir de la salida JSON del run summary de Turborepo.
> - `turborepo-summary-action` — GitHub Action que envuelve `turborepo-summary` para añadirlos al Job Summary de GitHub Actions.

#### Turning off caching

A veces no quieres escribir la salida de las tasks en la cache. Puede fijarse de forma permanente para una task con `"cache": false`, o para una ejecución completa con la flag `--cache`.

#### Overwriting a cache

Si quieres forzar a `turbo` a volver a ejecutar una task que ya está cacheada, usa la flag `--force`. Esto desactiva la lectura de la cache, no la escritura.

#### Caching a task is slower than executing the task

Es posible crear situaciones en las que cachear acaba siendo más lento que no cachear. Son casos poco frecuentes. Algunos ejemplos:

- Tasks que se ejecutan extremadamente rápido: si una task se ejecuta más rápido que un viaje de ida y vuelta por la red hasta Remote Cache, conviene plantearse no cachear la task.
- Tasks cuyos assets de salida son enormes: es posible crear un artifact tan grande que el tiempo de subirlo o descargarlo supere el tiempo de regenerarlo, como un Docker Container completo. En esos casos conviene plantearse no cachear la task.
- Scripts que tienen su propio caching: algunas tasks tienen su propio comportamiento interno de caching. En esos casos, la configuración puede complicarse rápido para hacer que la cache de Turborepo y la cache de la aplicación trabajen juntas.

Aunque estas situaciones son poco frecuentes, prueba el comportamiento de tus proyectos para decidir si desactivar el caching en sitios concretos aporta un beneficio de rendimiento.

### Next steps

Ahora que has visto cómo el caching de Turborepo hace más rápido el repositorio, el siguiente paso es ver cómo desarrollar aplicaciones y librerías en tu Turborepo.

---

## Developing applications

Fuente: https://turborepo.dev/docs/crafting-your-repository/developing-applications

Desarrollar aplicaciones en un monorepo abre workflows potentes: puedes hacer commits atómicos en el control de código fuente y tener acceso fácil al código.

La mayoría de las tareas de desarrollo son tasks de larga duración que observan los cambios del código. Turborepo mejora esa experiencia con una terminal UI potente y otras capacidades como:

- Configuración de tasks `dev`.
- Interactuar con las tasks.
- Watch Mode.
- Ejecutar scripts de setup.
- Filtrar tasks para ejecutar un subconjunto de tus packages.

### Configuring development tasks

Definir una task de desarrollo en `turbo.json` le dice a Turborepo que vas a ejecutar una task de larga duración. Sirve para cosas como un servidor de desarrollo, tests o construir la aplicación.

Para registrar una task `dev`, añádela a `turbo.json` con dos propiedades:

```json
// ./turbo.json
{
  "tasks": {
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

- `"cache": false`: le dice a Turborepo que no intente cachear los resultados de la task. Como es una task de desarrollo, lo normal es que cambies el código con frecuencia, así que cachear los resultados no es útil.
- `"persistent": true`: le dice a Turborepo que mantenga la task en ejecución hasta que la pares. Esta clave es una señal para la terminal UI: trata la task como de larga duración e interactiva. Además, evita que dependas por accidente de una task que no va a terminar.

Ya puedes ejecutar la task `dev` para arrancar los scripts de desarrollo en paralelo:

```bash
turbo dev
```

#### Running setup tasks before `dev`

También puede que quieras ejecutar scripts que preparan el entorno de desarrollo o preconstruyen packages. Puedes asegurarte de que esas tasks se ejecuten antes de la task `dev` con `dependsOn`:

```json
// ./turbo.json
{
  "tasks": {
    "dev": {
      "cache": false,
      "persistent": true,
      "dependsOn": ["//#dev:setup"]
    },
    "//#dev:setup": {
      "outputs": [".codegen/**"]
    }
  }
}
```

En este ejemplo se usa una Root Task, pero la misma idea vale para tasks arbitrarias en packages.

#### Running a specific application

La flag `--filter` permite elegir un subconjunto del Package Graph para ejecutar la task `dev` de una aplicación concreta y de sus dependencies:

```bash
turbo dev --filter=web
```

### Using the terminal UI

La terminal UI de Turborepo habilita varias funcionalidades que crean una experiencia muy interactiva alrededor de tus tasks.

#### Customizing your view

Puedes ajustar la UI rápido a lo que necesitas con keybinds.

| Keybind | Acción |
| --- | --- |
| `m` | Alterna el popup que lista los keybinds |
| `↑` / `↓` | Selecciona la task siguiente o anterior de la lista de tasks |
| `j` / `k` | Selecciona la task siguiente o anterior de la lista de tasks |
| `p` | Alterna el pinning de la selección para la task seleccionada |
| `h` | Alterna la visibilidad de la lista de tasks |
| `c` | Cuando los logs están resaltados, copia la selección al portapapeles del sistema |
| `u` / `d` | Desplaza los logs: `u` hacia arriba y `d` hacia abajo |

#### Interacting with tasks

Algunas herramientas permiten escribir entrada en ellas. Ejemplos: las migraciones interactivas de Drizzle ORM, o el filtrado y la reejecución de suites de tests de Jest.

Puedes interactuar con las tasks marcadas como interactive para darles entrada.

| Keybind | Acción |
| --- | --- |
| `i` | Empieza a interactuar |
| `Ctrl+z` | Deja de interactuar |

### Watch Mode

Muchas herramientas tienen un watcher integrado, como `tsc --watch`, que responde a los cambios del código fuente. Otras no.

`turbo watch` añade un watcher consciente de las dependencies a cualquier herramienta. Los cambios del código fuente siguen el Task Graph que has descrito en `turbo.json`, igual que el resto de tus tasks.

Por ejemplo, con una estructura de packages como la de `create-turbo` y estas tasks y scripts:

#### `turbo.json`

```json
{
  "tasks": {
    "dev": {
      "persistent": true,
      "cache": false
    },
    "lint": {
      "dependsOn": ["^lint"]
    }
  }
}
```

#### `packages/ui`

```json
{
  "name": "@repo/ui",
  "scripts": {
    "dev": "tsc --watch",
    "lint": "eslint ."
  }
}
```

#### `apps/web`

```json
{
  "name": "web",
  "scripts": {
    "dev": "next dev",
    "lint": "eslint ."
  },
  "dependencies": {
    "@repo/ui": "workspace:*"
  }
}
```

Cuando ejecutas `turbo watch dev lint`, verás que los scripts `lint` se vuelven a ejecutar cada vez que cambias el código fuente, aunque ESLint no tenga un watcher integrado. `turbo watch` también conoce las internal dependencies, así que un cambio de código en `@repo/ui` vuelve a ejecutar la task tanto en `@repo/ui` como en `web`.

El servidor de desarrollo de Next.js en `web` y el watcher integrado del compilador de TypeScript en `@repo/ui` siguen funcionando como siempre, porque están marcados con `persistent`.

Para más información, visita la referencia de `turbo watch`.

### Limitations

#### Teardown tasks

En algunos casos puede que quieras ejecutar un script cuando se para la task `dev`. Turborepo no puede ejecutar esos scripts de teardown al salir, porque `turbo` termina cuando terminan tus tasks `dev`.

En su lugar, crea un script `turbo dev:teardown` que ejecutes aparte, después de haber salido de la task principal `turbo dev`.

### Next steps

Cuando tengas una versión de la aplicación que quieras desplegar, toca aprender a configurar environment variables en Turborepo.

---

## Using environment variables

Fuente: https://turborepo.dev/docs/crafting-your-repository/using-environment-variables

Los inputs de environment variables son una parte vital de tus aplicaciones y tienes que tenerlos en cuenta en la configuración de Turborepo.

Hay tres preguntas importantes al trabajar con environment variables en Turborepo:

- ¿Están mis environment variables contempladas en el hash de la task?
- ¿Qué Environment Mode usará `turbo`?
- ¿He manejado mis archivos `.env`?

> No tener en cuenta las environment variables en la configuración puede hacer que publiques la aplicación con la configuración equivocada. Eso puede causar problemas serios, como publicar tus preview deployments en producción.

> Turborepo también usa System Environment Variables para configurar su propio comportamiento. Abajo está la información sobre las environment variables del runtime de la task y cómo afectan al hashing de la task.

### Adding environment variables to task hashes

Turborepo necesita conocer tus environment variables para tener en cuenta los cambios de comportamiento de la aplicación. Para eso, usa las claves `env` y `globalEnv` de `turbo.json`.

```json
// ./turbo.json
{
  "globalEnv": ["IMPORTANT_GLOBAL_VARIABLE"],
  "tasks": {
    "build": {
      "env": ["MY_API_URL", "MY_API_KEY"]
    }
  }
}
```

- `globalEnv`: los cambios en los valores de cualquier environment variable de esta lista cambian el hash de todas las tasks.
- `env`: incluye los cambios en los valores de las environment variables que afectan a la task, con más granularidad. Por ejemplo, una task `lint` probablemente no necesita hacer cache miss cuando cambia el valor de `API_KEY`, pero una task `build` sí.

> Turborepo soporta wildcards para environment variables, así que puedes contemplar de una vez todas las environment variables con un prefijo dado. Visita la referencia de la API de `env` para más información.

#### Framework Inference

Turborepo añade automáticamente wildcards de prefijo a la clave `env` para frameworks habituales. Si usas uno de los frameworks de abajo en un package, no necesitas especificar las environment variables con esos prefijos:

| Framework | Wildcards de `env` |
| --- | --- |
| Next.js | `NEXT_PUBLIC_*` |
| Vite | `VITE_*` |
| Create React App | `REACT_APP_*` |
| Gatsby | `GATSBY_*` |
| Nuxt | `NUXT_*`, `NUXT_ENV_*` |
| Expo | `EXPO_PUBLIC_*` |
| Astro | `PUBLIC_*` |
| SvelteKit | `PUBLIC_*` |
| Remix | `REMIX_*` |
| SolidStart | `VITE_*` |
| RedwoodJS | `REDWOOD_ENV_*` |
| Sanity | `SANITY_STUDIO_*` |

> Framework Inference es por package.

Si quieres desactivar Framework Inference, puedes hacerlo así:

- Ejecutando las tasks con `--framework-inference=false`.
- Añadiendo un wildcard negativo a la clave `env` (por ejemplo, `"env": ["!NEXT_PUBLIC_*"]`).

### Environment Modes

Los Environment Modes de Turborepo permiten controlar qué environment variables están disponibles para una task en runtime:

- Strict Mode (por defecto): filtra las environment variables y deja solo las especificadas en las claves `env` y `globalEnv` de `turbo.json`.
- Loose Mode: permite que todas las environment variables del proceso estén disponibles.

#### Strict Mode

Strict Mode filtra las environment variables disponibles en el runtime de una task y deja solo las especificadas en las claves `globalEnv` y `env` de `turbo.json`.

Eso significa que las tasks que no contemplan todas las environment variables que necesitan tienen muchas posibilidades de fallar. Eso es bueno: no quieres cachear una task que puede comportarse distinto en un entorno distinto.

> Seguridad de la cache con Strict Mode:
>
> Strict Mode hace mucho más probable que la task falle cuando no has contemplado todas las environment variables, pero no garantiza el fallo de la task. Si la aplicación puede manejar con gracia una environment variable ausente, todavía puedes completar tasks con éxito y obtener cache hits no deseados.

##### Passthrough variables

En casos de uso avanzados, puede que quieras poner algunas environment variables a disposición de una task sin incluirlas en el hash. Los cambios de esas variables no afectan a los outputs de la task, pero aun así tienen que estar disponibles para que la task se ejecute con éxito.

Para esos casos, añade esas environment variables a `globalPassThroughEnv` y `passThroughEnv`.

##### CI vendor compatibility

Strict Mode filtrará las environment variables que vienen de tus proveedores de CI hasta que las hayas contemplado con `env`, `globalEnv`, `passThroughEnv` o `globalPassThroughEnv`.

Si alguna de esas variables es importante para tus tasks y Framework Inference no la incluye, asegúrate de que esté en la configuración de `turbo.json`.

#### Loose Mode

Loose Mode no filtra las environment variables según las claves `globalEnv` y `env`. Hace más fácil empezar una migración incremental hacia Strict Mode.

Usa la flag `--env-mode` para activar Loose Mode en cualquier invocación en la que tus scripts no encuentren environment variables:

```bash
turbo run build --env-mode=loose
```

Mientras la environment variable esté disponible cuando se ejecuta `turbo`, el script podrá usarla. Pero esto también hace mucho más fácil olvidarte por accidente de contemplar una environment variable en la configuración, y permite que la task haga cache hit cuando no debería.

Por ejemplo, puede que tengas código en la aplicación que obtiene datos de una API y usa una environment variable para la URL base:

```ts
// ./apps/web/data-fetcher.ts
const data = fetch(`${process.env.MY_API_URL}/resource/1`);
```

Después construyes la aplicación con un valor de `MY_API_URL` que apunta al entorno de preview. Cuando vas a publicar la aplicación, construyes para producción y ves un cache hit, aunque el valor de la variable `MY_API_URL` ha cambiado. `MY_API_URL` cambió, pero Turborepo restauró desde la cache una versión de la aplicación que usa el `MY_API_URL` del entorno de preview, no el de producción.

Cuando usas Loose Mode, `MY_API_URL` está disponible en el runtime de la task aunque no esté contemplada en el hash de la task. Para que esta task tenga más probabilidades de fallar y protegerte de esta mala configuración, se recomienda optar por Strict Mode.

#### Platform Environment Variables

Cuando despliegas la aplicación en Vercel, lo normal es que ya tengas environment variables configuradas en el proyecto. Turborepo comprueba automáticamente esas variables contra la configuración de `turbo.json` para asegurar que las has contemplado, y avisa de las variables que faltan.

Esta funcionalidad se puede desactivar con `TURBO_PLATFORM_ENV_DISABLED=true`.

### Handling `.env` files

Los archivos `.env` van muy bien para trabajar en una aplicación en local. Turborepo no carga los archivos `.env` en el runtime de la task: los deja en manos del framework, o de herramientas como `dotenv`.

Aun así, es importante que `turbo` conozca los cambios de valores en tus archivos `.env` para poder usarlos en el hashing. Si cambias una variable de tus archivos `.env` entre builds, la task `build` debería hacer cache miss.

Para eso, añade los archivos a la clave `inputs`:

```json
// ./turbo.json
{
  "globalDependencies": [".env"],
  "tasks": {
    "build": {
      "inputs": ["$TURBO_DEFAULT$", ".env"]
    }
  }
}
```

`globalDependencies` afecta a los hashes de todas las tasks. `inputs` de `build` afecta solo al hash de la task `build`.

#### Multiple `.env` files

Puedes capturar varios archivos `.env` a la vez usando `*`.

```json
// ./turbo.json
{
  "globalDependencies": [".env"],
  "tasks": {
    "build": {
      "inputs": ["$TURBO_DEFAULT$", ".env*"]
    }
  }
}
```

> Los archivos `.env` pueden cargar variables en el runtime de la task aunque esas environment variables no se hayan añadido a la clave `env`. Asegúrate de añadir tus environment variables de los builds a la clave `env` para los builds de CI y de producción.

### Best practices

#### Environment variables from dependencies

Cuando una aplicación consume un package que depende de environment variables, esas variables tienen que estar contempladas en `turbo.json` para que la cache sea correcta.

Por ejemplo, si una app llamada `docs` depende de un package `common`, hay dos escenarios para manejar environment variables:

1. La aplicación depende de la task del package. Si la task `build` de la app `docs` depende de la task `build` del package `common` (por ejemplo, `"dependsOn": ["^build"]`), y `common` declara una environment variable en su propio `turbo.json`, Turborepo lo maneja automáticamente. Cambiar la environment variable hace que `common` haga cache miss y se reconstruya, y eso a su vez hace que `docs` se reconstruya por la relación de dependency.
2. La aplicación importa el package directamente, sin un paso de build. Si el package `common` no tiene un paso de build, pero expone variables que la app `docs` usa en tiempo de build (como `process.env.MY_VAR`), la aplicación `docs` tiene que declarar la environment variable directamente en su propia clave `env` o `globalEnv` de su `turbo.json`.

```json
// ./apps/docs/turbo.json
{
  "tasks": {
    "build": {
      "env": ["MY_VAR"]
    }
  }
}
```

#### Use `.env` files in Application Packages

No se recomienda usar un archivo `.env` en la raíz del repositorio. En su lugar, se recomienda colocar los archivos `.env` en los Application Packages donde se usan.

Esta práctica se parece más al comportamiento de runtime de las aplicaciones, porque las environment variables existen en el runtime de cada aplicación por separado. Además, a medida que el monorepo escala, hace más fácil gestionar el entorno de cada aplicación y evita que las environment variables se filtren entre aplicaciones.

> Puede resultar más fácil usar un `.env` en la raíz mientras migras de forma incremental a un monorepo. Herramientas como dotenv pueden cargar archivos `.env` desde distintas ubicaciones. Se recomienda fijar como objetivo no usar un `.env` en la raíz cuando termines la migración.

#### Use `eslint-config-turbo`

El package `eslint-config-turbo` ayuda a encontrar environment variables que se usan en el código y no están listadas en `turbo.json`. Así te aseguras de que todas las environment variables estén contempladas en la configuración.

#### Avoid creating or mutating environment variables at runtime

Turborepo hace hash de las environment variables de la task al principio de la task. Si creas o mutas environment variables durante la task, Turborepo no conocerá esos cambios y no los tendrá en cuenta en el hash de la task.

Por ejemplo, Turborepo no podrá detectar la variable inline del ejemplo de abajo:

```json
// ./apps/web/package.json
{
  "scripts": {
    "dev": "export MY_VARIABLE=123 && next dev"
  }
}
```

`MY_VARIABLE` se añade al entorno después de que ha empezado la task `dev`, así que `turbo` no podrá usarla para el hashing.

### Examples

Abajo hay ejemplos de una configuración correcta de environment variables para algunos frameworks habituales.

#### Next.js

El `turbo.json` de abajo expresa:

- Las tasks `build` y `dev` tendrán hashes distintos cuando cambien `MY_API_URL` y `MY_API_KEY`.
- Las tasks `build` y `dev` incluyen los archivos `.env` soportados por Next.js.
- La task `test` no usa environment variables, así que se omite la clave `env`. Según cómo estén organizados tus tests, la task `test` puede necesitar una clave `env`.

```json
// ./turbo.json
{
  "tasks": {
    "build": {
      "env": ["MY_API_URL", "MY_API_KEY"],
      "inputs": [
        "$TURBO_DEFAULT$",
        ".env.production.local",
        ".env.local",
        ".env.production",
        ".env"
      ]
    },
    "dev": {
      "inputs": [
        "$TURBO_DEFAULT$",
        ".env.development.local",
        ".env.local",
        ".env.development",
        ".env"
      ]
    },
    "test": {}
  }
}
```

#### Vite

El `turbo.json` de abajo expresa:

- Las tasks `build` y `dev` tendrán hashes distintos cuando cambien `MY_API_URL` y `MY_API_KEY`.
- Las tasks `build` y `dev` incluyen los archivos `.env` soportados por Vite.
- La task `test` no usa environment variables, así que se omite la clave `env`. Según cómo estén organizados tus tests, la task `test` puede necesitar una clave `env`.

```json
// ./turbo.json
{
  "tasks": {
    "build": {
      "env": ["MY_API_URL", "MY_API_KEY"],
      "inputs": [
        "$TURBO_DEFAULT$",
        ".env.production.local",
        ".env.local",
        ".env.production",
        ".env"
      ]
    },
    "dev": {
      "inputs": [
        "$TURBO_DEFAULT$",
        ".env.development.local",
        ".env.local",
        ".env.development",
        ".env"
      ]
    },
    "test": {}
  }
}
```

### Troubleshooting

#### Use `--summarize`

La flag `--summarize` se puede añadir al comando `turbo run` para producir un archivo JSON que resume datos de la task. Revisar el diff de las claves `globalEnv` y `env` ayuda a identificar environment variables que pueden faltar en la configuración.

### Next steps

Cuando hayas contemplado las environment variables, ya puedes empezar a construir los pipelines de CI que construyen, comprueban y despliegan tus aplicaciones, a la velocidad de `turbo`.

---

## Constructing CI

Fuente: https://turborepo.dev/docs/crafting-your-repository/constructing-ci

Turborepo acelera builds, lints, tests y cualquier otra task que necesites hacer en tus pipelines de Continuous Integration. Con paralelización y Remote Caching, Turborepo hace que CI sea mucho más rápido.

Para ejemplos de cómo conectar tu proveedor de CI a Remote Cache y ejecutar tasks, visita las guías de CI.

### Enabling Remote Caching

Para activar Remote Caching en CI, configura las environment variables para que Turborepo acceda a tu Remote Cache.

| Environment Variable | Descripción |
| --- | --- |
| `TURBO_TOKEN` | El Bearer token para acceder a Remote Cache |
| `TURBO_TEAM` | El nombre de cuenta asociado a tu repositorio. Cuando usas Vercel Remote Cache, es el slug de tu equipo |

Cuando ejecutas tasks a través de `turbo`, CI podrá hacer cache hit y los pipelines irán más rápido.

> Alojamiento de Remote Cache:
>
> El CI/CD integrado de Vercel se conecta automáticamente a tu Vercel Remote Cache gestionada, sin configuración. Para obtener un token y conectar otros proveedores de CI a Vercel Remote Cache, visita la documentación de Vercel Remote Cache.
>
> Para opciones de Remote Cache self-hosted, visita la documentación de Remote Cache de Turborepo.

### Running tasks in CI

Si instalas `turbo` de forma global en tus máquinas de desarrollo y de CI, puedes usar un único modelo mental para ejecutar todo el repositorio, desde el desarrollo hasta el ship. Las tasks que has registrado en `turbo.json` funcionan exactamente igual en CI.

- Para más información sobre cómo configurar tasks, visita la página Configuring Tasks.
- Para ejemplos de cómo ejecutar tasks en CI, visita las guías de CI.

#### Filtering for entry points

Puedes filtrar las tasks con la flag `--filter` exactamente igual que cuando trabajas con `turbo` en local. En CI se soporta filtrar por packages, directorios e historial de Git.

> Usar el historial de Git en CI:
>
> Filtrar usando cambios del control de código fuente solo es posible cuando el historial está disponible en la máquina. Si usas shallow clones, el historial no estará disponible.

También puedes usar la flag `--affected` para ejecutar tasks solo en los packages que tienen cambios.

### Docker

Docker es una parte importante de muchos pipelines de despliegue. El subcomando `prune` de Turborepo ayuda a publicar imágenes ligeras quitando de las imágenes las dependencies y el código que no hacen falta.

Para saber más sobre cómo desplegar desde un Turborepo con Docker, visita la guía dedicada de Docker.

### Skipping tasks and other unnecessary work

#### Running only affected tasks

Puedes usar la flag `--affected` para ejecutar solo las tasks que tienen cambios.

```bash
turbo run build --affected
```

Querrás usar esta flag en situaciones como estas:

- Ejecutas muchas tasks en los packages del monorepo y solo quieres ejecutar esas tasks en los packages con cambios de código.
- No usas Remote Cache, pero aun así quieres hacer el mínimo trabajo posible en CI.
- Usas Remote Cache y el repositorio es grande. Al minimizar la cantidad de tasks que se restaurarán desde la cache, hay menos datos que enviar por la red y la restauración de la cache es más rápida.
- Ya usas técnicas avanzadas de filtrado para conseguir un comportamiento parecido. Lo más probable es que puedas simplificar tus scripts con esta flag. `--affected` maneja los shallow clones con más gracia que un filtrado a medida, porque recurre a ejecutar todas las tasks.

##### Using `--affected` in GitHub Actions

Los pipelines de CI/CD son un sitio ideal para usar `--affected`. Con `--affected`, Turborepo puede detectar automáticamente que estás ejecutando en GitHub Actions inspeccionando environment variables que define GitHub, como `GITHUB_BASE_REF`.

En el contexto de un PR, eso significa que Turborepo puede determinar qué packages han cambiado entre la rama base del PR y la rama head del PR. Así puedes ejecutar tasks solo para los packages afectados por los cambios del PR.

`GITHUB_BASE_REF` funciona bien en los eventos `pull_request` y `pull_request_target`, pero no está disponible durante los eventos de push normales. En esos casos se usa `GITHUB_EVENT_PATH` para determinar la rama base con la que comparar el commit. En force pushes, y al hacer push de una rama sin commits adicionales, se compara con el padre del primer commit de la rama.

#### Skipping packages with `turbo query affected`

A medida que crecen el codebase y CI, puede que busques más formas de ir todavía más rápido. Hacer cache hit es útil, pero también puedes saltarte trabajo por completo. Con `turbo query affected` puedes saltarte pasos largos de preparación de contenedores, como la instalación de dependencies, que de todas formas acabarían en un cache hit.

##### 1. Checkout the repository

Empieza clonando el repositorio. Hace falta un clone con historial suficiente para las comparaciones: si el checkout es demasiado superficial, todos los packages se considerarán cambiados. Por ejemplo, un clone sin blobs y con historial completo (`git clone --filter=blob:none`, sin `--depth`) da a la comparación el historial que necesita. Con `actions/checkout`, define `filter: blob:none` y `fetch-depth: 0`.

Por defecto, `turbo query affected` compara contra el merge-base con tu rama por defecto.

##### 2. Check if the package is affected

Usa `turbo query affected` para comprobar si un package tiene cambios. El comando escribe JSON que puedes parsear con una herramienta como `jq`.

Comprobar un package:

```bash
affected=$(turbo query affected --packages web)
count=$(echo "$affected" | jq '.data.affectedPackages.length')

if [ "$count" -gt 0 ]; then
  echo "web is affected, proceeding with build"
  # Ejecuta tus pasos de build
else
  echo "web is not affected, skipping"
  exit 0
fi
```

Comprobar una task concreta:

Comprueba si la task `test` del package `docs` está afectada. Esto respeta la configuración de `inputs`, así que solo se tienen en cuenta los cambios de archivos relevantes:

```bash
affected=$(turbo query affected --tasks test --packages docs)
count=$(echo "$affected" | jq '.data.affectedTasks.length')

if [ "$count" -gt 0 ]; then
  echo "docs#test is affected, proceeding"
else
  echo "docs#test is not affected, skipping"
  exit 0
fi
```

Comprobación rápida con `--exit-code`:

Si solo necesitas una señal binaria de "afectado o no", usa `--exit-code` como atajo. Sale con código `1` cuando hay resultados, `0` cuando nada está afectado, o `2` si hay errores:

```bash
turbo query affected --packages web --exit-code
```

##### 3. Handle the result

La salida JSON incluye un campo `length` que dice cuántos packages o tasks están afectados. Cuando `length` es `0`, puedes saltarte con seguridad el resto del pipeline de CI.

La salida también incluye la razón por la que cada package está afectado (por ejemplo, `FileChanged`, `DependencyChanged`), y eso es útil para depurar builds inesperados.

Para más detalle, consulta la referencia de `turbo query affected` y la guía de skipping tasks.

### Best practices

#### Rely on caching

Las capacidades de caching de Turborepo permiten crear pipelines de CI rápidos con poca complejidad. Con Remote Caching y la flag `--filter` para apuntar a packages en los builds, Turborepo se encarga de la detección de cambios en monorepos grandes con poca sobrecarga.

Por ejemplo, CI podría ejecutar estos dos comandos para resolver rápido las comprobaciones de calidad y construir la aplicación objetivo:

- `turbo run lint check-types test`: ejecuta comprobaciones de calidad de todo el repositorio. Los packages que no han cambiado harán cache hit.
- `turbo build --filter=web`: construye el package `web` usando la task `build` que has registrado en `turbo.json`. Si el package `web` o sus dependencies no han cambiado, el build también hará cache hit.

A medida que el codebase escala, puede que encuentres oportunidades más concretas de optimizar CI, pero apoyarse en el caching es un buen punto de partida.

#### Global `turbo` in CI

Usar `turbo` global es cómodo en los workflows de CI: permite ejecutar fácil comandos específicos de CI y aprovechar Automatic Workspace Scoping.

Sin embargo, en algunos casos puedes estar ejecutando comandos o scripts de `turbo` que usan `turbo` antes de instalar los packages con el package manager. Un ejemplo es usar `turbo prune` para crear una imagen de Docker. En esa situación, `turbo` global no podrá usar la versión de `package.json`, porque el binario de esa versión todavía no se ha instalado.

Para los pasos de CI anteriores a la instalación de dependencies, fija el binario standalone a una versión exacta compatible con la dependency `turbo` del repositorio. Define `TURBO_VERSION` al ejecutar el instalador:

##### macOS y Linux

```sh
curl -fsSL https://turborepo.dev/install | TURBO_VERSION=2.11.5 sh
```

##### Windows x64

```powershell
$env:TURBO_VERSION = '2.11.5'
irm https://turborepo.dev/install.ps1 | iex
```

> Las releases standalone empiezan en 2.11.5. Para usar una versión anterior, instálala con el package manager.

#### Use `turbo run` in CI

`turbo run` es el comando más habitual cuando trabajas en tu Turborepo, así que está aliasado a `turbo` por comodidad. Eso va muy bien en local, pero `turbo` tiene otros subcomandos, como `turbo prune` y `turbo generate`.

Se sigue trabajando para mejorar `turbo`, así que en el futuro pueden añadirse más subcomandos. Por eso puedes evitar colisiones de nombres usando `turbo run` en CI.

Por ejemplo, si tienes un comando `turbo deploy` en tus pipelines de CI, puede entrar en conflicto con un posible subcomando `deploy` integrado directamente en la CLI de `turbo`. Para evitarlo, usa `turbo run deploy` en el pipeline de CI.

### Troubleshooting

#### Hitting cache results in broken builds

Si la task pasa cuando hay cache miss pero falla cuando hay cache hit, lo más probable es que no hayas configurado bien la clave `outputs` de la task.

#### Deployment using the wrong environment variables

Si no has definido las claves `env` o `globalEnv` de la task, Turborepo no podrá usarlas al crear los hashes. Eso significa que la task puede hacer cache hit aunque esté en un entorno distinto.

Revisa la configuración de las claves `env` y `globalEnv`.

### Next steps

Ya tienes todo lo necesario para publicar aplicaciones con Turborepo. Para saber más sobre casos de uso concretos, consulta las Guides o profundiza en los conceptos centrales.

---

## Understanding your repository

Fuente: https://turborepo.dev/docs/crafting-your-repository/understanding-your-repository

Turborepo incluye herramientas para entender la estructura del repositorio, y pueden ayudarte a usar y optimizar el codebase.

### `turbo devtools`

`turbo devtools` ofrece una visualización en el navegador del package graph. Esta herramienta puede ayudar a diagnosticar problemas del task graph y a entender la estructura del monorepo.

```bash
turbo devtools
```

Para más información, consulta la documentación de referencia.

### `turbo ls`

Para listar tus packages, puedes ejecutar `turbo ls`. Muestra los packages del repositorio y dónde están.

```bash
> turbo ls

  @repo/eslint-config packages/eslint-config
  @repo/typescript-config packages/typescript-config
  @repo/ui packages/ui
  docs apps/docs
  web apps/web
```

Puedes aplicar filters a `ls`, igual que a `run`:

```bash
> turbo ls --filter ...ui
3 packages (pnpm9)

  @repo/ui packages/ui
  docs apps/docs
  web apps/web
```

### `turbo run`

Para saber qué tasks se pueden ejecutar en el monorepo, llama a `turbo run` sin ninguna task. Obtendrás una lista de tasks y de los packages en los que están definidas:

```bash
> turbo run
No tasks provided, here are some potential ones

  lint
    @repo/ui, docs, web
  build
    docs, web
  dev
    docs, web
  start
    docs, web
  generate:component
    @repo/ui
```

### `turbo query`

Si quieres profundizar en la estructura del repositorio, desde `2.2.0` Turborepo ofrece una interfaz GraphQL al repositorio a través de `turbo query`. Puedes ejecutar consultas como encontrar todos los packages que tienen una task `test`:

```bash
> turbo query "query { packages(filter: { has: { field: TASK_NAME, value: \"build\"}}) { items { name } } }"
{
  "data": {
    "packages": {
      "items": [
        {
          "name": "//"
        },
        {
          "name": "docs"
        },
        {
          "name": "web"
        }
      ]
    }
  }
}
```

Esto puede ayudar a diagnosticar problemas potenciales en el grafo de dependencies de packages o de tasks. Por ejemplo, supón que tienes muchos cache misses en los builds. Podría deberse a un package que cambia una y otra vez y está importado por todo el codebase.

Para investigarlo, se puede ejecutar una consulta que encuentre packages importados directamente más de 10 veces en el monorepo:

```bash
> turbo query "query { packages(filter: { greaterThan: { field: DIRECT_DEPENDENT_COUNT, value: 10 } }) { items { name } } }"
{
  "data": {
    "packages": {
      "items": [
        {
          "name": "utils"
        }
      ]
    }
  }
}
```

Cuando se ha encontrado ese package, se puede intentar dividirlo en packages más pequeños para que un cambio pequeño no invalide todo el grafo de dependencies.

O supón que usas la flag `--affected` y aun así se ejecutan más tasks de las que te gustaría. Con `turbo query` puedes encontrar todos los packages y la razón por la que se invalidaron:

```bash
> turbo query "query { affectedPackages(base: \"HEAD^\", head: \"HEAD\") { items { reason {  __typename } } } }"
{
  "data": {
    "affectedPackages": {
      "items": [
        {
          "name": "utils",
          "reason": {
            "__typename": "FileChanged"
          }
        },
        {
          "name": "web",
          "reason": {
            "__typename": "DependencyChanged"
          }
        },
        {
          "name": "docs",
          "reason": {
            "__typename": "DependencyChanged"
          }
        },
        {
          "name": "cli",
          "reason": {
            "__typename": "DependencyChanged"
          }
        }
      ]
    }
  }
}
```

---

## Upgrading

Fuente: https://turborepo.dev/docs/crafting-your-repository/upgrading

### Upgrading to 2.0

#### 1. Update `turbo.json`

Empieza la actualización de 1.x a 2.0 ejecutando:

#### pnpm

```bash
pnpm dlx @turbo/codemod migrate
```

#### yarn

```bash
yarn dlx @turbo/codemod migrate
```

#### npm

```bash
npx @turbo/codemod migrate
```

#### bun

```bash
bunx @turbo/codemod migrate
```

#### nub

```bash
nubx @turbo/codemod migrate
```

#### aube

```bash
aubx @turbo/codemod migrate
```

Esto actualizará tus `turbo.json` para muchos de los breaking changes de 1.x a 2.0.

Además, se añadirá un campo `name` a cualquier `package.json` del Workspace que no tenga uno.

> También puedes ejecutar cada codemod a mano, uno por uno. Visita la página de codemods para más información.

#### 2. Add `devEngines.packageManager` to root `package.json`

El campo `devEngines.packageManager` declara qué package manager se espera usar en el Workspace. El campo legado `packageManager` de nivel superior también se soporta por compatibilidad hacia atrás.

Turborepo 2.0 exige que el Workspace defina una declaración de package manager, como forma de mejorar la estabilidad y la previsibilidad del comportamiento del codebase. Si todavía no tienes una, añade este campo al `package.json` de la raíz:

#### pnpm

```diff
// ./package.json
{
+ "devEngines": {
+   "packageManager": {
+     "name": "pnpm",
+     "version": "9.2.0"
+   }
+ }
}
```

#### yarn

```diff
// ./package.json
{
+ "devEngines": {
+   "packageManager": {
+     "name": "yarn",
+     "version": "1.22.19"
+   }
+ }
}
```

#### npm

```diff
// ./package.json
{
+ "devEngines": {
+   "packageManager": {
+     "name": "npm",
+     "version": "10.8.1"
+   }
+ }
}
```

#### bun

```diff
// ./package.json
{
+ "devEngines": {
+   "packageManager": {
+     "name": "bun",
+     "version": "1.2.0"
+   }
+ }
}
```

#### nub

```diff
// ./package.json
{
+ "devEngines": {
+   "packageManager": {
+     "name": "nub",
+     "version": "0.8.3"
+   }
+ }
}
```

#### aube

```diff
// ./package.json
{
+ "devEngines": {
+   "packageManager": {
+     "name": "aube",
+     "version": "2.2.9"
+   }
+ }
}
```

#### 3. Update `eslint-config-turbo`

`eslint-config-turbo` ayuda a identificar environment variables que hay que añadir a la clave `env` para el caching. Si lo usas, asegúrate de actualizarlo para que coincida con tu versión major.

#### 4. Update `turbo run` commands

Turborepo 2.0 incluye mejoras de comportamiento y de corrección en los comandos `turbo run`. Abajo está el resumen de los cambios, que pueden afectar o no a tu codebase:

- Strict Mode para environment variables ahora es el valor por defecto, y se deja atrás Loose Mode (PR). Si parece que a los scripts de tus tasks les faltan environment variables, puedes salir de este comportamiento con la opción `--env-mode` en cada comando, para migrar de forma incremental. Se recomienda actualizar la clave `env` de la task para contemplar todas sus environment variables y poder quitar la opción `--env-mode` cuanto antes. Si quieres volver a dejar Loose Mode como valor por defecto del repositorio, puedes hacerlo con la configuración `envMode`.
- El directorio raíz del Workspace ahora es una dependency implícita de todos los packages (PR). El repositorio debería tener tan poco código como sea posible en la raíz, porque los cambios en la raíz pueden afectar a todas las tasks del repositorio. Además, si usas Internal Packages en la raíz del Workspace, los cambios en esas dependencies también provocarán cache misses en todas las tasks. En ambos casos, plantéate sacar el código de la raíz y meterlo en un package.
- Se eliminó `--ignore` en favor de `--filter` y de los cambios de corrección del grafo que vienen abajo (PR).
- Se eliminó la flag `--scope` (deprecated desde 1.2) (PR).
- El campo `engines` del `package.json` raíz ahora se usa en el hashing (PR).
- `--filter` ya no infiere namespaces para los nombres de package (PR).
- `--filter` ahora da error cuando no coincide ningún nombre de package ni ningún directorio (PR).
- `--only` restringe las dependencies de tasks en lugar de las dependencies de packages (PR).



