using BMWApi.Controllers;
using BMWApi.Models;
using BMWApi.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using Xunit;

namespace BMWApi.Tests.Controllers
{
    public class CarExtrasControllerTests
    {
        [Fact]
        public void GetAllCarExtras_ReturnsOk()
        {
            // Arrange
            var mockService = new Mock<CarExtrasService>();
            mockService.Setup(service => service.GetAllCarExtras())
                       .Returns(new List<CarExtras>());

            var controller = new CarExtrasController(mockService.Object);

            // Act
            var result = controller.GetAllCarExtras();

            // Assert
            Assert.IsType<OkObjectResult>(result.Result);
        }
    }
}
