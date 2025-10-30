namespace backend.Models;

public class Cliente
{
    public int Id { get; set; }
    public string TipoDocumento { get; set; } = string.Empty; // C o P
    public string NumeroDocumento { get; set; } = string.Empty;
    public string PrimerNombre { get; set; } = string.Empty;
    public string SegundoNombre { get; set; } = string.Empty;
    public string PrimerApellido { get; set; } = string.Empty;
    public string SegundoApellido { get; set; } = string.Empty;
    public string Telefono { get; set; } = string.Empty;
    public string Direccion { get; set; } = string.Empty;
    public string CiudadResidencia { get; set; } = string.Empty;
}


