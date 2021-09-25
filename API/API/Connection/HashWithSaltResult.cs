using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Connection
{

    public class HashWithSaltResult
    {
        public string Salt { get; }
        public string HashedPass { get; set; }

        public HashWithSaltResult(string salt, string pass)
        {
            Salt = salt;
            HashedPass = pass;
        }
    }
}
