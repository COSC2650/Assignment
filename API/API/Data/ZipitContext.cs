using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Data
{
    public class ZipitContext : DbContext
    {
        public ZipitContext(DbContextOptions<ZipitContext> options) : base(options)
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Listing> Listings { get; set; }
        public DbSet<ConfirmCode> ConfirmCodes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(f => f.UserEmail)
                .IsUnique();

            modelBuilder.Entity<Role>()
                .HasData(
                    new Role {
                        RoleID = 1,
                        RoleName = "Admin"
                    },
                    new Role {
                        RoleID = 2,
                        RoleName = "User"
                    },
                    new Role {
                        RoleID = 3,
                        RoleName = "Premium"
                    });
        }
    }
}