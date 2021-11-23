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
        Task<Listing> EditListing(int listingID, AddListingInput input);
        Task<bool> DeleteListing(int listingID);  
        Task<bool> DeleteMultiListings(int[] listings);
        IQueryable<Listing> GetAll();
        IQueryable<Listing> ListingByFilter(int postCode, string keyword, decimal price);
        IQueryable<Listing> OneFieldListingQuery(List<int> postCodes, string keyword, decimal price, 
            bool postCodeQuery, bool keywordQuery, List<Listing> sortedList);
        IQueryable<Listing> TwoFieldListingQuery(List<int> postCodes, string keyword, decimal price, 
            bool postCodeQuery, bool keywordQuery, List<Listing> sortedList);
        IList<Listing> SortListByPostCode(List<Listing> results, List<int> postCodes, List<Listing> sortedList);
        IQueryable<Listing> AdminListingSearch(string user, int listingID, string keyword);
        IList<Listing> ListingKeywordSearch(string keyword);
    }  
}  