# Proyecto Next.js

Este proyecto utiliza Next.js con el sistema de enrutamiento basado en la estructura de archivos dentro de la carpeta `app`. A continuación, se describe la estructura de rutas y su funcionalidad.

## Creación del Proyecto
Para instalar todas las dependencias del proyecto y configurarlo correctamente, sigue estos pasos:

```sh
# Crear un nuevo proyecto Next.js
npx create-next-app@latest capstone

# Moverse al directorio del proyecto
cd capstone

# Instalar dependencias
npm install

# Iniciar el servidor en modo desarrollo
npm run dev
```

### Instalación de Librerías Adicionales

#### Librerías para Formularios
```sh
npm install react-hook-form
```

#### Librerías para Ubicación (Mapas con Leaflet)
```sh
npm install react-leaflet leaflet
```

#### Instalación de Iconos
```sh
npm install lucide-react
```

#### Instalación para Manejo de Cookies
```sh
npm install js-cookie
```

#### Instalación de ESLint y Prettier
```sh
npm install --save-dev eslint-config-next eslint-config-prettier eslint-plugin-prettier --legacy-peer-deps
```
#### Instalar Framer Motion
```sh
npm install framer-motion
```

## Instalación y Configuración

### Configuración ESLint y Prettier
El proyecto usa `ESLint` con una configuración personalizada para garantizar buenas prácticas de desarrollo. La configuración se encuentra en el archivo `.eslintrc.cjs`.

```js
module.exports = {
  extends: [
    "next/core-web-vitals", 
  ],
  plugins: ["prettier"],
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    React: "readonly",
  },
  overrides: [
    {
      files: ["*.json"],
      rules: {
        "no-unused-expressions": "off",
      },
    },
  ],
  ignorePatterns: ["stories/*"],
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", "./src"]], // ✅ Hace que ESLint entienda `@/` como `src/`
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  rules: {
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "no-const-assign": "error",
    "no-unused-vars": "warn",
    "eqeqeq": ["error", "always"],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
  },
};
```

## Estructura de Rutas

El proyecto sigue la convención de enrutamiento de Next.js App Router, donde cada carpeta y archivo dentro de `src/app` define una ruta específica de la aplicación.
### Descripción de Carpetas

