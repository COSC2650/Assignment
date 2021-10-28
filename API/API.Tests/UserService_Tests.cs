using Xunit;
using API.Models;
using API.Services;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using AutoFixture;
using System.Threading.Tasks;
using API.GraphQL.Users;
using API.Extensions;
using Moq;

namespace Tests
{
    public class UserService_Tests {

        // Mock an instance of the SMTP client
        readonly Mock<ISmtpClient> mockedSMTPClient = new();

        [Fact]
        public async Task UserService_GetAll()
        {
            // Generate a series of users
            IList<AddUserInput> users = GenerateUsers();

            // Change the context options to use an inmemory database
            var contextOptions = new DbContextOptionsBuilder<API.Data.ZipitContext>()
                  .UseInMemoryDatabase(System.Guid.NewGuid().ToString())
                  .Options;

            // Create a new instance of the ZipitContext
            var context = new API.Data.ZipitContext(contextOptions);

            // Create a new instance on the UserService with the mocked context
            UserService userService = new(context);

            // Add the users
            foreach (AddUserInput input in users)
                await userService.CreateUser(input, new API.Extensions.SmtpClient());

            // Get all users
            var usersToAssert = userService.GetAll();

            // Assert that the generated list is equal to the returned
            Assert.Equal(usersToAssert.Count(), users.Count);
        }

        [Fact]
        public async Task UserService_Create()
        {
            // Create sample users
            User user;
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
            user = await userService.CreateUser(input, mockedSMTPClient.Object);

            // Get all users
            var userToAssert = userService.GetAll().FirstOrDefault();

            // Assert that the generated list is equal to the returned
            Assert.Equal(userToAssert, user);
        }

        [Fact]
        public async Task UserService_GetUserByEmail()
        {
            AddUserInput input = new(
                "firstName",
                "lastName",
                "street",
                "city",
                "###",
                0000, 
                "test@email.com",
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
            await userService.CreateUser(input, mockedSMTPClient.Object);

            Assert.NotNull(await userService.GetUserByEmail(input.UserEmail, input.UserPassword));
        }

        [Fact]
        public async Task UserService_GetUserByEmail_BadEmail()
        {
            AddUserInput input = new(
                "firstName",
                "lastName",
                "street",
                "city",
                "###",
                0000, 
                "test@email.com",
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
            await userService.CreateUser(input, mockedSMTPClient.Object);

            Assert.Null(await userService.GetUserByEmail("bad@email.com", input.UserPassword));
        }

        [Fact]
        public async Task UserService_GetUserByEmail_BadPass()
        {
            AddUserInput input = new(
                "firstName",
                "lastName",
                "street",
                "city",
                "###",
                0000, 
                "test@email.com",
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
            await userService.CreateUser(input, mockedSMTPClient.Object);

            Assert.Null(await userService.GetUserByEmail(input.UserEmail, "badPassword"));
        }

         [Fact]
         public async Task UserService_Delete()
         {
             // Create sample users
            AddUserInput input = new(
                "firstName",
                "lastName",
                "street",
                "city",
                "###",
                0000, 
                "test@email.com",
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
             var genInput = await userService.CreateUser(input, mockedSMTPClient.Object);

             // Check we've added a user
             Assert.Equal(1, userService.GetAll().Count());

             // Delete the user
             await userService.DeleteUser(genInput.UserID);

             // Check we have successfully delete the user
             Assert.Equal(0, userService.GetAll().Count());
         }
        private static IList<AddUserInput> GenerateUsers()
        {
            // Create a new instance on the fixture
            Fixture fixture = new();

            // Generte and return the list
            return fixture.Build<List<AddUserInput>>().Create();
        }

        private static AddUserInput GenerateUserInput()
        {
            // Create a new instance on the fixture
            Fixture fixture = new();

            // Generte and return the list
            AddUserInput addUserInput = fixture.Build<AddUserInput>()
                .With(x => x.UserEmail, string.Format("{0}@{1}.com", fixture.Create<string>(), fixture.Create<string>()))
                .Create();

            // Return the fixture
            return addUserInput;
        }
    }
}
