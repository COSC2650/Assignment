using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Listing
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ListingID { get; set; }

        [Required]
        public int ListingUserID { get; set; }

        [Required, MinLength(4), MaxLength(4)]
        public int ListingPostCode { get; set; }

        [Required]
        public string ListingTitle { get; set; }

        public DateTime ListingDate { get; set; }

        public string ListingCategory { get; set; }

        [Required]
        public Decimal ListingPrice { get; set; }

        public string ListingType { get; set; }

        [Required]
        public string ListingDescription { get; set; }

        public string ListingCondition { get; set; }

        public DateTime ListingAvailability { get; set; }

        public string ListingImageURL { get; set; }
    }
}