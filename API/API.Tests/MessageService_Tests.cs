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
        public async Task UserService_GetAll()
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

            // Create a new instance on the UserService with the mocked context
            ListingService listingService = new(context);

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
                MessageBody = "Hi"
            };

            Assert.Equal(message.UserID, genListing.UserID);
            Assert.Equal(message.ListingID, genListing.ListingID);
            Assert.Equal(message.SenderID, genUser.UserID);
            Assert.Equal(message.MessageBody, "Hi");
        }
    }
}