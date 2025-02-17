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

```
app/
│── (auth)/               # Rutas de autenticación
│   │── login/
│   │   ├── page.jsx      # Página de inicio de sesión (/login)
│   │── registro/
│       ├── page.jsx      # Página de registro (/registro)
│
│── (default)/            # Rutas generales
│   │── [id]/
│   │   ├── page.jsx      # Ruta dinámica para IDs (/id/[id])
│
│── about/
│   ├── page.jsx          # Página de información (/about)
│
│── agregar-fuente/
│   ├── page.jsx          # Página para agregar fuente (/agregar-fuente)
│
│── agregar-suceso/
│   ├── page.jsx          # Página para agregar suceso (/agregar-suceso)
│
│── agregar-testigo/
│   ├── page.jsx          # Página para agregar testigo (/agregar-testigo)
│
│── agregar-verificador/
│   ├── page.jsx          # Página para agregar verificador (/agregar-verificador)
│
│── agregar-victima/
│   ├── page.jsx          # Página para agregar víctima (/agregar-victima)
│
│── validacion/
│   ├── page.js           # Página de validación (/validacion)
│   ├── layout.jsx        # Layout para la sección de validación
│
├── public/               # Archivos estáticos
├── globals.css           # Estilos globales
├── layout.js             # Layout principal de la aplicación
```

### Explicación de las Rutas

- **Autenticación** `(auth/)`
  - `/login` → Página de inicio de sesión.
  - `/registro` → Página de registro de usuarios.

- **Rutas Generales** `(default/)`
  - `/[id]` → Ruta dinámica que recibe un parámetro `id`.

- **Secciones de la Aplicación**
  - `/about` → Página de información general.
  - `/agregar-fuente` → Página para agregar una fuente de información.
  - `/agregar-suceso` → Página para agregar un suceso.
  - `/agregar-testigo` → Página para agregar un testigo.
  - `/agregar-verificador` → Página para agregar un verificador.
  - `/agregar-victima` → Página para agregar una víctima.

- **Validación**
  - `/validacion` → Página dedicada a la validación de datos, con un layout específico (`layout.jsx`).


## Estructura de Componentes

```
components/
│── footer/
│   ├── Footer.jsx        # Componente de pie de página
│
│── form-components/      # Componentes reutilizables de formularios
│   ├── Button.jsx
│   ├── ButtonInput.jsx
│   ├── ButtonLink.jsx
│   ├── FormInput.jsx
│   ├── InitialButtonsBlock.jsx
│   ├── Label.jsx
│   ├── LoadingSpinner.jsx
│   ├── Notification.jsx
│   ├── RadioGroup.jsx
│   ├── SearchSelect.jsx
│
│── forms/                # Formularios específicos
│   ├── DocumentSource.jsx
│   ├── IncidentForm.jsx
│   ├── LocationForm.jsx
│   ├── VerificatorForm.jsx
│   ├── VictimForm.jsx
│   ├── WitnessForm.jsx
│
│── header/
│   ├── Header.jsx        # Componente de cabecera
│
│── location/
│   │── map/
│   │   ├── MapComponent.jsx   # Componente de mapa
│
│── usuario/              # Componentes relacionados con usuario
│   ├── LoginForm.jsx
│   ├── RegisterForm.jsx
│   ├── UserValidator.jsx
│
│── validation/           # Componentes de validación
│   ├── ActionModal.jsx
│   ├── IncidentTable.jsx
│   ├── ValidationView.jsx
│   ├── HandlerData.jsx
```

## Estructura de Datos y Utilidades

```
data/                     # Datos de prueba (mocks) simulando respuestas del servidor
│   ├── all-incidents.js  # Listado de todos los incidentes
│   ├── incidents.js      # Datos individuales de incidentes
│
│── hooks/                # Hooks personalizados
│   ├── use-handle-cookies-data.js # Hook para manejar cookies
│
│── utils/                # Utilidades y APIs de datos
│   ├── classes.js        # Clases reutilizables
│   ├── cookies.js        # Funciones para manejo de cookies
│   ├── documentSourceApi.js # API para fuentes de documentos
│   ├── incidentApi.js    # API para manejar incidentes
│   ├── user.js           # Funciones relacionadas con usuario
│   ├── verificatorApi.js # API para verificadores
│   ├── victimsApi.js     # API para víctimas
│   ├── witnessApi.js     # API para testigos
│   ├── constants.js      # Constantes globales
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
- Se utilizan layouts (`layout.js`, `layout.jsx`) para definir estructuras de página reutilizables.
- Los archivos en `public/` son recursos estáticos accesibles desde el navegador.
- Los componentes están organizados en `components/` para facilitar la reutilización y modularidad del código.
- Se incluyen datos de prueba en `data/`, hooks personalizados en `hooks/` y utilidades en `utils/`.

- **Next.js 15**: Se ha actualizado a la última versión para mejorar el rendimiento y optimización.
- **TailwindCSS**: Se configura en `tailwind.config.mjs` y `postcss.config.mjs`.
- **Mapas con Leaflet**: Se utiliza `leaflet` y `react-leaflet` para integrar mapas interactivos.


