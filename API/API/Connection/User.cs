using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Connection
{
    public class User
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public int PostCode { get; set; }
        public string Email { get; set; }
        public Boolean EmailVerified { get; set; }
        public int PassWordSalt { get; set; }
        public int PassWordHash { get; set; }
        public string Role { get; set; }
    }
}
