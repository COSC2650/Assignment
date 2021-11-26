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
            var listingsToAssert = context.Listings;

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
            var listingToAssert = context.Listings.First();

            // Assert that the generated list is equal to the returned
            Assert.Equal(listingToAssert, testListing);
        }

        [Fact]
        public async Task Listing_Service_ListingsByFilter_Pass()
        {
            AddListingInput Test = new(
                1,
                4000,
                "Title",
                "Category",
                2,
                "Type",
                "Description",
                "Condition"
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
            Assert.Equal(1, listingService.ListingByFilter(0, "", 0, 0, "", "", "").Count());

            // Check for minPrice field query
            Assert.Equal(1, listingService.ListingByFilter(0, "", 1, 0, "", "", "").Count());

            // Check for maxPrice field query
            Assert.Equal(1, listingService.ListingByFilter(0, "", 0, 3, "", "", "").Count());

            // Check for minPrice and maxPrice field query
            Assert.Equal(1, listingService.ListingByFilter(0, "", 1, 3, "", "", "").Count());

            // Check for equal minPrice and maxPrice field query
            Assert.Equal(1, listingService.ListingByFilter(0, "", 2, 2, "", "", "").Count());

            // Check for one field query - postcode
            Assert.Equal(1, listingService.ListingByFilter(4000, "", 0, 0, "", "", "").Count());

            // Check for one field query - keyword
            Assert.Equal(1, listingService.ListingByFilter(0, "Title", 0, 0, "", "", "").Count());
            Assert.Equal(1, listingService.ListingByFilter(0, "Description", 0, 0, "", "", "").Count());

            // Check for one field query - type
            Assert.Equal(1, listingService.ListingByFilter(0, "", 0, 0, "Type", "", "").Count());

            // Check for two field query - type + postcode
            Assert.Equal(1, listingService.ListingByFilter(4000, "", 0, 0, "Type", "", "").Count());

            // Check for two field query - type + keyword
            Assert.Equal(1, listingService.ListingByFilter(0, "Title", 0, 0, "Type", "", "").Count());
            Assert.Equal(1, listingService.ListingByFilter(0, "Description", 0, 0, "Type", "", "").Count());

            // Check for two field query - type + category
            Assert.Equal(1, listingService.ListingByFilter(0, "", 0, 0, "Type", "Category", "").Count());

            // Check for two field query - type + quality
            Assert.Equal(1, listingService.ListingByFilter(0, "", 0, 0, "Type", "", "Condition").Count());

            // Check for two field query - postcode + keyword
            Assert.Equal(1, listingService.ListingByFilter(4000, "Title", 0, 0, "", "", "").Count());
            Assert.Equal(1, listingService.ListingByFilter(4000, "Description", 0, 0, "", "", "").Count());

            // Check for three field query - type + postcode + keyword
            Assert.Equal(1, listingService.ListingByFilter(4000, "Title", 0, 0, "Type", "", "").Count());
            Assert.Equal(1, listingService.ListingByFilter(4000, "Description", 0, 0, "Type", "", "").Count());

            // Check for three field query - type + postcode + category
            Assert.Equal(1, listingService.ListingByFilter(4000, "", 0, 0, "Type", "Category", "").Count());

            // Check for three field query - type + postcode + quality
            Assert.Equal(1, listingService.ListingByFilter(4000, "", 0, 0, "Type", "", "Condition").Count());

            // Check for three field query - type + keyword + category
            Assert.Equal(1, listingService.ListingByFilter(0, "Title", 0, 0, "Type", "Category", "").Count());
            Assert.Equal(1, listingService.ListingByFilter(0, "Description", 0, 0, "Type", "Category", "").Count());

            // Check for three field query - type + keyword + quality
            Assert.Equal(1, listingService.ListingByFilter(0, "Title", 0, 0, "Type", "", "Condition").Count());
            Assert.Equal(1, listingService.ListingByFilter(0, "Description", 0, 0, "Type", "", "Condition").Count());

            // Check for four field query - type + postcode + keyword + category 
            Assert.Equal(1, listingService.ListingByFilter(4000, "Title", 0, 0, "Type", "Category", "").Count());
            Assert.Equal(1, listingService.ListingByFilter(4000, "Description", 0, 0, "Type", "Category", "").Count());

            // Check for four field query - type + postcode + keyword + quality
            Assert.Equal(1, listingService.ListingByFilter(4000, "Title", 0, 0, "Type", "", "Condition").Count());
            Assert.Equal(1, listingService.ListingByFilter(4000, "Description", 0, 0, "Type", "", "Condition").Count());

            // Check for four field query - type + keyword + category + quality
            Assert.Equal(1, listingService.ListingByFilter(0, "Title", 0, 0, "Type", "Category", "Condition").Count());
            Assert.Equal(1, listingService.ListingByFilter(0, "Description", 0, 0, "Type", "Category", "Condition").Count());

            // Check for four field query - type + postcode + category + quality
            Assert.Equal(1, listingService.ListingByFilter(4000, "", 0, 0, "Type", "Category", "Condition").Count());

            // Check for five field query - type + postcode + keyword + category + quality
            Assert.Equal(1, listingService.ListingByFilter(4000, "Title", 0, 0, "Type", "Category", "Condition").Count());
            Assert.Equal(1, listingService.ListingByFilter(4000, "Description", 0, 0, "Type", "Category", "Condition").Count());
        }

        [Fact]
        public async Task Listing_Service_ListingsByFilter_Fail()
        {
            AddListingInput Test = new(
                1,
                4000,
                "Title",
                "Category",
                2,
                "Type",
                "Description",
                "Condition"
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

            // Check for higher minPrice than maxPrice field query
            Assert.Equal(0, listingService.ListingByFilter(0, "", 2, 1, "", "", "").Count());

            // Check for wrong postcode
            Assert.Equal(0, listingService.ListingByFilter(3000, "", 2, 1, "", "", "").Count());

            // Check for wrong keyword
            Assert.Equal(0, listingService.ListingByFilter(0, "wrong", 2, 1, "", "", "").Count());

            // Check for wrong type
            Assert.Equal(0, listingService.ListingByFilter(0, "", 2, 1, "wrong", "", "").Count());

            // Check for wrong type + postcode
            Assert.Equal(0, listingService.ListingByFilter(3000, "", 0, 0, "wrong", "", "").Count());
            
            // Check for wrong type + keyword
            Assert.Equal(0, listingService.ListingByFilter(0, "wrong", 0, 0, "wrong", "", "").Count());

            // Check for wrong keyword + postcode
            Assert.Equal(0, listingService.ListingByFilter(3000, "wrong", 0, 0, "", "", "").Count());

            // Check for wrong type + category
            Assert.Equal(0, listingService.ListingByFilter(0, "", 0, 0, "wrong", "wrong", "").Count());

            // Check for wrong type + quality
            Assert.Equal(0, listingService.ListingByFilter(0, "", 0, 0, "wrong", "", "wrong").Count());

            // listType + postCode + keyword
            Assert.Equal(0, listingService.ListingByFilter(4000, "wrong", 0, 0, "wrong", "", "").Count());

            // listType + postCode + category
            Assert.Equal(0, listingService.ListingByFilter(4000, "wrong", 0, 0, "wrong", "", "").Count());

            // listType + postCode + quality
            Assert.Equal(0, listingService.ListingByFilter(4000, "wrong", 0, 0, "", "", "wrong").Count());

            // listType + category + keyword
            Assert.Equal(0, listingService.ListingByFilter(0, "wrong", 0, 0, "wrong", "wrong", "").Count());

            // listType + condition + keyword
            Assert.Equal(0, listingService.ListingByFilter(0, "wrong", 0, 0, "wrong", "", "wrong").Count());

            // listType + postcode + keyword + catgeory
            Assert.Equal(0, listingService.ListingByFilter(3000, "wrong", 0, 0, "wrong", "wrong", "").Count());

            // listType + postcode + keyword + condition
            Assert.Equal(0, listingService.ListingByFilter(3000, "wrong", 0, 0, "wrong", "", "wrong").Count());

            // listType + condition + keyword + category
            Assert.Equal(0, listingService.ListingByFilter(0, "wrong", 0, 0, "wrong", "wrong", "wrong").Count());

            // listType + condition + postcode + category
            Assert.Equal(0, listingService.ListingByFilter(3000, "", 0, 0, "wrong", "wrong", "wrong").Count());

            // keyword + condition + postcode + category (should be impossible)
            Assert.Equal(0, listingService.ListingByFilter(3000, "wrong", 0, 0, "", "wrong", "wrong").Count());

            // listType + keyword + condition + postcode + category 
            Assert.Equal(0, listingService.ListingByFilter(3000, "wrong", 0, 0, "wrong", "wrong", "wrong").Count());
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
				"New"
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
            var genInput = await listingService.CreateListing(input);

            // Check we've added a listing
            Assert.Equal(1, context.Listings.Count());

            // Create edit input for listing change first name
            AddListingInput editInput = new(
				123,
                3000,
                "editTitle",
                "editCategory",
				1,
                "editType",
				"editDescription",
				"editCondition"
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
				"New"
                );
            
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
				"New"
                );
            
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
				"New"
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
             var genInput = await listingService.CreateListing(input);

             // Check we've added a listing
             Assert.Equal(1, context.Listings.Count());

             // Delete the listing
             await listingService.DeleteListing(genInput.ListingID);

             // Check we have successfully delete the listing
             Assert.Equal(0, context.Listings.Count());
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
                "Condition"
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
				"New"
                );
            
            AddListingInput secondInput = new(
                2,
                3000,
                "A bug zapper",
                "Good Condition",
                0,
                "Product",
				"Selling my bug zapper",
				"New"
                );

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
            Assert.Equal(2, context.Listings.Count());

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
				"New"
                );

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
            Assert.Equal(1, context.Listings.Count());

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

        public static AddListingInput GenerateListingInput()
        {
            // Create a new instance on the fixture
            Fixture fixture = new();

            // Customise the email address and return
            AddListingInput addListingInput = fixture.Build<AddListingInput>().Create();

            return addListingInput;
        }
    }
}