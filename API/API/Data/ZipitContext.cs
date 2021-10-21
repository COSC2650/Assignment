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
            modelBuilder.Entity<Listing>()
                .HasData(
                    new Listing {
                        ListingID = 1001,
                        UserID = 1,
                        PostCode = 2650,
                        Title = "Test Product 1",
                        DateListed = System.DateTime.UtcNow,
                        Category = "Test Products",
                        Price = 1.00M,
                        ListingType = "Product",
                        Description = "This is a test description for a test product 1.",
                        ProdCondition = "Good",
                        ImageURL = "https://picsum.photos/100?random=1",
                    },
                    new Listing {
                        ListingID = 1002,
                        UserID = 1,
                        PostCode = 4000,
                        Title = "Test Product 2",
                        DateListed = System.DateTime.UtcNow,
                        Category = "Test Products",
                        Price = 2.00M,
                        ListingType = "Product",
                        Description = "This is a test description for a test product 2.",
                        ProdCondition = "Fair",
                        ImageURL = "https://picsum.photos/100?random=2",
                    },
                    new Listing {
                        ListingID = 1003,
                        UserID = 3,
                        PostCode = 2222,
                        Title = "Test Product 3",
                        DateListed = System.DateTime.UtcNow,
                        Category = "Test Products",
                        Price = 3.00M,
                        ListingType = "Product",
                        Description = "This is a test description for test product 3.",
                        ProdCondition = "Needs Repair",
                        ImageURL = "https://picsum.photos/100?random=3",
                    },
                    new Listing {
                        ListingID = 1004,
                        UserID = 3,
                        PostCode = 3232,
                        Title = "Test Product 4",
                        DateListed = System.DateTime.UtcNow,
                        Category = "Test Products",
                        Price = 4.44M,
                        ListingType = "Product",
                        Description = "This is a test description for a test product 4.",
                        ProdCondition = "Fair",
                        ImageURL = "https://picsum.photos/100?random=4",
                    },
                    new Listing {
                        ListingID = 1005,
                        UserID = 3,
                        PostCode = 4154,
                        Title = "Test Product 5",
                        DateListed = System.DateTime.UtcNow,
                        Category = "Test Products",
                        Price = 5.0M,
                        ListingType = "Product",
                        Description = "This is a test description for a test product 5.",
                        ProdCondition = "Excellent",
                        ImageURL = "https://picsum.photos/100?random=5",
                    },
                    new Listing {
                        ListingID = 1006,
                        UserID = 1,
                        PostCode = 4000,
                        Title = "Test Service 1",
                        DateListed = System.DateTime.UtcNow,
                        ServAvailability = System.DateTime.UtcNow,
                        Category = "Test Services",
                        Price = 6.0M,
                        ListingType = "Service",
                        Description = "This is a test description for a test service 1.",
                        ImageURL = "https://picsum.photos/100?random=1",
                    },
                    new Listing {
                        ListingID = 1007,
                        UserID = 1,
                        PostCode = 3456,
                        Title = "Test Service 2",
                        DateListed = System.DateTime.UtcNow,
                        ServAvailability = System.DateTime.UtcNow,
                        Category = "Test Services",
                        Price = 7.0M,
                        ListingType = "Service",
                        Description = "This is a test description for a test service 2.",
                        ImageURL = "https://picsum.photos/100?random=2",
                    },
                    new Listing {
                        ListingID = 1008,
                        UserID = 1,
                        PostCode = 2560,
                        Title = "Test Service 3",
                        DateListed = System.DateTime.UtcNow,
                        ServAvailability = System.DateTime.UtcNow,
                        Category = "Test Services",
                        Price = 8.89M,
                        ListingType = "Service",
                        Description = "This is a test description for a test service 3.",
                        ImageURL = "https://picsum.photos/100?random=3",
                    },
                    new Listing {
                        ListingID = 1009,
                        UserID = 3,
                        PostCode = 3000,
                        Title = "Test Service 4",
                        DateListed = System.DateTime.UtcNow,
                        ServAvailability = System.DateTime.UtcNow,
                        Category = "Test Services",
                        Price = 8.89M,
                        ListingType = "Service",
                        Description = "This is a test description for a test service 4.",
                        ImageURL = "https://picsum.photos/100?random=4",
                    },                    
                    new Listing {
                        ListingID = 1010,
                        UserID = 3,
                        PostCode = 4000,
                        Title = "Test Service 5",
                        DateListed = System.DateTime.UtcNow,
                        ServAvailability = System.DateTime.UtcNow,
                        Category = "Test Services",
                        Price = 10.99M,
                        ListingType = "Service",
                        Description = "This is a test description for a test service 5.",
                        ImageURL = "https://picsum.photos/100?random=5",
                    });
        }
    }
}