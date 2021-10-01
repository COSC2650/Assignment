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
        public void UserService_GetAll()
        {
            // Create sample users
            IList<User> users = GenerateUsers();

            // Change the context options to use an inmemory database
            var contextOptions = new DbContextOptionsBuilder<API.Data.ZipitContext>()
                  .UseInMemoryDatabase(System.Guid.NewGuid().ToString())
                  .Options;

            // Mock the ZipItContext
            var userContextMock = new Mock<API.Data.ZipitContext>(contextOptions);

            // Add the data to the context
            userContextMock.Setup(x => x.Users).ReturnsDbSet(users);

            // Create a new instance on the UserService with the mocked context
            UserService userService = new(userContextMock.Object);

            // Get all users
            var usersToAssert = userService.GetAll();

            // Assert that the generated list is equal to the returned
            Assert.Equal(usersToAssert, users);
        }

        [Fact]
        public async void UserService_Create()
        {
            // Create sample users
            User user = GenerateUser();

            // Change the context options to use an inmemory database
            var contextOptions = new DbContextOptionsBuilder<API.Data.ZipitContext>()
                  .UseInMemoryDatabase(System.Guid.NewGuid().ToString())
                  .Options;

            // Create a new instance of the ZipitContext
            var context = new API.Data.ZipitContext(contextOptions);

            // Create a new instance on the UserService with the mocked context
            UserService userService = new(context);

            // Create a user
            await userService.Create(user);

            // Get all users
            var userToAssert = userService.GetAll().FirstOrDefault();

            // Assert that the generated list is equal to the returned
            Assert.Equal(userToAssert, user);
        }

        [Fact]
        public async void UserService_Delete()
        {
            // Create sample users
            User user = GenerateUser();

            // Change the context options to use an inmemory database
            var contextOptions = new DbContextOptionsBuilder<API.Data.ZipitContext>()
                  .UseInMemoryDatabase(System.Guid.NewGuid().ToString())
                  .Options;

            // Create a new instance of the ZipitContext
            var context = new API.Data.ZipitContext(contextOptions);

            // Create a new instance on the UserService with the mocked context
            UserService userService = new(context);

            // Create a user
            await userService.Create(user);

            // Check we've added a user
            Assert.Equal(userService.GetAll().Count(), 1);

            // Delete the user
            userService.Delete(user.UserID);

            // Check we have successfully delete the user
            Assert.Equal(userService.GetAll().Count(), 0);
        }

        private static IList<User> GenerateUsers()
        {
            // Create a new instance on the fixture
            Fixture fixture = new();

            // Generte and return the list
            return fixture.Build<List<User>>().Create();
        }

        private static User GenerateUser()
        {
            // Create a new instance on the fixture
            Fixture fixture = new();

            // Generte and return the list
            return fixture.Build<User>().Create();
        }
    }
}