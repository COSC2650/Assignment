using System.Linq;  
using System.Threading.Tasks;  
using Microsoft.EntityFrameworkCore;  
using API.Data;
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
    }
}
