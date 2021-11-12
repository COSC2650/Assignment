using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.GraphQL.Listings;
using API.Models;

  
namespace API.Services
{  
   public interface IListingService  
    {  
        Task<Listing> CreateListing(AddListingInput input);
        Task<User> EditListing(int listingID, AddListingInput input);
        Task<bool> DeleteListing(int listingID);  
        IQueryable<Listing> GetAll();
        IQueryable<Listing> ListingByFilter(int postCode, string listingType, string category);
        IQueryable<Listing> OneFieldListingQuery(int postCode, string listingType, string category, 
            bool postCodeQuery, bool listingTypeQuery, List<int> postCodes, List<Listing> sortedList);
        IQueryable<Listing> TwoFieldListingQuery(int postCode, string listingType, string category, 
            bool postCodeQuery, bool listingTypeQuery, List<int> postCodes, List<Listing> sortedList);
        IList<Listing> SortListByPostCode(List<Listing> results, List<int> postCodes, List<Listing> sortedList);
    }  
}  