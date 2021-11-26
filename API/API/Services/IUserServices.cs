using System.Linq;  
using System.Threading.Tasks;
using API.Models;
using API.GraphQL.Users;
using API.Extensions;
using System.Collections.Generic;

namespace API.Services
{  
   public interface IUserService  
    {  
        Task<User> CreateUser(AddUserInput input, ISmtpClient smtpClient);
        Task<bool> DeleteUser(int userID);
        Task<bool> DeleteMultiUsers(string[] users);
        Task<User> GetUserByEmail(string email, string password);
        bool ValidatePassword(User user, string password);
        Task<User> ConfirmUser(string userEmail, int confirmationCode);
        Task<User> EditUser(int userID, AddUserInput input);
        IQueryable<User> AdminUserSearch(string id, int role, string keyword);
        IList<User> UserKeywordSearch(string keyword);
    }  
}  