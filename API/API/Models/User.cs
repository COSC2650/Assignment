using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class User 
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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
        public int PostCode { get; set; }
        
        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [Required]
        public Boolean EmailVerfied { get; set; }

        [Required]
        public int RoleID {get; set; }
        public virtual Role Role { get; set; }
    }

}
