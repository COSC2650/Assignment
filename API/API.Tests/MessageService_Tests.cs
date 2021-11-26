using Xunit;
using API.Models;
using API.Services;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using AutoFixture;
using System.Threading.Tasks;
using API.GraphQL.Users;
using API.GraphQL.Messages;
using API.Extensions;
using Moq;
using System;
using API.GraphQL.Listings;

namespace Tests
{
    public class MessageService_Tests 
    {
        // Mock an instance of the SMTP client
        readonly Mock<ISmtpClient> mockedSMTPClient = new();

        [Fact]
        public async Task MessageService_ModelTest()
        {
            // Generate a user
            AddUserInput user = UserService_Tests.GenerateUserInput();

            // generate a listing
            AddListingInput listing = ListingService_Tests.GenerateListingInput();

            // Change the context options to use an inmemory database
            var contextOptions = new DbContextOptionsBuilder<API.Data.ZipitContext>()
                  .UseInMemoryDatabase(System.Guid.NewGuid().ToString())
                  .Options;

            // Create a new instance of the ZipitContext
            var context = new API.Data.ZipitContext(contextOptions);

            // Create a new instance on the UserService with the mocked context
            UserService userService = new(context);

            // Create a new instance on the ListingService with the mocked context
            ListingService listingService = new(context);

            // Create a new instance on the MessageService with the mocked context
            MessageService messageService = new(context);

            // Add the user
            var genUser = await userService.CreateUser(user, mockedSMTPClient.Object);

            // Add the listing
            var genListing = await listingService.CreateListing(listing);

            // Create new message
            Message message = new()
            {
                UserID = genListing.UserID,
                ListingID = genListing.ListingID,
                SenderID = genUser.UserID,
                MessageBody = "Test"
            };

            Assert.Equal(genListing.UserID, message.UserID);
            Assert.Equal(genListing.ListingID, message.ListingID);
            Assert.Equal(genUser.UserID, message.SenderID);
            Assert.Equal("Test", message.MessageBody);
            Assert.IsType<int>(message.MessaageID);
            Assert.Null(message.User);
            Assert.Null(message.Listing);

            context.Messages.Add(message);
            context.SaveChanges();

            Assert.Equal(1, messageService.GetAll().Count());

            var listData = context.Listings.FirstOrDefault();
            Assert.NotEmpty(listData.Messages);

            var userData = context.Users.FirstOrDefault();
            Assert.Null(userData.Messages);
            Assert.Null(userData.Listings);
            Assert.Null(userData.Role);
        }
        
        [Fact]
        public async Task MessageService_CreateMessageTest()
        {
            // Generate a user
            AddUserInput user = UserService_Tests.GenerateUserInput();

            // generate a listing
            AddListingInput listing = ListingService_Tests.GenerateListingInput();

            // Change the context options to use an inmemory database
            var contextOptions = new DbContextOptionsBuilder<API.Data.ZipitContext>()
                  .UseInMemoryDatabase(System.Guid.NewGuid().ToString())
                  .Options;

            // Create a new instance of the ZipitContext
            var context = new API.Data.ZipitContext(contextOptions);

            // Create a new instance on the UserService with the mocked context
            UserService userService = new(context);

            // Create a new instance on the ListingService with the mocked context
            ListingService listingService = new(context);

            // Create a new instance on the MessageService with the mocked context
            MessageService messageService = new(context);

            // Add the user
            var genUser = await userService.CreateUser(user, mockedSMTPClient.Object);

            // Add the listing
            var genListing = await listingService.CreateListing(listing);

            // Create new message
            Assert.True(await messageService.CreateMessage(genListing.ListingID, genUser.UserID, "Test"));

            // fail new message
            Assert.False(await messageService.CreateMessage(0, genUser.UserID, "Test"));
            Assert.False(await messageService.CreateMessage(genListing.ListingID, 0, "Test"));
            Assert.False(await messageService.CreateMessage(genListing.ListingID, genUser.UserID, ""));

            var message = context.Messages.FirstOrDefault();

            Assert.Equal(genUser.UserEmail, message.SenderEmail);
            Assert.Equal(genUser.UserFirstName, message.SenderFirstName);
            Assert.Equal(genUser.UserLastName, message.SenderLastName);
        }

        [Fact]
        public async Task MessageService_GetUserMessagesTest()
        {
            // Generate a user
            AddUserInput user = UserService_Tests.GenerateUserInput();

            // generate a listing
            AddListingInput listing = ListingService_Tests.GenerateListingInput();

            // Change the context options to use an inmemory database
            var contextOptions = new DbContextOptionsBuilder<API.Data.ZipitContext>()
                  .UseInMemoryDatabase(System.Guid.NewGuid().ToString())
                  .Options;

            // Create a new instance of the ZipitContext
            var context = new API.Data.ZipitContext(contextOptions);

            // Create a new instance on the UserService with the mocked context
            UserService userService = new(context);

            // Create a new instance on the ListingService with the mocked context
            ListingService listingService = new(context);

            // Create a new instance on the MessageService with the mocked context
            MessageService messageService = new(context);

            // Add the user
            var genUser = await userService.CreateUser(user, mockedSMTPClient.Object);

            // Add the listing
            var genListing = await listingService.CreateListing(listing);

            // Create new message
            await messageService.CreateMessage(genListing.ListingID, genUser.UserID, "Test");

            // get user messages
            Assert.Equal(1, messageService.GetUserMessages(genListing.UserID).Count());
        }
    }
}