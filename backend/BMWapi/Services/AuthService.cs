using System.Linq;
using System.Threading.Tasks;
using BMWApi.Data;
using BMWApi.Models;

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

            // Create new user
            var user = new User
            {
                Username = username,
                Password = password // Note: You should hash the password before saving it
            };

            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();
            return true; // Registration successful
        }

        public bool AuthenticateUser(string username, string password)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Username == username);

            // User not found or password doesn't match
            if (user == null || user.Password != password)
            {
                return false;
            }

            return true; // Authentication successful
        }
    }
}
