using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Models.DataManager;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager _repo;

        public UserController(UserManager repo)
        {
            _repo = repo;
        }

        // GET: api/User
        [HttpGet("Index")]
        public IEnumerable<UserDto> Get()
        {
            return _repo.GetAll();
        }

        // GET api/User/1
        [HttpGet("{id}")]
        public UserDto Get(int id)
        {
            return _repo.Get(id);
        }



        // POST api/User
        [HttpPost]
        public void Post([FromBody] UserDto User)
        {
            _repo.Add(User);
        }

        // PUT api/User
        [HttpPut("Edit")]
        public void Put([FromBody] UserDto User)
        {
            _repo.Update(User.UserID, User);
        }

        // DELETE api/User/1
        [HttpDelete("{id}")]
        public long Delete(int id)
        {
            return _repo.Delete(id);
        }
    }
}