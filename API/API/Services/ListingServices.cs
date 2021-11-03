using System;
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

            listing.UserID = input.UserID;
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
            int queryArgs = 0;
            int lowestPostCodeRange = 799;
            bool postCodeQuery = false;
            bool listingTypeQuery = false;
            var postCodes = new List<int>{};
            var sortedList = new List<Listing>{};

            // is postcode queried
            if(postCode > lowestPostCodeRange)
            {
               postCodeQuery = true;
               queryArgs++;
               postCodes = new List<int>{postCode, postCode+1, postCode-1, postCode+2, postCode-2, postCode+3, postCode-3};
            }

            // is listingtype queried
            if(listingType.Length > 0)
            {
                queryArgs++;
                listingTypeQuery = true;
            }
            // is category queried
            if(category.Length > 0)
            {
                queryArgs++;
            }

            // nothing is queried
            if(queryArgs==0)
                return _context.Listings.AsQueryable();

            // one field queried
            if(queryArgs==1)
            {
                var results = OneFieldListingQuery(postCode, listingType, category, postCodeQuery, listingTypeQuery, postCodes, sortedList);
                return results;
            }

            // two fields queried
            if(queryArgs==2)
            {
                var results = TwoFieldListingQuery(postCode, listingType, category, postCodeQuery, listingTypeQuery, postCodes, sortedList);
                return results;
            }
            
            // all three search fields are queried
            else 
            { 
                var results = _context.Listings.Where(x => postCodes.Contains(x.ListingPostCode))
                    .Where(x => x.ListingType == listingType)
                    .Where(x => x.ListingCategory == category)
                    .ToList();
                
                var sortedResults = SortListByPostCode(results, postCodes, sortedList);
                return sortedResults.AsQueryable();
            }
        }

        // one search field query
        public IQueryable<Listing> OneFieldListingQuery(int postCode, string listingType, string category, 
            bool postCodeQuery, bool listingTypeQuery, List<int> postCodes,List<Listing> sortedList)
        {
            // only postcode queried
            if(postCodeQuery)
            {
                var results = _context.Listings.Where(x => postCodes.Contains(x.ListingPostCode)).ToList();
                var sortedResults = SortListByPostCode(results, postCodes, sortedList);

                return sortedResults.AsQueryable();
            } 
            
            // only listingtype queried
            if(listingTypeQuery)
                return _context.Listings.Where(x => x.ListingType == listingType).AsQueryable();

            // only category queried
            else 
            {
                return _context.Listings.Where(x => x.ListingCategory == category).AsQueryable();
            }
        }

        // two search fields query
        public IQueryable<Listing> TwoFieldListingQuery(int postCode, string listingType, string category, 
            bool postCodeQuery, bool listingTypeQuery, List<int> postCodes, List<Listing> sortedList)
        {
            // listingtype & category are queried
            if(!postCodeQuery)
            {
                return _context.Listings.Where(x => x.ListingType == listingType)
                    .Where(x => x.ListingCategory == category).AsQueryable();
            }
            
            // postcode & category are queried
            if(!listingTypeQuery)
            {
                var results = _context.Listings.Where(x => postCodes.Contains(x.ListingPostCode))
                    .Where(x => x.ListingCategory == category).ToList();
                
                var sortedResults = SortListByPostCode(results, postCodes, sortedList);

                return sortedResults.AsQueryable();
            }

            // postcode and listingtype are queried
            else 
            {
                var results = _context.Listings.Where(x => postCodes.Contains(x.ListingPostCode))
                    .Where(x => x.ListingType == listingType).ToList();
                
                var sortedResults = SortListByPostCode(results, postCodes, sortedList);

                return sortedResults.AsQueryable();
            }
        }

        // sorts results by postcode vicinity
        public IList<Listing> SortListByPostCode(List<Listing> results, List<int> postCodes, List<Listing> sortedList)
        {
            foreach(int postCode in postCodes)
            {
                var match = results.Find(item => item.ListingPostCode == postCode);
                if(match != null)
                {
                    sortedList.Add(match);
                }
            }
            return sortedList;
        }
    }
}
