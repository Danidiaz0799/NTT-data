using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class ClienteService : IClienteService
{
    private readonly AppDbContext _dbContext;

    public ClienteService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Cliente?> ObtenerClienteAsync(string tipoDocumento, string numeroDocumento, CancellationToken ct = default)
    {
        return await _dbContext.Clientes
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.TipoDocumento == tipoDocumento && c.NumeroDocumento == numeroDocumento, ct);
    }
}
