using backend.Models;

namespace backend.Services;

public interface IClienteService
{
    Task<Cliente?> ObtenerClienteAsync(string tipoDocumento, string numeroDocumento, CancellationToken ct = default);
}
