using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;
using API.Extensions;
using API.GraphQL.Users;
using System;
using System.Collections.Generic;

namespace API.Services
{
    public class MessageService : IMessageService
    {
        private readonly ZipitContext _context;

        public MessageService(ZipitContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateMessage(int listingID, int senderID, string messageBody)
        {
            if(listingID == 0 || senderID == 0 || messageBody.Length < 3)
                return false;
            
            var listing = _context.Listings.FirstOrDefault(x => x.ListingID == listingID);
            var sender = _context.Users.FirstOrDefault(x => x.UserID == senderID);

            var message = new Message{
                UserID = listing.UserID,
                ListingID = listingID,
                SenderID = senderID,
                SenderEmail = sender.UserEmail,
                SenderFirstName = sender.UserFirstName,
                SenderLastName = sender.UserLastName,
                MessageBody = messageBody
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            return true;
        }

        public IQueryable<Message> GetAll()
        {
            return _context.Messages.AsQueryable();
        }

        public IQueryable<Message> GetUserMessages(int userID)
        {
            return _context.Messages.Where(x => x.UserID == userID);
        }
    }
}
