using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class ConfirmCode 
    {
        [Key]
        [Required, EmailAddress]
        public string Email { get; set; }
        
        [Required]
        public int Code { get; set; }

    }
}