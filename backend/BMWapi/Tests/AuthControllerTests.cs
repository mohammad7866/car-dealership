using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using BMWApi.Controllers;
using BMWApi.Models;
using BMWApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BMWApi.Tests.Controllers
{
    [TestClass]
    public class AuthControllerTests
    {
        [TestMethod]
        public void Login_InvalidCredentials_ReturnsUnauthorized()
        {
            // Arrange
            var mockAuthService = new Mock<AuthService>(); // Mocking the concrete AuthService
            mockAuthService.Setup(service => service.AuthenticateUser(It.IsAny<string>(), It.IsAny<string>()))
                           .Returns(false); // Mock the AuthenticateUser method to always return false

            var controller = new AuthController(mockAuthService.Object); // Pass the mocked AuthService to the controller

            // Act
            var loginResult = controller.Login(new LoginModel { Username = "invalidUser", Password = "invalidPassword" }) as UnauthorizedObjectResult;

            // Assert
            Microsoft.VisualStudio.TestTools.UnitTesting.Assert.IsNotNull(loginResult);
            Microsoft.VisualStudio.TestTools.UnitTesting.Assert.AreEqual(401, loginResult.StatusCode);
            Microsoft.VisualStudio.TestTools.UnitTesting.Assert.AreEqual("Invalid username or password", loginResult.Value);
        }
    }
}
