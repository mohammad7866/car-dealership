using System.ComponentModel.DataAnnotations;

namespace BMWApi.Models;
    public class RegisterModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
