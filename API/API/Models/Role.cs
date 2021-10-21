using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Role 
    {
        [Key]
        public int RoleID { get; set; }

        [Required, MinLength(3), MaxLength(50)]
        public string RoleName { get; set; }

        public virtual List<User> Users { get; set; }
    }
}