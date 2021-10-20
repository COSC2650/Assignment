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

namespace Tests
{   
    public class ListingTests
    {
        [Fact]
        public static Listing NewListing()
        {
            Listing Test = new Listing();
            Test.ListingType = "Product";
            Test.PostCode = 4000;
            Test.Price = 1.00M;
            Test.ProdCondition = "Great";
            Test.Title = "Test";
            Test.ServAvailability = System.DateTime.UtcNow;
            Test.DateListed = System.DateTime.UtcNow;
            Test.Description = "This is a test listing";
            Test.UserID = 1;
            Test.Category = "TestProduct";
            return Test;
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