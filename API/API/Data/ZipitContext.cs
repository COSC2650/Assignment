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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(f => f.Email)
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
                    });
        }
    }
}