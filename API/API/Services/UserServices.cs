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
            var data = new User  
            {  
                UserID = user.UserID,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Street = user.Street,
                City = user.City,
                State = user.State,
                PostCode = user.PostCode,
                Email = user.Email,
                PasswordHash = user.PasswordHash,
                PasswordSalt = user.PasswordSalt,
                EmailVerfied = user.EmailVerfied,
            };  
            await _context.Users.AddAsync(data);  
            await _context.SaveChangesAsync();  
            return data;
        }

        public async Task<bool> Delete(DeleteVM deleteVM)  
        {  
            var user = await  _context.Users.FirstOrDefaultAsync(c => c.UserID == deleteVM.Id);  
            if(user is not null)   
            {  
                _context.Users.Remove(user);  
                await _context.SaveChangesAsync();  
                return true;  
            }  
            return false;  
        }  
        public IQueryable<User> GetAll()  
        {  
            return _context.Users.AsQueryable();  
        }  
    }  
  
    public class DeleteVM  
    {  
        public int Id { get; set; }  
    }
}