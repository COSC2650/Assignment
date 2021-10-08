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
using API.GraphQL.Users;
using API.Extensions;

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
        public async Task UserService_Create()
        {
            // Create sample users
            User user = GenerateUser();
            AddUserInput input = GenerateUserInput();

            // Change the context options to use an inmemory database
            var contextOptions = new DbContextOptionsBuilder<API.Data.ZipitContext>()
                  .UseInMemoryDatabase(System.Guid.NewGuid().ToString())
                  .Options;

            // Create a new instance of the ZipitContext
            var context = new API.Data.ZipitContext(contextOptions);

            // Create a new instance on the UserService with the mocked context
            UserService userService = new(context);

            // Create a user
            user = await userService.Create(input);

            // Get all users
            var userToAssert = userService.GetAll().FirstOrDefault();

            // Assert that the generated list is equal to the returned
            Assert.Equal(userToAssert, user);
        }

        [Fact]
        public async Task UserService_GetUserByEmail()
        {
            AddUserInput input = new AddUserInput(
                "ted",
                "whatever",
                "123 faKE ST",
                "Yup",
                "QLD",
                3123, 
                "123@test.com",
                "password");

            // Change the context options to use an inmemory database
            var contextOptions = new DbContextOptionsBuilder<API.Data.ZipitContext>()
                  .UseInMemoryDatabase(System.Guid.NewGuid().ToString())
                  .Options;

            // Create a new instance of the ZipitContext
            var context = new API.Data.ZipitContext(contextOptions);

            // Create a new instance on the UserService with the mocked context
            UserService userService = new(context);

            // Create a user
            await userService.Create(input);

            Assert.NotNull(await userService.GetUserByEmail(input.Email, input.Password));
        }

        [Fact]
        public async Task UserService_GetUserByEmail_BadEmail()
        {
            AddUserInput input = new AddUserInput(
                "ted",
                "whatever",
                "123 fake st",
                "Yup",
                "QLD",
                3123, 
                "123@test.com",
                "password");

            // Change the context options to use an inmemory database
            var contextOptions = new DbContextOptionsBuilder<API.Data.ZipitContext>()
                  .UseInMemoryDatabase(System.Guid.NewGuid().ToString())
                  .Options;

            // Create a new instance of the ZipitContext
            var context = new API.Data.ZipitContext(contextOptions);

            // Create a new instance on the UserService with the mocked context
            UserService userService = new(context);

            // Create a user
            await userService.Create(input);

            Assert.Null(await userService.GetUserByEmail("kajdfkajfk@kjajfkfja", input.Password));
        }

        [Fact]
        public async Task UserService_GetUserByEmail_BadPass()
        {
            AddUserInput input = new AddUserInput(
                "ted",
                "whatever",
                "123 fake st",
                "Yup",
                "QLD",
                3123, 
                "123@test.com",
                "password");

            // Change the context options to use an inmemory database
            var contextOptions = new DbContextOptionsBuilder<API.Data.ZipitContext>()
                  .UseInMemoryDatabase(System.Guid.NewGuid().ToString())
                  .Options;

            // Create a new instance of the ZipitContext
            var context = new API.Data.ZipitContext(contextOptions);

            // Create a new instance on the UserService with the mocked context
            UserService userService = new(context);

            // Create a user
            await userService.Create(input);

            Assert.Null(await userService.GetUserByEmail(input.Email, "jkhasjdhajh"));
        }

        // [Fact]
        // public async Task UserService_Delete()
        // {
        //     // Create sample users
        //     User user = GenerateUser();

        //     // Change the context options to use an inmemory database
        //     var contextOptions = new DbContextOptionsBuilder<API.Data.ZipitContext>()
        //           .UseInMemoryDatabase(System.Guid.NewGuid().ToString())
        //           .Options;

        //     // Create a new instance of the ZipitContext
        //     var context = new API.Data.ZipitContext(contextOptions);

        //     // Create a new instance on the UserService with the mocked context
        //     UserService userService = new(context);

        //     // Create a user
        //     await userService.Create(user);

        //     // Check we've added a user
        //     Assert.Equal(1, userService.GetAll().Count());

        //     // Delete the user
        //     await userService.Delete(user.UserID);

        //     // Check we have successfully delete the user
        //     Assert.Equal(0, userService.GetAll().Count());
        // }

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
            var user = fixture.Build<User>().Create();
            user.Email = "123@test.com";
            var password = Hashbrowns.HashPassword("password");
            user.PasswordHash = password;
            return user;
        }

        private static AddUserInput GenerateUserInput()
        {
            // Create a new instance on the fixture
            Fixture fixture = new();

            // Generte and return the list
            return fixture.Build<AddUserInput>().Create();
          
        }
    }
}