using System.Linq;  
using System.Threading.Tasks;  
using Microsoft.EntityFrameworkCore;  
using API.Data;
using API.Models;
using System;
using System.Collections.Generic;

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
        public async Task<Listing> CreateListing(Listing listing)
        {
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
            Boolean postCodeQuery = false;
            Boolean listingTypeQuery = false;
            Boolean categoryQuery = false;

            // 4 digit check
            // is postcode queried
            if(postCode > 999)
                postCodeQuery = true;

            // is listingtype queried
            if(listingType.Length != 0)
                listingTypeQuery = true;
            
            // is category queried
            if(category.Length != 0)
                categoryQuery = true;

            // only postcode queried
            if(postCodeQuery && !listingTypeQuery && !categoryQuery)
                return _context.Listings.Where(x => x.PostCode == postCode).AsQueryable();
            
            // only listingtype queried
            if(!postCodeQuery && listingTypeQuery && !categoryQuery)
                return _context.Listings.Where(x => x.ListingType == listingType).AsQueryable();

            // only category queried
            if(!postCodeQuery && !listingTypeQuery && categoryQuery)
                return _context.Listings.Where(x => x.Category == category).AsQueryable();

            // postcode & listingtype are queried
            if(postCodeQuery && listingTypeQuery && !categoryQuery)
            {
                return _context.Listings.Where(x => x.PostCode == postCode)
                    .Where(x => x.ListingType == listingType)
                    .AsQueryable();
            }
            
            // postcode & category are queried
            if(postCodeQuery && categoryQuery && !listingTypeQuery)
            {
                return _context.Listings.Where(x => x.PostCode == postCode)
                    .Where(x => x.Category == category)
                    .AsQueryable();
            }

            // listingtype & category are queried
            if(listingTypeQuery && categoryQuery && !postCodeQuery)
            {
                return _context.Listings.Where(x => x.ListingType == listingType)
                    .Where(x => x.Category == category)
                    .AsQueryable();
            }
            
            // all 3 fields are queried 
            // or nothing is queries using this function which should not happen and in which case will return null
            return _context.Listings.Where(x => x.PostCode == postCode)
                .Where(x => x.ListingType == listingType)
                .Where(x => x.Category == category)
                .AsQueryable();
        }
    }
}
