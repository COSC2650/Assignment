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
        
        //Call UI form validation (naming rules of form content) 
        
        //Call db validation (db exists)
        
        //Call connection method (open) and validation (connection retry/length)
        
        //CreateUser method to generate data for SQL db (includes hash and salt)
        
        //Write to db

        public int CreateUser(User user)
        {


            //salt and hash password potato code example
            //string pwd = "123Abc#@"; (just for this example, normally we will be parsing data from front end
            //string salt = SaltHash.GenerateSalt(70);
            //string pwdHashed = SaltHash.HashPassword(pwd, salt, 10101, 70);
            //Console.WriteLine(pwdHashed);
            //Console.WriteLine(salt);
            
            return 0;
        }


    }
}
