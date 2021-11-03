using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.GraphQL.Listings;
using API.Models;

namespace API.Services
{
    public class ListingService : IListingService  
    {  
        private readonly ZipitContext _context;
    
        public ListingService(ZipitContext context)  
        {  
            _context = context;
        }

        // makeshift for now, edit when we get here
        public async Task<Listing> CreateListing(AddListingInput input)
        {
            var listing = new Listing();

            listing.ListingUserID = input.ListingUserID;
            listing.ListingType = input.ListingType;
            listing.ListingTitle = input.ListingTitle;
            listing.ListingPrice = (decimal)input.ListingPrice;
            listing.ListingPostCode = input.ListingPostCode;
            listing.ListingImageURL = input.ListingImageURL;
            listing.ListingDescription = input.ListingDescription;
            listing.ListingDate = System.DateTime.UtcNow;
            listing.ListingCategory = input.ListingCategory;
            listing.ListingAvailability = System.DateTime.UtcNow;
            listing.ListingCondition = input.ListingCondition;

            _context.Listings.Add(listing);
            await _context.SaveChangesAsync();

            return listing;
        }

        public IQueryable<Listing> GetAll()
        {
            return _context.Listings.AsQueryable();
        }

        public IQueryable<Listing> ListingByFilter(int postCode, string listingType, string category)
        {
            bool postCodeQuery = false;
            bool listingTypeQuery = false;
            bool categoryQuery = false;
            var postCodes = new List<int>{};

            // 4 digit check
            // is postcode queried
            if(postCode > 999)
            {
               postCodeQuery = true;
               postCodes = new List<int>{postCode, postCode+1, postCode+2, postCode+3, postCode+4, postCode+5, postCode-1, postCode-2, postCode-3, postCode-4, postCode-5};
            }

            // is listingtype queried
            if(listingType.Length > 0)
                listingTypeQuery = true;
            
            // is category queried
            if(category.Length > 0)
                categoryQuery = true;

            // nothing is queried
            if(!postCodeQuery && !listingTypeQuery && !categoryQuery)
                return _context.Listings.AsQueryable();

            // only postcode queried
            if(postCodeQuery && !listingTypeQuery && !categoryQuery)
                return _context.Listings.Where(x => postCodes.Contains(x.ListingPostCode)).AsQueryable();
            
            // only listingtype queried
            if(!postCodeQuery && listingTypeQuery && !categoryQuery)
                return _context.Listings.Where(x => x.ListingType == listingType).AsQueryable();

            // only category queried
            if(!postCodeQuery && !listingTypeQuery && categoryQuery)
                return _context.Listings.Where(x => x.ListingCategory == category).AsQueryable();

            // postcode & listingtype are queried
            if(postCodeQuery && listingTypeQuery && !categoryQuery)
            {
                return _context.Listings.Where(x => postCodes.Contains(x.ListingPostCode))
                    .Where(x => x.ListingType == listingType)
                    .AsQueryable();
            }
            
            // postcode & category are queried
            if(!listingTypeQuery && postCodeQuery && categoryQuery)
            {
                return _context.Listings.Where(x => postCodes.Contains(x.ListingPostCode))
                    .Where(x => x.ListingCategory == category)
                    .AsQueryable();
            }

            // listingtype & category are queried
            if(!postCodeQuery && listingTypeQuery && categoryQuery)
            {
                return _context.Listings.Where(x => x.ListingType == listingType)
                    .Where(x => x.ListingCategory == category)
                    .AsQueryable();
            }
            
            // all 3 fields are queried
            return _context.Listings.Where(x => postCodes.Contains(x.ListingPostCode))
                .Where(x => x.ListingType == listingType)
                .Where(x => x.ListingCategory == category)
                .AsQueryable();
        }
    }
}
