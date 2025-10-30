using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

// Servicios
builder.Services.AddOpenApi();
builder.Services.AddControllers();
// Forzar URL única para "dotnet run" sin parámetros
builder.WebHost.UseUrls("https://localhost:8090");
builder.Services.AddDbContext<backend.Data.AppDbContext>(options => options.UseInMemoryDatabase("ClientesDb"));
builder.Services.AddScoped<backend.Services.IClienteService, backend.Services.ClienteService>();

// CORS para permitir el frontend (Angular por defecto en 4200)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy
            .WithOrigins("http://localhost:4200", "https://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

// Pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");

app.MapControllers();

// EF InMemory y seeding
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var db = services.GetRequiredService<backend.Data.AppDbContext>();
    db.Database.EnsureCreated();
    if (!db.Clientes.Any())
    {
        db.Clientes.Add(new backend.Models.Cliente
        {
            TipoDocumento = "C",
            NumeroDocumento = "23445322",
            PrimerNombre = "Juan",
            SegundoNombre = "Carlos",
            PrimerApellido = "Pérez",
            SegundoApellido = "Gómez",
            Telefono = "3001234567",
            Direccion = "Calle 123 #45-67",
            CiudadResidencia = "Bogotá"
        });
        db.SaveChanges();
    }
}

app.Run();
