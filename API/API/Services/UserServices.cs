using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;
using API.Extensions;
using System;
using API.GraphQL.Users;

namespace API.Services
{
    public class UserService : IUserService
    {
        private readonly ZipitContext _context;

        public UserService(ZipitContext context)
        {
            _context = context;
        }

        public async Task<User> CreateUser(AddUserInput input)
        {
            // Create a return object
            User result;

            if (_context.Users.Where(x => x.UserEmail == input.UserEmail).Any())
            {
                // If a user already exists, then return a 0
                result = new()
                {
                    UserID = 0
                };
            }
            else
            {
                // Create a new confirmation code
                int confirmationCode = CodeGenerator.ConfirmCodeGenerator();

                // Hash the password
                var hash = Hashbrowns.HashPassword(input.UserPassword);

                // Create a new instance of the user
                var user = new User
                {
                    UserFirstName = input.UserFirstName,
                    UserLastName = input.UserLastName,
                    UserStreet = input.UserStreet,
                    UserCity = input.UserCity,
                    UserState = input.UserState,
                    UserPostCode = input.UserPostCode,
                    UserEmail = input.UserEmail,
                    UserPasswordHash = hash,
                    UserEmailVerfied = false,
                    RoleID = 2
                };

                // Add the user to the context
                _context.Users.Add(user);

                // Add a new instance of the confirmation code
                ConfirmCode confirmCode = new()
                {
                    Email = input.UserEmail,
                    Code = confirmationCode
                };

                // Add the confirmtion code to the context
                _context.ConfirmCodes.Add(confirmCode);

                // Send the confirmation mailer
                Mailer mailer = new(new SmtpClient());
                mailer.SendRegistrationMail(input.UserEmail, confirmationCode);

                // Save the changes to the data store
                await _context.SaveChangesAsync();

                // After the user object is added, grab it back
                result = _context.Users.Where(x => x.UserEmail == input.UserEmail).First();
            }

            // Return the result
            return result;
        }

        public async Task<bool> DeleteUser(int userID)
        {
            var user = await _context.Users.FirstOrDefaultAsync(c => c.UserID == userID);
            var response = false;

            if (user is not null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
                response = true;
            }

            return response;
        }

        public IQueryable<User> GetAll()
        {
            var users = _context.Users.AsQueryable();
            foreach (User user in users)
            {
                user.UserPasswordHash = "#";
            }
            return users;
        }

        public async Task<User> GetUserByEmail(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(c => c.UserEmail == email);
            if (user is null)
                return null;

            var result = ValidatePassword(user, password);
            if (!result)
                return null;

            user.UserPasswordHash = "#";
            return user;
        }

        public Boolean ValidatePassword(User user, string password)
        {
            return Hashbrowns.ValidatePassword(password, user.UserPasswordHash);
        }
    }
}