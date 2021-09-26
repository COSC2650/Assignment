using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;

namespace API.Connection {   

    static public class PasswordWithSaltHasher
    {

        //Salts create unique passwords even in the case where multiple users have the same password
        //They are random bits added onto the end of the password before hashing
        public static byte[] GenerateSalt()
        {

            //Securely generates random numbers
            RNGCryptoServiceProvider fancyRNG = new();

            //"Salts only need to be long enough so that each user's salt will be unique. Random 64-bit salts are very unlikely to
            //ever repeat even with a billion registered users, so this should be fine"

            //^^Reason for the magic number^^

            byte[] saltBytes = new byte[64];

            fancyRNG.GetBytes(saltBytes);

            return saltBytes;
        }


        //Generates hashing algorithm
        //Generates salt and converts password to bytes
        //Appends both salt and password together
        //hashes password with salt
        //returns hash and returns hashed password+salt as an object to be stored in the db


        public static HashWithSaltResult HashPassword(string password)
        {
            HashAlgorithm hash = SHA256.Create();

            byte[] saltBytes = GenerateSalt();
            byte[] passwordAsBytes = Encoding.UTF8.GetBytes(password);

            List<byte> passwordWithSaltBytes = new();
            passwordWithSaltBytes.AddRange(passwordAsBytes);
            passwordWithSaltBytes.AddRange(saltBytes);

            byte[] hashPasswordWithSalt = hash.ComputeHash(passwordWithSaltBytes.ToArray());

            return new HashWithSaltResult(Convert.ToBase64String(saltBytes), Convert.ToBase64String(hashPasswordWithSalt));
           
        } 
    } 
}

