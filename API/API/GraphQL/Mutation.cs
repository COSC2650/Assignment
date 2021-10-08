using System.Threading.Tasks;
using API.Models;
using API.Services;
using API.GraphQL.Users;

namespace API.GraphQL  
{  
    public class Mutuation  
    {  
        private readonly IUserService _userService;  
  
        public Mutuation(IUserService userService)  
        {  
            _userService = userService;  
        }  

        public async Task<User> Create(AddUserInput input) => await _userService.Create(input);
        public async Task<bool> Delete(int UserID) => await _userService.Delete(UserID);  
    }  
}  