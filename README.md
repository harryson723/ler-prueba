
# LER PREVENCIÓN  

**LER Prevención** es un proyecto web con integración a un microservicio que utiliza tecnologías modernas para la gestión de usuarios.  

## Tecnologías utilizadas  
- **Frontend**: Angular  
- **Backend**: Express  
- **Base de datos**: PostgreSQL  

---

## Requisitos previos  
Antes de comenzar, asegúrate de tener instalados los siguientes requisitos en tu sistema:  
- **Node.js**  
- **Git**  
- **PostgreSQL**  
- **Visual Studio Code (VS Code)**  

---

## Guía de ejecución  

### Ejecución del Frontend  

1. **Instalar Angular CLI:**  
   Para instalar Angular CLI, ejecuta el siguiente comando:  
   ```
   npm install -g @angular/cli
   ```  

2. **Instalar dependencias:**  
   Navega a la carpeta `front` y ejecuta:  
   ```
   npm install
   ```  

3. **Iniciar el servidor de desarrollo:**  
   Una vez instaladas las dependencias, ejecuta el frontend con:  
   ```
   npm start
   ```  
   Ahora podrás acceder a la aplicación desde tu navegador.  

---

### Ejecución del Backend  

1. **Configuración de PostgreSQL:**  
   Asegúrate de tener PostgreSQL instalado y ejecutándose en el puerto `5432` (por defecto).  
   - Si utilizas un puerto diferente, actualiza el valor de `DB_PORT` en el archivo `.env` que crearás más adelante.  

2. **Crear la base de datos y la tabla:**  
   Conéctate a PostgreSQL y crea la base de datos `LER`. Luego, ejecuta la siguiente consulta para crear la tabla `usuarios`:  
   ```
   CREATE TABLE usuarios (
       id SERIAL PRIMARY KEY,
       nombre VARCHAR(100),
       correo VARCHAR(100),
       edad INT
   );
   ```  

3. **Instalar dependencias:**  
   Navega a la carpeta `back` y ejecuta:  
   ```
   npm install
   ```  

4. **Crear el archivo `.env`:**  
   En la carpeta `back`, crea un archivo `.env` basado en el archivo `.env.template`. Asegúrate de completar los valores necesarios:  
   ```plaintext
   DB_HOST=
   DB_NAME=LER
   DB_USER=
   DB_PASSWORD=
   DB_PORT=5432
   PORT=3000
   ```  
   - `DB_HOST`: Host de tu servidor PostgreSQL.  
   - `DB_NAME`: Nombre de la base de datos (`LER`).  
   - `DB_USER` y `DB_PASSWORD`: Credenciales de acceso a PostgreSQL.  
   - `PORT`: Puerto donde se ejecutará el microservicio (por defecto: `3000`).  

5. **Sincronizar el frontend con el backend:**  
   Si cambias el puerto (`PORT`) del backend, actualiza también el archivo `src/environments/environment.ts` en el frontend. Modifica la variable `baseUrl` para reflejar el nuevo puerto:  
   ```typescript
   export const environment = {
       baseUrl: 'http://localhost:<NUEVO_PUERTO>'
   };
   ```  

6. **Iniciar el servidor:**  
   Para ejecutar el backend, utiliza:  
   ```
   npm run dev
   ```  