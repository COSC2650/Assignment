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
        IQueryable<Listing> ListingByFilter(int postCode, string keyword, decimal minPrice, decimal maxPrice, 
            string listType, string category, string quality);
        IQueryable<Listing> QueriedListingByFilter(List<int> postCodes, string keyword, string listType, string category, 
            string quality, List<string> queriedFields);
        IQueryable<Listing> OneFieldListingQuery(List<int> postCodes, string keyword, string listType, List<string> queriedFields);
        IQueryable<Listing> TwoFieldListingQuery(List<int> postCodes, string keyword, string listType, 
            string category, string quality, List<string> queriedFields);
        IList<Listing> SortListByPostCode(List<Listing> results, List<int> postCodes, List<Listing> sortedList);
        IQueryable<Listing> AdminListingSearch(string user, int listingID, string keyword);
        IList<Listing> ListingKeywordSearch(string keyword);
        IQueryable<Listing> FilterResultsByPrice(IQueryable<Listing> results, decimal min, decimal max);
    }  
}  