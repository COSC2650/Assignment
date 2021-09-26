using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Models.DataManager;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly LoginManager _repo;

        public LoginController(LoginManager repo)
        {
            _repo = repo;
        }

        // GET api/Login/123@fake.com
        [HttpGet("{email}")]
        public LoginDto Get(string email)
        {
            return _repo.Get(email);
        }
    }
}