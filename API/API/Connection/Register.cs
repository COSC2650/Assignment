using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.Controllers;
using API.Models.DataManager;
using API.Data;
using Microsoft.AspNetCore.Mvc;



namespace API.Connection
{
    public class Register
    {
        
         private readonly ZipitContext _context;

        public Register(ZipitContext context)
        {
            _context = context;
        }

        public void CreateUser(User user)
        {   
            //Hash and salt the password, do not transfer the password to db for security reasons

            HashWithSaltResult saltAndPassword = PasswordWithSaltHasher.HashPassword(user.Password);
            user.PasswordHash = saltAndPassword.HashedPass;
            user.PasswordSalt = saltAndPassword.Salt;
            user.EmailVerified = false;

            //Create a Data transfer object to post to the database using the userDTO constructor

            UserDto dto = new UserDto(user);

            //Check to see if user already exists on the database

            //Send dto to User Manager 

            UserManager manager = new UserManager(_context);

            manager.Add(dto);

            //Use the user controller to send it to the db

            UserController controller = new UserController(manager);
            
            controller.Post(dto);

            // send confirmation email
            
        }


    }
}
