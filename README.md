# SocialApp

SocialApp es una aplicacion web estilo red social construida con Angular. El flujo general es:

1. El usuario abre la app y accede a la pantalla de autenticacion.
2. Inicia sesion con sus credenciales.
3. Al autenticarse correctamente, entra al home (feed), donde puede ver publicaciones y crear nuevas.

La interfaz se desarrollo siguiendo la metodologia de **Atomic Design** (atoms, molecules, organisms, pages) para mantener componentes reutilizables y escalables.

Ademas, la app consume una API externa para generar/obtener avatares de usuario.

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 21.2.9.

## Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd social-app
```

## Instalacion

Instala las dependencias del proyecto:

```bash
npm install
```

## Levantar el proyecto en desarrollo

Para iniciar el servidor local:

```bash
ng serve
```

Luego abre `http://localhost:4200/` en tu navegador.

## Ejecutar en modo SSR

Para compilar la app con SSR:

```bash
ng build
```

Para levantar el servidor SSR compilado:

```bash
npm run serve:ssr:social-app
```

Luego abre `http://localhost:4000/` en tu navegador.

## Rutas SSR y CSR

Actualmente las rutas estan configuradas asi:

- `/login`: SSR (`RenderMode.Server`)
- `/feed`: CSR (`RenderMode.Client`)
- `/**`: Prerender (`RenderMode.Prerender`)

Esta configuracion esta definida en `src/app/app.routes.server.ts`.

## Como loguearse

1. Inicia la aplicacion con `ng serve`.
2. Entra a la pantalla de login.
3. Puedes ingresar con email y password, o usar el boton de login con Google.
4. Credenciales de prueba:
  - Email: `you@example.com`
  - Password: `123456`
5. Presiona el boton de login.
6. Si los datos son correctos, seras redirigido al home.

## Que tiene el home

En el home se muestran las funcionalidades principales de la app:

- Lista de publicaciones recientes.
- Tarjetas de post con su contenido.
- Modal para poder crear un nuevo post
- Acciones por post (Like, Commentar, Repost y guardado)

## Build

Para compilar el proyecto:

```bash
ng build
```

Los archivos generados se guardan en `dist/`.

