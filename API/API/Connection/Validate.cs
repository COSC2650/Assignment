using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Connection
{
    public class Validate
    {


        //Validate first and last names
        public int ValidateName(string name)
        {

            //Check each letter is not a number

            for (int i = 0;i<name.Length; i++)
            {

                if (i >= '0' && i <= '9')
                {
                    return 0;
                }

                i++;

            }
            //Check the name is less than 50 characters
            if (name.Length > 50)
            {
                return 0;
            }

            return 1;
        }



        //Validate Emails
        public int ValidateEmail(string email)
        {



            //Check to see if the string has an @ sign, the signifier of an email
            Boolean atSign = false;

            for (int i = 0; i < email.Length; i++)
            {

                if (email[i] == '@') 
                {

                    atSign = true;
                }

                i++;

            }
            //Check the name is less than 256 characters
            if (email.Length > 256)
            {
                return 0;
            }


            if (atSign)
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }



        //Validate Passwords
        public int ValidatePassword(string password)
        {

            if(password.Length > 64)
            {

                return 0;

            }
            else
            {

                return 1;

            }
        }


    }
}
