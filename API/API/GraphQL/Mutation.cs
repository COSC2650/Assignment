using System.Threading.Tasks;
using API.Models;
using API.Services;

namespace API.GraphQL  
{  
    public class Mutuation  
    {  
        private readonly IUserService _userService;  
  
        public Mutuation(IUserService userService)  
        {  
            _userService = userService;  
        }  

        public async Task<User> Create(User user) => await _userService.Create(user);  
        public async Task<bool> Delete(DeleteVM deleteVM) => await _userService.Delete(deleteVM);  
    }  
}  