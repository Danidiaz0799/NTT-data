using backend.Controllers;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace ClienteApi.Tests
{
    public class ClienteControllerTests
    {
        [Fact]
        public async Task GetCliente_ReturnsOk_WhenFound()
        {
            // Arrange
            var mockService = new Mock<IClienteService>();
            var clienteMock = new Cliente
            {
                TipoDocumento = "C",
                NumeroDocumento = "23445322",
                PrimerNombre = "Juan",
                SegundoNombre = "Carlos",
                PrimerApellido = "Pérez",
                SegundoApellido = "Gómez",
                Telefono = "3124567890",
                Direccion = "Cra 15 #20-45",
                CiudadResidencia = "Bogotá"
            };

            mockService.Setup(s => s.ObtenerClienteAsync("C", "23445322", It.IsAny<CancellationToken>()))
                .ReturnsAsync(clienteMock);

            var controller = new ClienteController(mockService.Object);

            // Act
            var result = await controller.Get("C", "23445322", CancellationToken.None);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);
        }

        [Fact]
        public async Task GetCliente_ReturnsNotFound_WhenNotFound()
        {
            // Arrange
            var mockService = new Mock<IClienteService>();
            mockService.Setup(s => s.ObtenerClienteAsync("C", "00000000", It.IsAny<CancellationToken>()))
                .ReturnsAsync((Cliente?)null);

            var controller = new ClienteController(mockService.Object);

            // Act
            var result = await controller.Get("C", "00000000", CancellationToken.None);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task GetCliente_ReturnsBadRequest_WhenInvalidInput()
        {
            // Arrange
            var mockService = new Mock<IClienteService>();
            var controller = new ClienteController(mockService.Object);

            // Act - Tipo documento vacío
            var result = await controller.Get("", "23445322", CancellationToken.None);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async Task GetCliente_ReturnsBadRequest_WhenInvalidTipoDocumento()
        {
            // Arrange
            var mockService = new Mock<IClienteService>();
            var controller = new ClienteController(mockService.Object);

            // Act - Tipo documento inválido
            var result = await controller.Get("X", "23445322", CancellationToken.None);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.NotNull(badRequestResult.Value);
        }
    }
}
