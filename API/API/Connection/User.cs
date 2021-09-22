using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace API.Connection
{
    public class User
    {

        /*
         * 
         *   Data annotations are being used
         *   Theyre a C# library that validates data when the class is created, 
         *   saves a lot of work!
         *   
         */

        [Required(ErrorMessage = "{0} is required")]
        [StringLength(50, MinimumLength = 2,
        ErrorMessage = "First Name should be minimum 3 characters and a maximum of 50 characters")]
        [DataType(DataType.Text)]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [StringLength(50, MinimumLength = 2,
        ErrorMessage = "Last Name should be minimum 2 characters and a maximum of 50 characters")]
        [DataType(DataType.Text)]
        public string LastName { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [StringLength(100, MinimumLength = 2,
        ErrorMessage = "Street should be minimum 2 characters and a maximum of 100 characters")]
        [DataType(DataType.Text)]
        public string Street { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [StringLength(100, MinimumLength = 2,
        ErrorMessage = "City should be minimum 2 characters and a maximum of 50 characters")]
        [DataType(DataType.Text)]
        public string City { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [StringLength(100, MinimumLength = 2,
        ErrorMessage = "Post code should be minimum 2 characters and a maximum of 50 characters")]
        [DataType(DataType.PostalCode)]
        public int PostCode { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [StringLength(100, MinimumLength = 2,
        ErrorMessage = "Password should be minimum 7 characters and a maximum of 50 characters")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public Boolean EmailVerified { get; set; }

        public string Role { get; set; }
    }
}
