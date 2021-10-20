using Xunit;
using Moq;
using API.Models;
using API.Services;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using AutoFixture;
using System.Threading.Tasks;
using API.GraphQL.Users;
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

        private static Listing CreateListing()
        {
            // Create a new instance on the fixture
            Fixture fixture = new();

            // Generte and return the list
            return fixture.Build<Listing>().Create();
        }
    }
}