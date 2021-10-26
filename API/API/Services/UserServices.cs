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
            var hash = Hashbrowns.HashPassword(input.UserPassword);
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

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<bool> DeleteUser(int UserID)  
        {  
            var user = await  _context.Users.FirstOrDefaultAsync(c => c.UserID == UserID);
            var response = false;

            if(user is not null)   
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
            foreach(User user in users)
            {
                user.UserPasswordHash = "#";
            }
            return users;
        }

        public async Task<User> GetUserByEmail(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(c => c.UserEmail == email);
            if(user is null)
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