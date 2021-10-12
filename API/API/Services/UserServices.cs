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
  
        public async Task<User> Create(AddUserInput input)
        {  
            var hash = Hashbrowns.HashPassword(input.Password);
            var user = new User
            {
                FirstName = input.FirstName,
                LastName = input.LastName,
                Street = input.Street,
                City = input.City,
                State = input.State,
                PostCode = input.PostCode,
                Email = input.Email,
                PasswordHash = hash,
                EmailVerfied = false
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<bool> Delete(int UserID)  
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
                user.PasswordHash = "#";
            }
            return users;
        }

        public async Task<User> GetUserByEmail(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(c => c.Email == email);
            if(user is null)
                return null;
            
            var result = ValidatePassword(user, password);
            if (!result)
                return null;
            
            user.PasswordHash = "#";
            return user;
        }

        public Boolean ValidatePassword(User user, string password)
        {
            return Hashbrowns.ValidatePassword(password, user.PasswordHash);
        }
    }
}