using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Listing
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ListingID { get; set; }

        [Required]
        public int UserID {get; set; }
        public virtual User User { get; set; }

        [Required, MinLength(4), MaxLength(4)]
        public int ListingPostCode { get; set; }

        [Required, MinLength(3)]
        public string ListingTitle { get; set; }

        [Required]
        public DateTime ListingDate { get; set; }

        [Required, MinLength(3)]
        public string ListingCategory { get; set; }

        [Required]
        public Decimal ListingPrice { get; set; }

        [Required, MinLength(3)]
        public string ListingType { get; set; }

        [Required, MinLength(3)]
        public string ListingDescription { get; set; }

        public string ListingCondition { get; set; }

        public DateTime ListingAvailability { get; set; }

        public virtual List<Message> Messages { get; set; }
    }
}