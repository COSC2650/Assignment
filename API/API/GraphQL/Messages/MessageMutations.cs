using System.Threading.Tasks;
using API.Models;
using API.Services;
using HotChocolate.Types;

namespace API.GraphQL.Messages
{
    [ExtendObjectType("Mutation")]  
    public class MessageMutations  
    {  
        private readonly IMessageService _messageService;  
  
        public MessageMutations(IMessageService messageService)  
        {  
            _messageService = messageService;  
        }  

        public async Task<bool> CreateMessage(int listingID, int senderID, string messageBody) 
            => await _messageService.CreateMessage(listingID, senderID, messageBody);
    }
}
