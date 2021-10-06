using System.Collections.Generic;
using System.Linq;
using API.Data;
using API.Models.Repository;
using API.Models;

namespace API.Models.DataManager
{
    public class UserManager : IDataRepository<UserDto, int>
    {
        private readonly ZipitContext _context;

        public UserManager(ZipitContext context)
        {
            _context = context;
        }

        public UserDto Get(int id)
        {
            var user = _context.Users.Find(id);
            var userDto = new UserDto(user);

            return userDto;
        }

        public IEnumerable<UserDto> GetAll()
        {
            var users = from x in _context.Users
                        select new UserDto(x);

            return users.ToList();
        }

        // Required due to interface, handled in controller
        public int Add(UserDto User)
        {
            return User.UserID;
        }

        public int Delete(int id)
        {
            _context.Users.Remove(_context.Users.Find(id));
            _context.SaveChanges();

            return id;
        }

        public int Update(int id, UserDto User)
        {
            var dbUser = _context.Users.Find(id);

            dbUser.UserID = User.UserID;
            dbUser.FirstName = User.FirstName;
            dbUser.LastName = User.LastName;
            dbUser.Street = User.Street;
            dbUser.City = User.City;
            dbUser.State = User.State;
            dbUser.PostCode = User.PostCode;
            dbUser.Email = User.Email;
            dbUser.PasswordHash = User.PasswordHash;
            dbUser.PasswordSalt = User.PasswordSalt;
            dbUser.EmailVerified = User.EmailVerfied;

            _context.Update(dbUser);
            _context.SaveChanges();

            return id;
        }
    }
}