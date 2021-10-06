using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Connection;

namespace API.Models
{
    // error messaging can be handled client side
    public class UserDto
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int UserID { get; set; }

        [Required, MinLength(3), MaxLength(50)]
        public string FirstName { get; set; }

        [Required, MinLength(3), MaxLength(50)]
        public string LastName { get; set; }

        [Required, MinLength(3), MaxLength(50)]
        public string Street { get; set; }
        
        [Required, MinLength(3), MaxLength(50)]
        public string City { get; set; }

        [Required, MinLength(3), MaxLength(3)]
        public string State { get; set; }

        [Required, MinLength(4), MaxLength(4)]
        public string PostCode { get; set; }
        
        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [Required]
        public string PasswordSalt { get; set; }

        [Required]
        public Boolean EmailVerfied { get; set; }

        public UserDto(User user){

            FirstName = user.FirstName;
            LastName = user.LastName;
            Street = user.Street;
            City = user.City;
            State = user.State;
            PostCode = user.PostCode;
            Email = user.Email;
            PasswordHash = user.PasswordHash;
            PasswordSalt= user.PasswordSalt;
            EmailVerfied = user.EmailVerified;
        }
    }
}