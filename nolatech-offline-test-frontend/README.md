# Evaluación 360 Grados

Este proyecto es una aplicación de evaluación 360 grados desarrollada con React y Vite. Permite a los empleados autoevaluarse y a los administradores y gerentes evaluar a otros empleados.

## Instrucciones para configurar y ejecutar el proyecto

### Prerrequisitos

- Node.js (versión 20 o superior)
- npm (versión 6 o superior)

### Instalación

1. Clona el repositorio:

   git clone https://github.com/tu-usuario/nolatech-offline-test-frontend.git

2. Navega al directorio del proyecto:

   cd nolatech-offline-test-frontend

3. Instala las dependencias:

   npm install

### Ejecución del proyecto

1. Inicia el servidor de desarrollo:

   npm run dev

2. Abre tu navegador y navega a `http://localhost:5173` para ver la aplicación en funcionamiento.

### Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Construye la aplicación para producción.
- `npm run lint`: Ejecuta ESLint para verificar el código.
- `npm run preview`: Previsualiza la aplicación construida.

## Estructura del proyecto

El proyecto está organizado de la siguiente manera:

### Explicación de la estructura del proyecto

- **src/components**: Contiene los componentes reutilizables de la aplicación, como formularios, rutas protegidas y modales.
- **src/context**: Contiene el contexto de autenticación (`AuthContext.tsx`) que maneja el estado de autenticación de la aplicación.
- **src/hooks**: Contiene hooks personalizados para manejar la lógica de negocio, como `useLoginUser` y `useRegisterUser`.
- **src/layouts**: Contiene los layouts de la aplicación, como `DashboardLayout.tsx`.
- **src/pages**: Contiene las páginas principales de la aplicación, como `AuthScreen.tsx`, `EmployeesScreen.tsx`, `EvaluationScreen.tsx` y `ProfileScreen.tsx`.
- **src/schemas**: Contiene los esquemas de validación de formularios utilizando Zod, como `loginSchema.ts` y `registerSchema.ts`.
- **src/services**: Contiene los servicios de API para interactuar con el backend, como `api.ts`.
- **index.css**: Archivo de estilos globales.
- **main.tsx**: Punto de entrada principal de la aplicación.
- **eslint.config.js**: Configuración de ESLint para el proyecto.
- **index.html**: Archivo HTML principal.
- **package.json**: Archivo de configuración de npm que incluye las dependencias y scripts del proyecto.
- **tsconfig.json**: Configuración de TypeScript.
- **vite.config.js**: Configuración de Vite.

### Decisiones de diseño

- **React y Vite**: Se eligió React para la construcción de la interfaz de usuario debido a su popularidad y facilidad de uso. Vite se utilizó como el bundler debido a su rápido tiempo de construcción y configuración mínima.
- **React Hook Form**: Se utilizó `react-hook-form` para manejar los formularios debido a su rendimiento y facilidad de integración con validaciones.
- **TanStack React Query**: Se utilizó `@tanstack/react-query` para manejar el estado de datos asincrónicos y la caché, lo que facilita la gestión de datos remotos.
- **Zod**: Se utilizó Zod para la validación de esquemas de formularios debido a su simplicidad y compatibilidad con `react-hook-form`.
- **Tailwind CSS**: Se utilizó Tailwind CSS para los estilos debido a su enfoque utilitario que permite un desarrollo rápido y consistente de la interfaz de usuario.

Este README proporciona una visión general del proyecto, instrucciones para configurarlo y ejecutarlo, y una explicación de la estructura del proyecto y las decisiones de diseño tomadas.
