using Xunit;
using Moq;
using API.Models;
using API.Services;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using Moq.EntityFrameworkCore;
using AutoFixture;
using System.Threading.Tasks;

namespace Tests
{
    public class ZipitContext {

        [Fact]
        public void Users_SetAndGet()
        {
            // Create sample users
            IList<User> users = GenerateUsers();

            // Mock the ZipItContext
            var userContextMock = new Mock<API.Data.ZipitContext>();

            // Add the data to the context
            userContextMock.Setup(x => x.Users).ReturnsDbSet(users);

            // Create a new instance on the UserService with the mocked context
            UserService userService = new(userContextMock.Object);

            // Get all users
            var usersToAssert = userService.GetAll();

            // Assert that the generated list is equal to the returned
            Assert.Equal(usersToAssert, users);
        }

        private static IList<User> GenerateUsers()
        {
            IList<User> users = new List<User>();

            Fixture fixture = new();
            fixture.Build<List<User>>().Create();

            return users;
        }
    }
}