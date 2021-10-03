using System.Linq;
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
    }
}