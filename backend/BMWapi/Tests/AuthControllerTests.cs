using System;
using System.Threading.Tasks;
using BMWApi.Controllers;
using BMWApi.Models;
using BMWApi.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NPOI.SS.Formula.Functions;
using Xunit;

namespace BMWApi.tests
{
    public class AuthControllerTests
    {
        [Fact]
        public async Task Register_ValidRequest_ReturnsOk()
        {
            // Arrange
            var authServiceMock = new Mock<AuthService>();
            authServiceMock.Setup(service => service.RegisterUserAsync(It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(true);

            var controller = new AuthController(authServiceMock.Object);
            var request = new RegisterModel { Username = "testuser", Password = "password" };

            // Act
            var result = await controller.Register(request);

            // Assert
            Assert.IsType<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;
            Assert.Equal("Registration successful", okResult.Value);
        }

        [Fact]
        public async Task Register_InvalidRequest_ReturnsBadRequest()
        {
            // Arrange
            var authServiceMock = new Mock<AuthService>();
            var controller = new AuthController(authServiceMock.Object);
            var request = new RegisterModel(); // Empty request to trigger ModelState error

            // Add ModelState error manually
            controller.ModelState.AddModelError("Username", "The Username field is required.");

            // Act
            var result = await controller.Register(request);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async Task Register_Conflict_ReturnsConflict()
        {
            // Arrange
            var authServiceMock = new Mock<AuthService>();
            authServiceMock.Setup(service => service.RegisterUserAsync(It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(false);

            var controller = new AuthController(authServiceMock.Object);
            var request = new RegisterModel { Username = "testuser", Password = "password" };

            // Act
            var result = await controller.Register(request);

            // Assert
            Assert.IsType<ConflictObjectResult>(result);
        }

        [Fact]
        public void Login_ValidCredentials_ReturnsOk()
        {
            // Arrange
            var authServiceMock = new Mock<AuthService>();
            authServiceMock.Setup(service => service.AuthenticateUser(It.IsAny<string>(), It.IsAny<string>())).Returns(true);

            var controller = new AuthController(authServiceMock.Object);
            var request = new LoginModel { Username = "testuser", Password = "password" };

            // Act
            var result = controller.Login(request);

            // Assert
            Assert.IsType<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;
            Assert.Equal("Login successful", okResult.Value);
        }

        [Fact]
        public void Login_InvalidCredentials_ReturnsUnauthorized()
        {
            // Arrange
            var authServiceMock = new Mock<AuthService>();
            authServiceMock.Setup(service => service.AuthenticateUser(It.IsAny<string>(), It.IsAny<string>())).Returns(false);

            var controller = new AuthController(authServiceMock.Object);
            var request = new LoginModel { Username = "testuser", Password = "password" };

            // Act
            var result = controller.Login(request);

            // Assert
            Assert.IsType<UnauthorizedObjectResult>(result);
        }

        [Fact]
        public void Login_InvalidRequest_ReturnsBadRequest()
        {
            // Arrange
            var authServiceMock = new Mock<AuthService>();
            var controller = new AuthController(authServiceMock.Object);
            var request = new LoginModel(); // Empty request to trigger ModelState error

            // Add ModelState error manually
            controller.ModelState.AddModelError("Username", "The Username field is required.");

            // Act
            var result = controller.Login(request);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }
    }
}
