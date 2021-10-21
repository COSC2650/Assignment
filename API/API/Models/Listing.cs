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
        public int UserID {get; set; }
        public virtual User User { get; set; }

        [Required, MinLength(4), MaxLength(4)]
        public int PostCode { get; set; }

        [Required, MinLength(3)]
        public string Title { get; set; }

        [Required]
        public DateTime DateListed { get; set; }

        [Required, MinLength(3)]
        public string Category { get; set; }

        [Required]
        public Decimal Price { get; set; }

        [Required, MinLength(3)]
        public string ListingType { get; set; }

        [Required, MinLength(3)]
        public string Description { get; set; }

        public string ProdCondition { get; set; }

        public DateTime ServAvailability { get; set; }

        public string ImageURL { get; set; }
    }
}