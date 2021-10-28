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
        Task<User> CreateUser(AddUserInput input);
        Task<bool> DeleteUser(int userID);  
        IQueryable<User> GetAll(); 
        Task<User> GetUserByEmail(string email, string password);
        bool ValidatePassword(User user, string password);
        Task<User> ConfirmUser(string userEmail, int confirmationCode);
    }  
}  