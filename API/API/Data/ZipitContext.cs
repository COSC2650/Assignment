using Microsoft.EntityFrameworkCore;
using API.Models;
using API.Connection;

namespace API.Data
{
    public class ZipitContext : DbContext
    {
        public ZipitContext(DbContextOptions<ZipitContext> options) : base(options)
        { }

        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    UserID = 0001,
                    FirstName = "Bob",
                    LastName = "Peterson",
                    Street = "82 Fake St",
                    City = "Fakesvile",
                    State = "QLD",
                    PostCode = 4114,
                    Email = "not@real.com",
                    PasswordHash = "",
                    PasswordSalt = "",
                    EmailVerfied = true,
                }
            );
        }
    }
}