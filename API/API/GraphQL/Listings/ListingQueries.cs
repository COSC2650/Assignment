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

        public IQueryable<Listing> Ads => _listingService.GetAll();

        public Task<Listing> GetListingByPostcode(int postcode, string userid) =>
        _userService.GetListingByPostcode(postcode, userid);
    }
}