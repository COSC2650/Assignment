using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.Services;
using HotChocolate.Types;

namespace API.GraphQL.Messages
{
    [ExtendObjectType("Query")]
    public class MessageQueries
    {
        private readonly IMessageService _messageService;

        public MessageQueries(IMessageService messageService)
        {
            _messageService = messageService;
        }

        public IQueryable<Message> Messages => _messageService.GetAll();
    }
}