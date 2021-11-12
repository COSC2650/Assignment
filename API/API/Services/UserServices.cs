using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;
using API.Extensions;
using API.GraphQL.Users;
using System;
using System.Collections.Generic;

namespace API.Services
{
    public class UserService : IUserService
    {
        private readonly ZipitContext _context;

        public UserService(ZipitContext context)
        {
            _context = context;
        }

        public async Task<User> CreateUser(AddUserInput input, ISmtpClient smtpClient)
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
                    UserEmailVerified = false,
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
                Mailer mailer = new(smtpClient);
                mailer.SendRegistrationMail(input.UserEmail, confirmationCode);

                // Save the changes to the data store
                await _context.SaveChangesAsync();

                // After the user object is added, grab it back
                result = _context.Users.Where(x => x.UserEmail == input.UserEmail).First();
            }

            // Return the result
            return result;
        }

        public async Task<User> EditUser(int userID, AddUserInput input)
        {
            var lowestPostCode = 800;

            // safety check, should never happen
            var editUser = await _context.Users.FirstOrDefaultAsync(x => x.UserID == userID);

            if (editUser == null)
            {
                return null;
            }

            // validate inputs so see what exists
            if (input.UserFirstName.Length != 0)
                editUser.UserFirstName = input.UserFirstName;

            if (input.UserLastName.Length != 0)
                editUser.UserLastName = input.UserLastName;

            if (input.UserStreet.Length != 0)
                editUser.UserStreet = input.UserStreet;
            
            if (input.UserCity.Length != 0)
                editUser.UserCity = input.UserCity;

            if (input.UserState.Length != 0)
                editUser.UserState = input.UserState;

            if (input.UserPostCode != 0 && input.UserPostCode > lowestPostCode)
                editUser.UserPostCode = input.UserPostCode;

            // updates context with editted user
            _context.Users.Update(editUser);

            // updates the database with changes
            await _context.SaveChangesAsync();

            return editUser;
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

        public bool ValidatePassword(User user, string password)
        {
            return Hashbrowns.ValidatePassword(password, user.UserPasswordHash);
        }

        public async Task<User> ConfirmUser(string userEmail, int confirmationCode)
        {
            // Retrieve the confirmation code
            ConfirmCode confirmCode = _context.ConfirmCodes.Where(c => c.Email == userEmail && c.Code == confirmationCode).First();
            User user = null;

            if (confirmCode != null)
            {
                // Retrieve the user
                user = await _context.Users.FirstOrDefaultAsync(c => c.UserEmail == userEmail);

                // Update the user to say that the email is verified
                user.UserEmailVerified = true;

                // Remove the validation code
                _context.Remove(confirmCode);

                // Update the user
                _context.Update(user);

                // Send the changes to the DB
                await _context.SaveChangesAsync();
            }

            // Return the user
            return user;
        }

        public IQueryable<User> AdminUserSearch(string id, int role, string keyword)
        {
            // Only one field is sent, determine the sent field
            if(id.Length != 0)
            {
                var isEmail = false;
                var numCheck = 0;

                // Check if ID is sent or Email
                try
                {
                    numCheck = Int32.Parse(id);
                }
                // Not an int
                catch (FormatException) 
                {
                    isEmail = true;
                }
                
                // Gets searched user data
                var searchResults = isEmail ? _context.Users.Where(x => x.UserEmail == id)
                                            : _context.Users.Where(x => x.UserID == numCheck);

                // Return search results
                return searchResults;
            }

            if(role != 0)
            {
                return _context.Users.Where(x => x.RoleID == role);
            }

            if(keyword.Length != 0)
            {
                var searchResults = UserKeywordSearch(keyword);
                return searchResults.AsQueryable();
            }
            
            return null;
        }

        public IList<User> UserKeywordSearch(string keyword)
        {
            var numCheck = 0;
            var isString = false;

            // Check if keyword is number only
            try
            {
                numCheck = Int32.Parse(keyword);
            }
            // Not an int
            catch (FormatException) 
            {
                isString = true;
            }

            if(isString)
            {
                var emailMatch = _context.Users.Where(x => x.UserEmail.Contains(keyword)).ToList();
                var firstNameMatch = _context.Users.Where(x => x.UserFirstName.Contains(keyword)).ToList();
                var lastNameMatch = _context.Users.Where(x => x.UserLastName.Contains(keyword)).ToList();
                var streetMatch = _context.Users.Where(x => x.UserStreet.Contains(keyword)).ToList();
                var cityMatch = _context.Users.Where(x => x.UserCity.Contains(keyword)).ToList();
                var stateMatch = _context.Users.Where(x => x.UserState.Contains(keyword)).ToList();
                
                List<User> searchResults = new List<User> {};

                emailMatch.ForEach(x => searchResults.Add(x));
                firstNameMatch.ForEach(x => searchResults.Add(x));
                lastNameMatch.ForEach(x => searchResults.Add(x));
                streetMatch.ForEach(x => searchResults.Add(x));
                cityMatch.ForEach(x => searchResults.Add(x));
                stateMatch.ForEach(x => searchResults.Add(x));
                
                return searchResults;
                
            } else {
                return _context.Users.Where(x => x.UserPostCode == numCheck).ToList();
            }
        }
    }
}