- **(auth)/**: Contiene las rutas de autenticación.
  - `/login`: Página de inicio de sesión.
  - `/registro`: Página de registro de una organización.

- **(default)/**: Contiene las páginas principales de la aplicación.
  - `/[id]`: Ruta dinámica basada en un ID.
  - `/about`: Página de información sobre la aplicación y los desarrolladores.
  - `/agregar-fuente`: Formulario para agregar una fuentes documentales .
  - `/agregar-suceso`: Formulario para agregar un nuevo caso.
  - `/agregar-testigo`: Formulario para agregar un nuevo testigo.
  - `/agregar-victima`: Formulario para agregar una nueva víctima.
  - `/validacion`: Página para validaciones una vez la organización está logeada con exito.

- **Otros archivos**:
  - `layout.jsx`: Define la estructura global de la aplicación.
  - `page.jsx`: Página principal de la aplicación.
  - `favicon.ico`: Ícono de la aplicación. // Actualmente el de Next.js, cambiar por logo de gemapp cuando esté creado
  - `globals.css`: Estilos globales de la aplicación.
  - 
```
📂 src
├── 📂 app
│   ├── 📂 (auth)
│   │   ├── 📂 login
│   │   │   ├── 📄 page.jsx
│   │   ├── 📂 registro
│   │   │   ├── 📄 page.jsx
│   │
│   ├── 📂 (default)
│   │   ├── 📂 [id]
│   │   │   ├── 📄 page.jsx
│   │   ├── 📂 about
│   │   │   ├── 📄 page.jsx
│   │   ├── 📂 agregar-fuente
│   │   │   ├── 📄 page.jsx
│   │   ├── 📂 agregar-suceso
│   │   │   ├── 📄 page.jsx
│   │   ├── 📂 agregar-testigo
│   │   │   ├── 📄 page.jsx
│   │   ├── 📂 agregar-victima
│   │   │   ├── 📄 page.jsx
│   │   ├── 📂 validacion
│   │   │   ├── 📄 page.jsx
│   │
│   ├── 📄 layout.jsx
│   ├── 📄 page.jsx
│   ├── 📄 favicon.ico
│   ├── 📄 globals.css
```

## Estructura de Componentes
### Descripción de Carpetas

- **error/**: Manejo de errores y mensajes relacionados.
- **footer/**: Contiene el componente de pie de página.
- **form-components/**: Componentes reutilizables para formularios como botones, entradas de texto y selectores.
- **forms/**: Formularios específicos para distintos tipos de datos (incidentes, víctimas, testigos).
- **header/**: Contiene el encabezado de la aplicación.
- **location/**: Componentes relacionados con la ubicación y mapas.
- **usuario/**: Componentes de autenticación y validación de usuario.
- **validation/**: Componentes para validación de datos y visualización de tablas.
```
📂 components
├── 📂 error
│   ├── 📄 ErrorMessage.jsx
│
├── 📂 footer
│   ├── 📄 Footer.jsx
│
├── 📂 form-components
│   ├── 📄 Button.jsx
│   ├── 📄 ButtonInput.jsx
│   ├── 📄 ButtonLink.jsx
│   ├── 📄 FormInput.jsx
│   ├── 📄 IncidentSearcher.jsx
│   ├── 📄 InitialButtonsBlock.jsx
│   ├── 📄 Label.jsx
│   ├── 📄 LoadingSpinner.jsx
│   ├── 📄 Modal.jsx
│   ├── 📄 Notification.jsx
│   ├── 📄 RadioGroup.jsx
│   ├── 📄 SearchSelect.jsx
│
├── 📂 forms
│   ├── 📄 DocumentSourceForm.jsx
│   ├── 📄 IncidentForm.jsx
│   ├── 📄 VictimForm.jsx
│   ├── 📄 WitnessForm.jsx
│
├── 📂 header
│   ├── 📄 Header.jsx
│
├── 📂 location
│   ├── 📂 map
│   │   ├── 📄 MapComponent.jsx
│
├── 📂 usuario
│   ├── 📄 LoginForm.jsx
│   ├── 📄 RegisterForm.jsx
│   ├── 📄 UserValidator.jsx
│
├── 📂 validation
│   ├── 📄 ActionModal.jsx
│   ├── 📄 IncidentTable.jsx
│   ├── 📄 ValidationView.jsx
```

## Estructura de datos , servicios y utilidades
### Descripción de Carpetas
- **data/**: Contiene archivos relacionados con la gestión y almacenamiento de datos de incidentes.
- **services/**: Implementa la lógica de negocio y validaciones relacionadas con los usuarios, testigos y víctimas.
- **utils/**: Contiene utilidades generales como clases y constantes reutilizables en la aplicación.

```
📂 data
├── 📄 all-incidents.js
├── 📄 incidents.js
📂 services
├── 📄 documentSources.js
├── 📄 incidents.js
├── 📄 user.js
├── 📄 validators.js
├── 📄 victims.js
├── 📄 witnesses.js
📂 utils
├── 📄 classes.js
├── 📄 constants.js
```


### Configuración de `package.json`
El archivo `package.json` contiene los scripts de ejecución y dependencias clave para el proyecto:

```json
{
  "name": "capstone",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "js-cookie": "^3.0.5",
    "leaflet": "^1.9.4",
    "lucide-react": "^0.475.0",
    "next": "15.1.6",
    "radix-ui": "^1.1.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.54.2",
    "react-leaflet": "^5.0.0",
    "tailwind-merge": "^3.0.1"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@eslint/js": "^9.20.0",
    "@types/node": "22.13.1",
    "@types/react": "19.0.8",
    "eslint": "^8.57.1",
    "eslint-config-next": "^15.1.6",
    "eslint-config-prettier": "^10.0.1",
    "eslint-plugin-prettier": "^5.2.3",
    "eslint-plugin-react": "^7.37.4",
    "globals": "^15.15.0",
    "postcss": "^8",
    "tailwindcss": "^3.4.1"
  }
}
```

## Notas Finales

- Este proyecto sigue la estructura del **App Router** de Next.js.
- **(auth)/**: Contiene las rutas de autenticación.
- **(default)/**: Contiene las páginas principales de la aplicación.
- Se utilizan layouts (`layout.js`, `layout.jsx`) para definir estructuras de página reutilizables.
- Los archivos en `public/` son recursos estáticos accesibles desde el navegador.
- Los componentes están organizados en `components/` para facilitar la reutilización y modularidad del código.
- Se incluyen datos de prueba en `data/`, hooks personalizados en `hooks/` y utilidades en `utils/`.

- **Next.js 15**: Se ha actualizado a la última versión para mejorar el rendimiento y optimización.
- **TailwindCSS**: Se configura en `tailwind.config.mjs` y `postcss.config.mjs`.
- **Mapas con Leaflet**: Se utiliza `leaflet` y `react-leaflet` para integrar mapas interactivos.


