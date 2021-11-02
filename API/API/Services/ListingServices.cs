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
            listing.ListingTitle = input.Title;
            listing.ListingPrice = (decimal)input.Price;
            listing.ListingPostCode = input.PostCode;
            listing.ListingImageURL = input.ImageURL;
            listing.ListingDescription = input.Description;
            listing.ListingDate = System.DateTime.UtcNow;
            listing.ListingCategory = input.Category;
            listing.ListingAvailability = System.DateTime.UtcNow;
            listing.ListingCondition = input.ProdCondition;

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
            bool categoryQuery = false;
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
                categoryQuery = true;
            }

            // nothing is queried
            if(queryArgs==0)
                return _context.Listings.AsQueryable();

            // one field queried
            if(queryArgs==1)
            {
                var results = OneFieldListingQuery(postCode, listingType, category, postCodeQuery, listingTypeQuery, categoryQuery, postCodes);
                return results;
            }

            // two fields queried
            if(queryArgs==2)
            {
                var results = TwoFieldListingQuery(postCode, listingType, category, postCodeQuery, listingTypeQuery, categoryQuery, postCodes);
                return results;
            }
            
            // all 3 fields are queried
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

        public IQueryable<Listing> OneFieldListingQuery(int postCode, string listingType, string category, 
            bool postCodeQuery, bool listingTypeQuery, bool categoryQuery, List<int> postCodes)
        {
            var sortedList = new List<Listing>{};

            if(postCodeQuery && !listingTypeQuery && !categoryQuery)
            {
                var results = _context.Listings.Where(x => postCodes.Contains(x.ListingPostCode)).ToList();
                var sortedResults = SortListByPostCode(results, postCodes, sortedList);

                return sortedResults.AsQueryable();
            } 
            
            // only listingtype queried
            if(!postCodeQuery && listingTypeQuery && !categoryQuery)
                return _context.Listings.Where(x => x.ListingType == listingType).AsQueryable();

            // only category queried
            else 
            {
                return _context.Listings.Where(x => x.ListingCategory == category).AsQueryable();
            }
        }

        public IQueryable<Listing> TwoFieldListingQuery(int postCode, string listingType, string category, 
            bool postCodeQuery, bool listingTypeQuery, bool categoryQuery, List<int> postCodes)
        {
            var sortedList = new List<Listing>{};

            // postcode & listingtype are queried
            if(postCodeQuery && listingTypeQuery && !categoryQuery)
            {
                var results = _context.Listings.Where(x => postCodes.Contains(x.ListingPostCode))
                    .Where(x => x.ListingType == listingType).ToList();
                
                var sortedResults = SortListByPostCode(results, postCodes, sortedList);

                return sortedResults.AsQueryable();
            }
            
            // postcode & category are queried
            if(!listingTypeQuery && postCodeQuery && categoryQuery)
            {
                var results = _context.Listings.Where(x => postCodes.Contains(x.ListingPostCode))
                    .Where(x => x.ListingCategory == category).ToList();
                
                var sortedResults = SortListByPostCode(results, postCodes, sortedList);

                return sortedResults.AsQueryable();
            }

            // listingtype & category are queried
            else 
            {
                return _context.Listings.Where(x => x.ListingType == listingType)
                    .Where(x => x.ListingCategory == category).AsQueryable();
            }
        }

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
