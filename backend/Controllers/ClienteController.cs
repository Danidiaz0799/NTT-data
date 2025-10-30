using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClienteController : ControllerBase
{
    private readonly IClienteService _clienteService;

    public ClienteController(IClienteService clienteService)
    {
        _clienteService = clienteService;
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] string? TipoDocumento, [FromQuery] string? NumeroDocumento, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(TipoDocumento) || string.IsNullOrWhiteSpace(NumeroDocumento))
        {
            return BadRequest(new { message = "TipoDocumento y NumeroDocumento son obligatorios" });
        }

        if (TipoDocumento != "C" && TipoDocumento != "P")
        {
            return BadRequest(new { message = "TipoDocumento inválido. Use C o P" });
        }

        try
        {
            var cliente = await _clienteService.ObtenerClienteAsync(TipoDocumento, NumeroDocumento, ct);
            if (cliente is null)
            {
                return NotFound();
            }
            return Ok(new
            {
                primerNombre = cliente.PrimerNombre,
                segundoNombre = cliente.SegundoNombre,
                primerApellido = cliente.PrimerApellido,
                segundoApellido = cliente.SegundoApellido,
                telefono = cliente.Telefono,
                direccion = cliente.Direccion,
                ciudadResidencia = cliente.CiudadResidencia
            });
        }
        catch (Exception)
        {
            return StatusCode(500, new { message = "Error inesperado" });
        }
    }
}
