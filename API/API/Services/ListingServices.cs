using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.GraphQL.Listings;
using API.Models;
using System;

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

        public IQueryable<Listing> ListingByFilter(
            int postCode, 
            string keyword, 
            decimal minPrice, 
            decimal maxPrice, 
            string listType, 
            string category, 
            string quality
            )
        {
            int queryArgs = 0;
            int lowestPostCodeRange = 799;
            var postCodes = new List<int>();
            var queriedFields = new List<string>();
            bool priceQueried = false;

            // is postcode queried
            if(postCode > lowestPostCodeRange)
            {
                queryArgs++;
                queriedFields.Add("postcode");
                
                // sets range of postcodes in vicinity of target
                postCodes = new List<int>{postCode, postCode+1, postCode-1, postCode+2, postCode-2, postCode+3, postCode-3};
            }

            // is keyword queried
            if(keyword.Length > 0)
            {
                queryArgs++;
                queriedFields.Add("keyword");
            }
            
            // shouldn't get here through validation but just incase
            if(maxPrice > 0 && minPrice > maxPrice)
                return Enumerable.Empty<Listing>().AsQueryable();
            
            // is minPrice queried
            if (minPrice > 0)
            {
                priceQueried = true;
            }
            
            // is maxPrice queried
            if (maxPrice > 0)
            {
                priceQueried = true;
            }
            
            // is type queried
            if (listType.Length > 0)
            {
                queryArgs++;
                queriedFields.Add("type");
            }
            
            // is category queried
            if (category.Length > 0)
            {
                queryArgs++;
                queriedFields.Add("category");
            }

            // is quality queried
            if (quality.Length > 0)
            {
                queryArgs++;
                queriedFields.Add("quality");
            }

            // nothing is queried
            if(queryArgs==0 && !priceQueried)
                return _context.Listings.AsQueryable();

            // something has been queried
            else
            {
                var results = QueriedListingByFilter(postCodes, keyword, listType, category, quality, queriedFields);

                if(priceQueried)
                    return FilterResultsByPrice(results, minPrice, maxPrice);
                else
                    return results;
            }
        }

        public IQueryable<Listing> QueriedListingByFilter(
            List<int> postCodes, 
            string keyword,
            string listType,
            string category,
            string quality,
            List<string> queriedFields)
        {
            var sortedList = new List<Listing>();
            int queryArgs = queriedFields.Count;

            // only price was queried
            if(queryArgs == 0)
               return _context.Listings.AsQueryable();
            
            if(queryArgs == 1)
                return OneFieldListingQuery(postCodes, keyword, listType, queriedFields);

            if(queryArgs == 2)
                return TwoFieldListingQuery(postCodes, keyword, listType, category, quality, queriedFields);

            if(queryArgs == 3)
                return ThreeFieldListingQuery(postCodes, keyword, listType, category, quality, queriedFields);

            if(queryArgs == 4)
                return FourFieldListingQuery(postCodes, keyword, listType, category, quality, queriedFields);

            else
            {
                var results = _context.Listings.Where(x => x.ListingType == listType)
                    .Where(x => x.ListingCategory == category)
                    .Where(x => x.ListingCondition == quality)
                    .Where(x => postCodes.Contains(x.ListingPostCode))
                    .Where(x => x.ListingDescription.Contains(keyword) || x.ListingTitle.Contains(keyword))
                    .ToList();

                var sortedResults = SortListByPostCode(results, postCodes, sortedList);
                return sortedResults.AsQueryable();
            }
        }

        // one search field query
        public IQueryable<Listing> OneFieldListingQuery(List<int> postCodes, string keyword, string listType, List<string> queriedFields)
        {
            var sortedList = new List<Listing>();

            // only postcode queried
            if(postCodes.Any())
            {
                var results = _context.Listings.Where(x => postCodes.Contains(x.ListingPostCode)).ToList();
                var sortedResults = SortListByPostCode(results, postCodes, sortedList);
                return sortedResults.AsQueryable();
            } 
            
            // only keyword queried
            if(queriedFields.Contains("keyword"))
                return _context.Listings.Where(x => x.ListingDescription.Contains(keyword) || x.ListingTitle.Contains(keyword)).AsQueryable();
            
            // only type is queried
            else
                return _context.Listings.Where(x => x.ListingType == listType).AsQueryable();
        }

        // two search fields query
        public IQueryable<Listing> TwoFieldListingQuery(List<int> postCodes, string keyword, string listType, 
            string category, string quality, List<string> queriedFields)
        {
            var sortedList = new List<Listing>();

            if(queriedFields.Contains("type"))
            {
                // postcode + listType
                if(postCodes.Any())
                {
                    var results = _context.Listings.Where(x => postCodes.Contains(x.ListingPostCode))
                        .Where(x => x.ListingType == listType)
                        .ToList();

                    var sortedResults = SortListByPostCode(results, postCodes, sortedList);
                    return sortedResults.AsQueryable();
                }

                // keyword + listType
                if(queriedFields.Contains("keyword"))
                    return _context.Listings.Where(x => x.ListingType == listType)
                        .Where(x => x.ListingDescription.Contains(keyword) || x.ListingTitle.Contains(keyword));
                
                // listType + category
                if(queriedFields.Contains("category"))
                    return  _context.Listings.Where(x => x.ListingType == listType)
                        .Where(x => x.ListingCategory == category);
                
                // listType + condition
                else
                    return  _context.Listings.Where(x => x.ListingType == listType)
                        .Where(x => x.ListingCondition == quality);
            } else {
                // postcode + keyword
                var results = _context.Listings.Where(x => postCodes.Contains(x.ListingPostCode))
                        .Where(x => x.ListingDescription.Contains(keyword) || x.ListingTitle.Contains(keyword))
                        .ToList();

                var sortedResults = SortListByPostCode(results, postCodes, sortedList);
                return sortedResults.AsQueryable();
            }
        }

        // three field search query
        public IQueryable<Listing> ThreeFieldListingQuery(List<int> postCodes, string keyword, string listType, string category, string quality, List<string> queriedFields)
        {
            var sortedList = new List<Listing>();

            // listType + postCode + keyword
            if(queriedFields.Contains("type") && postCodes.Any() && queriedFields.Contains("keyword"))
            {
                var results = _context.Listings.Where(x => x.ListingType == listType)
                    .Where(x => postCodes.Contains(x.ListingPostCode))
                    .Where(x => x.ListingDescription.Contains(keyword) || x.ListingTitle.Contains(keyword))
                    .ToList();

                var sortedResults = SortListByPostCode(results, postCodes, sortedList);
                return sortedResults.AsQueryable();
            }

            // listType + postCode + category
            if(queriedFields.Contains("type") && postCodes.Any() && queriedFields.Contains("category"))
            {
                var results = _context.Listings.Where(  x => x.ListingType == listType)
                    .Where(x => x.ListingCategory == category)
                    .Where(x => postCodes.Contains(x.ListingPostCode))
                    .ToList();

                var sortedResults = SortListByPostCode(results, postCodes, sortedList);
                return sortedResults.AsQueryable();   
            }

            // listType + postCode + quality
            if(queriedFields.Contains("type") && postCodes.Any() && queriedFields.Contains("quality"))
            {
                var results = _context.Listings.Where(  x => x.ListingType == listType)
                    .Where(x => x.ListingCondition == quality)
                    .Where(x => postCodes.Contains(x.ListingPostCode))
                    .ToList();

                var sortedResults = SortListByPostCode(results, postCodes, sortedList);
                return sortedResults.AsQueryable();
            }

            // listType + keyword + category
            if(queriedFields.Contains("type") && queriedFields.Contains("keyword") && queriedFields.Contains("category"))
                return _context.Listings.Where(  x => x.ListingType == listType)
                    .Where(x => x.ListingCategory == category)
                    .Where(x => x.ListingDescription.Contains(keyword) || x.ListingTitle.Contains(keyword));
            
            // listType + keyword + quality
            if(queriedFields.Contains("type") && queriedFields.Contains("keyword") && queriedFields.Contains("quality"))
                return _context.Listings.Where(  x => x.ListingType == listType)
                    .Where(x => x.ListingCondition == quality)
                    .Where(x => x.ListingDescription.Contains(keyword) || x.ListingTitle.Contains(keyword));
            
            // incorrect query - returning empty collection
            else
                return Enumerable.Empty<Listing>().AsQueryable();
        }

        // four field search query
        public IQueryable<Listing> FourFieldListingQuery(List<int> postCodes, string keyword, string listType, string category, string quality, List<string> queriedFields)
        {
            var sortedList = new List<Listing>();

            // listType + postcode + keyword + category
            if(queriedFields.Contains("type") && postCodes.Any() && queriedFields.Contains("keyword") && queriedFields.Contains("category"))
            {
                var results = _context.Listings.Where(x => x.ListingType == listType)
                    .Where(x => x.ListingCategory == category)
                    .Where(x => postCodes.Contains(x.ListingPostCode))
                    .Where(x => x.ListingDescription.Contains(keyword) || x.ListingTitle.Contains(keyword))
                    .ToList();

                var sortedResults = SortListByPostCode(results, postCodes, sortedList);
                return sortedResults.AsQueryable();
            }
            
            // listType + postcode + keyword + condition
            if(queriedFields.Contains("type") && postCodes.Any() && queriedFields.Contains("keyword") && queriedFields.Contains("quality"))
            {
                var results = _context.Listings.Where(x => x.ListingType == listType)
                    .Where(x => x.ListingCondition == quality)
                    .Where(x => postCodes.Contains(x.ListingPostCode))
                    .Where(x => x.ListingDescription.Contains(keyword) || x.ListingTitle.Contains(keyword))
                    .ToList();

                var sortedResults = SortListByPostCode(results, postCodes, sortedList);
                return sortedResults.AsQueryable();
            }

            // listType + postcode + category + condition
            if(queriedFields.Contains("type") && postCodes.Any() && queriedFields.Contains("category") && queriedFields.Contains("quality"))
            {
                var results = _context.Listings.Where(x => x.ListingType == listType)
                    .Where(x => x.ListingCategory == category)
                    .Where(x => x.ListingCondition == quality)
                    .Where(x => postCodes.Contains(x.ListingPostCode))
                    .ToList();

                var sortedResults = SortListByPostCode(results, postCodes, sortedList);
                return sortedResults.AsQueryable();
            }

            // listType + keyword + category + condition
            if(queriedFields.Contains("type") && queriedFields.Contains("keyword") && queriedFields.Contains("category") && queriedFields.Contains("quality"))
                return _context.Listings.Where(x => x.ListingType == listType)
                    .Where(x => x.ListingCategory == category)
                    .Where(x => x.ListingCondition == quality)
                    .Where(x => x.ListingDescription.Contains(keyword) || x.ListingTitle.Contains(keyword));

            // incorrect query - returning empty collection
            else
                return Enumerable.Empty<Listing>().AsQueryable();
        }

        // sorts results by postcode vicinity
        public IList<Listing> SortListByPostCode(List<Listing> results, List<int> postCodes, List<Listing> sortedList)
        {
            foreach(int postCode in postCodes)
            {
                var match = results.FindAll(item => item.ListingPostCode == postCode);
                if(match.Count != 0)
                {
                    foreach(Listing x in match)
                    {
                        sortedList.Add(x);
                    }
                }
            }
            return sortedList;
        }

        public IQueryable<Listing> FilterResultsByPrice(IQueryable<Listing> results, decimal min, decimal max)
        {
            if(max > 0)
                return results.Where(x => x.ListingPrice <= max).Where(x => x.ListingPrice >= min).AsQueryable();
            else
                return results.Where(x => x.ListingPrice >= min).AsQueryable();
        }

        public async Task<Listing> EditListing(int listingID, AddListingInput input)
        {
            var lowestPostCode = 800;

            // safety check, should never happen
            var editListing = await _context.Listings.FirstOrDefaultAsync(x => x.ListingID == listingID);

            if (editListing == null)
            {
                return null;
            }

            // validate inputs so see what exists
            if (input.ListingTitle.Length != 0)
                editListing.ListingTitle = input.ListingTitle;

            if (input.ListingCategory.Length != 0)
                editListing.ListingCategory = input.ListingCategory;

            if (input.ListingType.Length != 0)
                editListing.ListingType = input.ListingType;

            if (input.ListingPrice != 0)
                editListing.ListingPrice = (decimal)input.ListingPrice;

            if (input.ListingDescription.Length != 0)
                editListing.ListingDescription = input.ListingDescription;
            
            if (input.ListingCondition.Length != 0)
                editListing.ListingCondition = input.ListingCondition;

            if (input.ListingPostCode != 0 && input.ListingPostCode > lowestPostCode)
                editListing.ListingPostCode = input.ListingPostCode;

            // updates context with editted user
            _context.Listings.Update(editListing);

            // updates the database with changes
            await _context.SaveChangesAsync();

            return editListing;
        }

        public async Task<bool> DeleteListing(int listingID)
        {
            var listing = await _context.Listings.FirstOrDefaultAsync(c => c.ListingID == listingID);
            var response = false;

            if (listing is not null)
            {
                _context.Listings.Remove(listing);
                await _context.SaveChangesAsync();
                response = true;
            }

            return response;
        }

        public IQueryable<Listing> AdminListingSearch(string user, int listingID, string keyword)
        {
            // Only one field is sent via front end
            
            // checks if id is sent field
            if(user.Length != 0)
            {
                var isEmail = false;
                var numCheck = 0;

                // Check if ID is sent or Email
                try
                {
                    numCheck = Int32.Parse(user);
                }
                // Not an int
                catch (FormatException) 
                {
                    isEmail = true;
                }
                
                // Gets searched user data
                var searchResults = isEmail ? _context.Listings.Where(x => x.User.UserEmail == user)
                                            : _context.Listings.Where(x => x.UserID == numCheck);

                // Return search results
                return searchResults;
            }

            // checks if role is sent field
            if(listingID != 0)
            {
                return _context.Listings.Where(x => x.ListingID == listingID);
            }

            // checks if keyword is sent field
            if(keyword.Length != 0)
            {
                var searchResults = ListingKeywordSearch(keyword);
                return searchResults.AsQueryable();
            }
            
            // nothing sent, returning empty collection
            return new List<Listing>{}.AsQueryable();
        }

        public IList<Listing> ListingKeywordSearch(string keyword)
        {
            var numCheck = 0;
            var isString = false;

            // Check if keyword is number only
            try
            {
                numCheck = Int32.Parse(keyword);
            }
            // Not an int
            catch (FormatException) 
            {
                isString = true;
            }

            // string keyword checks
            if(isString)
            {
                var emailMatch = _context.Listings.Where(x => x.User.UserEmail.Contains(keyword)).ToList();
                var titleMatch = _context.Listings.Where(x => x.ListingTitle.Contains(keyword)).ToList();
                var descMatch = _context.Listings.Where(x => x.ListingDescription.Contains(keyword)).ToList();
                var categoryMatch = _context.Listings.Where(x => x.ListingCategory.Contains(keyword)).ToList();
                var typeMatch = _context.Listings.Where(x => x.ListingType.Contains(keyword)).ToList();
                var conditionMatch = _context.Listings.Where(x => x.ListingCondition.Contains(keyword)).ToList();
                
                List<Listing> searchResults = new List<Listing> {};

                // adds all results to searchResults list
                emailMatch.ForEach(x => searchResults.Add(x));
                titleMatch.ForEach(x => searchResults.Add(x));
                descMatch.ForEach(x => searchResults.Add(x));
                categoryMatch.ForEach(x => searchResults.Add(x));
                typeMatch.ForEach(x => searchResults.Add(x));
                conditionMatch.ForEach(x => searchResults.Add(x));
                
                return searchResults;

            // integer keyword checks    
            } else {
                var postCodeMatch = _context.Listings.Where(x => x.ListingPostCode == numCheck).ToList();
                var listingIDMatch = _context.Listings.Where(x => x.ListingID == numCheck).ToList();
                var userIDMatch = _context.Listings.Where(x => x.UserID == numCheck).ToList();
                var priceMatch = _context.Listings.Where(x => x.ListingPrice == numCheck).ToList();

                List<Listing> searchResults = new List<Listing> {};
                
                // adds all results to searchResults list
                postCodeMatch.ForEach(x => searchResults.Add(x));
                listingIDMatch.ForEach(x => searchResults.Add(x));
                userIDMatch.ForEach(x => searchResults.Add(x));
                priceMatch.ForEach(x => searchResults.Add(x));

                return searchResults;
            }
        }

        public async Task<bool> DeleteMultiListings(int[] listings)
        {             
            if (listings is null || listings.Length == 0)
                return false;

            var listPassed = 0;

            foreach(int listID in listings)
            {
                var result = _context.Listings.Any(x => x.ListingID == listID);
                if(result)
                {
                    listPassed++;
                    _context.Listings.Remove(_context.Listings.FirstOrDefault(x => x.ListingID == listID));
                    await _context.SaveChangesAsync();
                }
            }

            if (listings.Length == listPassed)
                return true;

            return false;
        }
    }
}
