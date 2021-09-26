using System.Linq;
using API.Data;

namespace API.Models.DataManager
{
    public class LoginManager
    {
        private readonly ZipitContext _context;

        public LoginManager(ZipitContext context)
        {
            _context = context;
        }

        public LoginDto Get(string email)
        {
            var user = _context.Users.FirstOrDefault(x => x.Email == email);
            var loginDto = new LoginDto()
            {
                UserID = user.UserID,
                Email = user.Email,
                PasswordHash = user.PasswordHash,
                PasswordSalt = user.PasswordSalt,
            };

            return loginDto;
        }
    }
}