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
using System;

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
        public async Task UserService_Create_AlredyExists()
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
            await userService.CreateUser(input, mockedSMTPClient.Object);

            // Try to create the user again
            user = await userService.CreateUser(input, mockedSMTPClient.Object);

            // Assert that the generated list is equal to the returned
            Assert.Equal(0, user.UserID);
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

        [Fact]
        public async Task UserService_ConfirmUser()
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

            // Retrieve the confirmation code
            int code = context.ConfirmCodes.Where(x => x.Email == user.UserEmail).First().Code;

            // Confirm the user
            Assert.Equal((await userService.ConfirmUser(user.UserEmail, code)).UserID, user.UserID);
        }

        [Fact]
        public async Task UserService_EditUser()
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

            // Create edit input for user change first name
            AddUserInput editInput = new(
                "editFirstName",
                "editLastName",
                "editStreet",
                "editCity",
                "EDI",
                4111,
                "",
                "");
            
            // Edit user first details
            await userService.EditUser(genInput.UserID, editInput);
            
            // Finds edit user
            var editedUser = context.Users.First(x => x.UserID == genInput.UserID);

            // Checks editted values against editInput
            Assert.Equal(editInput.UserFirstName, editedUser.UserFirstName);
            Assert.Equal(editInput.UserLastName, editedUser.UserLastName);
            Assert.Equal(editInput.UserStreet, editedUser.UserStreet);
            Assert.Equal(editInput.UserCity, editedUser.UserCity);
            Assert.Equal(editInput.UserState, editedUser.UserState);
            Assert.Equal(editInput.UserPostCode, editedUser.UserPostCode);

            // bad userID check
            var invalidUserID = 0;
            Assert.Null(await userService.EditUser(invalidUserID, editInput));

            // check postcode range logic condition
            AddUserInput invalidPostCodeRange = new(
                "editFirstName",
                "editLastName",
                "editStreet",
                "editCity",
                "EDI",
                700,
                "",
                "");
            
            // Edit user first details
            await userService.EditUser(genInput.UserID, invalidPostCodeRange);
            
            // Finds edit user
            var editInvalidPostCodeRange = context.Users.First(x => x.UserID == genInput.UserID);

            // Assert PostCode fail (should be equal to previous working edit)
            Assert.Equal(editInvalidPostCodeRange.UserPostCode, editInput.UserPostCode);

            // check postcode range logic condition
            AddUserInput invalidPostCodeZero = new(
                "editFirstName",
                "editLastName",
                "editStreet",
                "editCity",
                "EDI",
                0,
                "",
                "");
            
            // Edit user first details
            await userService.EditUser(genInput.UserID, invalidPostCodeZero);
            
            // Finds edit user
            var editInvalidPostCodeZero = context.Users.First(x => x.UserID == genInput.UserID);

            // Assert PostCode fail (should be equal to previous working edit)
            Assert.Equal(editInvalidPostCodeZero.UserPostCode, editInput.UserPostCode);

        }

        [Fact]
        public void PasswordHashSuccess()
        {
            var hash = Hashbrowns.HashPassword("password");
            Assert.True(Hashbrowns.ValidatePassword("password", hash));
        }

        [Fact]
        public async Task AdminUserSearch_Test()
        {
            // Create sample user input data
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

            // Check user exists
            Assert.Equal(1, userService.GetAll().Count());

            // check email search
            Assert.NotEmpty(userService.AdminUserSearch(genInput.UserEmail, 0, ""));

            // check id search
            Assert.NotEmpty(userService.AdminUserSearch("1", 0, ""));

            // check role search (default user role = 2)
            Assert.NotEmpty(userService.AdminUserSearch("", 2, ""));

            // check string keywords
            Assert.NotEmpty(userService.AdminUserSearch("", 0, "test@email.com"));
            Assert.NotEmpty(userService.AdminUserSearch("", 0, "firstName"));
            Assert.NotEmpty(userService.AdminUserSearch("", 0, "lastName")); 
            Assert.NotEmpty(userService.AdminUserSearch("", 0, "street"));
            Assert.NotEmpty(userService.AdminUserSearch("", 0, "city"));
            Assert.NotEmpty(userService.AdminUserSearch("", 0, "###"));

            // check number keywords
            Assert.NotEmpty(userService.AdminUserSearch("", 0, "0000"));

            // check no fields
            Assert.Empty(userService.AdminUserSearch("", 0, ""));
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

            // Customise the email address and return
            AddUserInput addUserInput = fixture.Build<AddUserInput>()
            .With(x => x.UserEmail, string.Format("{0}@{1}.com", fixture.Create<string>(), fixture.Create<string>()))
            .Create();

            return addUserInput;
        }
    }
}
