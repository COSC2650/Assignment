using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.GraphQL.Listings;
using API.Models;

  
namespace API.Services
{  
   public interface IMessageService  
    {  
        IQueryable<Message> GetAll();
    }
}