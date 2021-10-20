using System.Linq;
using System.Threading.Tasks;
using API.Models;
  
namespace API.Services
{  
   public interface IListingService  
    {  
        Task<Listing> CreateListing(Listing listing);
        IQueryable<Listing> GetAll(); 
    }  
}  