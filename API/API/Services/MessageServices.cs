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

        public IQueryable<Message> GetAll()
        {
            return _context.Messages.AsQueryable();
        }
    }
}
