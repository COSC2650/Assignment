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
using Moq;
using API.Extensions;

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

            // Check for zero field query
            postCode = 0;
            listingType = "";
            category = "";
            Assert.Equal(1, listingService.ListingByFilter(postCode, listingType, category).Count());

            // Check for single field query - postcode
            postCode = 4000;
            listingType = "";
            category = "";
            Assert.Equal(1, listingService.ListingByFilter(postCode, listingType, category).Count());

            // Check for single field query - listingtype
            postCode = 0;
            listingType = "Product";
            category = "";
            Assert.Equal(1, listingService.ListingByFilter(postCode, listingType, category).Count());

            // Check for single field query - category
            postCode = 0;
            listingType = "";
            category = "Test Products";
            Assert.Equal(1, listingService.ListingByFilter(postCode, listingType, category).Count());

            // Check for two field query - postcode and listingtype
            postCode = 4000;
            listingType = "Product";
            category = "";
            Assert.Equal(1, listingService.ListingByFilter(postCode, listingType, category).Count());

            // Check for two field query - postcode and category
            postCode = 4000;
            listingType = "";
            category = "Test Products";
            Assert.Equal(1, listingService.ListingByFilter(postCode, listingType, category).Count());

            // Check for two field query - listingtype and category
            postCode = 0;
            listingType = "Product";
            category = "Test Products";
            Assert.Equal(1, listingService.ListingByFilter(postCode, listingType, category).Count());

            // Check for three field query - alter to check each field
            postCode = 4000;
            listingType = "Product";
            category = "Test Products";
            Assert.Equal(1, listingService.ListingByFilter(postCode, listingType, category).Count());
        }
        [Fact]
        public async Task ListingService_EditListing()
        {
            // Create sample listings
            AddListingInput input = new(
                123,
                3000,
                "A bug zapper",
                "Good Condition",
                0,
                "Product",
				"Selling my bug zapper",
				"New",
                "https://picsum.photos/100?random=5");

            // Change the context options to use an inmemory database
            var contextOptions = new DbContextOptionsBuilder<API.Data.ZipitContext>()
                .UseInMemoryDatabase(System.Guid.NewGuid().ToString())
                .Options;

            // Create a new instance of the ZipitContext
            var context = new API.Data.ZipitContext(contextOptions);

            // Create a new instance on the ListingService with the mocked context
            ListingService listingService = new(context);

            // Create a listing
            var genInput = await listingService.CreateListing(input);

            // Check we've added a listing
            Assert.Equal(1, listingService.GetAll().Count());

            // Create edit input for listing change first name
            AddListingInput editInput = new(
				123,
                3000,
                "editTitle",
                "editCategory",
				1,
                "editType",
				"editDescription",
				"editCondition",
				"https://picsum.photos/100?random=5"
				);
            
            // Edit listing first details
            await listingService.EditListing(genInput.ListingID, editInput);
            
            // Finds edit listing
            var editedListing = context.Listings.First(x => x.ListingID == genInput.ListingID);

            // Checks editted values against editInput
            Assert.Equal(editInput.ListingPostCode, editedListing.ListingPostCode);
            Assert.Equal(editInput.ListingTitle, editedListing.ListingTitle);
            Assert.Equal(editInput.ListingCategory, editedListing.ListingCategory);
            Assert.Equal(editInput.ListingPrice.ToString(), editedListing.ListingPrice.ToString());
            Assert.Equal(editInput.ListingType, editedListing.ListingType);
            Assert.Equal(editInput.ListingDescription, editedListing.ListingDescription);
			Assert.Equal(editInput.ListingCondition, editedListing.ListingCondition);

            // bad listingID check
            var invalidListingID = 0;
            Assert.Null(await listingService.EditListing(invalidListingID, editInput));

            // check postcode range logic condition
            AddListingInput invalidPostCodeRange = new(
                123,
                300,
                "A bug zapper",
                "Good Condition",
                0,
                "Product",
				"Selling my bug zapper",
				"New",
                "https://picsum.photos/100?random=5");
            
            // Edit listing first details
            await listingService.EditListing(genInput.ListingID, invalidPostCodeRange);
            
            // Finds edit listing
            var editInvalidPostCodeRange = context.Listings.First(x => x.ListingID == genInput.ListingID);

            // Assert PostCode fail (should be equal to previous working edit)
            Assert.Equal(editInvalidPostCodeRange.ListingPostCode, editInput.ListingPostCode);

            // check postcode range logic condition
            AddListingInput invalidPostCodeZero = new(
                123,
                0,
                "A bug zapper",
                "Good Condition",
                0,
                "Product",
				"Selling my bug zapper",
				"New",
                "https://picsum.photos/100?random=5");
            
            // Edit listing first details
            await listingService.EditListing(genInput.ListingID, invalidPostCodeZero);
            
            // Finds edit listing
            var editInvalidPostCodeZero = context.Listings.First(x => x.ListingID == genInput.ListingID);

            // Assert PostCode fail (should be equal to previous working edit)
            Assert.Equal(editInvalidPostCodeZero.ListingPostCode, editInput.ListingPostCode);

        }

        [Fact]
        public async Task ListingService_Delete()
         {
             // Create sample listings
            AddListingInput input = new(
                123,
                3000,
                "A bug zapper",
                "Good Condition",
                0,
                "Product",
				"Selling my bug zapper",
				"New",
                "https://picsum.photos/100?random=5");

             // Change the context options to use an inmemory database
             var contextOptions = new DbContextOptionsBuilder<API.Data.ZipitContext>()
                   .UseInMemoryDatabase(System.Guid.NewGuid().ToString())
                   .Options;

             // Create a new instance of the ZipitContext
             var context = new API.Data.ZipitContext(contextOptions);

             // Create a new instance on the ListingService with the mocked context
             ListingService listingService = new(context);

             // Create a listing
             var genInput = await listingService.CreateListing(input);

             // Check we've added a listing
             Assert.Equal(1, listingService.GetAll().Count());

             // Delete the listing
             await listingService.DeleteListing(genInput.ListingID);

             // Check we have successfully delete the listing
             Assert.Equal(0, listingService.GetAll().Count());
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

        [Fact]
        public async Task AdminListingSearch_Test()
        {
            Mock<ISmtpClient> mockedSMTPClient = new();
            
            // Change the context options to use an inmemory database
            var contextOptions = new DbContextOptionsBuilder<API.Data.ZipitContext>()
                  .UseInMemoryDatabase(System.Guid.NewGuid().ToString())
                  .Options;

            // Create a new instance of the ZipitContext
            var context = new API.Data.ZipitContext(contextOptions);

            // Create a new instance on the ListingService with the mocked context
            ListingService listingService = new(context);

             // Create a new instance on the UserService with the mocked context
            UserService userService = new(context);

            // Create User
            var userInput = UserService_Tests.GenerateUserInput();
            var user = await userService.CreateUser(userInput, mockedSMTPClient.Object);

            // Listing Input
            AddListingInput Test = new(
                user.UserID,
                4000,
                "Test Product",
                "Test Products",
                1,
                "Product",
                "Description",
                "Condition",
                "www.image.com"
                );

            // Create a listing
            var listingTest = await listingService.CreateListing(Test);

            // check no fields entered 
            Assert.Empty(listingService.AdminListingSearch("", 0, ""));

            // check user 
            Assert.NotEmpty(listingService.AdminListingSearch(listingTest.UserID.ToString(), 0, ""));
            Assert.NotEmpty(listingService.AdminListingSearch(listingTest.User.UserEmail, 0, ""));

            // check listingID
            Assert.NotEmpty(listingService.AdminListingSearch("", listingTest.ListingID, ""));

            // check string keywords
            Assert.NotEmpty(listingService.AdminListingSearch("", 0, listingTest.User.UserEmail));
            Assert.NotEmpty(listingService.AdminListingSearch("", 0, listingTest.ListingTitle));
            Assert.NotEmpty(listingService.AdminListingSearch("", 0, listingTest.ListingDescription));
            Assert.NotEmpty(listingService.AdminListingSearch("", 0, listingTest.ListingCategory));
            Assert.NotEmpty(listingService.AdminListingSearch("", 0, listingTest.ListingCondition));
            Assert.NotEmpty(listingService.AdminListingSearch("", 0, listingTest.ListingType));

            // check integer keywords
            Assert.NotEmpty(listingService.AdminListingSearch("", 0, listingTest.UserID.ToString()));
            Assert.NotEmpty(listingService.AdminListingSearch("", 0, listingTest.ListingID.ToString()));
            Assert.NotEmpty(listingService.AdminListingSearch("", 0, listingTest.ListingPostCode.ToString()));
            Assert.NotEmpty(listingService.AdminListingSearch("", 0, listingTest.ListingPrice.ToString()));
        }

        [Fact]
        public async Task ListingService_MassDeleteSuccess()
         {
            // Create sample listings
            AddListingInput firstInput = new(
                1,
                3000,
                "A bug zapper",
                "Good Condition",
                0,
                "Product",
				"Selling my bug zapper",
				"New",
                "https://picsum.photos/100?random=5");
            
            AddListingInput secondInput = new(
                2,
                3000,
                "A bug zapper",
                "Good Condition",
                0,
                "Product",
				"Selling my bug zapper",
				"New",
                "https://picsum.photos/100?random=5");

            // Change the context options to use an inmemory database
            var contextOptions = new DbContextOptionsBuilder<API.Data.ZipitContext>()
                .UseInMemoryDatabase(System.Guid.NewGuid().ToString())
                .Options;

            // Create a new instance of the ZipitContext
            var context = new API.Data.ZipitContext(contextOptions);

            // Create a new instance on the ListingService with the mocked context
            ListingService listingService = new(context);

            // Create the listings
            var firstListing = await listingService.CreateListing(firstInput);
            var secondListing = await listingService.CreateListing(secondInput);

            // Check we've added the listings
            Assert.Equal(2, listingService.GetAll().Count());

            var listings = new int [] {firstListing.ListingID, secondListing.ListingID};

            // Delete the listings
            Assert.True(await listingService.DeleteMultiListings(listings));
        }

        [Fact]
        public async Task ListingService_MassDeleteFailure()
        {
            // Create sample listing - only one correct required
            AddListingInput firstInput = new(
                1,
                3000,
                "A bug zapper",
                "Good Condition",
                0,
                "Product",
				"Selling my bug zapper",
				"New",
                "https://picsum.photos/100?random=5");

            // Change the context options to use an inmemory database
            var contextOptions = new DbContextOptionsBuilder<API.Data.ZipitContext>()
                .UseInMemoryDatabase(System.Guid.NewGuid().ToString())
                .Options;

            // Create a new instance of the ZipitContext
            var context = new API.Data.ZipitContext(contextOptions);

            // Create a new instance on the ListingService with the mocked context
            ListingService listingService = new(context);

            // Create the listing
            var firstListing = await listingService.CreateListing(firstInput);

            // Check we've added the listing
            Assert.Equal(1, listingService.GetAll().Count());

            // send empty array
            var emptyListings = Array.Empty<int>();

            // Check that fail message is returned
            Assert.False(await listingService.DeleteMultiListings(emptyListings));

            // Check that fail message is returned
            Assert.False(await listingService.DeleteMultiListings(null));

            // send wrong ID
            var badListings = new int [] {firstListing.ListingID, 3};

            // Check that fail message is returned
            Assert.False(await listingService.DeleteMultiListings(badListings));
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