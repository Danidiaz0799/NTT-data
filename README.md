# Prueba Técnica Full Stack (.NET & Angular)

## Descripción
Solución Full Stack que incluye un Backend en ASP.NET Core Web API y un Frontend en Angular, diseñada para la consulta de información básica de clientes. El proyecto sigue principios SOLID, inyección de dependencias y buenas prácticas de arquitectura.

## Tecnologías Utilizadas
- **Backend:** ASP.NET Core Web API (.NET 8)
- **Frontend:** Angular (Standalone Components)
- **Estilos:** Tailwind CSS
- **Pruebas:** xUnit, Moq (Backend), Angular Testing (Frontend)
- **DevOps:** Azure DevOps (CI/CD Pipeline simulado)

## Funcionalidades Principales
- **API REST mockeada:** Consulta de cliente por tipo y número de documento.
- **Validaciones:**
  - Tipo de documento: 'C' (Cédula) o 'P' (Pasaporte).
  - Número de documento: Solo números, entre 8 y 11 dígitos.
- **Pantalla de Consulta:** Formulario reactivo con validaciones y búsqueda.
- **Pantalla de Resumen:** Visualización de los datos del cliente consultado.
- **Manejo de errores:** Mensajes claros para datos inválidos o cliente no encontrado.
- **Principios SOLID y DI:** Uso de interfaces y servicios inyectables en Backend y Frontend.
- **Requisito especial:** Solo retorna datos para el cliente con TipoDocumento='C' y NumeroDocumento='23445322'.

## Instrucciones de Ejecución Local

### Backend (.NET)
1. Ir a la carpeta `backend/`.
2. Certificado de desarrollo HTTPS (una sola vez si no lo tienes):
   ```bash
   dotnet dev-certs https --trust
   ```
3. Ejecutar en HTTPS 8090 (perfil https ya apunta a 8090):
   ```bash
   dotnet run -c Release --launch-profile https
   ```
4. La API quedará en:
   - `https://localhost:8090/api/cliente`
   - `http://localhost:5053/api/cliente`

### Frontend (Angular)
1. Ir a la carpeta `frontend/`.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Ejecutar la aplicación:
   ```bash
   npm run dev
   ```
4. Acceder a `http://localhost:4200/consulta` en el navegador.

## Pruebas Unitarias
- **Backend:**
  ```bash
  cd backend/Tests/ClienteApi.Tests
  dotnet test
  ```
- **Frontend:**
  ```bash
  cd frontend
  npm run test
  ```

## Estructura del Repositorio
```
backend/
  Controllers/
  Models/
  Services/
  Tests/ClienteApi.Tests/
  Program.cs
frontend/
  src/app/
  ...
azure-pipelines.yml
README.md
```

## Notas
- El Backend solo retorna datos mockeados para el cliente 'C' y '23445322'.
- El Frontend utiliza servicios y almacenamiento temporal para mostrar el resumen sin recargar la API.
- El pipeline de Azure DevOps simula los pasos de compilación, pruebas y despliegue para ambos proyectos.
