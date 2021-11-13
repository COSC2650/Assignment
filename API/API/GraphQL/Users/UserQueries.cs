using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.Services;
using HotChocolate.Types;

namespace API.GraphQL.Users
{
    [ExtendObjectType("Query")]
    public class UserQueries
    {
        private readonly IUserService _userService;

        public UserQueries(IUserService userService)
        {
            _userService = userService;
        }

        public IQueryable<User> Users => _userService.GetAll();

        public Task<User> GetUserByEmail(string email, string password) =>
            _userService.GetUserByEmail(email, password);
        
        public IQueryable<User> AdminUserSearch(string id, int role, string keyword) => 
            _userService.AdminUserSearch(id, role, keyword);
    }
}