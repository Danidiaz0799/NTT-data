# Prueba Técnica Full Stack (.NET & Angular)

## Descripción
Solución Full Stack que incluye un Backend en ASP.NET Core Web API y un Frontend en Angular, diseñada para la consulta de información básica de clientes. El proyecto sigue principios SOLID, inyección de dependencias y buenas prácticas de arquitectura.

## Tecnologías Utilizadas
- **Backend:** ASP.NET Core Web API (.NET 9)
- **Frontend:** Angular (Standalone Components) + Vite
- **Estilos:** Bootstrap 5 (CDN)
- **DevOps:** Azure DevOps (CI/CD Pipeline de ejemplo)

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
2. Ejecutar en HTTPS 8090 (perfil https ya apunta a 8090):
   ```bash
   dotnet run
   ```
3. La API quedará en:
   - `https://localhost:8090/api/cliente`

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

## Estructura del Repositorio
```
backend/
  Controllers/
    ClienteController.cs
  Data/
    AppDbContext.cs
  Models/
    Cliente.cs
  Services/
    IClienteService.cs
    ClienteService.cs
  Properties/
    launchSettings.json
  appsettings.json
  appsettings.Development.json
  Program.cs

frontend/
  index.html
  src/
    main.ts
    app/
      app.component.ts
      app.routes.ts
      models/
        cliente.model.ts
      pages/
        consulta/consulta.component.ts
        resumen/resumen.component.ts
      services/
        cliente.service.ts
  vite.config.ts
  package.json
  tsconfig.json
  tsconfig.app.json

.gitignore
azure-pipelines.yml
README.md
```

## Notas
- El Backend solo retorna datos mockeados para el cliente 'C' y '23445322'.
- El Frontend utiliza servicios y almacenamiento temporal para mostrar el resumen sin recargar la API.

## DevOps - Azure Pipelines

### Pipeline CI/CD Configurado
El archivo `azure-pipelines.yml` implementa:

**Stage 1: Build**
- Backend: restore, build, test, publish
- Frontend: install, build, publish

**Stage 2: Deploy**
- Backend: Azure App Service
- Frontend: Azure Static Web Apps

**Configuración requerida:**
- Service Connection: `Azure-Connection`
- Variable: `AZURE_TOKEN`
- Environment: `production`

### Ejecutar Pruebas Localmente
```bash
cd backend/Tests/ClienteApi.Tests
dotnet test
```
