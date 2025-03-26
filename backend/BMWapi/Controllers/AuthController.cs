using Microsoft.AspNetCore.Mvc;
using BMWApi.Services;
using BMWApi.Models;

namespace BMWApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel request)
        {
            if (!ModelState.IsValid)
            {
                // ASP.NET Core will automatically handle this and return a 400 with details
                return BadRequest(ModelState);
            }

            var result = await _authService.RegisterUserAsync(request.Username, request.Password);

            if (!result)
            {
                return Conflict("Username already taken");
            }

            return Ok("Registration successful");
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var isAuthenticated = _authService.AuthenticateUser(request.Username, request.Password);

            if (!isAuthenticated)
            {
                return Unauthorized("Invalid username or password");
            }

            return Ok("Login successful");
        }
    }
}