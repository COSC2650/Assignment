using Xunit;
using API.Models;
using API.Services;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using AutoFixture;
using System.Threading.Tasks;

using System;
using API.GraphQL.Listings;

namespace Tests
{   
    public class ListingService_Tests
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
            Listing Test = new();
            Test.ListingType = ListingType;
            Test.ListingPostCode = PostCode;
            Test.ListingPrice = Price;
            Test.ListingCondition = ProdCondition;
            Test.ListingTitle = Title;
            Test.ListingAvailability = ServAvailability;
            Test.ListingDate = DateListed;
            Test.ListingDescription = Description;
            Test.UserID = UserID;
            Test.ListingCategory = Category;
            
            Assert.Equal(ListingType, Test.ListingType);
            Assert.Equal(PostCode, Test.ListingPostCode);
            Assert.Equal(1.00M, Test.ListingPrice);
            Assert.Equal(ProdCondition, Test.ListingCondition);
            Assert.Equal(Title, Test.ListingTitle);
            Assert.Equal(ServAvailability, Test.ListingAvailability);
            Assert.Equal(DateListed, Test.ListingDate);
            Assert.Equal(Description, Test.ListingDescription);
            Assert.Equal(UserID, Test.UserID);
            Assert.Equal(Category, Test.ListingCategory);
            Assert.IsType<int>(Test.ListingID);
            Assert.Null(Test.User);
        }

        [Fact]
        public async Task ListingService_GetAll()
        {
            // Generate a series of listings
            IList<AddListingInput> listings = GenerateListings();

            // Change the context options to use an inmemory database
            var contextOptions = new DbContextOptionsBuilder<API.Data.ZipitContext>()
                  .UseInMemoryDatabase(System.Guid.NewGuid().ToString())
                  .Options;

            // Create a new instance of the ZipitContext
            var context = new API.Data.ZipitContext(contextOptions);

            // Create a new instance on the ListingService with the mocked context
            ListingService listingService = new(context);

            // Add the listings
            foreach (AddListingInput listing in listings) {
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
            var listing = GenerateListingInput();

            // Change the context options to use an inmemory database
            var contextOptions = new DbContextOptionsBuilder<API.Data.ZipitContext>()
                  .UseInMemoryDatabase(System.Guid.NewGuid().ToString())
                  .Options;

            // Create a new instance of the ZipitContext
            var context = new API.Data.ZipitContext(contextOptions);

            // Create a new instance on the ListingService with the mocked context
            ListingService listingService = new(context);

            // Create a listing
            var testListing = await listingService.CreateListing(listing);

            // Get all users
            var listingToAssert = listingService.GetAll().FirstOrDefault();

            // Assert that the generated list is equal to the returned
            Assert.Equal(listingToAssert, testListing);
        }

        [Fact]
        public async Task Listing_Service_ListingsByQueries_Pass()
        {
            string listingType;
            string category;
            int postCode;

            AddListingInput Test = new(
                1,
                4000,
                "Test Product",
                "Test Products",
                1,
                "Product",
                "Description",
                "Condition",
                "www.image.com"
                );

            // Change the context options to use an inmemory database
            var contextOptions = new DbContextOptionsBuilder<API.Data.ZipitContext>()
                  .UseInMemoryDatabase(System.Guid.NewGuid().ToString())
                  .Options;

            // Create a new instance of the ZipitContext
            var context = new API.Data.ZipitContext(contextOptions);

            // Create a new instance on the ListingService with the mocked context
            ListingService listingService = new(context);

            // Create a listing
            await listingService.CreateListing(Test);

            // Check for single field query - alter to check each field
            postCode = 4000;
            listingType = "";
            category = "";
            Assert.Equal(1, listingService.ListingByFilter(postCode, listingType, category).Count());

            // Check for two field query - alter to check each field
            postCode = 4000;
            listingType = "Product";
            category = "";
            Assert.Equal(1, listingService.ListingByFilter(postCode, listingType, category).Count());

            // Check for three field query - alter to check each field
            postCode = 4000;
            listingType = "Product";
            category = "Test Products";
            Assert.Equal(1, listingService.ListingByFilter(postCode, listingType, category).Count());
        }

        [Fact]
        public async Task Listing_Service_ListingsByQueries_Fail()
        {
            string listingType;
            string category;
            int postCode;

            AddListingInput Test = new(
                1,
                4000,
                "Test Product",
                "Test Products",
                1,
                "Product",
                "Description",
                "Condition",
                "www.image.com"
                );

            // Change the context options to use an inmemory database
            var contextOptions = new DbContextOptionsBuilder<API.Data.ZipitContext>()
                  .UseInMemoryDatabase(System.Guid.NewGuid().ToString())
                  .Options;

            // Create a new instance of the ZipitContext
            var context = new API.Data.ZipitContext(contextOptions);

            // Create a new instance on the ListingService with the mocked context
            ListingService listingService = new(context);

            // Create a listing
            await listingService.CreateListing(Test);

            // Check for single field query - alter to check each field
            postCode = 0;
            listingType = "Wrong ListingType";
            category = "";
            Assert.Equal(0, listingService.ListingByFilter(postCode, listingType, category).Count());

            // Check for two field query - alter to check each field
            postCode = 4000;
            listingType = "Wrong ListingType";
            category = "";
            Assert.Equal(0, listingService.ListingByFilter(postCode, listingType, category).Count());

            // Check for three field query - alter to check each field
            postCode = 4000;
            listingType = "Wrong ListingType";
            category = "Test Products";
            Assert.Equal(0, listingService.ListingByFilter(postCode, listingType, category).Count());
        }

        private static IList<AddListingInput> GenerateListings()
        {
            // Create a new instance on the fixture
            Fixture fixture = new();

            // Generte and return the list
            return fixture.Build<List<AddListingInput>>().Create();
        }

        private static AddListingInput GenerateListingInput()
        {
            // Create a new instance on the fixture
            Fixture fixture = new();

            // Customise the email address and return
            AddListingInput addListingInput = fixture.Build<AddListingInput>().Create();

            return addListingInput;
        }
    }
}