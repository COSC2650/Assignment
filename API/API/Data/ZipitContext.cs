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
            
            modelBuilder.Entity<User>()
                .HasData(
                    new User {
                        UserID = 1,
                        UserFirstName = "Test",
                        UserLastName = "Account",
                        UserStreet = "Street",
                        UserCity = "City",
                        UserState = "XXX",
                        UserPostCode = 4000,
                        UserEmail = "not@real.com",
                        UserEmailVerfied = false,
                        UserPasswordHash = "50000:8q+Oc/+2RcPpp3fH6b4ugc18mui+ZCTi:kSUzflp66KeT6+TZZdoNrg7fp+E=",
                        RoleID = 2,
                    }
                );

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
                        ListingPostCode = 2650,
                        ListingTitle = "Test Product 1",
                        ListingDate = System.DateTime.UtcNow,
                        ListingCategory = "Test Products",
                        ListingPrice = 1.00M,
                        ListingType = "Product",
                        ListingDescription = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                        ListingCondition = "Good",
                        ListingImageURL = "https://picsum.photos/100?random=1",
                    },
                    new Listing {
                        ListingID = 1002,
                        UserID = 1,
                        ListingPostCode = 4000,
                        ListingTitle = "Test Product 2",
                        ListingDate = System.DateTime.UtcNow,
                        ListingCategory = "Test Products",
                        ListingPrice = 2.00M,
                        ListingType = "Product",
                        ListingDescription = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                        ListingCondition = "Great",
                        ListingImageURL = "https://picsum.photos/100?random=2",
                    },
                    new Listing {
                        ListingID = 1003,
                        UserID = 1,
                        ListingPostCode = 2222,
                        ListingTitle = "Test Product 3",
                        ListingDate = System.DateTime.UtcNow,
                        ListingCategory = "Test Products",
                        ListingPrice = 3.00M,
                        ListingType = "Product",
                        ListingDescription = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                        ListingCondition = "Needs Repair",
                        ListingImageURL = "https://picsum.photos/100?random=3",
                    },
                    new Listing {
                        ListingID = 1004,
                        UserID = 1,
                        ListingPostCode = 3232,
                        ListingTitle = "Test Product 4",
                        ListingDate = System.DateTime.UtcNow,
                        ListingCategory = "Test Products",
                        ListingPrice = 4.44M,
                        ListingType = "Product",
                        ListingDescription = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                        ListingCondition = "Fair",
                        ListingImageURL = "https://picsum.photos/100?random=4",
                    },
                    new Listing {
                        ListingID = 1005,
                        UserID = 1,
                        ListingPostCode = 4154,
                        ListingTitle = "Test Product 5",
                        ListingDate = System.DateTime.UtcNow,
                        ListingCategory = "Test Products",
                        ListingPrice = 5.0M,
                        ListingType = "Product",
                        ListingDescription = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                        ListingCondition = "Excellent",
                        ListingImageURL = "https://picsum.photos/100?random=5",
                    },
                    new Listing {
                        ListingID = 1006,
                        UserID = 1,
                        ListingPostCode = 4000,
                        ListingTitle = "Test Service 1",
                        ListingDate = System.DateTime.UtcNow,
                        ListingAvailability = System.DateTime.UtcNow,
                        ListingCategory = "Test Services",
                        ListingPrice = 6.0M,
                        ListingType = "Service",
                        ListingDescription = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                        ListingImageURL = "https://picsum.photos/100?random=1",
                    },
                    new Listing {
                        ListingID = 1007,
                        UserID = 1,
                        ListingPostCode = 3456,
                        ListingTitle = "Test Service 2",
                        ListingDate = System.DateTime.UtcNow,
                        ListingAvailability = System.DateTime.UtcNow,
                        ListingCategory = "Test Services",
                        ListingPrice = 7.0M,
                        ListingType = "Service",
                        ListingDescription = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                        ListingImageURL = "https://picsum.photos/100?random=2",
                    },
                    new Listing {
                        ListingID = 1008,
                        UserID = 1,
                        ListingPostCode = 2560,
                        ListingTitle = "Test Service 3",
                        ListingDate = System.DateTime.UtcNow,
                        ListingAvailability = System.DateTime.UtcNow,
                        ListingCategory = "Test Services",
                        ListingPrice = 8.89M,
                        ListingType = "Service",
                        ListingDescription = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                        ListingImageURL = "https://picsum.photos/100?random=3",
                    },
                    new Listing {
                        ListingID = 1009,
                        UserID = 1,
                        ListingPostCode = 3000,
                        ListingTitle = "Test Service 4",
                        ListingDate = System.DateTime.UtcNow,
                        ListingAvailability = System.DateTime.UtcNow,
                        ListingCategory = "Test Services",
                        ListingPrice = 8.89M,
                        ListingType = "Service",
                        ListingDescription = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                        ListingImageURL = "https://picsum.photos/100?random=4",
                    },                    
                    new Listing {
                        ListingID = 1010,
                        UserID = 1,
                        ListingPostCode = 4000,
                        ListingTitle = "Test Service 5",
                        ListingDate = System.DateTime.UtcNow,
                        ListingAvailability = System.DateTime.UtcNow,
                        ListingCategory = "Test Services",
                        ListingPrice = 10.99M,
                        ListingType = "Service",
                        ListingDescription = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                        ListingImageURL = "https://picsum.photos/100?random=5",
                    });
        }
    }
}