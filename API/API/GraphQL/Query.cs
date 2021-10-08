using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.Services;

namespace API.GraphQL
{
    public class Query
    {
        private readonly IUserService _userService;

        public Query(IUserService userService)
        {
            _userService = userService;
        }

        public IQueryable<User> Users => _userService.GetAll();

        public Task<User> GetUserByEmail(string email, string password) =>
            _userService.GetUserByEmail(email, password);
    }
}