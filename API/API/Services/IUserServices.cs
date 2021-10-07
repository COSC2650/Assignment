using System;
using System.Linq;  
using System.Threading.Tasks;
using API.Models;
using API.GraphQL.Users;
using HotChocolate;
using HotChocolate.Types;
  
namespace API.Services
{  
   public interface IUserService  
    {  
        Task<User> Create(AddUserInput input);
        Task<bool> Delete(int UserID);  
        IQueryable<User> GetAll(); 
        Task<User> GetUserByEmail(string email, string password);
        Boolean ValidatePassword(User user, string password);
    }  
}  