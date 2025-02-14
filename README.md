Capstone Project - Global Emergency Map (GEM)

🚀 Plataforma para la gestión de incidentes y emergencias medioambientales y crisis humanitarias.
Los usuarios pueden registrar incidentes, testigos, víctimas y fuentes documentales, además de gestionar verificadores.

--------------------------------------------------------------

📁 Estructura del Proyecto

La aplicación está organizada en diferentes carpetas y módulos según su funcionalidad:

📌 1. components/ - Componentes reutilizables

Esta carpeta contiene componentes genéricos utilizados en diferentes formularios y páginas.
	•	formUbication/ ➝ Componente para capturar ubicación en formularios.
	•	header/ ➝ Componente de la barra de navegación.
	•	map/ ➝ Componentes relacionados con la integración de Leaflet (mapas).
	•	objetos-formulario/ ➝ Componentes básicos de los formularios:
	•	Button.js ➝ Botón reutilizable.
	•	FormInput.js ➝ Campo de entrada reutilizable.
	•	Label.js ➝ Etiqueta de formularios.
	•	tipos-formulario/ ➝ Contiene los formularios específicos:
	•	IncidentForm.js ➝ Formulario para reportar un incidente.
	•	WitnessForm.js ➝ Formulario para testigos.
	•	VictimForm.js ➝ Formulario para víctimas.
	•	VerificatorForm.js ➝ Formulario para verificadores.
	•	DocumentSourceForm.js ➝ Formulario para fuentes documentales.
	•	usuario/ ➝ Componentes relacionados con el usuario.


-----------------------------------------------------------------------

🌎 2. app/ - Rutas principales

Aquí se encuentran las páginas y subrutas de la aplicación:
	•	gemapp-home/ ➝ Página principal con navegación a los formularios.
	•	agregar-suceso/ ➝ Ruta para agregar un incidente.
	•	agregar-testigo/ ➝ Ruta para agregar un testigo.
	•	agregar-victima/ ➝ Ruta para agregar una víctima.
	•	agregar-verificador/ ➝ Ruta para agregar un verificador.
	•	agregar-fuente-documental/ ➝ Ruta para agregar una fuente documental.
	•	login/ ➝ Página de inicio de sesión.
	•	registro/ ➝ Página de registro de usuario.
	•	validacion-usuario/ ➝ Página de validación después del registro.

-------------------------------------------------------------------------

⚙️ 3. utils/ - Lógica de comunicación con el backend

Archivos que gestionan la conexión con la API:
	•	user.js ➝ Autenticación y registro de usuarios.
	•	incidentApi.js ➝ Operaciones CRUD para incidentes.
	•	witnessApi.js ➝ Operaciones CRUD para testigos.
	•	victimsApi.js ➝ Operaciones CRUD para víctimas.
	•	verificatorApi.js ➝ Operaciones CRUD para verificadores.
	•	documentSourceApi.js ➝ Operaciones CRUD para fuentes documentales.

-------------------------------------------------------------------------

📌 Principales Funcionalidades

✅ Registro e inicio de sesión de usuarios.
✅ Gestión de incidentes, testigos y víctimas.
✅ Validación de usuario mediante JWT.
✅ Almacenamiento en cookies para evitar pérdida de datos al navegar.
✅ Integración con mapas Leaflet para capturar ubicación.
✅ Interfaz optimizada con Tailwind CSS y Next.js.


-------------------------------------------------------------------------

🚀 Instalación y Configuración

- npx create-next-app@latest capstone
- cd capstone
- npm run dev

instalacion de librerias para los formularios:
- npm install react-hook-form

instalacion para componente ubicacion:
- npm install react-leaflet leaflet

instalacion para iconos
-npm install lucide-react

instalacion para guardar datos de formularios en las cookies:
- npm install js-cookie

-------------------------------------------------------------------------

📌 Notas Técnicas
	•	Next.js 15+
	•	Tailwind CSS para estilos
	•	React Hook Form para validación
	•	Leaflet para mapas
	•	JWT para autenticación

-------------------------------------------------------------------------

🎯 Próximos Pasos

📌 Crar la gestion de datos y almacenamiento en diferentes tablas de base de datos
📌 Crear test con Cipress
📌 Realiar tareas antes del 18 de febrero.

-------------------------------------------------------------------------
