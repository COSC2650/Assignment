using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Data
{
    public class ZipitContext : DbContext
    {
        public ZipitContext(DbContextOptions<ZipitContext> options) : base(options)
        { }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(f => f.Email)
                .IsUnique();
        }
    }
}