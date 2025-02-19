# Proyecto Unificado de Frontend y Backend

Este repositorio contiene las carpetas separadas para el frontend y el backend del proyecto.

## Requisitos

Asegúrese de tener las siguientes herramientas instaladas en su máquina:
- Node.js v20
- MongoDB

## Instrucciones

1. Clone este repositorio:

    ```bash
    git clone https://github.com/reiriartef/nolatech-test-solution.git
    cd nolatech-test-solution
    ```

2. Instale las dependencias de cada proyecto de manera individual:

    - **Frontend** (usando Vite):

        ```bash
        cd nolatech-offline-test-frontend
        npm install
        npm run dev
        ```

    - **Backend** (usando Express):

        ```bash
        cd nolatech-offline-test-backend
        npm install
        npm run start
        ```
3. Modifique el .env.template con sus variables de entorno y elimine la extensión .template

## Notas

- Asegúrese de que MongoDB esté en funcionamiento antes de iniciar el backend.
- El frontend estará disponible en `http://localhost:5173` y el backend en `http://localhost:3000` (o el puerto que hayas configurado en tu aplicación).

¡Y eso es todo! Ahora debería poder correr el proyecto sin problemas. Si tiene alguna pregunta o encuentra algún problema, no dude en contactarme.
