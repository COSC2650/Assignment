using Xunit;
using Moq;
using API.Models;
using API.Services;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using AutoFixture;
using System.Threading.Tasks;

using System;

namespace Tests
{   
    public class ModelTest
    {
        [Theory]
        [InlineData(
            "Product", 
            4000,
            1,
            "Great", 
            "Test",
            "2009-06-15T13:45:30",
            "2009-06-15T13:45:30",   
            "This is a test listing",
            1, 
            "TestProduct")]
        public void NewListing(
            string ListingType, 
            int PostCode,
            Decimal Price,
            string ProdCondition,
            string Title,
            DateTime ServAvailability,
            DateTime DateListed,
            string Description,
            int UserID,
            string Category)
        {
            Listing Test = new Listing();
            Test.ListingType = ListingType;
            Test.PostCode = PostCode;
            Test.Price = Price;
            Test.ProdCondition = ProdCondition;
            Test.Title = Title;
            Test.ServAvailability = ServAvailability;
            Test.DateListed = DateListed;
            Test.Description = Description;
            Test.UserID = UserID;
            Test.Category = Category;
            
            Assert.Equal(ListingType, Test.ListingType);
            Assert.Equal(PostCode, Test.PostCode);
            Assert.Equal(1.00M, Test.Price);
            Assert.Equal(ProdCondition, Test.ProdCondition);
            Assert.Equal(Title, Test.Title);
            Assert.Equal(ServAvailability, Test.ServAvailability);
            Assert.Equal(DateListed, Test.DateListed);
            Assert.Equal(Description, Test.Description);
            Assert.Equal(UserID, Test.UserID);
            Assert.Equal(Category, Test.Category);
            Assert.IsType<int>(Test.ListingID);
            Assert.Null(Test.User);
        }

        [Fact]
        public async Task ListingService_GetAll()
        {
            // Generate a series of listings
            IList<Listing> listings = GenerateListings();

            // Change the context options to use an inmemory database
            var contextOptions = new DbContextOptionsBuilder<API.Data.ZipitContext>()
                  .UseInMemoryDatabase(System.Guid.NewGuid().ToString())
                  .Options;

            // Create a new instance of the ZipitContext
            var context = new API.Data.ZipitContext(contextOptions);

            // Create a new instance on the ListingService with the mocked context
            ListingService listingService = new(context);

            // Add the listings
            foreach (Listing listing in listings) {
                await listingService.CreateListing(listing);
            }

            // Get all listings
            var listingsToAssert = listingService.GetAll();

            // Assert that the generated list is equal to the returned
            Assert.Equal(listingsToAssert.Count(), listings.Count);
        }

        [Fact]
        public async Task ListingService_Create()
        {
            // Create sample listing
            Listing listing = GenerateListing();

            // Change the context options to use an inmemory database
            var contextOptions = new DbContextOptionsBuilder<API.Data.ZipitContext>()
                  .UseInMemoryDatabase(System.Guid.NewGuid().ToString())
                  .Options;

            // Create a new instance of the ZipitContext
            var context = new API.Data.ZipitContext(contextOptions);

            // Create a new instance on the ListingService with the mocked context
            ListingService listingService = new(context);

            // Create a listing
            await listingService.CreateListing(listing);

            // Get all users
            var listingToAssert = listingService.GetAll().FirstOrDefault();

            // Assert that the generated list is equal to the returned
            Assert.Equal(listingToAssert, listing);
        }


        private static IList<Listing> GenerateListings()
        {
            // Create a new instance on the fixture
            Fixture fixture = new();

            // Generte and return the list
            return fixture.Build<List<Listing>>().Create();
        }

        private static Listing GenerateListing()
        {
            // Create a new instance on the fixture
            Fixture fixture = new();
            fixture.Behaviors.Remove(new ThrowingRecursionBehavior());
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());

            // Generte and return the list
            return fixture.Build<Listing>().Create();
        }
    }
}