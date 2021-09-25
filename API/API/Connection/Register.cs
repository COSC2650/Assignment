using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace API.Connection
{
    public class Register
    {
        //Call this method from the ui, using information provided by the forms
        //packed in a User object

        //Call db validation (db exists)
        
        //Call connection method (open) and validation (connection retry/length)
        
        //CreateUser method to generate data for SQL db (includes hash and salt)
        
        //Write to db

        public int CreateUser(User user)
        {   
            HashWithSaltResult saltAndPassword = PasswordWithSaltHasher.HashPassword(user.Password);
            user.Password = saltAndPassword.HashedPass;

            Crud.DeployUser(user);

            return 1;
        }


    }
}
