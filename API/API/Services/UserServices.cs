using System.Linq;  
using System.Threading.Tasks;  
using Microsoft.EntityFrameworkCore;  
using API.Data;
using API.Models;

namespace API.Services
{  
    public class UserService : IUserService  
    {  
        private readonly ZipitContext _context;
    
        public UserService(ZipitContext context)  
        {  
            _context = context;
        } 
  
        public async Task<User> Create(User user)
        {  
            await _context.Users.AddAsync(user);  
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
            return _context.Users.AsQueryable();  
        }  
    }
}