using System.Threading.Tasks;
using API.Models;
using API.Services;
using HotChocolate.Types;

namespace API.GraphQL.Users
{
    [ExtendObjectType("Mutation")]  
    public class UserMutations  
    {  
        private readonly IUserService _userService;  
  
        public UserMutations(IUserService userService)  
        {  
            _userService = userService;  
        }  

        public async Task<User> CreateUser(AddUserInput input) => await _userService.CreateUser(input, new Extensions.SmtpClient());
        public async Task<bool> DeleteUser(int userID) => await _userService.DeleteUser(userID);
        public async Task<User> ConfirmUser(string userEmail, int confirmationCode) => await _userService.ConfirmUser(userEmail, confirmationCode);
        public async Task<User> EditUser(int userID, AddUserInput input) => await _userService.EditUser(userID, input);
    }  
}  