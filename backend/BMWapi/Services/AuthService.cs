using System.Threading.Tasks;
using BMWApi.Data;
using BMWApi.Models;
using BCrypt.Net; // Ensure this is included

namespace BMWApi.Services
{
    public class AuthService
    {
        private readonly AppDbContext _dbContext;

        public AuthService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> RegisterUserAsync(string username, string password)
        {
            // Check if username is already taken
            if (_dbContext.Users.Any(u => u.Username == username))
            {
                return false; // Username is taken
            }

            // Hash the password before storing it
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);

            // Create new user
            var user = new User
            {
                Username = username,
                PasswordHash = hashedPassword
            };

            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();
            return true; // Registration successful
        }

        public bool AuthenticateUser(string username, string password)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Username == username);

            // User not found or password doesn't match
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                return false;
            }

            return true; // Authentication successful
        }
    }
}