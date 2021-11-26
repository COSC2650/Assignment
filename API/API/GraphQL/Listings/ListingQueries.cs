using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.Services;
using HotChocolate.Types;

namespace API.GraphQL.Users
{
    [ExtendObjectType("Query")]
    public class ListingQueries
    {
        private readonly IListingService _listingService;

        public ListingQueries(IListingService listingService)
        {
            _listingService = listingService;
        }

        public IQueryable<Listing> ListingsByFilter(int listingPostCode, string listingKeyword, decimal listingMinPrice, decimal listingMaxPrice, 
            string listingType, string listingCategory, string listingQuality) => 
            _listingService.ListingByFilter(listingPostCode, listingKeyword, listingMinPrice, listingMaxPrice, listingType, listingCategory, listingQuality);
        
        public IQueryable<Listing> AdminListingSearch(string user, int listingID, string keyword) => 
            _listingService.AdminListingSearch(user, listingID, keyword);
    }
}