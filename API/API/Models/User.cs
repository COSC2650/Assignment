using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class User
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string street { get; set; }
        public string city { get; set; }
        public int postCode { get; set; }
        public string email { get; set; }
        public Boolean emailVerified { get; set; }
        public int passWordSalt { get; set; }
        public int passWordHash { get; set; }
        public string role { get; set; }
    }
}
