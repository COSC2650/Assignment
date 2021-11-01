using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class User 
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserID { get; set; }

        [Required, MinLength(3), MaxLength(50)]
        public string UserFirstName { get; set; }

        [Required, MinLength(3), MaxLength(50)]
        public string UserLastName { get; set; }

        [Required, MinLength(3), MaxLength(50)]
        public string UserStreet { get; set; }
        
        [Required, MinLength(3), MaxLength(50)]
        public string UserCity { get; set; }

        [Required, MinLength(3), MaxLength(3)]
        public string UserState { get; set; }

        [Required, MinLength(4), MaxLength(4)]
        public int UserPostCode { get; set; }
        
        [Required, EmailAddress]
        public string UserEmail { get; set; }

        [Required]
        public string UserPasswordHash { get; set; }

        [Required]
        public Boolean UserEmailVerified { get; set; }

        [Required]
        public int RoleID {get; set; }
        public virtual Role Role { get; set; }

        public virtual List<Listing> Listings { get; set; }
    }

}
