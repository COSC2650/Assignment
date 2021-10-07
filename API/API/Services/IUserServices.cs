using System;
using System.Linq;  
using System.Threading.Tasks;
using API.Models;
  
namespace API.Services
{  
   public interface IUserService  
    {  
        Task<User> Create(User user);
        Task<bool> Delete(int UserID);  
        IQueryable<User> GetAll(); 
        Task<User> GetUserByEmail(string email, string password);
        Boolean ValidatePassword(User user, string password);
    }  
}  