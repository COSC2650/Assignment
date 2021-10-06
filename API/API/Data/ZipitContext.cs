using Microsoft.EntityFrameworkCore;
using API.Models;
using API.Connection;

namespace API.Data
{
    public class ZipitContext : DbContext
    {
        public ZipitContext(DbContextOptions<ZipitContext> options) 
            : base(options)
        { 
            
        }

        public DbSet<User> Users { get; set; }
    }
}