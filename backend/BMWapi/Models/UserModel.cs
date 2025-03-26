using System.ComponentModel.DataAnnotations;

namespace BMWApi.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required(ErrorMessage = "Username is required")]
        [StringLength(50, ErrorMessage = "Username must be less than 50 characters")]
        public string Username { get; set; }

        [Required]
        // This should store the hashed password
        public string PasswordHash { get; set; }
    }
}