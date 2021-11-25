using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Message
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MessaageID { get; set; }

        [Required]
        public int UserID {get; set; }
        public virtual User User { get; set; }

        [Required]
        public int ListingID { get; set; }
        public virtual Listing Listing { get; set; }

        [Required]
        public int SenderID { get; set; }

        [Required, MinLength(3)]
        public string MessageBody { get; set; }
    }
}